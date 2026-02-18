import { test, expect, Locator } from "@playwright/test";
import fs from "fs";

const path = "testdata/ddt.json";

const loginTestData: any = JSON.parse(fs.readFileSync(path, "utf-8"));

test.describe("Data-Driven Tests for Login Functionality using JSON", () => {
    for (const { username, password, validity } of loginTestData) {
        test(`Login test with username: "${username}" and expecting ${validity} result`, async ({
            page,
        }) => {
            await page.goto(
                "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
            );
            await page.locator('input[name="username"]').fill(username);
            await page.getByRole("textbox", { name: "Password" }).fill(password);
            await page.getByRole("button", { name: "Login" }).click();
            if (validity === "valid") {
                await expect(page.locator(".oxd-userdropdown-name")).toBeVisible();
            } else {
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
