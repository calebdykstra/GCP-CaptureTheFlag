// Sample data for demonstration
let wikiData = [
    { title: 'Introduction', content: 'Welcome to the Space Wiki! This is the introduction.' },
    { title: 'Satellites', content: 'Satellites are objects that orbit planets.' },
    { title: 'Space Agencies', content: 'NASA, ESA, and others explore outer space.' }
];

// User accounts
let users = [];

// Function to render wiki content
function renderWiki() {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = ''; // Clear existing content

    wikiData.forEach((entry, index) => {
        const article = document.createElement('article');
        article.innerHTML = `<h2>${entry.title}</h2><p>${entry.content}</p><button onclick="editBlog(${index})">Edit</button><button onclick="deleteBlog(${index})">Delete</button>`;
        contentElement.appendChild(article);
    });
}

// Function to add a new blog post
function addBlog(event) {
    event.preventDefault();
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;
    if (title && content) {
        wikiData.push({ title, content });
        renderWiki();
        document.getElementById('blogForm').reset();
    }
}

// Function to delete a blog post
function deleteBlog(index) {
    wikiData.splice(index, 1);
    renderWiki();
}

// Function to edit a blog post
function editBlog(index) {
    const newTitle = prompt("Enter new title:");
    const newContent = prompt("Enter new content:");
    if (newTitle !== null && newContent !== null) {
        wikiData[index].title = newTitle;
        wikiData[index].content = newContent;
        renderWiki();
    }
}

// Function to handle sign-up form submission
function signUp(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    if (username && password) {
        // Check if username already exists
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            alert('Username already exists. Please choose a different one.');
        } else {
            // Create new user
            users.push({ username, password });
            alert('Sign-up successful! You can now login.');
            document.getElementById('signupForm').reset();
        }
    } else {
        alert('Please enter a username and password.');
    }
}

// Function to handle login form submission
function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    if (username && password) {
        // Check if user exists and password matches
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            alert('Login successful!');
            // Proceed with whatever action you want after successful login
        } else {
            alert('Invalid username or password.');
        }
    } else {
        alert('Please enter a username and password.');
    }
}

// Add event listener to the blog form
document.getElementById('blogForm').addEventListener('submit', addBlog);

// Add event listener to the sign-up form
document.getElementById('signupForm').addEventListener('submit', signUp);

// Add event listener to the login form
document.getElementById('loginForm').addEventListener('submit', login);
