// productController.test.js: Sirve para probar que el controlador de productos funciona correctamente.

const request  = require('supertest');
const mongoose = require('mongoose');
const app      = require('../app');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('API de Productos', () => {

    let productId;

    describe('POST /api/products', () => {
        it('deberia crear un producto nuevo', async () => {
            const newProduct = {
                name: "Zapatos Test",
                description: "Zapatos de prueba",
                image: "/images/test.jpg",
                category: "Zapatos",
                size: "L",
                price: 59.99
            };
            const res = await request(app)
                .post('/api/products')
                .send(newProduct);
            expect(res.statusCode).toBe(201);
            expect(res.body.name).toBe("Zapatos Test");
            productId = res.body._id;
        });
    });

    describe('GET /api/products', () => {
        it('deberia devolver todos los productos', async () => {
            const res = await request(app).get('/api/products');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /api/products/:id', () => {
        it('deberia devolver un producto por ID', async () => {
            const res = await request(app).get(`/api/products/${productId}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe("Zapatos Test");
        });

        it('deberia devolver 404 si no existe', async () => {
            const res = await request(app).get('/api/products/aaaaaaaaaaaaaaaaaaaaaaaa');
            expect(res.statusCode).toBe(404);
        });
    });

    describe('PUT /api/products/:id', () => {
        it('deberia actualizar un producto', async () => {
            const res = await request(app)
                .put(`/api/products/${productId}`)
                .send({ name: "Zapatos Actualizado", price: 69.99 });
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe("Zapatos Actualizado");
        });

        it('deberia devolver 404 si no existe', async () => {
            const res = await request(app)
                .put('/api/products/aaaaaaaaaaaaaaaaaaaaaaaa')
                .send({ name: "No existe" });
            expect(res.statusCode).toBe(404);
        });
    });

    describe('DELETE /api/products/:id', () => {
        it('deberia eliminar un producto', async () => {
            const res = await request(app).delete(`/api/products/${productId}`);
            expect(res.statusCode).toBe(200);
        });

        it('deberia devolver 404 si no existe', async () => {
            const res = await request(app).delete('/api/products/aaaaaaaaaaaaaaaaaaaaaaaa');
            expect(res.statusCode).toBe(404);
        });
    });

});