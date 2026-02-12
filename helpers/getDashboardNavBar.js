
const getDashboardNavBar = () => {
    return`
    <a href="/dashboard">Productos</a>
    <a href="/dashboard?category=Camisetas">Camisetas</a>
    <a href="/dashboard?category=Pantalones">Pantalones</a>
    <a href="/dashboard?category=Zapatos">Zapatos</a>
    <a href="/dashboard?category=Accesorios">Accesorios</a>
    <a href="/dashboard">Dashboard</a>
    `;
};

module.exports = getDashboardNavBar;
