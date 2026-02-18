import { test, expect, Locator } from "@playwright/test";

const loginTestData: string[][] = [
  ["Admin", "admin123", "valid"],
  ["invaliduser@example.com", "test321", "invalid"],
  ["validuser@example.com", "testxyz", "invalid"],
  ["", "", "invalid"],
];

test.describe("Data-Driven Tests for Login Functionality", () => {
  for (const [username, password, expectedResult] of loginTestData) {
    test(`Login test with username: "${username}" and expecting ${expectedResult} result`, async ({
      page,
    }) => {
      await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
      );
      await page.locator('input[name="username"]').fill(username);
      await page.getByRole("textbox", { name: "Password" }).fill(password);
      await page.getByRole("button", { name: "Login" }).click();
      if (expectedResult === "valid") {
        await expect(page.locator(".oxd-userdropdown-name")).toBeVisible();
      }
      else {
        await expect(
          page.locator("div[class='orangehrm-login-logo']")
        ).toBeVisible();
        await expect(page).toHaveURL(
          "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
        );
      }
    });
  }
});
