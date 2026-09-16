import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  test: {
      environment: "jsdom",
      setupFiles: "./tests/setup.ts",
      coverage: {
        provider: "v8",
        reporter: ["text", "html"],
        include: [
          "src/utils/**/*.{ts,tsx}",
          "src/api/**/*.{ts,tsx}",
          "src/components/ApplicationForm.tsx",
          "src/components/ContactsForm.tsx",
          "src/components/ErrorState.tsx",
          "src/pages/PartnersPage.tsx",
        ],
        exclude: [
          "src/main.tsx",
        ],
        thresholds: {
          lines: 60,
          functions: 60,
          branches: 60,
          statements: 60,
        },
      },
  }
});
