const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); // This will reset your database

    // Seed Users
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Seed Posts
    for (const post of postData) {
        await Post.create({
            ...post,
            // Assuming your postData.json doesn't include user_ids, assign them here
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
