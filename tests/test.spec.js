import { test, expect } from '@playwright/test';

test('dropdown', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.locator("//select[@id='country']").selectOption({ label: "India" });  // lable /visible text 
    const selectedValue = await page.locator("//select[@id='country']").inputValue();
    expect(selectedValue).toBe("india");   //  match the actual value not the lable <option value="india">India</option>
    console.log("Selected dropdown value is:", selectedValue);
})