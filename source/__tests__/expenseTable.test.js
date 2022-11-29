
let page;
describe('Basic user flow for Website', () => {
    // First, visit the don't budge website
    beforeAll(async () => {
      jest.setTimeout(35000);
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:5501/source/',{
        waitUntil: 'domcontentloaded'});
    });
    it('1', async () => {
      expect(1).toBe(1);
    });
    // Next, check to make sure that there's no local storage about expense upon refreshing
    it('Initial Home Page - Check for local storage', async () => {

      

      const createBudgetButton = await page.$('.create_btn');
      console.log(createBudgetButton);
      await createBudgetButton.click();

      //method 1 of clicking save budget
      //const saveBudgetButton = await page.$('.save_budget_btn');
      //console.log(saveBudgetButton);
      //await saveBudgetButton.click();

      //method 2 of clicking save budget
      //await page.click(".save_budget_btn");

      //method 3 of clicking save budget
      //await page.$eval('.save_budget_btn', elem => elem.click());

      //method 4 of clicking save budget 
      const saveBudgetButton = await page.evaluateHandle(() => document.querySelector('.save_budget_btn'));
      console.log(saveBudgetButton);
      await saveBudgetButton.click();
    
      
      const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      expenseData_LS = `${localStorage.expenseData}`;
      console.log(expenseData_LS);
      //expect(expenseData_LS).toBe(null);
    });
});


