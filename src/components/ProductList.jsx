import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slices/productSlice";
import Product from "./Product";
import '../css/product.css'

function ProductList() {
  const { products } = useSelector((store) => store.product);
  const { filterText } = useSelector((store) => store.app)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const filteredItems = filterText.length < 2 ? products : products.filter((item) => item.title.toLowerCase().includes(filterText.toLowerCase()))
  return (
    <div className="card-flex">
      {products &&
        filteredItems.map((item) => {
          return <Product key={item.id} product={item} />;
        })}
    </div>
  );

}

export default ProductList;
