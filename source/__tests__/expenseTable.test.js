describe('Basic user flow for Website', () => {
    // First, visit the don't budge website
    beforeAll(async () => {
<<<<<<< Updated upstream
      await page.goto('http://127.0.0.1:5501/source/');
=======
      jest.setTimeout(35000);
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:5501/source/',{
        waitUntil: 'domcontentloaded'});
>>>>>>> Stashed changes
    });
  
    // Next, check to make sure that there's no local storage about expense upon refreshing
    it('Initial Home Page - Check for local storage', async () => {
<<<<<<< Updated upstream
        expect(localStorage.getItem('expenseData')).toEqual(null);
=======

      

      const createBudgetButton = await page.$('.create_btn');
      console.log(createBudgetButton);
      await createBudgetButton.click();

      //const saveBudgetButton = await page.$('.save_budget_btn');
      //console.log(saveBudgetButton);
      //await saveBudgetButton.click();
      //await page.click(".save_budget_btn");
      //await page.$eval('.save_budget_btn', elem => elem.click());
      const saveBudgetButton = await page.evaluateHandle(() => document.querySelector('.save_budget_btn'));
      console.log(saveBudgetButton);
      await saveBudgetButton.click();
    
      
      const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      expenseData_LS = `${localStorage.expenseData}`;
      console.log(expenseData_LS);
      //expect(expenseData_LS).toBe(null);
>>>>>>> Stashed changes
    });
});


