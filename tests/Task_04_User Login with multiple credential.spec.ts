import { test, expect } from '@playwright/test'
import { TestLogger } from '../utils/testLogger';
import { homepage } from '../Pages/homePage';
import { loginTestData } from '../utils/testData';
import { formregistration } from '../Pages/formregistration';
import { loginPage } from '../Pages/Login Page';

test(' Login with multiple Credentials', async ({ page }) => {

    const HomePage = new homepage(page);
    const LoginPage = new loginPage(page);

    await test.step('Navigate to Landing page', async () => {
        await HomePage.gotoURL();
    });

    await test.step('Navigate to Login page', async () => {
        await HomePage.clickLoginPage();
    });
    for (const data of loginTestData) {

        const isLoggedIn = await test.step(
            `Login Scenario: ${data.desc}`,
            async () => {

                TestLogger.info(`Starting: ${data.desc}`);

                await HomePage.loginEmail.fill(data.email);
                await HomePage.loginPassword.fill(data.pass);
                await HomePage.login();

                if (data.validationType === 'client') {
                    await HomePage.validateSignupPage();

                    await HomePage.loginEmail.clear();
                    await HomePage.loginPassword.clear();

                    return false;
                }

                const loggedIn = await LoginPage.loginVerification();

                if (!loggedIn) {
                    await HomePage.loginEmail.clear();
                    await HomePage.loginPassword.clear();
                }

                return loggedIn;
            }
        );

        if (isLoggedIn) {
            break;
        }
    }
})

