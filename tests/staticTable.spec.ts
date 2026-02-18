import {test,expect,Locator} from '@playwright/test'

test('Validating static table data',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')

    const tableRows:Locator=page.locator('table[name="BookTable"] tbody tr')
    const rows:number=await tableRows.count()

    // for(let i=0;i<rows;i++){
    //     const cols:Locator=tableRows.nth(i).locator('td')
    //     for(let j=0;j<await cols.count();j++){
    //         const cellText=await cols.nth(j).innerText()
    //         console.log(cellText)
    //     }
    //     console.log('-------------------')  
    // }

    const cellData:Locator=page.locator('table[name="BookTable"] tbody tr:nth-child(5) td:first-child')
    console.log('Data from specific cell:',await cellData.innerText())

    let lowestPrice:number=Number.MAX_VALUE
    let bookWithLowestPrice:string=''
    for(let i=1;i<rows;i++){
        const row:Locator=tableRows.nth(i)
        const priceText:string=await row.locator('td:nth-child(4)').innerText()
        const price:number=parseFloat(priceText)
        if(price<lowestPrice){
            lowestPrice=price
            bookWithLowestPrice=await row.locator('td:first-child').innerText()
        }   
    }
    console.log(`Book with the lowest price is "${bookWithLowestPrice}" with a price of ${lowestPrice}`)     
})