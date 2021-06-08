const fs = require('fs');
const path = require('path');

const w = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);


module.exports = class Cart {
  static addWork(id, workPrice) {
    fs.readFile(w, (err, fileContent) => {
      let cart = { works: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingWorkIndex = cart.works.findIndex(
        work => work.id === id
        );
      const exisitingWork = cart.works[existingWorkIndex];
      let updatedWork;
      if (exisitingWork) {
        updatedWork = { ...exisitingWork };
        updatedWork.qty = updatedWork.qty + 1;
        cart.works = [...cart.works];
        cart.works[existingWorkIndex] = updatedWork;
      } else {
        updatedWork = { id: id, qty: 1 };
        cart.works = [...cart.works, updatedWork];
      }
      cart.totalPrice = cart.totalPrice + +workPrice;
      fs.writeFile(w, JSON.stringify(cart), (err) => {
        console.log(err);
      })
    });
  }
}