import { test, expect } from '@playwright/test'
import { homepage } from '../Pages/homePage'
import { formregistration } from '../Pages/formregistration';
import { TestLogger } from '../utils/testLogger';


test('Case 1a: Attempt registration with empty email fields', async ({ page }) => {

    const HomePage = new homepage(page);

    await test.step('Navigating to Landing page', async () => {
        await HomePage.gotoURL();
    });

    await test.step('Click and Validate Signup Page Link', async () => {
        await HomePage.clickLoginPage();
    });

    await test.step('Checking Registration without Email', async () => {

        await HomePage.signUpName();
        await HomePage.createSignUp();
        await HomePage.validateSignupPage();
        await page.locator("//form[@action='/signup']").screenshot({ path: './Screenshots/FailedScreenshot.png' })
    })
})

test('Case 1b: Attempt registration with empty password', async ({ page }) => {

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

    await test.step('Checking Registration without Password', async () => {

        await HomePage.signUpName();
        await HomePage.signUpEmail();
        await HomePage.createSignUp();
        await HomePage.validateSignupPage();
        await Formregistration.UserDetails();
        await Formregistration.createAccount();
        await Formregistration.validateAccountPage();
    })

})

test('Case 2: Attempt registration with badly formatted email fields', async ({ page }) => {

    let badEmails: string[] = ['user123-at-mail.com', 'user@.com', '@mail12.com']
    const HomePage = new homepage(page);
    await HomePage.gotoURL();
    await HomePage.clickLoginPage();
    await HomePage.signUpName();

    for (let i = 0; i <= badEmails.length; i++) {

        const currentEmail = badEmails[i];

        if (!currentEmail) {
            continue;
        }
        TestLogger.info(`Testing invalid email format iteration ${i + 1}: [${currentEmail}]`);

        await HomePage.userEmailInput.fill(currentEmail);
        await HomePage.createSignUp();
        await HomePage.validateSignupPage();
        await HomePage.userEmailInput.clear();

    }
})







