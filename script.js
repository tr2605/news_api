const apiKey = 'f7e3c3f35bc746e8848e0adda8feafaa';

document.getElementById('fetch-news').addEventListener('click', fetchNews);

function fetchNews() {
    const country = document.getElementById('country-dropdown').value;
    const category = document.getElementById('category-dropdown').value;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;

    console.log(`Fetching news for country: ${country}, category: ${category}`); // Debugging log

    fetch(url)
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the response for debugging
            if (data && data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
                displayNews(data.articles);
            } else {
                document.getElementById('news-container').innerHTML = '<p>Geen nieuwsartikelen gevonden.</p>';
            }
        })
        .catch(error => console.error('Error fetching news:', error));
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Maak de container leeg

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');
        articleDiv.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description || 'Geen beschrijving beschikbaar.'}</p>
            <a href="${article.url}" target="_blank">Lees meer</a>
        `;
        newsContainer.appendChild(articleDiv);
    });
}
