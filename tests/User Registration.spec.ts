import {test, expect} from '@playwright/test';
import { TestLogger } from '../utils/testLogger';
import { homepage } from '../Pages/homePage';
import { UserDetails } from '../Pages/UserDetails';

test('User Registration', async ({ page }) => {

    const homePage = new homepage(page);
    const userDetails = new UserDetails(page);

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

    await test.step('User Sign-Up', async () => {

        await homePage.signUpCredentials();
        await homePage.createSignUp();
    })

await test.step('Entering the User Details', async () => {

        await userDetails.UserDetails();
        await userDetails.continueUser();

    })

await test.step('Logout as Existing user', async () => {

        await userDetails.logoutUser();        
    })

    await test.step('Login as Created user', async () => {

        await userDetails.loginCreds();  
        await userDetails.login();  
        TestLogger.success('Test complete! User created and logged in.');    
    })

    
})