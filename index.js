const inquirer = require('inquirer');

const DB = require('./DB');
const Product = require('./model/Product');
const Auction = require('./model/Auction');

/**
 * Main entry point to script
 * This is an 'async' function
 * @see {@link https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await}
 */


/**
  * Main entry point to app
  */
async function run() {
  const db = new DB();
  await db.createConnection();

  interact(db, 0);
}

/**
 *
 * @param {Object} db Our DB class with connection and queries
 * @param {number} count count times interact runs
 */
async function interact(db, count) {
  const choices = count ? ['Buy', 'Sell', 'Quit'] :
    ['Buy', 'Sell'];

  const step1 = await inquirer.prompt(
      {
        name: 'do',
        message: 'Buy or Sell',
        type: 'list',
        choices,
        default: 'Buy',
      }
  );

  switch (step1.do) {
    case 'Buy':
      const auction = new Auction(db);
      await auction.getBidFromUser();
      break;

    case 'Sell':
      const item = new Product(db);
      await item.getSpecsFromUser();
      break;
    default:
      process.exit(0);
      break;
  }

  interact(db, ++count);
}

run();
