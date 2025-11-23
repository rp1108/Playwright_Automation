import { test, expect } from '@playwright/test';
test('alldropdown', async ({page})=> { 
   
   const options = page.locator("#country option"); // Locator for all <option> elements
    const count = await options.count(); // Total number of options
    console.log("Total options in dropdown:", count);
    
    // Loop through and print all option texts
    for (let i = 0; i < count; i++) 
    {
      const text = await options.nth(i).textContent();  // Get the text of the nth option nth method is 0 based index
      console.log(`Option ${i + 1}: ${text.trim()}`);  // trim() to remove leading/trailing whitespace $ is used to print the value of the variable from 1st option
    }
})

