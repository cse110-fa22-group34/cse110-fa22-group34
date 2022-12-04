/**
 * This file is the javascript for the unit tests of the reminder section
 * It includes the test for the initial state of the local storage, add 
 * and remove reminders, and changing the priority/order of the reminders
 * 
 * References: MDN Web Docs
 */

// compares 2 objects and returns true if they are equivalent and false if not
const objectsEqual = (o1, o2) => 
    typeof o1 === 'object' && Object.keys(o1).length > 0 
        ? Object.keys(o1).length === Object.keys(o2).length 
            && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
        : o1 === o2;
let page;
describe('Basic user flow for REMINDER section of the website', () => {
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
      // add reminder 1
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

      // add reminder 2
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

      // try to move reminder 1 up
      await upArrow1.click();
      localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      expected = [{"name":"reminder1","id":0}, {"name":"reminder2","id":1}]
      if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
      if (globalReminderIndexLS != 2) { passed = false; }

      // try to move reminder 1 down
      await downArrow1.click();
      localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      expected = [{"name":"reminder2","id":1}, {"name":"reminder1","id":0}]
      if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
      if (globalReminderIndexLS != 2) { passed = false; }

      // try to move reminder 1 up again
      await upArrow1.click();
      localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      expected = [{"name":"reminder1","id":0}, {"name":"reminder2","id":1}]
      if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
      if (globalReminderIndexLS != 2) { passed = false; }

      // try to move reminder 2 down
      await downArrow2.click();
      localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      expected = [{"name":"reminder1","id":0}, {"name":"reminder2","id":1}]
      if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
      if (globalReminderIndexLS != 2) { passed = false; }

      // try to move reminder 2 up
      await upArrow2.click();
      localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      expected = [{"name":"reminder2","id":1}, {"name":"reminder1","id":0}]
      if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
      if (globalReminderIndexLS != 2) { passed = false; }

      // try to move reminder 2 down again
      await downArrow2.click();
      localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
      reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
      globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
      expected = [{"name":"reminder1","id":0}, {"name":"reminder2","id":1}]
      if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
      if (globalReminderIndexLS != 2) { passed = false; }

      expect(passed).toBe(true);
    });

    /* 4th Test
    Check to make sure that as remove button is clicked, 
    the corresponding reminder in local storage is deleted 
    while the order of the rest of the reminders stays the same
    */
    it('Check for Up and Down Arrow Button and Its Ripple Effects', async () => {
        jest.setTimeout(300000)
        let passed = true;

        // add reminder 3
        const addReminderButton = await page.$("#add");
        var input = await page.$("#reminder");
        input.type("reminder3");
        await page.waitForTimeout(500);
        await addReminderButton.click();
        let localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
        reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
        globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
        let expected = [{"name":"reminder1","id":0}, {"name":"reminder2","id":1}, {"name":"reminder3","id":2}]
        if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
        if (globalReminderIndexLS != 3) { passed = false; }

        const remove1 = await page.$('[id="0"] > button.remove');
        const remove2 = await page.$('[id="1"] > button.remove');
        const remove3 = await page.$('[id="2"] > button.remove');

        // remove reminder 2
        await remove2.click();
        localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
        reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
        globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
        expected = [{"name":"reminder1","id":0}, {"name":"reminder3","id":2}]
        if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
        if (globalReminderIndexLS != 3) { passed = false; }

        // remove reminder 1
        await remove1.click();
        localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
        reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
        globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
        expected = [{"name":"reminder3","id":2}]
        if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
        if (globalReminderIndexLS != 3) { passed = false; }

        // remove reminder 3
        await remove3.click();
        localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
        reminderDataLS = JSON.parse(`${localStorage.reminderData}`);
        globalReminderIndexLS = `${localStorage.globalReminderIndex}`;
        expected = []
        if (!(reminderDataLS.length === expected.length && reminderDataLS.every((o, idx) => objectsEqual(o, expected[idx])))){ passed = false; }
        if (globalReminderIndexLS != 3) { passed = false; }

        expect(passed).toBe(true);
    });
});