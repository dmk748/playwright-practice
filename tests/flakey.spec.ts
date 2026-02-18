import { test, expect, Locator } from "@playwright/test";

test("Flakey test example", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.locator('input[name="username"]').fill("Admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(10000);
  await page.locator(".oxd-userdropdown-name").click();
  await page.locator("ul[role='menu'] li:last-child").click();
  await page.waitForTimeout(5000);
});
