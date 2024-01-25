# Cool-Tech-Blog

## Deployed Application Link

https://debohstechblog-61c73a3d1acc.herokuapp.com/

## Description

The Cool-Tech-Blog is a dynamic web application designed for tech enthusiasts to create, share, and discuss technology-related content. This project was born out of a passion for technology and a desire to create a platform where like-minded individuals can collaborate and share their insights. It addresses the need for a dedicated space where technology topics can be discussed in-depth, fostering a community of learning and sharing. During this project, I delved into full-stack development, honing skills in server-side programming, database management, and front-end design. This journey has been enlightening, teaching me the intricacies of web development and the importance of user-centric design.


## Installation

To install and run Cool-Tech-Blog on your local machine, follow these steps:

1. Clone the repository to your local machine:
git clone https://github.com/your-username/Cool-Tech-Blog.git

2. Navigate to the cloned directory:
cd Cool-Tech-Blog

3. Install the necessary npm packages:
npm install
4. Create a .env file in the root directory with the following content (update the values based on your MySQL setup):
DB_NAME='tech_blog_db'
DB_USER='your_mysql_username'
DB_PASSWORD='your_mysql_password'

5. Run the schema file in your MySQL Workbench or command line to create the database.

6. Seed the database with sample data:
npm run seed

7. Start the server:
npm start

## Usage

To use Cool-Tech-Blog, start the server and visit http://localhost:3001 in your web browser or use the heroku deployed link. Users can sign up for an account, create, edit, and delete blog posts, and comment on other users' posts.

demo video: https://drive.google.com/file/d/1hLXtCs4gwyo3zKyQTMGW_0HjZQNducbu/view

Screenshots: 

![Alt text](<public/assets/img/Screenshot 2024-01-24 at 6.44.57 PM.png>)
![Alt text](<public/assets/img/Screenshot 2024-01-24 at 6.45.07 PM.png>)
![Alt text](<public/assets/img/Screenshot 2024-01-24 at 6.45.18 PM.png>)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Features

- User authentication for secure access.
- Create, edit, and delete blog posts.
- Comment on blog posts.
- Responsive design for a seamless experience on various devices.
- Rich text editing for blog posts.
- Search functionality to easily find relevant posts.
- User profiles with customization options.

