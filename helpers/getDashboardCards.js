
const getDashboardCars = (products) => {
    let html = '';
    for(let product of products) {
        html += `
        <div class="product-card">
           <h2>${product.name}</h2>
           <img src="${product.image}" alt="${product.name}">
           <a href="/dashboard/${product._id}">Ver</a>
        </div>
        `;
    }
    return html
};

module.exports = getDashboardCars;
