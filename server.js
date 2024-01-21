const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connection');
const routes = require('./controllers'); // Importing all routes

const app = express();
const PORT = process.env.PORT || 3001;

// Assuming formatDate is defined in ./utils/helpers
const { formatDate } = require('./utils/helpers');

// Setting up Handlebars with the custom helper
const hbs = exphbs.create({
    helpers: {
        formatDate // Adding the formatDate helper from utils/helpers
    }
});

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup with Sequelize store
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(methodOverride('_method'));

// Setting Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Using the imported routes
app.use(routes);

// Additional route for the signup page
app.get('/signup', (req, res) => {
    res.render('signup', { query: req.query });
});

app.get('/login', (req, res) => {
    res.render('login'); // Assuming 'login.handlebars' is your login page template
});


// Sync Sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});