import { test, expect, Locator } from "@playwright/test";

test("Validating autoSuggest Dropdown", async ({ page }) => {
  await page.goto("https://www.flipkart.com/");
  const closeBtn = page.locator("button._2KpZ6l._2doB4z");
  if (await closeBtn.isVisible()) {
    await closeBtn.click();
  }
  await page.getByRole("textbox", {
      name: "Search for Products, Brands and More",
    }).fill("mobile");

  const options: Locator = page.locator("ul>li");
  await options.first().waitFor({ state: "visible" });
  const cnt: number = await options.count();
  console.log("count of options: ", cnt);

  for (let i = 0; i < cnt; i++) {
    //console.log(await options.nth(i).innerText())
    console.log(i, "th data: ", await options.nth(i).textContent());
  }

  await page.waitForTimeout(3000);
});
