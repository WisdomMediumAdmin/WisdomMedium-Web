import { defineConfig } from 'vitest/config';
import base from './vite.config';

export default defineConfig({
  ...base,
  test: {
    ...base.test,
    environment: 'node',
    include: ['scripts/**/*.test.{ts,tsx}'],
    coverage: {
      ...base.test?.coverage,
      include: ['scripts/**/*.{ts,tsx,mjs}'],
      reportsDirectory: 'coverage/node',
      thresholds: { lines: 98, branches: 98 }
    }
  }
});
