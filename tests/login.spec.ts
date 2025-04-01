import { test, expect } from '@playwright/test';

test('Connexion utilisateur', async ({ page }) => {
  test.setTimeout(240000); // 4 minutes timeout
  const email = "brendakoundjo88" + "@gmail.com";
  const motDePasse = "123456789";
  // 1. Accéder à la page d'accueil
  await page.goto('https://ztrain-web.vercel.app/home', { timeout: 120000 });
  await expect(page).toHaveURL('https://ztrain-web.vercel.app/home');
 // 2. Ouvrir le panneau d'authentification
  await page.locator('#style_avatar_wrapper__pEGIQ').click({ timeout: 120000 });

  // 3. Remplir le formulaire de connexion
  await page.locator("#email_login").fill(email, { timeout: 120000 });
  await page.locator("#password_login").fill(motDePasse, { timeout: 120000 });
  await expect(page.locator('#email_login')).toBeVisible();
  await expect(page.locator('#password_login')).toBeVisible();
  // 4. Cliquer sur le bouton de connexion
  await page.locator("#btn_login").click({ timeout: 15000 });

  // 5. Vérifier que l'email est affiché après connexion
  const displayedEmail = await page.locator('p.MuiTypography-body1.css-80nwu0').textContent();
  expect(displayedEmail).toBe(email);
});