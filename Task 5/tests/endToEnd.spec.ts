import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { ProductPage } from "../Pages/ProductPage";
import { InventoryPage } from "../Pages/InventoryPage ";
import { CartPage } from "../Pages/CartPage ";
import { constants } from "../utils/TestData";
import { CheckoutPage } from "../Pages/CheckoutPage";

test("Verify product sorting, dynamic cart selection, and end-to-end checkout completion", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await test.step("Navigate into Login Page", async () => {
    await loginPage.gotoURL();
  });

  await test.step("Enter the Login Credentials", async () => {
    await loginPage.login();
  });

  await test.step("Verify Product Page lands successfully", async () => {
    await productPage.validateProductPage();
  });

  await test.step("Select and Validate 'Price: High to Low' sorting", async () => {
    await productPage.sortingPriceHightoLow();
    await productPage.validateSortingPriceHighToLow();
  });

  await test.step("Select and Validate 'Name: Z to A' sorting", async () => {
    await productPage.sortingNameZtoA();
    await productPage.validateSortingNameZToA();
  });

  await test.step("Select and Validate 'Price: Low to High' sorting", async () => {
    await productPage.sortingPriceLowtoHigh();
    await productPage.validateSortingPriceLowToHigh();
  });

  await test.step("Select and Validate 'Name: A to Z' sorting", async () => {
    await productPage.sortingNameAtoZ();
    await productPage.validateSortingNameAToZ();
  });

  await test.step("Select the Items to Cart", async () => {
    await inventoryPage.itemsAddToCart();
  });

  await test.step("Validate Active Inventory UI Selections Match Actions", async () => {
    await inventoryPage.getTheSelectedItems();
  });

  await test.step("Verify Cart Badge and Navigate to Checkout Layout", async () => {
    await inventoryPage.verifyCartBadgeCount(
      constants.numberofitemstoaddincart,
    );
    await inventoryPage.navigateToCart();
  });

  await test.step("Verify Cart Page Contains All Selected Items", async () => {
    await cartPage.verifyItemsMatchInventory(inventoryPage);
  });

  await test.step("Navigate to Checkout Form Page", async () => {
    await cartPage.CheckouCartItems();
  });

  await test.step("Fill and submit checkout form information", async () => {
    await checkoutPage.enterCheckoutInformantion();
  });

  await test.step("Review purchase details and finalize order", async () => {
    await checkoutPage.clickFinish();
  });

  await test.step("Verify successful order placement and return to shop dashboard", async () => {
    const actualMessage = await checkoutPage.getOrderConfirmationMessage();
    expect(actualMessage).toBe(constants.confirmationMessage);

    await checkoutPage.backToProductPage();
    await productPage.validateProductPage();
  });

  await test.step("Log out of the application", async () => {
    await productPage.logout();
  });

  await test.step("Verify application returns to Login state", async () => {
    await expect(loginPage.loginBox).toBeVisible();

    await loginPage.loginBox.screenshot({
      path: "./screenshots/LoginContainer.png",
    });
  });
});
