const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const workRoutes = require('./routes/work');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/images/', express.static('./public/images'));
app.use('/public', express.static('public'));

app.use('/admin', adminRoutes);
app.use(workRoutes);


app.use(errorController.get404);


// always at the end
app.listen(3100);