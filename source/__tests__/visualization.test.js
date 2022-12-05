/**
 * This file is the javascript for the unit tests of the visualization section
 * It includes the test for the initial state of the local storage, and a test
 * for pie chart, line graph, and character
 * 
 * References: MDN Web Docs
 */

let page;
describe('Visualization of the budget/expenses data', () => {
    // Before all tests, we visit the project website.
    beforeAll(async () => {
        jest.clearAllMocks();
        jest.setTimeout(300000000000);
        page = await browser.newPage();

        // If any helper alert appears, we dismiss it and move on with the rest of the test/s.
        page.on('dialog', async dialog => {
            await dialog.dismiss();
        });

        await page.goto('http://127.0.0.1:5501/source/', {
            waitUntil: 'domcontentloaded'
        });

        // Add default data into the localStorage so that we can test visualization feature on it.
        await page.evaluate(
            () => {
                const localStorageData = {
                    "expenseTable": "\n\n        <tbody><tr>\n          <!-- The header of the table with 6 columns: No., checkbox, date, cost, item, label -->\n            <th>No.</th>\n            <th>\n                <input type=\"checkbox\" checked=\"\" disabled=\"\">\n            </th>\n            <th>Date</th>\n            <th>Cost</th>\n            <th>Item</th>\n            <th>Label</th>\n        </tr>\n        <!-- The row with the add row button: whenever we click this button, a new empty row will be added to the table -->\n        <tr><td><text id=\"no\">1</text></td><td><input id=\"check1\" type=\"checkbox\"></td><td><input id=\"date1\" type=\"date\"></td><td><input id=\"cost1\" type=\"number\"></td><td><input id=\"item1\" type=\"text\"></td><td><select style=\"border:none\" id=\"label1\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">2</text></td><td><input id=\"check2\" type=\"checkbox\"></td><td><input id=\"date2\" type=\"date\"></td><td><input id=\"cost2\" type=\"number\"></td><td><input id=\"item2\" type=\"text\"></td><td><select style=\"border:none\" id=\"label2\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">3</text></td><td><input id=\"check3\" type=\"checkbox\"></td><td><input id=\"date3\" type=\"date\"></td><td><input id=\"cost3\" type=\"number\"></td><td><input id=\"item3\" type=\"text\"></td><td><select style=\"border:none\" id=\"label3\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">4</text></td><td><input id=\"check4\" type=\"checkbox\"></td><td><input id=\"date4\" type=\"date\"></td><td><input id=\"cost4\" type=\"number\"></td><td><input id=\"item4\" type=\"text\"></td><td><select style=\"border:none\" id=\"label4\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">5</text></td><td><input id=\"check5\" type=\"checkbox\"></td><td><input id=\"date5\" type=\"date\"></td><td><input id=\"cost5\" type=\"number\"></td><td><input id=\"item5\" type=\"text\"></td><td><select style=\"border:none\" id=\"label5\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">6</text></td><td><input id=\"check6\" type=\"checkbox\"></td><td><input id=\"date6\" type=\"date\"></td><td><input id=\"cost6\" type=\"number\"></td><td><input id=\"item6\" type=\"text\" autocomplete=\"off\"></td><td><select style=\"border:none\" id=\"label6\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr>\n            <td colspan=\"6\">\n                <button class=\"btn add_btn\" onclick=\"addRow()\">+ Add Row</button>\n            </td>\n        </tr>\n        <!-- The row to calculate the total cost -->\n        <tr>\n            <td colspan=\"2\"></td>\n            <td>Total Cost:</td>\n            <td id=\"totalCost\">$ 145</td>\n            <td colspan=\"2\"></td>\n        </tr>\n      </tbody>",
                    "Total Budget": "1000",
                    "Remaining": "855",
                    "expenseData": "[{\"check\":false,\"date\":\"2022-12-01\",\"cost\":10,\"item\":\"Item 1\",\"label\":\"Grocery\"},{\"check\":false,\"date\":\"2022-12-01\",\"cost\":20,\"item\":\"Item 2\",\"label\":\"Grocery\"},{\"check\":false,\"date\":\"2022-12-02\",\"cost\":15,\"item\":\"Item 3\",\"label\":\"Monthly Membership\"},{\"check\":false,\"date\":\"2022-12-03\",\"cost\":30,\"item\":\"Item 4\",\"label\":\"Transportation\"},{\"check\":false,\"date\":\"2022-12-07\",\"cost\":50,\"item\":\"Item 5\",\"label\":\"Entertainment\"},{\"check\":false,\"date\":\"2022-12-09\",\"cost\":20,\"item\":\"Item 6\",\"label\":\"Clothes\"}]",
                    "totalCost": "145",
                    "RemainingDay": "28.50"
                };
                window.localStorage.clear();
                for (const [key, value] of Object.entries(localStorageData)) {
                    window.localStorage.setItem(key, value);
                }
            });

        // Reload the webpage after adding the data into the localStorage.
        await page.goto('http://127.0.0.1:5501/source/', {
            waitUntil: 'domcontentloaded'
        });
    });

    /* Test 1:
        Assert that initially only the text view representation of budget is displayed
        and the visualization figure is hidden.
    */
    it('Check initial text view representation', async () => {

        let passed = true;

        const textViewDisplay = await page.$eval('#budget-visualization', el => getComputedStyle(el).getPropertyValue('display'));
        const visualizationFigureDisplay = await page.$eval('#visualization_figure', el => getComputedStyle(el).getPropertyValue('display'));
        if (textViewDisplay != "flex") { passed = false; }
        if (visualizationFigureDisplay != "none") { passed = false; }

        expect(passed).toBe(true);
    });

    /* Test 2:
        Check pie chart visualization feature.
        Assert that only the visualization figure is being displayed and the text view is hidden.
    */
    it('Check pie chart visualization', async () => {

        let passed = true;

        // Select Pie Chart option from the visualization type selector.
        await page.select('#visualization_type', 'pie_chart')

        const textViewDisplay = await page.$eval('#budget-visualization', el => getComputedStyle(el).getPropertyValue('display'));
        const visualizationFigureDisplay = await page.$eval('#visualization_figure', el => getComputedStyle(el).getPropertyValue('display'));
        if (textViewDisplay != "none") { passed = false; }
        if (visualizationFigureDisplay != "block") { passed = false; }

        expect(passed).toBe(true);
    });

    /* Test 3:
        Check line graph visualization feature.
        Assert that only the visualization figure is being displayed and the text view is hidden.
    */
    it('Check line graph visualization', async () => {

        let passed = true;

        // Select Line Graph option from the visualization type selector.
        await page.select('#visualization_type', 'line_graph')

        const textViewDisplay = await page.$eval('#budget-visualization', el => getComputedStyle(el).getPropertyValue('display'));
        const visualizationFigureDisplay = await page.$eval('#visualization_figure', el => getComputedStyle(el).getPropertyValue('display'));
        if (textViewDisplay != "none") { passed = false; }
        if (visualizationFigureDisplay != "block") { passed = false; }

        expect(passed).toBe(true);
    });

    /* Test 4:
        Check the character visualization feature (happy frog face).
        Current default budget data should show happy frog face.
    */
    it('Check the character visualization feature (happy frog face)', async () => {

        let passed = true;

        // Select Character option from the visualization type selector.
        await page.select('#visualization_type', 'character')

        const textViewDisplay = await page.$eval('#budget-visualization', el => getComputedStyle(el).getPropertyValue('display'));
        const visualizationFigureDisplay = await page.$eval('#visualization_figure', el => getComputedStyle(el).getPropertyValue('display'));
        const visualizationFigureContent = await page.evaluate(() => document.querySelector('#visualization_figure').innerHTML);
        if (textViewDisplay != "none") { passed = false; }
        if (visualizationFigureDisplay != "block") { passed = false; }
        if (visualizationFigureContent != '<img id="visualization_character" src="../source/assets/frog-happy.svg">') { passed = false; }

        expect(passed).toBe(true);
    });

    /* Test 5:
        Check the character visualization feature (neutral frog face).
    */
    it('Check the character visualization feature (neutral frog face).', async () => {

        // Modify budget data so that it shows neutral frog face.
        await page.evaluate(
            () => {
                const localStorageData = {
                    "expenseTable": "\n\n        <tbody><tr>\n          <!-- The header of the table with 6 columns: No., checkbox, date, cost, item, label -->\n            <th>No.</th>\n            <th>\n                <input type=\"checkbox\" checked=\"\" disabled=\"\">\n            </th>\n            <th>Date</th>\n            <th>Cost</th>\n            <th>Item</th>\n            <th>Label</th>\n        </tr>\n        <!-- The row with the add row button: whenever we click this button, a new empty row will be added to the table -->\n        <tr><td><text id=\"no\">1</text></td><td><input id=\"check1\" type=\"checkbox\"></td><td><input id=\"date1\" type=\"date\"></td><td><input id=\"cost1\" type=\"number\"></td><td><input id=\"item1\" type=\"text\"></td><td><select style=\"border:none\" id=\"label1\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">2</text></td><td><input id=\"check2\" type=\"checkbox\"></td><td><input id=\"date2\" type=\"date\"></td><td><input id=\"cost2\" type=\"number\"></td><td><input id=\"item2\" type=\"text\"></td><td><select style=\"border:none\" id=\"label2\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">3</text></td><td><input id=\"check3\" type=\"checkbox\"></td><td><input id=\"date3\" type=\"date\"></td><td><input id=\"cost3\" type=\"number\"></td><td><input id=\"item3\" type=\"text\"></td><td><select style=\"border:none\" id=\"label3\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">4</text></td><td><input id=\"check4\" type=\"checkbox\"></td><td><input id=\"date4\" type=\"date\"></td><td><input id=\"cost4\" type=\"number\"></td><td><input id=\"item4\" type=\"text\"></td><td><select style=\"border:none\" id=\"label4\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">5</text></td><td><input id=\"check5\" type=\"checkbox\"></td><td><input id=\"date5\" type=\"date\"></td><td><input id=\"cost5\" type=\"number\"></td><td><input id=\"item5\" type=\"text\"></td><td><select style=\"border:none\" id=\"label5\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">6</text></td><td><input id=\"check6\" type=\"checkbox\"></td><td><input id=\"date6\" type=\"date\"></td><td><input id=\"cost6\" type=\"number\"></td><td><input id=\"item6\" type=\"text\" autocomplete=\"off\"></td><td><select style=\"border:none\" id=\"label6\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr>\n            <td colspan=\"6\">\n                <button class=\"btn add_btn\" onclick=\"addRow()\">+ Add Row</button>\n            </td>\n        </tr>\n        <!-- The row to calculate the total cost -->\n        <tr>\n            <td colspan=\"2\"></td>\n            <td>Total Cost:</td>\n            <td id=\"totalCost\">$ 145</td>\n            <td colspan=\"2\"></td>\n        </tr>\n      </tbody>",
                    "Total Budget": "200",
                    "Remaining": "55",
                    "expenseData": "[{\"check\":false,\"date\":\"2022-12-01\",\"cost\":10,\"item\":\"Item 1\",\"label\":\"Grocery\"},{\"check\":false,\"date\":\"2022-12-01\",\"cost\":20,\"item\":\"Item 2\",\"label\":\"Grocery\"},{\"check\":false,\"date\":\"2022-12-02\",\"cost\":15,\"item\":\"Item 3\",\"label\":\"Monthly Membership\"},{\"check\":false,\"date\":\"2022-12-03\",\"cost\":30,\"item\":\"Item 4\",\"label\":\"Transportation\"},{\"check\":false,\"date\":\"2022-12-07\",\"cost\":50,\"item\":\"Item 5\",\"label\":\"Entertainment\"},{\"check\":false,\"date\":\"2022-12-09\",\"cost\":20,\"item\":\"Item 6\",\"label\":\"Clothes\"}]",
                    "totalCost": "145",
                    "RemainingDay": "1.83"
                };
                window.localStorage.clear();
                for (const [key, value] of Object.entries(localStorageData)) {
                    window.localStorage.setItem(key, value);
                }
            });
        
        // Reload webpage after loading new data into the localStorage.
        await page.goto('http://127.0.0.1:5501/source/', {
            waitUntil: 'domcontentloaded'
        });

        let passed = true;

        await page.select('#visualization_type', 'character')

        const textViewDisplay = await page.$eval('#budget-visualization', el => getComputedStyle(el).getPropertyValue('display'));
        const visualizationFigureDisplay = await page.$eval('#visualization_figure', el => getComputedStyle(el).getPropertyValue('display'));
        const visualizationFigureContent = await page.evaluate(() => document.querySelector('#visualization_figure').innerHTML);
        if (textViewDisplay != "none") { passed = false; }
        if (visualizationFigureDisplay != "block") { passed = false; }
        if (visualizationFigureContent != '<img id="visualization_character" src="../source/assets/frog-neutral.svg">') { passed = false; }

        expect(passed).toBe(true);
    });

    /* Test 6:
        Check the character visualization feature (sad frog face).
    */
    it('Check the character visualization feature (sad frog face).', async () => {

        // Modify budget data so that it shows sad frog face.
        await page.evaluate(
            () => {
                const localStorageData = {
                    "expenseTable": "\n\n        <tbody><tr>\n          <!-- The header of the table with 6 columns: No., checkbox, date, cost, item, label -->\n            <th>No.</th>\n            <th>\n                <input type=\"checkbox\" checked=\"\" disabled=\"\">\n            </th>\n            <th>Date</th>\n            <th>Cost</th>\n            <th>Item</th>\n            <th>Label</th>\n        </tr>\n        <!-- The row with the add row button: whenever we click this button, a new empty row will be added to the table -->\n        <tr><td><text id=\"no\">1</text></td><td><input id=\"check1\" type=\"checkbox\"></td><td><input id=\"date1\" type=\"date\"></td><td><input id=\"cost1\" type=\"number\"></td><td><input id=\"item1\" type=\"text\"></td><td><select style=\"border:none\" id=\"label1\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">2</text></td><td><input id=\"check2\" type=\"checkbox\"></td><td><input id=\"date2\" type=\"date\"></td><td><input id=\"cost2\" type=\"number\"></td><td><input id=\"item2\" type=\"text\"></td><td><select style=\"border:none\" id=\"label2\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">3</text></td><td><input id=\"check3\" type=\"checkbox\"></td><td><input id=\"date3\" type=\"date\"></td><td><input id=\"cost3\" type=\"number\"></td><td><input id=\"item3\" type=\"text\"></td><td><select style=\"border:none\" id=\"label3\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">4</text></td><td><input id=\"check4\" type=\"checkbox\"></td><td><input id=\"date4\" type=\"date\"></td><td><input id=\"cost4\" type=\"number\"></td><td><input id=\"item4\" type=\"text\"></td><td><select style=\"border:none\" id=\"label4\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">5</text></td><td><input id=\"check5\" type=\"checkbox\"></td><td><input id=\"date5\" type=\"date\"></td><td><input id=\"cost5\" type=\"number\"></td><td><input id=\"item5\" type=\"text\"></td><td><select style=\"border:none\" id=\"label5\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr><td><text id=\"no\">6</text></td><td><input id=\"check6\" type=\"checkbox\"></td><td><input id=\"date6\" type=\"date\"></td><td><input id=\"cost6\" type=\"number\"></td><td><input id=\"item6\" type=\"text\" autocomplete=\"off\"></td><td><select style=\"border:none\" id=\"label6\">                            <option value=\"default\">--Please Select--</option>                            <option value=\"opt1\">Grocery</option>                            <option value=\"opt2\">Clothes</option>                            <option value=\"opt3\">Transportation</option>                            <option value=\"opt4\">Housing</option>                            <option value=\"opt5\">Monthly Membership</option>                            <option value=\"opt6\">Entertainment</option>                            <option value=\"opt7\">Other</option>                        </select></td></tr><tr>\n            <td colspan=\"6\">\n                <button class=\"btn add_btn\" onclick=\"addRow()\">+ Add Row</button>\n            </td>\n        </tr>\n        <!-- The row to calculate the total cost -->\n        <tr>\n            <td colspan=\"2\"></td>\n            <td>Total Cost:</td>\n            <td id=\"totalCost\">$ 145</td>\n            <td colspan=\"2\"></td>\n        </tr>\n      </tbody>",
                    "Total Budget": "100",
                    "Remaining": "-45",
                    "expenseData": "[{\"check\":false,\"date\":\"2022-12-01\",\"cost\":10,\"item\":\"Item 1\",\"label\":\"Grocery\"},{\"check\":false,\"date\":\"2022-12-01\",\"cost\":20,\"item\":\"Item 2\",\"label\":\"Grocery\"},{\"check\":false,\"date\":\"2022-12-02\",\"cost\":15,\"item\":\"Item 3\",\"label\":\"Monthly Membership\"},{\"check\":false,\"date\":\"2022-12-03\",\"cost\":30,\"item\":\"Item 4\",\"label\":\"Transportation\"},{\"check\":false,\"date\":\"2022-12-07\",\"cost\":50,\"item\":\"Item 5\",\"label\":\"Entertainment\"},{\"check\":false,\"date\":\"2022-12-09\",\"cost\":20,\"item\":\"Item 6\",\"label\":\"Clothes\"}]",
                    "totalCost": "145",
                    "RemainingDay": "-1.50"
                };
                window.localStorage.clear();
                for (const [key, value] of Object.entries(localStorageData)) {
                    window.localStorage.setItem(key, value);
                }
            });
        
            // Reload webpage after loading new data into the localStorage.
        await page.goto('http://127.0.0.1:5501/source/', {
            waitUntil: 'domcontentloaded'
        });

        let passed = true;

        await page.select('#visualization_type', 'character')

        const textViewDisplay = await page.$eval('#budget-visualization', el => getComputedStyle(el).getPropertyValue('display'));
        const visualizationFigureDisplay = await page.$eval('#visualization_figure', el => getComputedStyle(el).getPropertyValue('display'));
        const visualizationFigureContent = await page.evaluate(() => document.querySelector('#visualization_figure').innerHTML);
        if (textViewDisplay != "none") { passed = false; }
        if (visualizationFigureDisplay != "block") { passed = false; }
        if (visualizationFigureContent != '<img id="visualization_character" src="../source/assets/frog-sad.svg">') { passed = false; }

        expect(passed).toBe(true);
    });
});
