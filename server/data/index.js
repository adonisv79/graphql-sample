/**
 * We will use mocked data on this project using the notarealdb module 
 */
const path = require('path')
const { DataStore } = require('notarealdb');
const store = new DataStore(path.join(__dirname, 'mocked'));

module.exports = {
  stocks: store.collection('stocks'),
  industries: store.collection('industries'),
  users: store.collection('users')
};
