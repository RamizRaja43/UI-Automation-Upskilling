import { Page, Locator, expect } from '@playwright/test';
import { TestLogger } from '../utils/testLogger';


export class loginPage {

    readonly loginverify: Locator


    constructor(page: Page) {
        // this.page = page;
        this.loginverify = page.locator('#header')
    }




    async loginVerification(): Promise<boolean> {
        try {
            await expect(this.loginverify).toContainText('Logged in as');
            TestLogger.success("Login successful.");
            return true;

        } catch {
            TestLogger.info("Login failed.");
            return false;
        }
    }

}

