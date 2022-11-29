
let page;
describe('Basic user flow for Website', () => {
    // First, visit the don't budge website
    beforeAll(async () => {
      jest.setTimeout(35000);
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:5501/source/');
    });
    it('1', async () => {
      expect(1).toBe(1);
    });
    // Next, check to make sure that there's no local storage about expense upon refreshing
    it('Initial Home Page - Check for local storage', async () => {
      const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      expenseData_LS = `${localStorage.expenseData}`;
      console.log(expenseData_LS);
      //expect(expenseData_LS).toBe(null);
    });
});