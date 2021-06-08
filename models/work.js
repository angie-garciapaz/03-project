const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const w = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'works.json'
);

const getWorksFromFile = cb => {
  fs.readFile(w, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Work {
  constructor(id, title, imageUrl, description, links, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.links = links;
    this.price = price;
  }

  save() {
    getWorksFromFile(works => {
      if (this.id) {
        const existingWorkIndex = works.findIndex(
          work => work.id === this.id
        );
        const updatedWorks = [...works];
        updatedWorks[existingWorkIndex] = this;
        fs.writeFile(w, JSON.stringify(updatedWorks), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        works.push(this);
        fs.writeFile(w, JSON.stringify(works), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getWorksFromFile(works => {
      const work = works.find(work => work.id === id);
      const updatedWorks = works.filter(work => work.id !== id);
      fs.writeFile(w, JSON.stringify(updatedWorks), err => {
        if (!err) {
          Cart.deleteWork(id, work.price);
        }
      });
    });
  }

  static fetchAll(cb) {
    getWorksFromFile(cb);
  }

  static findById(id, cb) {
    getWorksFromFile(works => {
      const work = works.find(w => w.id === id);
      cb(work);
    });
  }
};