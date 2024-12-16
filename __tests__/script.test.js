// Mocking the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            articles: [
                {
                    title: "Test Article 1",
                    description: "Description for test article 1",
                    url: "http://example.com/article1"
                },
                {
                    title: "Test Article 2",
                    description: "Description for test article 2",
                    url: "http://example.com/article2"
                }
            ]
        }),
    })
);

beforeEach(() => {
    document.body.innerHTML = `
        <div id="news-container"></div>
        <select id="country-dropdown">
            <option value="us">Verenigde Staten</option>
        </select>
        <select id="category-dropdown">
            <option value="general">Algemeen</option>
        </select>
        <button id="fetch-news">Haal Nieuws Op</button>
    `;
});

test('fetchNews fetches articles and displays them', async () => {
    await fetchNews(); // Call the function to fetch news

    const articles = document.querySelectorAll('.article');
    expect(articles.length).toBe(2); // Check if two articles are displayed

    expect(articles[0].querySelector('h2').textContent).toBe("Test Article 1");
    expect(articles[0].querySelector('p').textContent).toBe("Description for test article 1");
    expect(articles[0].querySelector('a').href).toBe("http://example.com/article1/");
});

test('fetchNews handles no articles found', async () => {
    // Mock fetch to return no articles
    fetch.mockImplementationOnce(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ articles: [] }),
        })
    );

    await fetchNews(); // Call the function to fetch news

    const newsContainer = document.getElementById('news-container');
    expect(newsContainer.innerHTML).toBe('<p>Geen nieuwsartikelen gevonden.</p>'); // Check for no articles message
}); 