import { Page, Locator, expect } from "@playwright/test";
import { basePage } from "./basePage";
import { constants } from "../utils/TestData";
import { TestLoggers } from "../utils/TestLoggers";

export class CheckoutPage extends basePage {
  readonly firstName: Locator;
  readonly secondName: Locator;
  readonly postalCode: Locator;
  readonly continueBtn: Locator;
  readonly finishBtn: Locator;
  readonly orderConfirmation: Locator;
  readonly backHome: Locator;

  constructor(public page: Page) {
    super(page);
    this.firstName = page.locator("#first-name");
    this.secondName = page.locator("#last-name");
    this.postalCode = page.locator("#postal-code");
    this.continueBtn = page.locator('[data-test="continue"]');
    this.finishBtn = page.locator('[data-test="finish"]');
    this.orderConfirmation = page.locator(".complete-header");
    this.backHome = page.locator('[data-test="back-to-products"]');
  }

  async enterCheckoutInformantion(): Promise<void> {
    await super.fillTheValue(this.firstName, constants.firstName);
    await super.fillTheValue(this.secondName, constants.secondName);
    await super.fillTheValue(this.postalCode, constants.postalCode);
    await super.clickTheValue(this.continueBtn);
  }

  async clickFinish(): Promise<void> {
    await super.clickTheValue(this.finishBtn);
  }

  async getOrderConfirmationMessage(): Promise<string> {
    const text = await this.orderConfirmation.textContent();
    TestLoggers.success(
      "The Order Confirmation Page has been verified successfully.",
    );
    return text ? text.trim() : "";
  }

  async backToProductPage(): Promise<void> {
    await super.clickTheValue(this.backHome);
  }
}
