// Authentication state
let isAuthenticated = false;

// Your credentials
const validUsername = 'kelyrex';
const validPassword = '5gfygtf67t75Fj@$^&_t';

// DOM elements
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

// Event listeners
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    loginError.textContent = '';
});

window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
        loginError.textContent = '';
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === validUsername && password === validPassword) {
        isAuthenticated = true;
        loginModal.style.display = 'none';
        loginForm.reset();
        loginError.textContent = '';
        
        // Update UI
        loginBtn.textContent = 'Logout';
        togglePostSection(true);
    } else {
        loginError.textContent = 'Invalid username or password';
    }
});

// Logout functionality
loginBtn.addEventListener('click', function() {
    if (isAuthenticated) {
        isAuthenticated = false;
        this.textContent = 'Login to Post';
        togglePostSection(false);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    togglePostSection(isAuthenticated);
});
