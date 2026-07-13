import { test, expect } from '@playwright/test';
import { TestLogger } from '../utils/testLogger';
import { homepage } from '../Pages/homePage';
import { formregistration } from '../Pages/formregistration'

test('User Registration', async ({ page }) => {

    const HomePage = new homepage(page);
    const Formregistration = new formregistration(page);

    await test.step('Navigating to Landing page', async () => {
        await HomePage.gotoURL();
    });

    await test.step('Click and Validate Signup Page Link', async () => {
        await HomePage.clickLoginPage();
        await expect(page).toHaveTitle("Automation Exercise - Signup / Login");
        TestLogger.success('Page title is correct.');
    });

    await test.step('User Sign-Up', async () => {

        await HomePage.signUpName();
        await HomePage.signUpEmail();
        await HomePage.createSignUp();
        await HomePage.validateSignupPage();
    })

    await test.step('Entering the User Details', async () => {

        await Formregistration.givencreds();
        await Formregistration.UserDetails();
        await Formregistration.createAccount();
        await Formregistration.continueUser();

    })

    await test.step('Logout as Created user', async () => {

        await Formregistration.logoutUser();
    })

    await test.step('Login as Created user', async () => {

        await Formregistration.loginCreds();
        await HomePage.login();
        TestLogger.success('Test complete! User created and logged in.');
    })

})