import {test,expect,Locator} from '@playwright/test'

test('Validating static dropdown', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    const dropdown:Locator = page.locator("#country")
    await dropdown.selectOption('India');

    const dropdownValues:Locator = page.locator("#country>option")
    const cnt:number=await dropdownValues.count()
    console.log("count of options: ",cnt)

    // for(let i=0; i<cnt; i++){
    //     console.log(i,"th data: ",await dropdownValues.nth(i).textContent())
    // }

    const dropdownText:string[] = (await dropdownValues.allTextContents()).map(text => text.trim());
    console.log("Dropdown Texts: ", dropdownText);

    expect(dropdownText).toContain('India');

    await page.waitForTimeout(3000)
})

test.only('Validating static dropdown with selectOption', async({page})=>{
    await page.goto('https://www.bstackdemo.com/');
    const orderDropdown:Locator = page.locator('div.sort>select')

    //1st tc: validating dropdown is visible and enabled
    await expect(orderDropdown).toBeVisible()
    await expect(orderDropdown).toBeEnabled()
    await orderDropdown.selectOption({value:'lowestprice'})

    //Retrieve the list of product price,name elements 

    const phoneNames:string[] = (await page.locator('.shelf-container div.shelf-item p.shelf-item__title').allTextContents())
    .map(text => text.trim());
    console.log("Phone Names: ", phoneNames);

    

    const phonePrice:string[] = (await page.locator('.shelf-container div.shelf-item div.val').allTextContents())
    .map(text => text.trim());
    console.log("Phone values: ", phonePrice);

    phoneNames.forEach((name,index)=>{
        console.log(`${name} : ${phonePrice[index]}`);  
    })
    await page.waitForTimeout(3000)
})