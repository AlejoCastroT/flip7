import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // 1. Le decimos exactamente a Playwright dónde buscar los tests
  testDir: './tests',
  
  // 2. Reporte visual bonito al terminar
  reporter: 'html',

  // 3. Configuración base
  use: {
    baseURL: 'http://localhost:5173', // Soluciona el problema de que se quede colgado cargando
    trace: 'on-first-retry',
  },

  // 4. Navegadores en los que probaremos (por ahora solo Chrome/Chromium para que sea rápido)
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],

  // 5. ¡ESTO ES CLAVE! Playwright encenderá Vite automáticamente antes de hacer las pruebas
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
});