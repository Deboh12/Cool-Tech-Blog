const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

// Import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ /* Your helpers */ });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up sessions with cookies
app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: false,
  // Add other session configurations here
}));

// Inform Express.js which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes (You'll need to implement these)
app.use(require('./controllers/homeRoutes'));
app.use(require('./controllers/dashboardRoutes'));
// Add other routes here

// Start server after DB connection
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});