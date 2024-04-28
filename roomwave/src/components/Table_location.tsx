import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './Locais.tsx';
import '../css/Table.css';


export default function SizeDemo() {
    const [products, setProducts] = useState<{ id: string; Locais: string; image: string; duracao: number; km: number; rating: number; }[]>([]);

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []);

    return (
        <div className="card">
            <DataTable value={products}  tableStyle={{ minWidth: '50rem' }}>
                <Column field="Locais" header="Local Próximo"></Column>
                <Column field="duracao" header="Duração(min)"></Column>
                <Column field="km" header="Distância(km)"></Column>
                <Column field="rating" header="Avaliação"></Column>
            </DataTable>
        </div>
    );
}
        