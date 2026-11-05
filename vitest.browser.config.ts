import { defineConfig } from 'vitest/config';
import base from './vite.config';

export default defineConfig({
  ...base,
  test: {
    ...base.test,
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      ...base.test?.coverage,
      include: ['src/**/*.{ts,tsx}'],
      reportsDirectory: 'coverage/browser',
      thresholds: { lines: 98, branches: 98 }
    }
  }
});
