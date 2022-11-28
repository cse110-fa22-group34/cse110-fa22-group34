describe('Basic user flow for Website', () => {
    // First, visit the don't budge website
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5501/source/');
    });
  
    // Next, check to make sure that there's no local storage about expense upon refreshing
    it('Initial Home Page - Check for local storage', async () => {
        expect(localStorage.getItem('expenseData')).toEqual(null);
    });
});