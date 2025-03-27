import { test, expect } from '@playwright/test';

test('Creation de compte', async ({ page }) => {
  test.setTimeout(180000); // 3minutes timeout pour tout le test
  
  const date = new Date().getTime();
  const email = "test" + date + "@gmail.com";
  
  await page.goto('https://ztrain-web.vercel.app/home', { timeout: 120000 });
  await page.locator('#style_avatar_wrapper__pEGIQ').click({ timeout: 120000 });
  await page.locator(".MuiTabs-root button:nth-child(2)").click({ timeout: 120000 });
  await page.locator("#email_register").fill("brenda@gmail.com", { timeout: 120000 });
  await page.locator("#password_register").fill("123456789", { timeout: 120000 });
  await page.locator("#confirm_password_register").fill("123456789", { timeout: 120000 });
  await page.locator("#btn_register").click({ timeout: 15000 });
});