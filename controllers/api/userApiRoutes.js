const router = require('express').Router();
const { User } = require('../../models');

// POST route for user registration
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json({ successMessage: 'Signup successful. Please log in.' });
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            res.json({ errorMessage: 'Password must be at least 8 characters long' });
        } else {
            res.status(500).json({ errorMessage: 'An error occurred during signup' });
        }
    }
});

// POST route for user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.status(200).send('Logged in successfully');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST route for user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;