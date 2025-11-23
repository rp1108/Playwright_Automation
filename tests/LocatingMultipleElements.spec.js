import { test, expect } from '@playwright/test';
test('multielement', async ({page})=> { 

    await page.goto("https://www.demoblaze.com/index.html")

    const links = await page.$$('a');   // locates all elements with tag name 'a' on the page 

    console.log("Total link found on the page: ", links.length) // prints the total number of links found on the page

    for (const link of links) // loop through all the links

    {
        const linktext = await link.textContent();  // to get the text of the link
        console.log(linktext); // print the text of the link
    }

    await page.close();

})




