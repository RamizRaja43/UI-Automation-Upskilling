import { Page, Locator, expect } from '@playwright/test'
import { TestLogger } from '../utils/testLogger'
import { generateRandomEmail } from '../utils/helpers'
import { constants } from '../utils/testData'
import { captureActiveValidation } from '../utils/helpers'
import { TIMEOUT } from 'node:dns'

export class UserDetails {

    readonly page: Page;
    readonly title: Locator;
    readonly password: Locator
    readonly days: Locator
    readonly months: Locator
    readonly years: Locator
    readonly firstName: Locator
    readonly lastName: Locator
    readonly companyName: Locator
    readonly address: Locator
    readonly address2: Locator
    readonly state: Locator
    readonly city: Locator
    readonly zipcode: Locator
    readonly mobile: Locator
    readonly createAccount: Locator
    readonly continue: Locator
    readonly logout: Locator
    readonly loginEmail: Locator
    readonly loginPassword: Locator
    readonly loginButton: Locator
    readonly successMessage: Locator

    readonly credentials: { email: string; password: string };

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByRole('radio', { name: 'Mr.' })
        this.password = page.getByRole('textbox', { name: 'Password *' });
        this.days = page.locator('#days');
        this.months = page.locator('#months')
        this.years = page.locator('#years')
        this.firstName = page.getByRole('textbox', { name: 'First name *' });
        this.lastName = page.getByRole('textbox', { name: 'Last name *' });
        this.companyName = page.getByRole('textbox', { name: 'Company', exact: true })
        this.address = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
        this.address2 = page.getByRole('textbox', { name: 'Address 2' });
        this.state = page.getByRole('textbox', { name: 'State *' });
        this.city = page.getByRole('textbox', { name: 'City * Zipcode *' });
        this.zipcode = page.locator('#zipcode');
        this.mobile = page.getByRole('textbox', { name: 'Mobile Number *' });
        this.createAccount = page.getByRole('button', { name: 'Create Account' });
        this.continue = page.getByRole('link', { name: 'Continue' });
        this.logout = page.getByRole('link', { name: ' Logout' });
        this.loginEmail = page.locator("//input[@data-qa='login-email']");
        this.loginPassword = page.locator("//input[@data-qa='login-password']");
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.successMessage = page.locator("//h2[@data-qa='account-created']//b");

        this.credentials = generateRandomEmail();
    }

    async UserDetails() {

        TestLogger.info("Clicking 'Create Account' with empty fields to trigger error...");
        await this.createAccount.click();
        TestLogger.info('Reading the error message...');
        const result = await captureActiveValidation(this.page);
        TestLogger.output('Error found in field', result.fieldName);
        TestLogger.output('The error message says', result.validationMessage);
        TestLogger.info('Checking if error message text is correct...');
        expect(result.validationMessage).toBe('Please fill out this field.');
        TestLogger.success('Error message text matches.');


        TestLogger.info("Selecting the 'Mr.' title checkbox...");
        await this.title.click();

        TestLogger.info('Entering the password...');
        await this.password.fill(this.credentials.password);
        TestLogger.success(`Entered name: ${this.credentials.password}`);

        TestLogger.info('Selecting Date of Birth from dropdowns...');

        await this.days.selectOption({ index: 5 });
        await this.months.selectOption({ index: 2 });
        await this.years.selectOption({ index: 10 });
        TestLogger.success('Date of Birth selected.');

        TestLogger.info('Entering Name and Company details...');
        await this.firstName.fill(constants.firstName);
        await this.lastName.fill(constants.lastName);
        await this.companyName.fill(constants.companyName);

        TestLogger.info('Entering Address details...');
        await this.address.fill(constants.address);
        await this.address2.fill(constants.address2);
        await this.state.fill(constants.state);
        await this.city.fill(constants.city);
        await this.zipcode.fill(constants.zipcode);

        TestLogger.info('Entering the mobile phone number...');
        await this.mobile.fill(constants.mobileNumber);
        TestLogger.success('Form filled completely.');

        TestLogger.info("Clicking the 'Create Account' button...");
        await this.createAccount.click();
    }


    async continueUser() {
        TestLogger.info("Clicking the 'Continue' button...");
        await expect(this.successMessage).toContainText('Account Created!');
        await this.continue.click();
        // await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
        TestLogger.info('Checking for success message on screen...');
        // await expect(this.successMessage).toBeVisible();



        TestLogger.success('Account created successfully!');
    }

    async logoutUser() {
        TestLogger.info("Clicking the 'Logout' button...");
        await this.logout.click();
        TestLogger.success('Logged out successfully.');
    }

    async loginCreds() {
        TestLogger.info('Entering the saved login details...');
        await this.loginEmail.fill(this.credentials.email);
        TestLogger.success(`Entered name: ${this.credentials.email}`);
        await this.loginPassword.fill(this.credentials.password);
    TestLogger.success(`Entered name: ${this.credentials.password}`);
    }

    async login() {
        TestLogger.info("Clicking the final 'Login' button...");
        await this.loginButton.click();
    }


    //     async getFormValidationError() {
    //        TestLogger.info("Clicking 'Create Account' with empty fields to trigger error...");
    //     await this.createAccount.click();
    //     TestLogger.info('Reading the error message...');
    //     const result = await captureActiveValidation(this.page);
    //     TestLogger.output('Error found in field', result.fieldName);
    //     TestLogger.output('The error message says', result.validationMessage);
    //     TestLogger.info('Checking if error message text is correct...');
    //     expect(result.validationMessage).toBe('Please fill out this field.');
    //     TestLogger.success('Error message text matches.');
    // }


}