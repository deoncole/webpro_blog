// to handle when the user signs up, add async to the front of it to make it work asyncronous 
async function signupFormHandler(event) {
    event.preventDefault();

    // query the document for the selectors by their id and set the text from text area to a variable
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // conditional to check if the user filled out the textarea. if so create a new user using the post route
    if (username && email && password) {
        const response = await fetch('api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('Success!!');
        } else {
            alert(response.statusText);
        }
    }
}

// function for the user to log in
async function loginFormHandler(event) {
    event.preventDefault();

    // query the document for the selectors by their id and set the text from text area to a variable
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // conditional to check if the user filled out the textareas. if so log the user in using the post route
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

// add an eventlistener to the buttons
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);