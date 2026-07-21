import { Locator, test, expect, Page } from "@playwright/test";
import { basePage } from "./basePage";
import { TestLoggers } from "../utils/TestLoggers";
import { deflateRaw } from "node:zlib";

export class InventoryPage extends basePage {
  public selectedItems: string[] = [];

  readonly addCartButton: Locator;
  readonly cartButton: Locator;
  readonly cartItemNames: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.addCartButton = page.locator(".btn_inventory");
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.cartItemNames = page.locator(".inventory_item_name");
    this.cartBadge = page.locator(".shopping_cart_badge");
  }

  async itemsAddToCart(): Promise<string[]> {
    const totalItems = await this.addCartButton.count();
    let selectedCount = 0;
    const selectedProductNames: string[] = [];

    for (let i = 0; i < totalItems; i += 2) {
      const specificButton = this.addCartButton.nth(i);

      const productTitle = await this.cartItemNames.nth(i).textContent();
      if (productTitle) {
        selectedProductNames.push(productTitle.trim());
      }

      await super.clickTheValue(specificButton);
      selectedCount++;

      await expect(specificButton).toHaveText("Remove");
    }
    console.log(`Number of items selected: ${selectedCount}`);
    console.log("Items added during execution:", selectedProductNames);
    this.selectedItems = selectedProductNames;
    return selectedProductNames;
  }

  async getTheSelectedItems(): Promise<string[]> {
    const totalItems = await this.cartItemNames.count();
    const selectedProductNames: string[] = [];

    for (let i = 0; i < totalItems; i++) {
      const specificButton = this.addCartButton.nth(i);
      const buttonText = await specificButton.textContent();

      if (buttonText && buttonText.trim() === "Remove") {
        const productTitle = await this.cartItemNames.nth(i).textContent();
        if (productTitle) {
          selectedProductNames.push(productTitle.trim());
        }
      }
    }

    console.log("UI state validation check:", selectedProductNames);
    return selectedProductNames;
  }

  async verifySelectionsMatchCurrentUI(): Promise<void> {
    const detectedItems = await this.getTheSelectedItems();
    expect(this.selectedItems).toEqual(detectedItems);
  }

  async verifyCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(expectedCount.toString());
    TestLoggers.success(`The Cart Items count has been Verified`);
  }

  async navigateToCart(): Promise<void> {
    await super.clickTheValue(this.cartButton);
  }
}
