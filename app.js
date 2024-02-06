// Sample data for demonstration
let wikiData = [
    { title: 'Introduction', content: 'Welcome to the Space Wiki! This is the introduction.' },
    { title: 'Satellites', content: 'Satellites are objects that orbit planets.' },
    { title: 'Space Agencies', content: 'NASA, ESA, and others explore outer space.' }
];

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

// Initial render
renderWiki();

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
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        // Here you can save the user credentials or create a fake account
        alert('Sign-up successful!');
        document.getElementById('signupForm').reset();
    } else {
        alert('Please enter a username and password.');
    }
}

// Add event listener to the blog form
document.getElementById('blogForm').addEventListener('submit', addBlog);

// Add event listener to the sign-up form
document.getElementById('signupForm').addEventListener('submit', signUp);
