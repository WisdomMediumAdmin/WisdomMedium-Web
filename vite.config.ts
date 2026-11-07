import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    maxWorkers: 2,
    // Instrumented jsdom role queries can exceed the 5s unit-test default.
    testTimeout: 30_000,
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,tsx,mjs}'],
      exclude: ['**/*.test.{ts,tsx}'],
      reportsDirectory: 'coverage/all',
      reporter: ['text-summary', 'json', 'json-summary', 'html', 'lcov'],
      reportOnFailure: true,
      thresholds: {
        lines: 98,
        branches: 98,
        'src/**': { lines: 98, branches: 98 },
        'scripts/**': { lines: 98, branches: 98 }
      }
    }
  }
});
