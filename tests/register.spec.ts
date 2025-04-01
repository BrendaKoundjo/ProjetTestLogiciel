import { test, expect } from '@playwright/test';

test('Creation de compte', async ({ page }) => {
  // Configuration du test
  test.setTimeout(240000); // 4 minutes timeout pour tout le test
  // 1. Préparation des données de test
  // Génération d'un email unique basé sur le timestamp actuel
  const email = "brendakoundjo88" + "@gmail.com";
  const password = "123456789";
  // 2. Navigation vers la page d'accueil
  await page.goto('https://ztrain-web.vercel.app/home', { timeout: 120000 });
  await expect(page).toHaveURL('https://ztrain-web.vercel.app/home');
  await expect(page.locator('#style_avatar_wrapper__pEGIQ')).toBeVisible();
  // 3. Accès au formulaire d'inscription
  await page.locator('#style_avatar_wrapper__pEGIQ').click({ timeout: 120000 });
  await expect(page.locator('.MuiTabs-root')).toBeVisible();
  // 4. Sélection de l'onglet "Inscription"
  await page.locator(".MuiTabs-root button:nth-child(2)").click({ timeout: 120000 });
  await expect(page.locator("#email_register")).toBeVisible();
  await expect(page.locator("#password_register")).toBeVisible();
  await expect(page.locator("#confirm_password_register")).toBeVisible();
  // 5. Remplissage du formulaire d'inscription
  await page.locator("#email_register").fill(email, { timeout: 120000 });
  await page.locator("#password_register").fill(password, { timeout: 120000 });
  await page.locator("#confirm_password_register").fill(password, { timeout: 120000 });
  // Vérification que les champs sont bien remplis
  await expect(page.locator("#email_register")).toHaveValue(email);
  await expect(page.locator("#password_register")).toHaveValue(password);
  await expect(page.locator("#confirm_password_register")).toHaveValue(password);
  // 6. Soumission du formulaire
  await page.locator("#btn_register").click({ timeout: 15000 });
  // 7. Vérification de la création réussie du compte
  await expect(page).toHaveURL('https://ztrain-web.vercel.app/home');
});