
/**
 * @see {@link https://www.npmjs.com/package/promise-mysql}
 */
const mysql = require('promise-mysql');

/**
 * Bring DB config in from separate file
 * to keep logic clean.
 */
const conf = require('./config.js');

/**
 * Return a DB connection
 * @return {Promise}
 */
module.exports = {
  createConnection,
  createProduct
};

async function createConnection() {
  return await mysql.createConnection(conf);
}

/**
 * Adds a row to DB
 * @param {Promise} connection
 * @return {Promise}
 */
async function createProduct(connection) {
  console.log('Inserting a new product...\n');
  const response = await connection.query(
      'INSERT INTO products SET ?',
      {
        flavor: 'Rocky Road',
        price: 3.0,
        quantity: 50,
      });

  console.log(`${response.affectedRows} product inserted!\n`);
}

/**
 * Updates a row in the DB
 * @param {Promise} connection
 * @return {Promise}
 */
function updateProduct(connection) {
  console.log('Updating all Rocky Road quantities...\n');
  return connection.query(
      'UPDATE products SET ? WHERE ?',
      [
        {
          quantity: 100,
        },
        {
          flavor: 'Rocky Road',
        },
      ])
      .then((res) => {
        console.log(res.affectedRows + ' products updated!\n');
      });
}

/**
 * Deletes a row from the DB
 * @param {Promise} connection
 * @return {Promise}
 */
function deleteProduct(connection) {
  console.log('Deleting all strawberry icecream...\n');
  return connection.query(
      'DELETE FROM products WHERE ?',
      {
        flavor: 'strawberry',
      })
      .then((res) => {
        console.log(res.affectedRows + ' products deleted!\n');
      });
}

/**
 * Reads all products from the DB
 * @param {Promise} connection
 * @return {Promise}
 */
function readProducts(connection) {
  console.log('Selecting all products...\n');
  return connection.query('SELECT * FROM products')
      .then((res) => {
        console.log(res);
      });
}