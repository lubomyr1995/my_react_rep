import {FC, ReactNode} from "react";

import IProduct from "../../models/iProduct.ts";
import style from "./Product.module.css";

interface IProductProps {
    product: IProduct
}

type IProductTypeProps = IProductProps & { children?: ReactNode };
const Product: FC<IProductTypeProps> = ({product}) => {
    return (
        <section className={style.productBox}>
            <h2 className={style.m1}>{product.id}) {product.brand} {product.title}</h2>
            <img className={style.img} src={product.images[0]} alt={product.title}/>
            <h5>Rating: {product.rating}</h5>
            <h5>Category: {product.category}</h5>
            <h5>Quantity: {product.stock}</h5>
            <p>{product.description}</p>
            <div>
                <span><b>{product.price}$</b></span>
                <span> Discount: {product.discountPercentage}%</span>
                <button>Add to Cart</button>
            </div>
        </section>
    );
};

export {Product};