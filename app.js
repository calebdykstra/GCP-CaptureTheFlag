// Sample data for demonstration
const wikiData = [
    { title: 'Introduction', content: 'Welcome to the Space Wiki! This is the introduction.' },
    { title: 'Satellites', content: 'Satellites are objects that orbit planets.' },
    { title: 'Space Agencies', content: 'NASA, ESA, and others explore outer space.' }
];

// Function to render wiki content
function renderWiki() {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = ''; // Clear existing content

    wikiData.forEach(entry => {
        const article = document.createElement('article');
        article.innerHTML = `<h2>${entry.title}</h2><p>${entry.content}</p>`;
        contentElement.appendChild(article);
    });
}

// Function to handle registration form submission
function handleRegistration(event) {
    event.preventDefault(); // Prevent form submission to a server

    // Get form inputs
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    // Store user data locally (for demonstration purposes)
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Redirect or display a success message
    alert('Registration successful!');

    // Clear form fields
    document.getElementById('registration-form').reset();
}

// Add event listener to the registration form
document.getElementById('registration-form').addEventListener('submit', handleRegistration);

// Function to handle login form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent form submission to a server

    // Get form inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Retrieve user data from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Check if the provided credentials match the stored user data
    if (username === storedUsername && password === storedPassword) {
        alert('Login successful!');
        // Redirect or perform other actions upon successful login
    } else {
        alert('Invalid username or password. Please try again.');
    }

    // Clear form fields
    document.getElementById('login-form').reset();
}

// Add event listener to the login form
document.getElementById('login-form').addEventListener('submit', handleLogin);

// Initial render
renderWiki();

