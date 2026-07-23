import { Page, Locator, expect } from "@playwright/test";
import { TestLoggers } from "../utils/TestLoggers";
import { constants } from "../utils/TestData";
import { basePage } from "./basePage";

export class ProductPage extends basePage {
  readonly sortingbutton: Locator;
  readonly actualsorting: Locator;
  readonly pricelist: Locator;
  readonly itemlist: Locator;
  readonly pagetitle: Locator;
  readonly openMenuBtn: Locator;
  readonly logoutBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.sortingbutton = page.locator('[data-test="product-sort-container"]');
    this.actualsorting = page.locator("//span[@data-test='active-option']");
    this.pricelist = page.locator(".inventory_item_price");
    this.itemlist = page.locator(".inventory_item_name ");
    this.pagetitle = page.locator('[data-test="title"]');
    this.openMenuBtn = page.getByRole("button", { name: "Open Menu" });
    this.logoutBtn = page.locator('[data-test="logout-sidebar-link"]');
  }

  async validateProductPage(): Promise<void> {
    const currentURL = await this.page.url();

    expect(currentURL).toBe(constants.ProductURL);
    await expect(this.pagetitle).toContainText("Products");
    TestLoggers.info("Navigated to the Product Page");
  }

  async actualSorting(): Promise<void> {
    const actualsorting = await this.actualsorting.textContent();
    TestLoggers.info(`Actual Sorting Order is: ${actualsorting}`);
  }

  async sortingNameZtoA(): Promise<void> {
    await super.selectDropdownValue(this.sortingbutton, "za");
    TestLoggers.info("Sort the data in descending order, from Z to A");
  }

  async sortingNameAtoZ(): Promise<void> {
    await super.selectDropdownValue(this.sortingbutton, "az");
    TestLoggers.info("Sort the data in Asccending order, from A to Z");
  }

  async sortingPriceLowtoHigh(): Promise<void> {
    await super.selectDropdownValue(this.sortingbutton, "lohi");
    TestLoggers.info("Sort the data in Asccending order, from Low to High");
  }

  async sortingPriceHightoLow(): Promise<void> {
    await super.selectDropdownValue(this.sortingbutton, "hilo");
    TestLoggers.info("Sort the data in descending order, from High to Low");
  }

  async getAllProductPrices(): Promise<number[]> {
    const PriceList: string[] = await this.pricelist.allTextContents();

    return PriceList.map((price: string) => {
      const cleanedPrice = price.replace(/[^0-9.]/g, "");
      return parseFloat(cleanedPrice);
    });
  }

  async getAllProductNames(): Promise<string[]> {
    const rawItemsList: string[] = await this.itemlist.allTextContents();

    return rawItemsList.map((name: string) => name.trim());
  }

  async validateSortingPriceHighToLow(): Promise<void> {
    const actualPrices: number[] = await this.getAllProductPrices();
    console.log("Actual Prices:", actualPrices);

    const expectedPrices: number[] = [...actualPrices].sort(
      (a: number, b: number) => b - a,
    );
    console.log("Expected Prices:", expectedPrices);

    expect(actualPrices).toEqual(expectedPrices);
    TestLoggers.info("Products are sorted from High to Low");
  }

  async validateSortingPriceLowToHigh(): Promise<void> {
    const actualPrices: number[] = await this.getAllProductPrices();
    console.log("Actual Prices:", actualPrices);

    const expectedPrices: number[] = [...actualPrices].sort(
      (a: number, b: number) => a - b,
    );
    console.log("Expected Prices:", expectedPrices);

    expect(actualPrices).toEqual(expectedPrices);
    TestLoggers.info("Products are sorted from Low to High");
  }

  async validateSortingNameZToA(): Promise<void> {
    const actualItems: string[] = await this.getAllProductNames();
    console.log("Actual Items:", actualItems);

    const expectedItems: string[] = [...actualItems].sort(
      (a: string, b: string) => b.localeCompare(a),
    );
    console.log("Expected Items:", expectedItems);

    expect(actualItems).toEqual(expectedItems);
    TestLoggers.info("Products are sorted from Z to A");
  }

  async validateSortingNameAToZ(): Promise<void> {
    const actualItems: string[] = await this.getAllProductNames();
    console.log("Actual Items:", actualItems);

    const expectedItems: string[] = [...actualItems].sort(
      (a: string, b: string) => a.localeCompare(b),
    );
    console.log("Expected Items:", expectedItems);

    expect(actualItems).toEqual(expectedItems);
    TestLoggers.info("Products are sorted from A to Z");
  }

  async logout(): Promise<void> {
    await super.clickTheValue(this.openMenuBtn);
    await super.clickTheValue(this.logoutBtn);
    TestLoggers.info("Logout successfully");
  }
}
