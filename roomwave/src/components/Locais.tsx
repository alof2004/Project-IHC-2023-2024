export const ProductService = {
    getProductsData() {
        return [
            {
                id: '1000',
                Locais: 'Universidade de Aveiro',
                image: 'blue-t-shirt.jpg',
                duracao: 5,
                km:25,
                rating: 5
            },
            {
                id: '1001',
                Locais: 'Museu de Aveiro',
                image: 'blue-t-shirt.jpg',
                duracao: 10,
                km:30,
                rating: 3
            },
            {
                id: '1002',
                Locais: 'Praia da Barra',
                image: 'blue-t-shirt.jpg',
                duracao: 20,
                km:90,
                rating: 1
            },
        ];
    },


    getProducts() {
        return Promise.resolve(this.getProductsData());
    }
};

