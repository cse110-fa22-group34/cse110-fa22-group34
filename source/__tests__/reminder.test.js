const objectsEqual = (o1, o2) => 
    typeof o1 === 'object' && Object.keys(o1).length > 0 
        ? Object.keys(o1).length === Object.keys(o2).length 
            && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
        : o1 === o2;
let page;
describe('Basic user flow for Website', () => {
    // First, visit the don't budge website
    beforeAll(async () => {
      jest.setTimeout(300000);
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:5501/source/',{
        waitUntil: 'domcontentloaded'});
      const toggleButton = await page.$("#toggleButton");
      await toggleButton.click();
    });

    /* 1st Test:
    Check to make sure that as the page first loads,
    its local storage for reminderData & globalReminderIndex are undefined
    */
    it('Check for Local Storage Initial State', async () => {
      let passed = true;
      const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = `${localStorage.reminderData}`;
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      if (reminderDataLS != "undefined") { passed = false; }
      if (globalReminderIndexLS != "undefined") { passed = false; }
      expect(passed).toBe(true);
    });

    /* 2nd Test:
    Check to make sure as the '+' button is clicked, the new reminder is added to the end of the reminder list
    */
    it('Check for the Add Reminder Button and Its Ripple Effects', async () => {
      let passed = true;
      const addReminderButton = await page.$("#add");
      var input = await page.$("#reminder");
      input.type("reminder1");
      await page.waitForTimeout(500);
      await addReminderButton.click();
      let localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      let expected = [{"name":"reminder1","id":0}]
      if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
      if (globalReminderIndexLS != 1) { passed = false; }

      input.type("reminder2");
      await page.waitForTimeout(500);
      await addReminderButton.click();
      localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      expected = [{"name":"reminder1","id":0}, {"name":"reminder2","id":1}]
      if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
      if (globalReminderIndexLS != 2) { passed = false; }

      expect(passed).toBe(true);
    });

    /* 3rd Test
    Check to make sure that as up and down arrows are clicked,
    the order of reminders in local storage are swapped correctly.
    */
    it('Check for Up and Down Arrow Button and Its Ripple Effects', async () => {
      jest.setTimeout(300000)
      let localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      let passed = true;
      const upArrow1 = await page.$('[id="0"] > button.upArrow');
      const upArrow2 = await page.$('[id="1"] > button.upArrow');
      const downArrow1 = await page.$('[id="0"] > button.downArrow');
      const downArrow2 = await page.$('[id="1"] > button.downArrow');
      await upArrow1.click();
      localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      expected = [{"name":"reminder1","id":0}, {"name":"reminder2","id":1}]
      if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
      if (globalReminderIndexLS != 2) { passed = false; }

      await downArrow1.click();
      localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      expected = [{"name":"reminder2","id":1}, {"name":"reminder1","id":0}]
      if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
      if (globalReminderIndexLS != 2) { passed = false; }

      await upArrow1.click();
      localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      expected = [{"name":"reminder1","id":0}, {"name":"reminder2","id":1}]
      if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
      if (globalReminderIndexLS != 2) { passed = false; }

      await downArrow2.click();
      localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      expected = [{"name":"reminder1","id":0}, {"name":"reminder2","id":1}]
      if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
      if (globalReminderIndexLS != 2) { passed = false; }

      await upArrow2.click();
      localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      expected = [{"name":"reminder2","id":1}, {"name":"reminder1","id":0}]
      if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
      if (globalReminderIndexLS != 2) { passed = false; }

      await downArrow2.click();
      localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      expected = [{"name":"reminder1","id":0}, {"name":"reminder2","id":1}]
      if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
      if (globalReminderIndexLS != 2) { passed = false; }

      expect(passed).toBe(true);
    });
});