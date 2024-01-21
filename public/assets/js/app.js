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
                        // Redirect to the dashboard or another page
                        window.location.href = '/dashboard'; // Adjust this URL as needed
                    } else {
                        alert('Failed to log in');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
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
                username: document.querySelector('#username').value.trim(),
                password: document.querySelector('#password').value.trim(),
            };
    
            if (userData.username && userData.password) {
                fetch('/api/users/signup', {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => response.json()) // Assuming the server sends a JSON response
                .then(data => {
                    // Check for success or error message in the JSON response
                    if (data.successMessage) {
                        alert(data.successMessage);
                        window.location.href = '/login'; // Redirect to login page
                    } else if (data.errorMessage) {
                        alert(data.errorMessage);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
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

            fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify(commentData),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => {
                if (response.ok) {
                    // Reload the current page to show the new comment
                    window.location.reload();
                } else {
                    alert('Failed to post comment');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
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