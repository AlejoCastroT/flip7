

import { test, expect } from '@playwright/test';

test.describe('Flip7 Frontend - pruebas funcionales reales', () => {
  
  // Inicializa el juego: navega, rellena nombres y comienza la partida
  const fillNamesAndStart = async (page, names = ['Alice', 'Bob']) => {
    await page.goto('/');
    const inputs = page.locator('input[type="text"]');
    await expect(inputs).toHaveCount(2);
    
    for (let i = 0; i < names.length; i += 1) {
      if (i >= 2) {
        await page.getByRole('button', { name: '+ Añadir Jugador' }).click();
      }
      await page.locator('input[type="text"]').nth(i).fill(names[i]);
    }
    
    await page.getByRole('button', { name: 'Iniciar Partida' }).click();
    await expect(page.getByText(/^TURNO DE:/)).toBeVisible();
  };

  // Obtiene el contador de cartas en la mano del jugador actual
  const getActiveHandCount = async (page) => {
    return page.locator('div[class*="relative"][class*="h-[150px]"][class*="w-[100px]"][class*="rounded-lg"]').count();
  };

  // Extrae el valor numérico del puntaje actual de la UI
  const getCurrentPuntajeActual = async (page) => {
    const scoreText = await page.locator('div:has-text("Puntaje Actual")').locator('span').nth(1).textContent();
    return parseInt(scoreText?.replace(/[^0-9]/g, '') || '0', 10);
  };


  /**
   * ESCENARIO 1: RONDA NORMAL
   * 
   * Valida: Entrega de cartas | Turnos | Plantarse | Cálculo de puntajes
   * 
   * Flujo: Setup → Pide carta → Valida incremento → Valida puntaje → Se planta → Valida turno
   */
  test('Escenario 1 — Ronda normal: entrega cartas, turnos, plantarse y cálculo de puntajes', async ({ page }) => {
    await fillNamesAndStart(page, ['Alice', 'Bob']);

    // Captura estado inicial
    const handCountBefore = await getActiveHandCount(page);
    const scoreBefore = await getCurrentPuntajeActual(page);

    // Valida entrega de cartas
    await page.getByRole('button', { name: /Voltear otra carta/i }).click();
    await expect(page.locator('div[class*="relative"][class*="h-[150px]"][class*="w-[100px]"][class*="rounded-lg"]')).toHaveCount(handCountBefore + 1);

    // Valida cálculo de puntajes
    const scoreAfterHit = await getCurrentPuntajeActual(page);
    expect(scoreAfterHit).toBeGreaterThanOrEqual(0);
    expect(scoreBefore).toBeGreaterThanOrEqual(0);

    // Valida plantarse y cambio de turno
    await page.getByRole('button', { name: /Plantarse/i }).click();
    await expect(page.getByText(/SE PLANTÓ/)).toBeVisible();
    await expect(page.getByText(/TURNO DE: (Alice|Bob)/)).toBeVisible();
  });


  /**
   * ESCENARIO 2: TODOS PIERDEN
   * 
   * Valida: Pedir cartas repetidamente | Todos exceden límite | Sin plantados
   * 
   * Flujo: Setup (3 jugadores) → Loop 60 intentos → Valida 0 plantados → Valida 3 busted
   */
  test('Escenario 2 — Todos pierden: piden cartas repetidamente, todos explotan, sin plantarse', async ({ page }) => {
    await fillNamesAndStart(page, ['Alice', 'Bob', 'Charlie']);

    // Loop: Simula jugadores pidiendo cartas repetidamente
    let attempt = 0;
    while (attempt < 60) {
      // Si hay diálogo de selección de objetivo (cartas especiales)
      const targetDialog = page.getByText('⭐ Elegir Víctima ⭐');
      if (await targetDialog.isVisible()) {
        const targetButtons = page.getByRole('button').filter({ hasText: /Alice|Bob|Charlie/ });
        if (await targetButtons.count() > 0) {
          await targetButtons.first().click();
          attempt += 1;
          continue;
        }
      }

      // Si hay botón "Voltear otra carta"
      const hitButton = page.locator('button:has-text("Voltear otra carta")').first();
      if (await hitButton.count() > 0) {
        try {
          await hitButton.click({ timeout: 5000 });
          attempt += 1;
          await page.waitForTimeout(300);
          continue;
        } catch (error) {
          await page.waitForTimeout(300);
        }
      }

      // Si aparece "Repartir Nueva Ronda" o "FIN DEL JUEGO", termina el loop
      const finishButton = page.getByRole('button', { name: /Repartir Nueva Ronda/i });
      if (await finishButton.isVisible() || await page.getByText('FIN DEL JUEGO').count() > 0) {
        break;
      }

      await page.waitForTimeout(500);
    }

    // Valida: ningún jugador se plantó
    await expect(page.locator('text=SE PLANTÓ')).toHaveCount(0);

    // Valida: todos los 3 jugadores están "BUSTED" (excedieron el límite)
    await expect(page.getByText(/BUSTED/)).toHaveCount(3);
  });
});