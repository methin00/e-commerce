import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProducts,
  setSelectedProduct,
  setCounter,
} from "../redux/slices/productSlice";
import "../css/details.css";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket } from "../redux/slices/basketSlice";

function ProductDetails() {
  const { selectedProduct, products, loading, counter } = useSelector(
    (store) => store.product
  );
  const { productsIn } = useSelector((store) => store.basket);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find((item) => item.id === Number(id));
      if (found) {
        dispatch(setSelectedProduct(found));
      } else {
        navigate("/");
      }
    }
  }, [products, id, dispatch]);
  const addItem = (id, count, price, description, image, title) => {
    dispatch(addToBasket({ id: id, count: count, price: price, description: description, image: image, title:title }));
  };

  return (
    <div className="details-page">
      {products &&
        products.map((item) => {
          if (item.id == id) {
            return (
              <div className="flex-row" key={item.id}>
                <div>
                  <img className="image" src={item.image}></img>
                </div>
                <div className="textdiv">
                  <div>
                    <h1 className="item-title">{item.title}</h1>
                    <p className="item-description">{item.description}</p>
                    <div className="flex-row">
                      <p className="item-ratecount">
                        {item.rating.count} kişi değerlendirdi.
                      </p>
                      <h2 className="item-rating">{item.rating.rate} puan</h2>
                    </div>
                  </div>
                  <div className="pricebuttonflex">
                    <div>
                      <h2 className="item-price">Fiyat: {item.price}TL</h2>
                    </div>
                    <div className="addbasketflex">
                      <div className="icons">
                        <CiCirclePlus
                          className="icon4basket"
                          onClick={() => {
                            dispatch(setCounter(counter + 1));
                          }}
                        />
                        <p className="counterbasket">{counter}</p>
                        <CiCircleMinus
                          className="icon4basket"
                          onClick={() => {
                            if (counter > 1) dispatch(setCounter(counter - 1));
                          }}
                        />
                      </div>
                      <div>
                        <button
                          className="button-add"
                          onClick={() => {
                            addItem(item.id, counter, item.price, item.description, item.image, item.title);
                          }}
                        >
                          Sepete Ekle
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}

export default ProductDetails;
