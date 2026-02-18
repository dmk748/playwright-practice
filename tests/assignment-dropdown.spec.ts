import { test, expect, Locator } from "@playwright/test";

test("Validating static dropdown", async ({ page }) => {
  await page.goto("https://www.bstackdemo.com/");
  const orderDropdown: Locator = page.locator("div[class='sort']>select");
  await expect(orderDropdown).toBeEnabled();
  await expect(orderDropdown).toBeVisible();
  await orderDropdown.selectOption({ value: "lowestprice" });

  const priceLocator: Locator = page.locator("div.val>b");
  const priceArray: string[] = await priceLocator.allTextContents();
  console.log(priceArray);
  console.log("sorted array items");
  const numericPrices = priceArray.map((p) => Number(p.replace("$", "")));
  const sorted = [...numericPrices].sort((a, b) => a - b);
  console.log(sorted);
  await page.waitForTimeout(3000);
});
