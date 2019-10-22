const inquirer = require('inquirer');

/**
 * A product
 */
class Product {
  /**
     * @param {Object} dbConn db connection object
     */
  constructor(dbConn) {
    this.dbConn = dbConn;
  }

  /**
   *
   */
  async getSpecsFromUser() {
    const name = await inquirer.prompt(
        {
          name: 'answer',
          message: 'Name what you are selling:',
        }
    );
    const startingBid = await inquirer.prompt(
        {
          name: 'answer',
          message: 'What price do you want to start this auction at?',
        }
    );

    await this.dbConn.createProduct(name.answer, startingBid.answer);

    console.log(`Your "${name.answer}" is now on sale.`);
  }
}

module.exports = Product;
