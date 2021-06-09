const Work = require('../models/work');


exports.getAddWork = (req, res, next) => {
    res.render('admin/edit-work', {
        pageTitle: 'Add Work',
        path: '/admin/add-work',
        editing: false
    });
};

exports.postAddWork = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const links = req.body.links;
    const price = req.body.price;
    const work = new Work(null, title, imageUrl, description, links, price);
    work.save();
    res.redirect('/');
};


exports.getEditWork = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const workId = req.params.workId;
    Work.findById(workId, work => {
        if (!work) {
            return res.redirect('/');
        }
        res.render('admin/edit-work', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-work',
            editing: editMode,
            work: work
        });
    });
};


exports.postEditWork = (req, res, next) => {
    const workId = req.body.workId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedLinks = req.body.links;
    const updatedPrice = req.body.price;
    const updatedWork = new Work(
      workId,
      updatedTitle,
      updatedImageUrl,
      updatedDesc,
      updatedLinks,
      updatedPrice,
    );
    updatedWork.save();
    res.redirect('/admin/works');
  };
  

exports.getWorks = (req, res, next) => {
    Work.fetchAll(works => {
        res.render('admin/works', {
            works: works,
            pageTitle: 'Admin Works',
            path: '/admin/works'
        });
    });
};


exports.postDeleteWork = (req, res, next) => {
    const workId = req.body.workId;
    Work.deleteById(workId);
    res.redirect('/admin/works');
  };
  