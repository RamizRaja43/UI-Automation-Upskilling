import { Page, Locator, expect } from "@playwright/test";
import { basePage } from "./basePage";
import { InventoryPage } from "./InventoryPage ";
import { TestLoggers } from "../utils/TestLoggers";

export class CartPage extends basePage {
  readonly addCartButton: Locator;
  readonly cartButton: Locator;
  readonly cartItemNames: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.addCartButton = page.locator(".btn_inventory");
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.cartItemNames = page.locator(".inventory_item_name");
    this.checkoutBtn = page.locator("#checkout");
  }

  async getCartItemNames(): Promise<string[]> {
    const rawNames = await this.cartItemNames.allTextContents();
    console.log(`The cart items are`, rawNames);
    return rawNames.map((name) => name.trim());
  }

  async verifyItemsMatchInventory(inventoryPage: InventoryPage): Promise<void> {
    const actualCartItems = await this.getCartItemNames();
    expect(actualCartItems).toEqual(inventoryPage.selectedItems);
    TestLoggers.info("The Cart Items has been verified");
  }

  async CheckouCartItems() {
    await super.clickTheValue(this.checkoutBtn);
  }
}
