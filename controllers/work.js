const Work = require('../models/work');
const Cart = require('../models/cart');


exports.getWorks = (req, res, next) => {
  Work.fetchAll(works => {
    res.render('work/work-list', {
      works: works,
      pageTitle: 'Work',
      path: '/works',
    });
  });
};


exports.getWork = (req, res, next) => {
  const workId = req.params.workId;
  Work.findById(workId, work => {
    res.render('work/work-details', {
      work: work,
      pageTitle: 'Work Detail',
      path: '/works'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Work.fetchAll(works => {
    res.render('work/index', {
      works: works,
      pageTitle: 'Work',
      path: '/'
    });
  });
};


exports.getCart = (req, res, next) => {
  // Cart.getCart(cart => {
  //   Work.fetchAll(works => {
  //     const cartWorks = [];
  //     for (work of works) {
  //       const cartWorkData = cart.works.find(
  //         work => work.id === work.id
  //       );
  //       if (cartWorkData) {
  //         cartWorks.push({ workData: work, qty: cartWorkData.qty });
  //       }
  //     }

  //   });
  // });
  res.render('work/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    // products: cartWorks
  });
};

exports.postCart = (req, res, next) => {
  const workId = req.body.workId;
  Work.findById(workId, (work) => {
    Cart.addWork(workId, work.price);
  })
  res.redirect('/cart');
};

exports.postCartDeleteWork = (req, res, next) => {
  const workId = req.body.workId;
  Work.findById(workId, work => {
    Cart.deleteWork(workId, work.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('work/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('work/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
