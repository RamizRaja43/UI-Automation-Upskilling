import { Page, Locator } from '@playwright/test';
import { constants } from '../utils/testData'
import {generateRandomEmail} from '../utils/helpers'
import { TestLogger } from '../utils/testLogger';

export class homepage {

    readonly page: Page;
    readonly signUpLink: Locator;
    readonly userNameInput: Locator;
    readonly userEmailInput: Locator;
    readonly signUpButton: Locator;
    readonly credentials: { email: string; password: string }; 
    

    constructor(page: Page) {
        this.page = page;
        this.signUpLink = page.getByRole('link', { name: ' Signup / Login' });
        this.userNameInput = page.getByRole('textbox', { name: 'Name' });
        this.userEmailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signUpButton = page.getByRole('button', { name: 'Signup' });
        this.credentials = generateRandomEmail();
    }

    async gotoURL() {
        TestLogger.info('Navigate to the website homepage...');
        await this.page.goto(constants.homePageURL);
        TestLogger.success('Homepage opened successfully.');
    }

    async clickLoginPage() {
        TestLogger.info("Clicking the 'Signup / Login' button...");
        await this.signUpLink.click();
        
    }

    async signUpCredentials () {
        
        TestLogger.info('Entering the Name into the Name box...');
        await this.userNameInput.fill(constants.signUpName);
        TestLogger.success(`Entered name: ${constants.signUpName}`);
        
        TestLogger.info('Entering the Email into the Email box...');
        await this.userEmailInput.fill(this.credentials.email);
        TestLogger.success(`Entered the generated email address: ${this.credentials.email}`);
    }

    async createSignUp() {

        TestLogger.info("Clicking the 'Signup' button...");
        await this.signUpButton.click();
        TestLogger.success('Signup form opened.');
    }
}