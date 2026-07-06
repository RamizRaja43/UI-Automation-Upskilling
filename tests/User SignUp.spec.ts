import { test, expect } from '@playwright/test'
import { homepage } from '../Pages/homePage'
import { TestLogger } from '../utils/testLogger';

test('User SignUp', async ({ page }) => {

    const homePage = new homepage(page);

    await test.step('Navigating to Landing page', async () => {
        await homePage.gotoURL();

    });

    await test.step('Click Signup Page Link', async () => {
        await homePage.clickLoginPage();
    });

    await test.step('Validate Sign-up Page is Visible', async () => {
        await expect(page).toHaveTitle("Automation Exercise - Signup / Login");
        TestLogger.success('Page title is correct.');
    });

    await test.step('Enter Sign-Up Values', async () => {

        await homePage.signUpCredentials();
        TestLogger.success('Test complete! Form fields filled successfully.');
    })
})