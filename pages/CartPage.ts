import { Page, Locator } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly productNamesInCart: Locator;

  constructor(page: Page) {
    this.page = page;
    // Store locator, NOT .all()
    this.productNamesInCart = page.locator('#tbodyid tr td:nth-child(2)');
  }

  /* Returns true/false like you want
  async checkProductInCart(productName: string): Promise<boolean> {
    await this.productNamesInCart.first().waitFor({ state: 'visible' });
    const count = await this.productNamesInCart.count();
    for (let i = 0; i < count; i++) {
      const name = (await this.productNamesInCart
        .nth(i)
        .textContent())?.trim();

      if (name === productName) {
        return true;
      }
    }
    return false;
  }*/
  async checkProductInCart(productName: string): Promise<boolean> {
  await this.productNamesInCart.first().waitFor({ state: 'visible' });

  const regex = new RegExp(productName, 'i');
  const products = await this.productNamesInCart.allTextContents();

  return products.some(p => regex.test(p.trim()));
}

}
