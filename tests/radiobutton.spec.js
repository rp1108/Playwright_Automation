import { test, expect } from '@playwright/test';
test('radiobutton', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    // normally in radio button we do action check and uncheck 

    await page.locator('#male').check();
    await page.waitForTimeout(1000);
    await expect(await page.locator('#male')).toBeChecked();
    await expect(await page.locator('#male').isChecked()).toBeTruthy() //male is checked 
    const radio = await page.locator('#male');
    console.log("male radio button is checked : ", await radio.isChecked())
    await page.waitForTimeout(1000);

    // to check the radio button should not be checked and consoled value
    await expect(await page.locator('#female')).not.toBeChecked();
    const radio2 = await page.locator('#female');
    console.log("female radio button is cheked :", await radio2.isChecked())

    // another way  to check the radio button should not be checked and consoled value
    await expect(await page.locator('#female').isChecked()).toBeFalsy(); // female is not checked
    const radio3 = await page.locator('#female');
    console.log("female radio button is checked : ", await radio3.isChecked())

    // Switch to "female"  an then this unchecks "male"

    await page.locator('#female').check();
    await page.waitForTimeout(1000);
    await expect(await page.locator('#female')).toBeChecked();
    await expect(await page.locator('#female').isChecked()).toBeTruthy(); // female is checked
    const radio5 = await page.locator('#female');
    console.log("female radio button is checked : ", await radio5.isChecked())

    await expect(page.locator('#male')).not.toBeChecked();
    await expect(await page.locator('#male').isChecked()).toBeFalsy();
    const radio4 = await page.locator('#male');
    console.log("male radio button is checked : ", await radio.isChecked())

    page.close();

});