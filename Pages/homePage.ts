import { Page, Locator } from '@playwright/test';
import { constants } from '../utils/testData'
import { captureValidation, generateRandomEmail } from '../utils/helpers'
import { TestLogger } from '../utils/testLogger';
import { captureemailValidation } from '../utils/helpers';
import {captureActiveValidation } from '../utils/helpers';

export class homepage {

    readonly page: Page;
    readonly signUpLink: Locator;
    readonly userNameInput: Locator;
    readonly userEmailInput: Locator;
    readonly signUpButton: Locator;
    readonly credentials: { email: string; };
    readonly loginEmail: Locator;
    readonly loginPassword: Locator;
    readonly loginButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.signUpLink = page.getByRole('link', { name: ' Signup / Login' });
        this.userNameInput = page.getByRole('textbox', { name: 'Name' });
        this.userEmailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signUpButton = page.getByRole('button', { name: 'Signup' });
        this.credentials = generateRandomEmail();
        this.loginEmail = page.locator("//input[@data-qa='login-email']");
        this.loginPassword = page.locator("//input[@data-qa='login-password']");
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async gotoURL() {
        TestLogger.info('Navigate to the website homepage...');
        await this.page.goto(constants.homePageURL);
        TestLogger.success('Homepage opened successfully.');
    }

    async clickLoginPage() {
        TestLogger.info("Clicking the 'Signup / Login' button...");
        await this.signUpLink.click();
        TestLogger.success('SignUp/Login Page Navigated successfully');
    }

    async signUpName() {

        TestLogger.info('Entering the Name into the Name box...');
        await this.userNameInput.fill(constants.signUpName);
        TestLogger.success(`Entered name: ${constants.signUpName}`);
    }

    async signUpEmail() {
        TestLogger.info('Entering the Email into the Email box...');
        await this.userEmailInput.fill(this.credentials.email);
        TestLogger.success(`Entered the generated email address: ${this.credentials.email}`);
    }

    async createSignUp() {

        TestLogger.info("Clicking the 'Signup' button...");
        await this.signUpButton.click();
    }
    async validateSignupPage(): Promise<boolean> {
        try {
                    await this.page.waitForURL('**/signup', { timeout: 5000 });
            const currentUrl = this.page.url();
            if (currentUrl === constants.signUpPage) {
                TestLogger.success(`Successfully redirected to signup page: ${currentUrl}`);
                TestLogger.info("Validating that the signup page/form is displayed...");
                return true;
            } else {
                TestLogger.error(`Redirection failed. Expected: ${constants.signUpPage}, but got: ${currentUrl}`);
                return false;
            }
        } catch (error) {
            // const emailaddress = this.page.locator("//input[@data-qa='signup-email']")
            const result = await captureActiveValidation(this.page);

            TestLogger.output('Error found in field:', result.fieldName);
            TestLogger.output('The error message says:', result.validationMessage);
            return false;
        }
    }

    async loginemailid() {

        TestLogger.info("Clicking the 'Signup' button...");
        await this.loginEmail.fill(constants.loginemailid);
        TestLogger.info(`Entered the login Email id: ${constants.loginemailid}`)
    }

    async loginpasswordid() {
        TestLogger.info(`Entered the login Email id: ${constants.loginemailid}`)
        await this.loginPassword.fill(constants.loginemailpassword);
        TestLogger.info(`Entered the Login Password: ${constants.loginemailpassword}`)
    }

    async login() {
        TestLogger.info("Clicking the final 'Login' button...");
        await this.loginButton.click();
    }
}