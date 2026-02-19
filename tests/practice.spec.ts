import { test, expect, Locator } from "@playwright/test";

test.skip("practice test", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  //static table
  const booknames: string[] = (
    await page
      .locator('table[name="BookTable"] tr td:first-child')
      .allTextContents()
  ).map((text) => text.trim());
  const rows = page.locator('table[name="BookTable"] tr')
  const rowCnt = await rows.count();

  let selectedBook: string = '';
  let lowestPrice: number = Number.MAX_VALUE;

    for (let i = 1; i < rowCnt; i++) { // start from 1 to skip header
    const subject = (await rows.nth(i).locator("td").nth(2).innerText()).trim();
    const priceText = (await rows.nth(i).locator("td").nth(3).innerText()).trim();

    if (subject.toLowerCase() === "selenium") {
      const price = Number(priceText);

      if (price < lowestPrice) {
        lowestPrice = price;
        selectedBook = (await rows.nth(i).locator("td").nth(0).innerText()).trim();
      }
    }
  }

  console.log("Lowest priced Selenium book:", selectedBook);
  console.log("Price:", lowestPrice);
});

test.only('Blazedemo flight booking test', async ({page})=>{
    await page.goto('https://blazedemo.com/');

    //selecting from and to city
    await page.locator('select[name="fromPort"]').selectOption('Boston')
    await page.locator('select[name="toPort"]').selectOption('New York')
    await page.locator('input[type="submit"]').click()

    // selecting min price flight
    const rows = page.locator('table tbody tr');
    const rowsCnt = await rows.count();
    let minPrice = Number.MAX_VALUE;
    let minPriceIndex = -1;
    for(let i=0; i<rowsCnt; i++){
        const priceText = await rows.nth(i).locator('td').nth(5).innerText();
        const price = Number(priceText.replace('$', '').trim());
        if(!Number.isNaN(price) && price < minPrice){
            minPrice = price;
            minPriceIndex = i;
        }
    }
    expect(minPriceIndex).toBeGreaterThanOrEqual(0);
    await rows.nth(minPriceIndex).locator('td').nth(0).locator('input[type="submit"]').click();
    // await rows.nth(minPriceIndex).getByRole('button', {name: 'Choose This Flight'}).click();

    // filling the form
    await page.locator('#inputName').fill('John Doe');
    await page.locator('#address').fill('123 Main St');
    await page.locator('#city').fill('Anytown');
    await page.locator('#state').fill('Anystate');
    await page.locator('#zipCode').fill('12345');
    await page.locator('#cardType').selectOption('visa');
    await page.locator('#creditCardNumber').fill('4111111111111111');
    await page.locator('#creditCardMonth').fill('12');
    await page.locator('#creditCardYear').fill('2025');
    await page.locator('#nameOnCard').fill('John Doe');
    await page.locator('#rememberMe').check();
    await page.locator('input[type="submit"]').click();

    // validating booking confirmation
    const confirmationText = await page.getByRole('heading', { name: 'Thank you for your purchase today!' }).textContent();
    if (confirmationText) {
    expect(confirmationText).toContain('Thank you for your purchase today!');
    console.log('Test passed: Confirmation message found');
    } else {
    throw new Error('test failed: Confirmation message not found');
    }

    await page.waitForTimeout(3000)
})
