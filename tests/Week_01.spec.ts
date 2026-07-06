import { test, expect, Page } from '@playwright/test'
import { TestLogger } from './testLogger';


function generateRandomEmail(): { email: string; password: string } {
    const password = Date.now().toString();
    const email = `user_${password}@example.com`;

    return { email, password };
}

async function captureActiveValidation(page: Page) {
    const invalidField = page.locator('form input:invalid, form select:invalid').first();
    const fieldName = await invalidField.getAttribute('name') || 'Unknown Field';
    const validationMessage = await invalidField.evaluate((el: HTMLInputElement) => el.validationMessage);

    return { fieldName, validationMessage };
}


test('Task 1', async ({ page }) => {
    TestLogger.info('Generating new user details...');
    const { email } = generateRandomEmail();
    TestLogger.output('Created Email', email);

    TestLogger.info('Opening the website homepage...');
    await page.goto('https://automationexercise.com');
    TestLogger.success('Homepage opened successfully.');

    TestLogger.info("Clicking the 'Signup / Login' button...");
    await page.getByRole('link', { name: ' Signup / Login' }).click();

    TestLogger.info('Checking the page title...');
    await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
    TestLogger.success('Page title is correct.');

    TestLogger.info('Entering the Name into the text box...');
    await page.getByRole('textbox', { name: 'Name' }).fill('John Abraham');
    TestLogger.success("Entered name: 'John Abraham'");

    TestLogger.info('Entering the email address into the text box...');
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);
    TestLogger.success('Entered the generated email address.');

    TestLogger.success('Test complete! Form fields filled successfully.');
});

test('Task 2', async ({ page }) => {
    TestLogger.info('Generating new user details...');
    const { email, password } = generateRandomEmail();
    TestLogger.output('Created Email', email);
    TestLogger.output('Created Password', password);


    TestLogger.info('Opening the website homepage...');
    await page.goto('https://automationexercise.com');
    TestLogger.success('Homepage opened successfully.');

    TestLogger.info("Clicking the 'Signup / Login' button...");
    await page.getByRole('link', { name: ' Signup / Login' }).click();

    TestLogger.info('Checking the page title...');
    await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
    TestLogger.success('Page title is correct.');

    TestLogger.info('Entering Name and Email address...');
    await page.getByRole('textbox', { name: 'Name' }).fill('John Abraham');
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);

    TestLogger.info("Clicking the 'Signup' button...");
    await page.getByRole('button', { name: 'Signup' }).click();
    await expect(page).toHaveTitle('Automation Exercise - Signup');
    TestLogger.success('Signup form opened.');

    TestLogger.info("Clicking 'Create Account' with empty fields to trigger error...");
    await page.getByRole('button', { name: 'Create Account' }).click();

    TestLogger.info('Reading the error message...');
    const result = await captureActiveValidation(page);
    TestLogger.output('Error found in field', result.fieldName);
    TestLogger.output('The error message says', result.validationMessage);

    TestLogger.info('Checking if error message text is correct...');
    expect(result.validationMessage).toBe('Please fill out this field.');
    TestLogger.success('Error message text matches.');

    TestLogger.info("Selecting the 'Mr.' title checkbox...");
    await page.getByRole('radio', { name: 'Mr.' }).click();

    TestLogger.info('Entering the password...');
    await page.getByRole('textbox', { name: 'Password *' }).fill(password);

    TestLogger.info('Selecting Date of Birth from dropdowns...');
    await page.locator('#days').selectOption({ label: '15' });
    await page.locator('#months').selectOption({ label: 'July' });
    await page.locator('#years').selectOption('1997');
    TestLogger.success('Date of Birth selected.');

    TestLogger.info('Entering Name and Company details...');
    await page.getByRole('textbox', { name: 'First name *' }).fill('John');
    await page.getByRole('textbox', { name: 'Last name *' }).fill('Abraham');
    await page.getByRole('textbox', { name: 'Company', exact: true }).fill('Velcro Industries');

    TestLogger.info('Entering Address details...');
    await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('PO 3259');
    await page.getByRole('textbox', { name: 'Address 2' }).fill('Waltmart');
    await page.getByRole('textbox', { name: 'State *' }).fill('LA');
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Alaska');
    await page.locator('#zipcode').fill('99611');

    TestLogger.info('Entering the mobile phone number...');
    await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('1234599611');
    TestLogger.success('Form filled completely.');

    TestLogger.info("Clicking the 'Create Account' button...");
    await page.getByRole('button', { name: 'Create Account' }).click();

    TestLogger.info('Checking for success message on screen...');
    await expect(page.getByText('Account Created!')).toBeVisible();
    await expect(page.locator('b')).toContainText('Account Created!');
    TestLogger.success('Account created successfully!');

    TestLogger.info("Clicking the 'Continue' button...");
    await page.getByRole('link', { name: 'Continue' }).click();

    TestLogger.info("Clicking the 'Logout' button...");
    await page.getByRole('link', { name: ' Logout' }).click();
    TestLogger.success('Logged out successfully.');

    TestLogger.info('Entering the saved login details...');
    await page.locator("//input[@data-qa='login-email']").fill(email);
    await page.locator("//input[@data-qa='login-password']").fill(password);

    TestLogger.info("Clicking the final 'Login' button...");
    await page.getByRole('button', { name: 'Login' }).click();

    TestLogger.success('Test complete! User created and logged in.');
});
