document.addEventListener('DOMContentLoaded', function() {

    // Handle login form submission
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userData = {
                username: document.querySelector('#username-login').value.trim(),
                password: document.querySelector('#password-login').value.trim(),
            };

            if (userData.username && userData.password) {
                fetch('/api/users/login', {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => {
                    if (response.ok) {
                        document.location.replace('/dashboard');
                    } else {
                        alert('Failed to log in');
                    }
                });
            }
        });
    }

    // Handle signup form submission
    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userData = {
                username: document.querySelector('#username-signup').value.trim(),
                password: document.querySelector('#password-signup').value.trim(),
            };

            if (userData.username && userData.password) {
                fetch('/api/users/signup', {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => {
                    if (response.ok) {
                        document.location.replace('/dashboard');
                    } else {
                        alert('Failed to sign up');
                    }
                });
            }
        });
    }

    // Handle comment form submission
    const commentForm = document.querySelector('#comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const commentData = {
                post_id: document.querySelector('#post-id').value.trim(),
                comment_text: document.querySelector('#comment-text').value.trim(),
            };

            if (commentData.comment_text) {
                fetch('/api/comments', {
                    method: 'POST',
                    body: JSON.stringify(commentData),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => {
                    if (response.ok) {
                        document.location.reload();
                    } else {
                        alert('Failed to post comment');
                    }
                });
            }
        });
    }

});

//logout

const logoutLink = document.querySelector('#logout-link');
if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('Failed to log out');
            }
        });
    });
}