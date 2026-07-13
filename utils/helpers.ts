import { Locator,Page } from '@playwright/test';

export function generateRandomEmail(): { email: string; } {
    const timestamp = Date.now().toString();
    const email = `user_${timestamp}@example.com`;
    return { email };
}

export async function captureActiveValidation(page: Page) {
    const invalidField = page.locator('form input:invalid, form select:invalid').first();
    const fieldName = await invalidField.getAttribute('name') || 'Unknown Field';
    const validationMessage = await invalidField.evaluate((el: HTMLInputElement) => el.validationMessage);

    
    return { fieldName, validationMessage };
}

export async function captureemailValidation(page: any) {
    const emailInputLocator = page.locator("form[action='/signup'] input[placeholder='Email Address']");
    
    // Extract native HTML5 validation properties from the browser engine
    const validationMessage = await emailInputLocator.evaluate((el: HTMLInputElement) => el.validationMessage);
    const fieldName = await emailInputLocator.evaluate((el: HTMLInputElement) => el.name || 'Email Address');
    
    return { fieldName, validationMessage };
}

export async function captureValidation(locator: Locator) {
    const fieldName = await locator.evaluate((el: HTMLInputElement) => el.name || el.id || el.placeholder || 'Unknown Field');

    const validationMessage = await locator.evaluate((el: HTMLInputElement) => el.validationMessage);

    return {fieldName,validationMessage};
}
