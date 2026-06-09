# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flip7.spec.js >> Flip7 Frontend - pruebas funcionales reales >> Escenario 2 — Todos pierden: piden cartas repetidamente, todos explotan, sin plantarse
- Location: tests\flip7.spec.js:45:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForTimeout: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - heading "FLIP7" [level=1] [ref=e5]
  - generic [ref=e6]:
    - generic [ref=e7]:
      - generic [ref=e9]:
        - generic [ref=e10]: Jugador 1
        - textbox "Nombre 1" [ref=e11]
      - generic [ref=e13]:
        - generic [ref=e14]: Jugador 2
        - textbox "Nombre 2" [ref=e15]
    - button "+ Añadir Jugador" [ref=e16]
    - button "Iniciar Partida" [ref=e17]
```

# Test source

```ts
  1  | ﻿import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Flip7 Frontend - pruebas funcionales reales', () => {
  4  |   const fillNamesAndStart = async (page, names = ['Alice', 'Bob']) => {
  5  |     await page.goto('/');
  6  |     const inputs = page.locator('input[type="text"]');
  7  |     await expect(inputs).toHaveCount(2);
  8  |     for (let i = 0; i < names.length; i += 1) {
  9  |       if (i >= 2) {
  10 |         await page.getByRole('button', { name: '+ Añadir Jugador' }).click();
  11 |       }
  12 |       await page.locator('input[type="text"]').nth(i).fill(names[i]);
  13 |     }
  14 |     await page.getByRole('button', { name: 'Iniciar Partida' }).click();
  15 |     await expect(page.getByText(/^TURNO DE:/)).toBeVisible();
  16 |   };
  17 | 
  18 |   const getActiveHandCount = async (page) => {
  19 |     return page.locator('div[class*="relative"][class*="h-[150px]"][class*="w-[100px]"][class*="rounded-lg"]').count();
  20 |   };
  21 | 
  22 |   const getCurrentPuntajeActual = async (page) => {
  23 |     const scoreText = await page.locator('div:has-text("Puntaje Actual")').locator('span').nth(1).textContent();
  24 |     return parseInt(scoreText?.replace(/[^0-9]/g, '') || '0', 10);
  25 |   };
  26 | 
  27 |   test('Escenario 1 — Ronda normal: entrega cartas, turnos, plantarse y cálculo de puntajes', async ({ page }) => {
  28 |     await fillNamesAndStart(page, ['Alice', 'Bob']);
  29 | 
  30 |     const handCountBefore = await getActiveHandCount(page);
  31 |     const scoreBefore = await getCurrentPuntajeActual(page);
  32 | 
  33 |     await page.getByRole('button', { name: /Voltear otra carta/i }).click();
  34 |     await expect(page.locator('div[class*="relative"][class*="h-[150px]"][class*="w-[100px]"][class*="rounded-lg"]')).toHaveCount(handCountBefore + 1);
  35 | 
  36 |     const scoreAfterHit = await getCurrentPuntajeActual(page);
  37 |     expect(scoreAfterHit).toBeGreaterThanOrEqual(0);
  38 |     expect(scoreBefore).toBeGreaterThanOrEqual(0);
  39 | 
  40 |     await page.getByRole('button', { name: /Plantarse/i }).click();
  41 |     await expect(page.getByText(/SE PLANTÓ/)).toBeVisible();
  42 |     await expect(page.getByText(/TURNO DE: (Alice|Bob)/)).toBeVisible();
  43 |   });
  44 | 
  45 |   test('Escenario 2 — Todos pierden: piden cartas repetidamente, todos explotan, sin plantarse', async ({ page }) => {
  46 |     await fillNamesAndStart(page, ['Alice', 'Bob', 'Charlie']);
  47 | 
  48 |     let attempt = 0;
  49 |     while (attempt < 60) {
  50 |       const targetDialog = page.getByText('⭐ Elegir Víctima ⭐');
  51 |       if (await targetDialog.isVisible()) {
  52 |         const targetButtons = page.getByRole('button').filter({ hasText: /Alice|Bob|Charlie/ });
  53 |         if (await targetButtons.count() > 0) {
  54 |           await targetButtons.first().click();
  55 |           attempt += 1;
  56 |           continue;
  57 |         }
  58 |       }
  59 | 
  60 |       const hitButton = page.locator('button:has-text("Voltear otra carta")').first();
  61 |       if (await hitButton.count() > 0) {
  62 |         try {
  63 |           await hitButton.click({ timeout: 5000 });
  64 |           attempt += 1;
  65 |           await page.waitForTimeout(300);
  66 |           continue;
  67 |         } catch (error) {
  68 |           await page.waitForTimeout(300);
  69 |         }
  70 |       }
  71 | 
  72 |       const finishButton = page.getByRole('button', { name: /Repartir Nueva Ronda/i });
  73 |       if (await finishButton.isVisible()) {
  74 |         break;
  75 |       }
  76 | 
  77 |       if (await page.getByText('FIN DEL JUEGO').count() > 0) {
  78 |         break;
  79 |       }
  80 | 
> 81 |       await page.waitForTimeout(500);
     |                  ^ Error: page.waitForTimeout: Test timeout of 30000ms exceeded.
  82 |     }
  83 | 
  84 |     await expect(page.locator('text=SE PLANTÓ')).toHaveCount(0);
  85 |     await expect(page.getByText(/BUSTED/)).toHaveCount(3);
  86 |   });
  87 | });
```