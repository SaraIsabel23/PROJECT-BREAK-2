
module.exports = {
    paths: {
        "/api/products": {
            get: {
                tags: { Products: "Obtener todos los productos" },
                description: "Devuelve todos los productos",
                operationId: "getProducts",
                parameters: [],
                responses: {
                    200: { description: "Lista de productos" },
                    500: { description: "Error del servidor" }
                }
            },
            post: {
                tags: { Products: "Crear un producto" },
                description: "Crea un nuevo producto",
                operationId: "createProduct",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Product"
                            }
                        }
                    }
                },
                responses: {
                    201: { description: "Producto creado" },
                    500: { description: "Error del servidor" }
                }
            }
        },
        "/api/products/{productId}": {
            get: {
                tags: { Products: "Obtener un producto" },
                description: "Devuelve un producto por su ID",
                operationId: "getProductById",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        schema: {
                            $ref: "#/components/schemas/_id"
                        },
                        description: "ID del producto"
                    }
                ],
                responses: {
                    200: { description: "Producto encontrado" },
                    404: { description: "Producto no encontrado" },
                    500: { description: "Error del servidor" }
                }
            },
            put: {
                tags: { Products: "Actualizar un producto" },
                description: "Actualiza un producto",
                operationId: "updateProduct",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        schema: {
                            $ref: "#/components/schemas/_id"
                        },
                        description: "ID del producto a actualizar"
                    }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Product"
                            }
                        }
                    }
                },
                responses: {
                    200: { description: "Producto actualizado" },
                    404: { description: "Producto no encontrado" },
                    500: { description: "Error del servidor" }
                }
            },
            delete: {
                tags: { Products: "Eliminar un producto" },
                description: "Elimina un producto",
                operationId: "deleteProduct",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        schema: {
                            $ref: "#/components/schemas/_id"
                        },
                        description: "ID del producto a eliminar"
                    }
                ],
                responses: {
                    200: { description: "Producto eliminado" },
                    404: { description: "Producto no encontrado" },
                    500: { description: "Error del servidor" }
                }
            }
        }
    }
};