import { test, expect } from '@playwright/test';

test('Connexion utilisateur', async ({ page }) => {
  test.setTimeout(180000); // 3 minutes timeout

  // 1. Accéder à la page d'accueil
  await page.goto('https://ztrain-web.vercel.app/home', { timeout: 120000 });

  // 2. Ouvrir le panneau d'authentification
  await page.locator('#style_avatar_wrapper__pEGIQ').click({ timeout: 120000 });

  // 3. Remplir le formulaire de connexion
  await page.locator("#email_login").fill("brenda@gmail.com", { timeout: 120000 });
  await page.locator("#password_login").fill("123456789", { timeout: 120000 });

  // 4. Cliquer sur le bouton de connexion
  await page.locator("#btn_login").click({ timeout: 15000 });

  // 5. Vérifier que l'email est affiché après connexion
  const displayedEmail = await page.locator('p.MuiTypography-body1.css-80nwu0').textContent();
  expect(displayedEmail).toBe("brenda@gmail.com");
});