<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Wiki</title>
</head>
<body>
    <div id="content"></div>
    <hr>
    <form id="blogForm">
        <input type="text" id="blogTitle" placeholder="Enter title">
        <textarea id="blogContent" placeholder="Enter content"></textarea>
        <button type="submit">Post</button>
    </form>

    <script>
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

        // Add event listener to the form
        document.getElementById('blogForm').addEventListener('submit', addBlog);
    </script>
</body>
</html>
