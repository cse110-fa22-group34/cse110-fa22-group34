
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

    // 1st Test
    // Check to make sure that as the page first loads its local storage for expenseTable & expenseData & totalCost are undefined
    // and that only "create budget" button's display is block and the remaining elements have their display as none
    it('Check for Initial Home Page', async () => {     
      const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      let Passed = true;
      expenseData_LS = `${localStorage.expenseData}`;
      expenseTable_LS = `${localStorage.expenseTable}`;
      totalCost_LS = `${localStorage.totalCost}`;
      if (expenseData_LS != "undefined") { Passed = false; }
      if (expenseTable_LS != "undefined") { Passed = false; }
      if (totalCost_LS != "undefined") { Passed = false; }

      const createBudgetButton = await page.$('.create_btn');
      display = await createBudgetButton.getProperty('display');
      console.log(display);
      expect(Passed).toBe(true);

    });

    // 2nd Test
    // Check to make sure that after clicking the create budget button, the button's display becomes none,
    // and the display of remaining elements become inline or block
    it('Check for Create Budget Button', async () => {     
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
      //await saveBudgetButton.click();
    });

    // 3rd Test
    // Check to make sure that save budget button saves the expenseTable & expenseData & totalCost into local storage.
    it('Check for Save Budget Button', async () => {     
    });

    // 3rd Test
    // Check to make sure that after add rows button the HTML elements are updated and the "no" is updated correctly
    it('Check for Add Rows Button', async () => {     
    });

    // 4th Test
    // Check to make sure that after delete selected button the HTML elements are removed and the "no" is updated correctly
    it('Check for Delete Selected Button', async () => {     
    });

    // 5th Test
    // Click save budget button, then check for the total cost 
    it('Check for total cost', async () => {     
    });

    // 6th Test
    // Check to make sure that it remembers us removing everything from the cart
    it('Check for Refreshing', async () => {     
    });

    // 7th Test
    // Check to make sure that as the Delete Budget Button is clicked its local storage for expenseTable & expenseData & totalCost are undefined
    // and that only "create budget" button's display is block and the remaining elements have their display as none
    it('Check for Delete Budget Button', async () => {     
    });
});


