const baseUrl = "https://api.spoonacular.com/recipes/";
const apiKey = "7f99eceaf5664c72a7a55716c95a8165";

async function fetchExtendedIngredients() {
    try {
        const requests = Array.from({ length: 30 }, (_, i) =>
            fetch(`${baseUrl}${i}/information?apiKey=${apiKey}`)
                .then(response => response.ok ? response.json() : null)
                .catch(error => {
                    console.warn(`Failed to fetch data for recipe ID: ${i}`, error);
                    return null;
                })
        );
        const results = await Promise.all(requests);
        return results.filter(data => data);
    } catch (error) {
        console.error("Error fetching ingredients:", error);
        return [];
    }
}

fetchExtendedIngredients().then(results => {
    const wrapper = document.querySelector(".container");
    if (!wrapper) return;

    if (results.length) {
        results.forEach(el => {
            wrapper.insertAdjacentHTML('beforeend', `
                <div class="main">
                    <ul class="cards">
                        <li class="cards_item">
                            <div class="card">
                                <div class="card_image">
                                    <span class="note">Seasonal</span>
                                    <img src="${el.image}" alt="${el.title}" />
                                    <span class="card_price"><span>$</span>16</span>
                                </div>
                                <div class="card_content">
                                    <h2 class="card_title">${el.title}</h2>
                                    <div class="card_text">
                                        <p>${el.summary}</p>
                                        <hr />
                                        <p>Choose your drizzle: <strong>cherry-balsamic vinegar</strong>, <strong>local honey</strong>, or
                                            <strong>housemade chocolate sauce</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            `);
        });
    }
});
