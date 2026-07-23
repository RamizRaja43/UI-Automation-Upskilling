import { Locator, Page } from "@playwright/test";

export class basePage {
  constructor(public page: Page) {}

  async goto(value: string): Promise<void> {
    await this.page.goto(value);
  }

  async fillTheValue(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  async clickTheValue(locator: Locator): Promise<void> {
    await locator.click();
  }

  async selectDropdownValue(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }
}
