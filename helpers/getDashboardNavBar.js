
const getDashboardNavBar = () => {
    return`
    <nav>
       <a href="/dashboard">Productos</a>
       <a href="/dashboard?category=Camisetas">Camisetas</a>
       <a href="/dashboard?category=Pantalones">Pantalones</a>
       <a href="/dashboard?category=Zapatos">Zapatos</a>
       <a href="/dashboard?category=Accesorios">Accesorios</a>
       <a href="/dashboard/new">Nuevo Producto</a>
       <a href="/auth/logout">Cerrar Sesion</a>
    </nav>
    `;
};

module.exports = getDashboardNavBar;
