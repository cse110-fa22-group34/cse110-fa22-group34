const numDays = {
  "Jan" : 31,
  "Feb" : 28,
  "Mar" : 31,
  "Apr" : 30,
  "May" : 31,
  "Jun" : 30,
  "Jul" : 31,
  "Aug" : 31,
  "Sep" : 30,
  "Oct" : 31,
  "Nov" : 30,
  "Dec" : 31,
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let page;
describe('Basic user flow for Website', () => {
    // First, visit the don't budge website
    beforeAll(async () => {
      jest.setTimeout(3000000);
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:5501/source/',{
        waitUntil: 'domcontentloaded'});
    });

    /* 1st Test:
    Check the number of days in a month by testing the value of the last cell.
    */
    it('Check if the values of the last cell match the number of days in the current month', async () => {  
      var table = await page.$("#calendar-body");
      let tableHTML = await table.getProperty('innerHTML')
      let tableHTMLVal = await tableHTML.jsonValue()
      let regex = />\d/g;
      var numCells = tableHTMLVal.match(regex).length;
      let current = await page.$("#monthAndYear");
      let currentText = await current.getProperty('innerText');
      let currentTextVal = await currentText.jsonValue();
      // console.log(currentTextVal)
      let currentMonth = await currentTextVal.substring(0, 3);
      // console.log(currentMonth);
      // console.log(numCells);
      // console.log(numDays[currentMonth]);
      expect(numCells == numDays[currentMonth]).toBe(true);
    });

    /* 2nd Test:
    Check if the previous/next buttons work by testing if the months change correctly when the 
    buttons are clicked
    */
    it('Check if the previous/next buttons work', async () => {
      let passed = true;
      
      // Grab the buttons for previous and next.
      const prev = await page.$("#previous");
      const next = await page.$("#next");

      // Grab the current month and year (isolate month).
      let current = await page.$("#monthAndYear");
      let currentText = await current.getProperty('innerText');
      let currentTextVal = await currentText.jsonValue();
      let currentMonth = await currentTextVal.substring(0, 3);
      
      // Expected values for previous, two previous, next, and two next.
      let expectedPrevMonth = months[(months.indexOf(currentMonth) - 1) % 12];
      let expectedPrev2Month = months[(months.indexOf(currentMonth) - 2) % 12];
      let expectedNextMonth = months[(months.indexOf(currentMonth) + 1) % 12];
      let expectedNext2Month = months[(months.indexOf(currentMonth) + 2) % 12];
      
      // Click the previous button and check if the month changed correctly.
      await prev.evaluate(prev => prev.click());
      let prevText = await current.getProperty('innerText');
      let prevTextVal = await prevText.jsonValue();
      let prevMonth = await prevTextVal.substring(0, 3);

      // Check if the month changed correctly to expected value.
      if (prevMonth != expectedPrevMonth) {
        passed = false;
      }

      // Click the previous button again and check if the month changed correctly.
      await prev.evaluate(prev => prev.click());
      let prev2Text = await current.getProperty('innerText');
      let prev2TextVal = await prev2Text.jsonValue();
      let prev2Month = await prev2TextVal.substring(0, 3);

      // Check if the month changed correctly to expected value.
      if (prev2Month != expectedPrev2Month) {
        passed = false;
      }

      // Click the next button twice, go back to current month.
      await next.evaluate(next => next.click());
      await next.evaluate(next => next.click());
      let currText = await current.getProperty('innerText');
      let currTextVal = await currText.jsonValue();
      let currMonth = await currTextVal.substring(0, 3);

      // Check if the month changed correctly to expected value.
      if (currMonth != currentMonth) {
        passed = false;
      }

      // Click the next button and check if the month changed correctly.
      await next.evaluate(next => next.click());
      let nextText = await current.getProperty('innerText');
      let nextTextVal = await nextText.jsonValue();
      let nextMonth = await nextTextVal.substring(0, 3);

      // Check if the month changed correctly to expected value.
      if (nextMonth != expectedNextMonth) {
        passed = false;
      }

      // Click the next button again and check if the month changed correctly.
      await next.evaluate(next => next.click());
      let next2Text = await current.getProperty('innerText');
      let next2TextVal = await next2Text.jsonValue();
      let next2Month = await next2TextVal.substring(0, 3);

      // Check if the month changed correctly to expected value.
      if (next2Month != expectedNext2Month) {
        passed = false;
      }

      // Check if all the tests passed.
      expect(passed).toBe(true);
    });

    

    /* 3rd Test:
    Check that the correct colors are given to each cell
    */
   it ('Check if the correct colors are given to each cell', async () => {
    let userExpenseTable = [];
    let totalBudget = 1000;
    passed = true;

    // Add Sample Expenses to Test Colors
    let data1 = {
      check: false,
      cost: 10,
      date: '2022-12-01',
      item: 'Sushi',
      label: 'Food'
    }
    // Add Sample Expenses to Test Colors
    let data2 = {
      check: false,
      cost: 32,
      date: '2022-12-02',
      item: 'Sweater',
      label: 'Clothes'
    }
    // Add Sample Expenses to Test Colors
    let data3 = {
      check: false,
      cost: 34,
      date: '2022-12-03',
      item: 'Pasta Salad',
      label: 'Grocery'
    }
    // Add Sample Expenses to Test Colors
    let data4 = {
      check: false,
      cost: 340,
      date: '2022-12-04',
      item: 'PS4',
      label: 'Entertainment'
    }

    userExpenseTable.push(data1);
    userExpenseTable.push(data2);
    userExpenseTable.push(data3);
    userExpenseTable.push(data4);

    await page.evaluate((userExpenseTable) => {
      localStorage.setItem('expenseData', JSON.stringify(userExpenseTable));
    }, userExpenseTable);
    await page.evaluate((totalBudget) => {
      localStorage.setItem('budget', JSON.stringify(totalBudget));
    }, totalBudget);

    await page.reload();

    // Get and print the localStorage data
    let localStorageData = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('expenseData'));
    });
    let localStorageBudget = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('totalBudget'));
    });
    console.log(localStorageData);
    console.log(localStorageBudget);

    expect(passed).toBe(true);
  });

});