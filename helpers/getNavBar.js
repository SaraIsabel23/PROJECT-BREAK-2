
const getNavBar = () => {
    return`
    <nav>
       <a href="/products">Productos</a>
       <a href="/products?category=Camisetas">Camisetas</a>
       <a href="/products?category=Pantalones">Pantalones</a>
       <a href="/products?category=Zapatos">Zapatos</a>
       <a href="/products?category=Accesorios">Accesorios</a>
       <a href="/dashboard">Inicio Admin.</a>
    </nav>
    `;
};

module.exports = getNavBar;
