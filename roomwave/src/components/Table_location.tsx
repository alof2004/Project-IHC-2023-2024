import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import "../css/Table.css";
import { Product } from './Locais.tsx';

interface TemplateDemoProps {}

const TemplateDemo: React.FC<TemplateDemoProps> = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setProducts(Product.getProductsData());
    }, []);

    const formatCurrency = (product: Product) => {
        return <span>{product.duracao} km´s</span>;
    };

    const priceBodyTemplate = (product: Product) => {
        return formatCurrency(product);
    };

    const ratingBodyTemplate = (product: Product) => {
        return <Rating value={product.rating} readOnly cancel={false} />;
    };

    const durationBodyTemplate = (product: Product) => {
        return <span>{product.duracao} min</span>;
    };

    const categoryBodyTemplate = (product: Product) => {
        return <span>{product.categoria}</span>;
    };
    

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Estabelecimentos próximos:</span>
        </div>
    );

    return (
        <div className="card">
            <DataTable value={products} header={header}>
                <Column field="Locais" header="Local"></Column>
                <Column field="duracao" header="Duração" body={durationBodyTemplate}></Column>
                <Column field="km" header="Distância" body={priceBodyTemplate}></Column>
                <Column field="Categoria" header="Categoria" body={categoryBodyTemplate} ></Column>
                <Column field="rating" header="Avaliação" body={ratingBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default TemplateDemo;
