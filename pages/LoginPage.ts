import { Page, Locator } from "@playwright/test";

export class LoginPage {
    //declaration of elements private readonly
    private readonly page: Page;
    private readonly loginLink: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.locator("#login2");
        this.usernameInput = page.locator("#loginusername");
        this.passwordInput = page.locator("#loginpassword");
        this.loginButton = page.locator('button[onclick="logIn()"]');
    }
    //action methods
    async navigateToLogin(): Promise<void> {
        await this.loginLink.click();
    }
    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.clear();
        await this.usernameInput.fill(username);
    }
    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }
    async submitLogin(): Promise<void> {
        await this.loginButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.navigateToLogin();
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.submitLogin();
    }
}
