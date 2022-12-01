let page;
describe('Basic user flow for Website', () => {
    // First, visit the don't budge website
    beforeAll(async () => {
      jest.setTimeout(300000);
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:5501/source/',{
        waitUntil: 'domcontentloaded'});
    });

    /* 1st Test:
    Check to make sure that as the page first loads,
    its local storage for expenseTable & expenseData & totalCost are undefined, 
    and that only 'create budget' button is displayed whereas the remaining buttons & table are not displayed.
    */
    it('Check for Initial Home Page', async () => {     

      let passed = true;
      const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));

      expenseDataLS = `${localStorage.expenseData}`;
      expenseTableLS = `${localStorage.expenseTable}`;
      totalCostLS = `${localStorage.totalCost}`;
      if (expenseDataLS != "undefined") { passed = false; }
      if (expenseTableLS != "undefined") { passed = false; }
      if (totalCostLS != "undefined") { passed = false; }

      const createBudgetDisplay = await page.$eval('.create_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const expenseTableDisplay = await page.$eval('#expenseTable', el => getComputedStyle(el).getPropertyValue('display'));
      const deleteSelectedDisplay = await page.$eval('.del_select_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const deleteBudgetDisplay = await page.$eval('.del_budget_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const saveBudgetDisplay = await page.$eval('.save_budget_btn', el => getComputedStyle(el).getPropertyValue('display'));
      if (createBudgetDisplay != "inline-block") { passed = false; }
      if (expenseTableDisplay != "none") { passed = false; }
      if (deleteSelectedDisplay != "none") { passed = false; }
      if (deleteBudgetDisplay != "none") { passed = false; }
      if (saveBudgetDisplay != "none") { passed = false; }

      expect(passed).toBe(true);

    });

    /* 2nd Test:
    Check to make sure as the 'create budget' button is clicked,
    the 'crete budget button' is hide, and the remaining buttons & table are displayed.
    */
    it('Check for "Create Budget" Button and Its Ripple Effects', async () => {
      let passed = true;
      const createBudgetButton = await page.$('.create_btn');
      await createBudgetButton.click();
      const saveBudgetButton = await page.$('.save_budget_btn');
      await saveBudgetButton.click();

      const createBudgetDisplay = await page.$eval('.create_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const expenseTableDisplay = await page.$eval('#expenseTable', el => getComputedStyle(el).getPropertyValue('display'));
      const deleteSelectedDisplay = await page.$eval('.del_select_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const deleteBudgetDisplay = await page.$eval('.del_budget_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const saveBudgetDisplay = await page.$eval('.save_budget_btn', el => getComputedStyle(el).getPropertyValue('display'));
      if (createBudgetDisplay != "none") { passed = false; }
      if (expenseTableDisplay != "block") { passed = false; }
      if (deleteSelectedDisplay != "inline-block") { passed = false; }
      if (deleteBudgetDisplay != "inline-block") { passed = false; }
      if (saveBudgetDisplay != "inline-block") { passed = false; }

      expect(passed).toBe(true);
    });

    /* 3rd Test
    Check to make sure that as 'save budget button' is clicked,
    it saves the expenseTable & expenseData & totalCost into local storage.
    */
    it('Check for "Save Budget" Button and Its Ripple Effects', async () => {     
      let passed = true;
      let lengthOfEmptyExpenseTable = 876;
      const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));

      expenseDataLS = `${localStorage.expenseData}`;
      expenseTableLS = `${localStorage.expenseTable}`;
      totalCostLS = `${localStorage.totalCost}`;
      if (expenseDataLS != "[]") { passed = false; }
      if (expenseTableLS.length != lengthOfEmptyExpenseTable) {passed = false; }
      if (totalCostLS != 0) { passed = false; }
      expect(passed).toBe(true);
    });

    /* 4th Test
    Check to make sure that as the 'add rows' button is clicked,
    the HTML elements are updated correspondingly.
    */
    it('Check for "Add Rows" Button and Its Ripple Effects', async () => {     
      let passed = true;
      let lengthOf10rowsExpenseTable = 1094;

      const addRowButton = await page.$('.add_btn');
      for (let i = 0; i < 10; i++) {
        await addRowButton.click();
      }
      const expenseTableJSHandle = await page.$('#expenseTable');
      const expenseTableHTML = await expenseTableJSHandle.getProperty('innerText');
      const expenseTablejsonValue = await expenseTableHTML.jsonValue();
      if (expenseTablejsonValue.length != lengthOf10rowsExpenseTable) {passed = false;}
      expect(passed).toBe(true);
    });

    /* 5th Test
    Check to make sure that as the 'delete selected rows' button is clicked,
    the HTML elements are removed correspondingly.
    */
    it('Check for "Delete Selected Rows" Button and Its Ripple Effects', async () => {     
      let passed = true;
      let lengthOf5rowsExpenseTable = 573;
  
      for (var i = 1; i < 6; i++) {
        var checkID = '#check' + `${i}`;
        const rows = await page.$(checkID);
        await rows.click();
      }

      const delRowButton = await page.$('.del_select_btn');
      await delRowButton.click();

      const expenseTableJSHandle = await page.$('#expenseTable');
      const expenseTableHTML = await expenseTableJSHandle.getProperty('innerText');
      const expenseTableJsonValue = await expenseTableHTML.jsonValue();
      if (expenseTableJsonValue.length != lengthOf5rowsExpenseTable) {passed = false; }
      expect(passed).toBe(true);
    });

    // 6th Test
    // Input some data, Click save budget button, then check for the total cost 
    it('Check for "Total Cost"', async () => {  
      for (var i = 1; i < 6; i++) {
        var costID = '#cost' + `${i}`;
        var cost = await page.$(costID);
        cost.type('20');
        await page.waitForTimeout(500);
      }
      const saveBudgetButton = await page.$('.save_budget_btn');
      await saveBudgetButton.click();
      const totalCostEle = await page.$('#totalCost');
      const totalCostText = await totalCostEle.getProperty('innerText');
      const totalCostVal = await totalCostText.jsonValue();
      expect(totalCostVal).toBe('$ 100');
      const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      totalCostLS = `${localStorage.totalCost}`;
      expect(totalCostLS).toBe("100");
    });


    // 7th Test
    // Check to make sure that as the Delete Budget Button is clicked its local storage for expenseTable & expenseData & totalCost are undefined
    // and that only "create budget" button's display is block and the remaining elements have their display as none
    it('Check for Delete Budget Button and Its Ripple Effects', async () => {  
      let passed = true;
      const deleteBudgetButton = await page.$('.del_budget_btn');
      await deleteBudgetButton.click();

      const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));

      expenseDataLS = `${localStorage.expenseData}`;
      expenseTableLS = `${localStorage.expenseTable}`;
      totalCostLS = `${localStorage.totalCost}`;
      if (expenseDataLS != "undefined") { passed = false; }
      if (expenseTableLS != "undefined") { passed = false; }
      if (totalCostLS != "undefined") { passed = false; }

      const createBudgetDisplay = await page.$eval('.create_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const expenseTableDisplay = await page.$eval('#expenseTable', el => getComputedStyle(el).getPropertyValue('display'));
      const deleteSelectedDisplay = await page.$eval('.del_select_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const deleteBudgetDisplay = await page.$eval('.del_budget_btn', el => getComputedStyle(el).getPropertyValue('display'));
      const saveBudgetDisplay = await page.$eval('.save_budget_btn', el => getComputedStyle(el).getPropertyValue('display'));
      if (createBudgetDisplay != "block") { passed = false; }
      if (expenseTableDisplay != "none") { passed = false; }
      if (deleteSelectedDisplay != "none") { passed = false; }
      if (deleteBudgetDisplay != "none") { passed = false; }
      if (saveBudgetDisplay != "none") { passed = false; }

      expect(passed).toBe(true);  
    });
});
