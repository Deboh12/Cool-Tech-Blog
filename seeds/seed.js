const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); 

    // Seed Users
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Seed Posts
    for (const post of postData) {
        await Post.create({
            ...post,
        
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
