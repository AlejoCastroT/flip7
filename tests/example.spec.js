import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  // The app title is probably Vite + React or Flip7
  await expect(page).toHaveTitle(/flip7/i);
});
