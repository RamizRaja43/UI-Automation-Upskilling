import { Page, Locator, expect } from "@playwright/test";
import { constants } from "../utils/TestData";
import { TestLoggers } from "../utils/TestLoggers";
import { basePage } from "./basePage";

export class LoginPage extends basePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginbutton: Locator;
  readonly loginBox: Locator;

  constructor(page: Page) {
    super(page);

    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginbutton = page.locator('[data-test="login-button"]');
    this.loginBox = page.locator("#login_button_container");
  }

  async gotoURL(): Promise<void> {
    await super.goto(constants.BaseURL);
    TestLoggers.info("Navigate into the Landing Page");
  }

  async enterUsername(): Promise<void> {
    await super.fillTheValue(this.username, constants.Username);
    TestLoggers.info(`Entered the Username: ${constants.Username}`);
  }

  async enterPassword(): Promise<void> {
    await super.fillTheValue(this.password, constants.Password);
    TestLoggers.info(`Entered the Password: ${constants.Password}`);
  }

  async enterloginButton(): Promise<void> {
    await super.clickTheValue(this.loginbutton);
    TestLoggers.info("Clicked on Login button");
  }

  async login(): Promise<void> {
    await this.enterUsername();
    await this.enterPassword();
    await this.enterloginButton();
  }
}
