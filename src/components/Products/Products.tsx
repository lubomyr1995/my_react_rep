import {FC, useEffect, useState} from "react";

import IProduct from "../../models/iProduct.ts";
import {Product} from "../Product/Product.tsx";
import style from "./Products.module.css";

const Products: FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(({products}) => {
                setProducts(products);
            });
    }, []);
    return (
        <section className={style.productsBox}>
            {products.length > 0 && products.map(product => <Product key={product.id} product={product}/>)}
        </section>
    );
};

export {Products};