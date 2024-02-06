// Sample data for demonstration
let blogs = [
    { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.' },
    { id: 2, title: 'Second Blog Post', content: 'This is the content of the second blog post.' }
];

// Function to render blogs
function renderBlogs() {
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = ''; // Clear existing content

    blogs.forEach(blog => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<h3>${blog.title}</h3><p>${blog.content}</p><button onclick="deleteBlog(${blog.id})">Delete</button>`;
        blogList.appendChild(listItem);
    });
}

// Function to add a new blog
function addBlog(event) {
    event.preventDefault(); // Prevent form submission to a server

    // Get form inputs
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // Generate a unique ID for the new blog
    const id = blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1;

    // Add the new blog to the list
    blogs.push({ id, title, content });

    // Re-render the blogs
    renderBlogs();

    // Clear form fields
    document.getElementById('blog-form').reset();
}

// Function to delete a blog
function deleteBlog(id) {
    // Filter out the blog with the specified ID
    blogs = blogs.filter(blog => blog.id !== id);

    // Re-render the blogs
    renderBlogs();
}

// Initial render
renderBlogs();

