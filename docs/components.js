
module.exports = {
    components: {
        schemas: {
            Product: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: "ID del producto",
                        example: "1"
                    },
                    name: {
                        type: 'string',
                        description: "Nombre del producto",
                        example: "Camiseta Basica"
                    },
                    description: {
                        type: 'string',
                        description: "Descripcion del producto",
                        example: "Camiseta de algodon 100%"
                    },
                    image: {
                        type: 'string',
                        description: "URL de la imagen",
                        example: "/images/camiseta.jpg"
                    },
                    category: {
                        type: 'string',
                        description: "Categoria del producto",
                        example: "Camisetas"
                    },
                    size: {
                        type: 'string',
                        description: "Talla del producto",
                        example: "M"
                    },
                    price: {
                        type: 'number',
                        description: "Precio del producto",
                        example: 19.99
                    }
                }
            },
            _id: {
                type: 'string',
                description: "ID de un producto",
                example: "1"
            }
        }
    }
};