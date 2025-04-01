import { test, expect } from '@playwright/test';

test('Ajouter au panier', async ({ page }) => {
  // Configuration
  test.setTimeout(240000); // 4 minutes

  // 1. Navigation initiale et vérification de la page d'accueil
  await page.goto('https://ztrain-web.vercel.app/home');
  await expect(page.locator('#style_popular_product_wrapper__z6J0h')).toBeVisible();

  // 2. Vérification de l'état initial du panier
  const montpanierinitial = parseInt(await page.locator('#style_content_cart_wrapper__mqNbf span').innerText(), 10);
  console.log('Compteur initial du panier :', montpanierinitial);

  let prixinitial;
  if (montpanierinitial < 1) {
    prixinitial = parseFloat('0'); 
    console.log('Panier vide, prix total initial :', prixinitial);
  } else {
    await page.locator('#style_content_cart_wrapper__mqNbf').click();
    await page.locator('#style_cart_footer__jPYGe').waitFor({ state: 'visible', timeout: 10000 });
    const prixinitialText = await page.locator('#style_totalPrice__o2yCy h5:nth-child(2)').innerText();
    prixinitial = parseFloat(prixinitialText.replace(/[^\d.]/g, ''));
    console.log('Prix total initial :', prixinitial);
  }

  // 3. Sélection et ajout d'un produit au panier
  const product = page.locator('#style_popular_product_wrapper__z6J0h .style_card__gNEqX').nth(0);
  await product.locator('.style_card_body__QuFGN .style_card_body_img__mkV1D').click(); 
  await page.locator('#style_btn_add_cart__gTXM7').click();
  await page.waitForTimeout(90000); // Attendre la mise à jour

  // 4. Vérification de la mise à jour du panier
  const misejmontpanier = parseInt(await page.locator('#style_content_cart_wrapper__mqNbf span').innerText(), 10);
  console.log('Compteur après ajout du premier produit au panier:', misejmontpanier);
  expect(misejmontpanier).toBe(montpanierinitial + 1);
  
  // 5. Vérification du prix total mis à jour
  await page.locator('#style_content_cart_wrapper__mqNbf').click();
  await page.locator('#style_cart_footer__jPYGe').waitFor({ state: 'visible', timeout: 10000 });
  const misejmontpanierText = await page.locator('#style_totalPrice__o2yCy h5:nth-child(2)').innerText();
  const misejprixtotal = parseFloat(misejmontpanierText.replace(/[^\d.]/g, ''));
  expect(misejprixtotal).toBeGreaterThan(prixinitial);
});