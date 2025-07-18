import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/product.css";
import { useDispatch, useSelector } from "react-redux";

function Product({ product }) {
  const { id, title, price, image, category } = product;
  const navigate = useNavigate();
  return (
    <div
      className="card"
      onClick={() => {
        navigate("product-details/" + id);
      }}
    >
      <div style={{ height: "350px" }}>
        <img src={image} style={{ width: "128px", height: "128px" }}></img>
        <h3 style={{ height: "135px" }}>{title}</h3>
        <h2>Fiyat: {price}TL</h2>
      </div>
      <div>
        <button
          className="button-details"
          onClick={() => {
            navigate("product-details/" + id);
          }}
        >
          Ürüne Git
        </button>
      </div>
    </div>
  );
}

export default Product;
