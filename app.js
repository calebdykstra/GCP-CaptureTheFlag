
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

// Initial render
renderWiki();
