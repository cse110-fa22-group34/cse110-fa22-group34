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
      console.log(currentTextVal)
      let currentMonth = await currentTextVal.substring(0, 3);
      console.log(currentMonth);
      console.log(numCells);
      console.log(numDays[currentMonth]);
      expect(numCells == numDays[currentMonth]).toBe(true);
    });

    /* 2nd Test:
    Check if the previous/next buttons work by testing if the months change correctly when the buttons are clicked
    */
    

    /* 3rd Test:
    Check that the correct colors are given to each cell
    */
});