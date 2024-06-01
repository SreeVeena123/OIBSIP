function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('welcome-container').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('welcome-container').style.display = 'none';
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(byte => String.fromCharCode(byte)).join('');
    return hashedPassword;
}

function registerUser() {
    const email = document.getElementById('reg-email').value;
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!email || !username || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    hashPassword(password).then(hashedPassword => {
        localStorage.setItem('registeredUsername', username);
        localStorage.setItem('registeredPassword', hashedPassword);

        document.getElementById('reg-message').innerText = 'Registration successful. Please log in.';
        showLoginForm();
    });
}

function loginUser() {
    const storedUsername = localStorage.getItem('registeredUsername');
    const storedPassword = localStorage.getItem('registeredPassword');

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    hashPassword(password).then(hashedPassword => {
        if (username === storedUsername && hashedPassword === storedPassword) {
            document.getElementById('message').innerText = 'Login successful';
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('welcome-container').style.display = 'block';
        } else {
            document.getElementById('message').innerText = 'Invalid username or password';
            document.getElementById('welcome-container').style.display = 'none';
        }
    });
}

function goBackToLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('welcome-container').style.display = 'none';
        // Clear input fields
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    
    // Clear registration form input fields if needed
    document.getElementById('reg-email').value = '';
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-password').value = '';
    document.getElementById('confirm-password').value = '';
    
    // Clear registration form message
    document.getElementById('reg-message').innerText = '';

}
