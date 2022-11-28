describe('Basic user flow for Website', () => {
    // First, visit the don't budge website
    beforeAll(async () => {
      await page.goto('https://cse110-f2021.github.io/Lab8_Website');
    });
  
    // Next, check to make sure that there's no local storage about expense upon refreshing
    it('Initial Home Page - Check for local storage', async () => {
        expect(localStorage.getItem('expenseData')).toEqual(null);
    });
});