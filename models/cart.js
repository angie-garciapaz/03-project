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
        wrk => wrk.id === id
      );
      const existingWork = cart.works[existingWorkIndex];
      let updatedWork;
      if (existingWork) {
        updatedWork = { ...existingWork };
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
      });
    });
  }

  static deleteWork(id, workPrice) {
    fs.readFile(w, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const work = updatedCart.works.find(wrk => wrk.id === id);
      if (!work) {
        return;
      }
      const workQty = work.qty;
      updatedCart.works = updatedCart.works.filter(
        wrk => wrk.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - workPrice * workQty;

      fs.writeFile(w, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(w, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
}
