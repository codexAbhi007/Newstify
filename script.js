const main = document.getElementById("main-content");
const categorySelect = document.getElementById("category-select");
const searchInput = document.querySelector("input[type='text']");
const searchButton = document.querySelector(".search-btn");

async function getNews(category = "general", query = "") {
  try {
    const apiKey = "a10ea072ce5343b3815e37c9be4e7005"; 
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    if (query) {
      url += `&q=${query}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

async function displayNews(category = "general", query = "") {
  main.innerHTML = "";
  const articles = await getNews(category, query);

  if (articles.length === 0) {
    main.innerHTML = "<p>No news available at the moment.</p>";
    return;
  }

  articles.forEach((article) => {
    main.innerHTML += `
            <article>
                <div class="img-container">
                    <img src="${
                      article.urlToImage || "default-image.jpg"
                    }" alt="Article Image">
                </div>
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <span class="article-source">${article.source.name}</span>
                    <p class="article-desc">${
                      article.description || "No description available."
                    }</p>
                    <span class="article-date">${new Date(
                      article.publishedAt
                    ).toLocaleDateString()}</span>
                    <span class="article-author">${
                      article.author || "Unknown Author"
                    }</span>
                    <a href="${
                      article.url
                    }" target="_blank"><button class="button-read">Read More</button></a>
                </div>
            </article>`;
  });
}

categorySelect.addEventListener("change", () => {
  const selectedCategory = categorySelect.value;
  const query = searchInput.value.trim();
  displayNews(selectedCategory, query);
});


searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  const selectedCategory = categorySelect.value;
  displayNews(selectedCategory, query);
});


displayNews();
