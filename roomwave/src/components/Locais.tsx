export interface Product {
    id: string;
    Locais: string;
    duracao: number;
    km: number;
    rating: number;
    categoria:string;
}

export const Product = {
    getProductsData(): Product[] {
        return [
            {
                id: '1000',
                Locais: 'Universidade de Aveiro',
                duracao: 5,
                km: 25,
                rating: 5,
                categoria:"Ensino"
            },
            {
                id: '1001',
                Locais: 'Museu de Aveiro',
                duracao: 10,
                km: 30,
                rating: 3,
                categoria:"História"
            },
            {
                id: '1002',
                Locais: 'Praia da Barra',
                duracao: 20,
                km: 90,
                rating: 1,
                categoria:"Lazer"
            },
        ];
    },

    getProducts(): Promise<Product[]> {
        return Promise.resolve(this.getProductsData());
    }
};
