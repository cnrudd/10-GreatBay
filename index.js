

const db = require('./queries.js');

/**
 * Main entry point to script
 * This is an 'async' function
 * @see {@link https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await}
 */


async function run() {

  const conn = await db.createConnection();

  const step1 = await inquirer.prompt(
    {
      name: 'do',
      message: 'Buy or Sell',
      list: ['Buy', 'Sell']
    }
  );

  if (step1.do == 'Buy') {

    const response = await connection.query('select items from products');
    const items = response.items
    const ans2 = await inquirer.prompt(
      {
        name: 'item',
        message: 'What do you want to buy?',
        list: ItemsArray
      }
    );

    

  }

}


run();