# Tienda de Ropa - Project Break

Tienda online de ropa desarrollada con Node.js, Express y MongoDB.
Permite ver productos, filtrar por categorias y gestionarlos
desde un panel de administracion.

## Tecnologias utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- Swagger (documentacion API)
- Dotenv
- Method-override

## Instalacion

1. Clonar el repositorio:
   git clone https://github.com/SaraIsabel23/PROJECT-BREAK-2.git

2. Instalar dependencias:
   npm install

3. Crear archivo .env con las siguientes variables:
   MONGO_URI=tu_uri_de_mongodb
   PORT=3000

4. Ejecutar el servidor:
   npm start

## Estructura del proyecto

- /config - Configuracion de base de datos
   |--db.js
   ****|--firebase.js
- /controllers - Logica de las rutas
   |--apiController.js
   |--authController.js
   |--dashboardController.js
   |--productController.js
- /data - Datos temporales (Se eliminará cuando logre conectar MONGO DB)
   |--productsTemp.js
- /docs - Documentacion Swagger
   |--basicInfo.js
   |--components.js
   |--index.js
   |--products.js
- /helpers - Funciones para generar HTML
   |--baseHtml.js
   |--getDashboardCards.js
   |--getDashboardNavBar.js
   |--getNavBar.js
   |--getProductCards.js
- ****/middlewares - Verificación
   |--authMiddleware.js
- /models - Esquema de datos
   |--Product.js
   ****|--User.js
- /public - Archivos estaticos (CSS, imagenes)
   |--/images
   |--styles.css
- /routes - Definicion de rutas
   |--apiRoutes.js
   |--authRoutes.js
   |--dashboardRoutes.js
   |--index.js
   |--productRoutes.js
- ****/test - Testing
   |--productController.test.js
-.env
-.gitignore
-index.js



## Rutas publicas

| Metodo | Ruta                 | Descripcion                |
|--------|----------------------|----------------------------|
| GET    | /products            | Ver todos los productos    |
| GET    | /products?category=X | Filtrar por categoria      |
| GET    | /products/:id        | Ver detalle de un producto |

## Rutas del Dashboard

| Metodo | Ruta                  | Descripcion                     |
|--------|-----------------------|---------------------------------|
| GET    | /dashboard            | Ver todos los productos (admin) |
| GET    | /dashboard/new        | Formulario crear producto       |
| POST   | /dashboard            | Crear producto                  |
| GET    | /dashboard/:id        | Detalle producto (admin)        |
| GET    | /dashboard/:id/edit   | Formulario editar producto      |
| PUT    | /dashboard/:id        | Actualizar producto             |
| DELETE | /dashboard/:id/delete | Eliminar producto               |

## API Endpoints

| Metodo | Ruta              | Descripcion                |
|--------|-------------------|----------------------------|
| GET    | /api/products     | Todos los productos (JSON) |
| GET    | /api/products/:id | Un producto (JSON)         |
| POST   | /api/products     | Crear producto             |
| PUT    | /api/products/:id | Actualizar producto        |
| DELETE | /api/products/:id | Eliminar producto          |

## Documentacion API

Disponible en: http://localhost:3000/api-docs

## Autor/a

Sara Isabel del Sastre Ortega