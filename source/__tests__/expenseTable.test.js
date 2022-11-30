let page;
describe('Basic user flow for Website', () => {
    // First, visit the don't budge website
    beforeAll(async () => {
      //jest.setTimeout(35000);
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:5501/source/',{
        waitUntil: 'domcontentloaded'});
    });

    /* 1st Test
    Check to make sure that as the page first loads,
    its local storage for expenseTable & expenseData & totalCost are undefined, 
    and that only 'create budget' button is displayed whereas the remaining buttons & table are not displayed.
    */
    it('Check for Initial Home Page', async () => {     

      let passed = true;
      const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));

      expenseData_LS = `${localStorage.expenseData}`;
      expenseTable_LS = `${localStorage.expenseTable}`;
      totalCost_LS = `${localStorage.totalCost}`;
      if (expenseData_LS != "undefined") { passed = false; }
      if (expenseTable_LS != "undefined") { passed = false; }
      if (totalCost_LS != "undefined") { passed = false; }

      const createBudget_Display = await page.$eval('.create_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const expenseTable_Display = await page.$eval('#expensetable', el => getComputedStyle(el).getPropertyValue('display'));
      const deleteSelected_Display = await page.$eval('.del_select_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const deleteBudget_Display = await page.$eval('.del_budget_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const saveBudget_Display = await page.$eval('.save_budget_btn', el => getComputedStyle(el).getPropertyValue('display'));
      if (createBudget_Display != "inline-block") { passed = false; }
      if (expenseTable_Display != "none") { passed = false; }
      if (deleteSelected_Display != "none") { passed = false; }
      if (deleteBudget_Display != "none") { passed = false; }
      if (saveBudget_Display != "none") { passed = false; }

      expect(passed).toBe(true);

    });

    /* 2nd Test
    Check to make sure as the 'create budget' button is clicked,
    the 'crete budget button' is hide, and the remaining buttons & table are displayed.
    */
    it('Check for "Create Budget" Button and its ripple effects', async () => {
      let passed = true;
      const createBudgetButton = await page.$('.create_btn');
      await createBudgetButton.click();
      const saveBudgetButton = await page.$('.save_budget_btn');
      await saveBudgetButton.click();

      const createBudget_Display = await page.$eval('.create_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const expenseTable_Display = await page.$eval('#expensetable', el => getComputedStyle(el).getPropertyValue('display'));
      const deleteSelected_Display = await page.$eval('.del_select_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const deleteBudget_Display = await page.$eval('.del_budget_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const saveBudget_Display = await page.$eval('.save_budget_btn', el => getComputedStyle(el).getPropertyValue('display'));
      if (createBudget_Display != "none") { passed = false; }
      if (expenseTable_Display != "block") { passed = false; }
      if (deleteSelected_Display != "inline-block") { passed = false; }
      if (deleteBudget_Display != "inline-block") { passed = false; }
      if (saveBudget_Display != "inline-block") { passed = false; }

      expect(passed).toBe(true);
    });

    /* 3rd Test
    Check to make sure that as 'save budget button' is clicked,
    it saves the expenseTable & expenseData & totalCost into local storage.
    */
    it('Check for "Save Budget" Button and its ripple effects', async () => {     
      let passed = true;
      let lengthOfEmptyExpenseTable = 603;
      const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));

      expenseData_LS = `${localStorage.expenseData}`;
      expenseTable_LS = `${localStorage.expenseTable}`;
      totalCost_LS = `${localStorage.totalCost}`;
      if (expenseData_LS != "[]") { passed = false; }
      if (expenseTable_LS.length != lengthOfEmptyExpenseTable) {passed = false; }
      if (totalCost_LS != 0) { passed = false; }
      expect(passed).toBe(true);
    });

    /* 4th Test
    Check to make sure that as the 'add rows' button is clicked,
    the HTML elements are updated correspondingly.
    */
    it('Check for "Add Rows" Button and its ripple effects', async () => {     
      let passed = true;
      let lengthOf10rowsExpenseTable = 1095;

      const addRowButton = await page.$('.add_btn');
      for (let i=0; i<10; i++) {
        await addRowButton.click();
      }

      const expenseTable_JSHandle = await page.$('#expensetable');
      const expenseTable_HTML = await expenseTable_JSHandle.getProperty('innerText');
      const expenseTable_jsonValue = await expenseTable_HTML.jsonValue();
      if (expenseTable_jsonValue.length != lengthOf10rowsExpenseTable) {passed = false; }

      expect(passed).toBe(true);
    });

    /* 5th Test
    Check to make sure that as the 'delete selected rows' button is clicked,
    the HTML elements are removed correspondingly.
    */
    it('Check for "Delete Selected Rows" Button and its ripple effects', async () => {     
      let passed = true;
      let lengthOf5rowsExpenseTable = 574;
  
      for (var i = 1; i < 6; i++) {
        const createBudgetButton = await page.$('.create_btn');
        var checkID = '#check' + `${i}`;
        const rows = await page.$(checkID);
        await rows.click();
      }

      const delRowButton = await page.$('.del_select_btn');
      await delRowButton.click();

      const expenseTable_JSHandle = await page.$('#expensetable');
      const expenseTable_HTML = await expenseTable_JSHandle.getProperty('innerText');
      const expenseTable_jsonValue = await expenseTable_HTML.jsonValue();
      if (expenseTable_jsonValue.length != lengthOf5rowsExpenseTable) {passed = false; }

      expect(passed).toBe(true);
    });

    // // 6th Test
    // // Input some data, Click save budget button, then check for the total cost 
    // it('Check for total cost', async () => {     
    // });


    // 7th Test
    // Check to make sure that as the Delete Budget Button is clicked its local storage for expenseTable & expenseData & totalCost are undefined
    // and that only "create budget" button's display is block and the remaining elements have their display as none
    it('Check for Delete Budget Button', async () => {     
    });
});
