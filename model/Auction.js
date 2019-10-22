const inquirer = require('inquirer');

/**
 * An auction
 */
class Auction {
  /**
     * @param {Object} dbConn db connection object
     */
  constructor(dbConn) {
    this.dbConn = dbConn;
  }

  /**
   *
   */
  async getBidFromUser() {
    const items = await this.dbConn.getAllItems();
    const item = await inquirer.prompt(
        {
          name: 'answer',
          message: 'What do you want to bid on?',
          type: 'list',
          choices: items.map((it) => `${it.item_name}`),
        }
    );

    const bid = await inquirer.prompt(
        {
          name: 'answer',
          message: 'What is your bid (US $):',
        }
    );

    const targetItem = items.find((it) => it.item_name == item.answer);

    if (targetItem.highest_bid < bid.answer) {
      await this.dbConn.updateItemWithBid(item.answer, bid.answer);
      console.log(`You have the highest bid $${bid.answer} on: ${item.answer}`);
    } else {
      console.log(`Your bid of $${bid.answer} was not high enough.`);
    }

    return;
  }
}

module.exports = Auction;
