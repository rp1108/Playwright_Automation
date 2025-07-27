// to capture the product name from the home page

import { test, expect } from '@playwright/test';

test('locating product', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');  // Navigate to the webpage


    // Use proper await and CSS selector
    await page.waitForSelector('#tbodyid .card-title a'); // wait for the element to be present
    const ptitle = await page.title();
    console.log("page title is: ", ptitle);

    const products = await page.$$('#tbodyid .card-title a'); // get all elements with the specified CSS selector
    console.log("Total products found:", products.length); // String.length: number Returns the length of a String object.

    for (const product of products) 
        {                       // loop through each product
        const productName = await product.textContent();       // get the text content of the product
        console.log(productName);                          // print the product name
       //console.log( await product.textContent())        // get the text content of the product another way of console
    }

    await page.close();    // close the browser
});

// await page.click('text=Samsung galaxy s6');  // Click on the product name