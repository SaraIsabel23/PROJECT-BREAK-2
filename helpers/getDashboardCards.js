
const getDashboardCars = (products) => {
    let html = '<div class="products-grid">';
    for(let product of products) {
        html += `
        <div class="product-card">
           <h2>${product.name}</h2>
           <img src="${product.image}" alt="${product.name}">
           <a href="/dashboard/${product._id}" class="btn-ver">Ver</a>
        </div>
        `;
    }
    html += '</div>'
    return html
};

module.exports = getDashboardCars;
