import { test, expect } from '@playwright/test';
test('checkbox', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/')


    // how  to handel single checkbox 

    await page.locator("//input[@id='sunday' and @type='checkbox']").check();
    //await page.check("//input[@id='sunday' and @type='checkbox']")

    expect(await page.locator("//input[@id='sunday' and @type='checkbox']")).toBeChecked();
    expect(await page.locator("//input[@id='sunday' and @type='checkbox']").isChecked()).toBeTruthy(); // it will retrun true / flase
    await page.waitForTimeout(2000);
    const checb = await page.locator("//input[@id='sunday' and @type='checkbox']");
    console.log("check-box is checked : ", await checb.isChecked());


    // unchecked check box 

    expect(await page.locator("//input[@id='monday' and @type='checkbox']").isChecked()).toBeFalsy(); // it will retrun true / flase
    const checb1 = await page.locator("//input[@id='monday' and @type='checkbox']")
    console.log("check-box is checked : ", await checb1.isChecked()); 

    //handel multiple check boxes here we are creating a small arraya nd storing locators of the check boxes

    const checkboxesLocator = [
        "//input[@id='monday' and @type='checkbox']",
        "//input[@id='saturday' and @type='checkbox']",
        "//input[@id='tuesday' and @type='checkbox']",
    ];

    for (const locator of checkboxesLocator)           // loop through the array
    {
        await page.locator(locator).check(); // check the checkbox
        await page.waitForTimeout(2000);
        expect(await page.locator(locator)).toBeChecked() // it will check if the checkbox is checked or not
        expect(await page.locator(locator)).toBeTruthy() // it will retrun true  
        console.log("checkbox checked:", await page.locator(locator).isChecked()) // it will retrun true / flase

    }
    // aredy selected checkbox are going to be unchecked
    await page.waitForTimeout(2000);

    for (const locator of checkboxesLocator)           // loop through the array
    {
        if (await page.locator(locator).isChecked())  // if checkbox is checked
        {
            await page.locator(locator).uncheck(); // uncheck the checkbox 

            console.log("checkbox checked:", await page.locator(locator).isChecked()) // it will print false checkbox is unchecked 
        }
    }

    page.close();

})


