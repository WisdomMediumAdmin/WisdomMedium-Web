import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CopyEmailButton } from './App';
import { deferred } from '../tests/deferred';

const email = 'support@wisdommedium.com';
const success = 'Email address copied.';
const unavailable = 'Copying is unavailable here. Select the address above or use Email support.';
const failed = 'Copying did not work. Select the address above or use Email support.';
const originalNavigator = navigator;
const originalClipboard = Object.getOwnPropertyDescriptor(originalNavigator, 'clipboard');

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  // userEvent.setup installs its own clipboard on the original navigator.
  if (originalClipboard) Object.defineProperty(originalNavigator, 'clipboard', originalClipboard);
  else Reflect.deleteProperty(originalNavigator, 'clipboard');
});

function expectState(label: string, message: string) {
  expect(screen.getByRole('button', { name: label }).getAttribute('type')).toBe('button');
  expect(screen.getByRole('status').textContent).toBe(message);
  expect(screen.getByRole('status').getAttribute('aria-live')).toBe('polite');
}

describe('clipboard state transitions', () => {
  it('starts idle and supports keyboard activation without premature success', async () => {
    const user = userEvent.setup();
    const operation = deferred<void>();
    const writeText = vi.fn(() => operation.promise);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    render(<CopyEmailButton email={email} />);
    expectState('Copy email address', '');
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole('button'));
    await user.keyboard('{Enter}');
    expect(writeText).toHaveBeenCalledExactlyOnceWith(email);
    expectState('Copy email address', '');
    await act(async () => { operation.resolve(); await operation.promise; });
    expectState('Copied', success);
  });

  it.each([{}, { clipboard: undefined }, { clipboard: null }, { clipboard: {} }, { clipboard: { writeText: undefined } }])('handles an unavailable clipboard: %j', navigatorValue => {
    vi.stubGlobal('navigator', navigatorValue);
    render(<CopyEmailButton email={email} />);
    fireEvent.click(screen.getByRole('button'));
    expectState('Copy email address', unavailable);
  });

  it.each(['reject', 'throw'] as const)('handles a clipboard %s and allows a successful retry', async mode => {
    const writeText = vi.fn<(text: string) => Promise<void>>();
    if (mode === 'reject') writeText.mockRejectedValueOnce(new Error('Permission denied'));
    else writeText.mockImplementationOnce(() => { throw new Error('Unavailable'); });
    writeText.mockResolvedValueOnce(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    render(<CopyEmailButton email={email} />);
    await act(async () => { fireEvent.click(screen.getByRole('button')); });
    expectState('Copy email address', failed);
    await act(async () => { fireEvent.click(screen.getByRole('button')); });
    expectState('Copied', success);
    expect(writeText.mock.calls).toEqual([[email], [email]]);
  });

  it.each(['unavailable', 'rejected'] as const)('clears a previous success if a later attempt is %s', async outcome => {
    const writeText = vi.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('Denied'));
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    render(<CopyEmailButton email={email} />);
    await act(async () => { fireEvent.click(screen.getByRole('button')); });
    expectState('Copied', success);
    if (outcome === 'unavailable') vi.stubGlobal('navigator', {});
    await act(async () => { fireEvent.click(screen.getByRole('button')); });
    expectState('Copy email address', outcome === 'unavailable' ? unavailable : failed);
  });

  it('recovers when clipboard support becomes available and uses the current email prop', async () => {
    vi.stubGlobal('navigator', {});
    const { rerender } = render(<CopyEmailButton email={email} />);
    fireEvent.click(screen.getByRole('button'));
    expectState('Copy email address', unavailable);
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    rerender(<CopyEmailButton email="new@example.com" />);
    await act(async () => { fireEvent.click(screen.getByRole('button')); });
    expect(writeText).toHaveBeenCalledExactlyOnceWith('new@example.com');
    expectState('Copied', success);
  });

  it.each([true, false])('reflects completion order for overlapping requests (older success: %s)', async olderSucceeds => {
    const older = deferred<void>();
    const newer = deferred<void>();
    const writeText = vi.fn().mockReturnValueOnce(older.promise).mockReturnValueOnce(newer.promise);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    render(<CopyEmailButton email={email} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    expect(writeText).toHaveBeenCalledTimes(2);
    await act(async () => {
      if (olderSucceeds) newer.reject(new Error('Newer rejected'));
      else newer.resolve();
    });
    expectState(olderSucceeds ? 'Copy email address' : 'Copied', olderSucceeds ? failed : success);
    await act(async () => {
      if (olderSucceeds) older.resolve();
      else older.reject(new Error('Older rejected'));
    });
    // Current behavior: whichever promise settles last supplies the visible result.
    expectState(olderSucceeds ? 'Copied' : 'Copy email address', olderSucceeds ? success : failed);
  });

  it.each(['resolve', 'reject'] as const)('can unmount while a clipboard operation will %s', async outcome => {
    const operation = deferred<void>();
    const writeText = vi.fn(() => operation.promise);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    const { unmount } = render(<CopyEmailButton email={email} />);
    fireEvent.click(screen.getByRole('button'));
    unmount();
    await act(async () => {
      if (outcome === 'resolve') operation.resolve();
      else operation.reject(new Error('Late failure'));
    });
    expect(screen.queryByRole('status')).toBeNull();
    expect(writeText).toHaveBeenCalledExactlyOnceWith(email);
  });
});
