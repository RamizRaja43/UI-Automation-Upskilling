import { Page } from '@playwright/test';

export function generateRandomEmail(): { email: string; password: string } {
    const password = Date.now().toString();
    const email = `user_${password}@example.com`;
    return { email, password };
}


export async function captureActiveValidation(page: Page) {
    const invalidField = page.locator('form input:invalid, form select:invalid').first();
    const fieldName = await invalidField.getAttribute('name') || 'Unknown Field';
    const validationMessage = await invalidField.evaluate((el: HTMLInputElement) => el.validationMessage);

    return { fieldName, validationMessage };
}