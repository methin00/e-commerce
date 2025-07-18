import React from "react";
import PageContainer from "../container/PageContainer";
import "../css/header.css";
import { FaBasketShopping } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";
import { useEffect } from "react";
import {
  setCount,
  getBasketFromStorage,
  addBasketToStorage,
} from "../redux/slices/basketSlice";
import Drawer from "./Drawer"
import { toggleDrawer, changeText } from "../redux/slices/appSlice";

function Header() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(false);
  const { productsIn} = useSelector((store) => store.basket);
  const dispatch = useDispatch();
  const { filterText } = useSelector(store => store.app)
  const changeTheme = () => {
    const root = document.getElementById("root");
    if (theme == false) {
      setTheme(true);
      root.style.backgroundColor = "black";
      root.style.color = "white";
    } else if (theme == true) {
      setTheme(false);
      root.style.backgroundColor = "white";
      root.style.color = "black";
    }
  };
  const getTotalCount = () => {
    let total = 0;
    productsIn &&
      productsIn.forEach((item) => {
        total += item.count;
      });
    return total;
  };

  
  const filterIt = async(text) => {
    dispatch(changeText(text))
    console.log(filterText)
  }

  useEffect(() => {
    dispatch(setCount(getTotalCount()));
    addBasketToStorage(productsIn);
  }, [productsIn]);



  return (
    <div className="maindiv">
      <div className="logotitle">
        <div>
          <img
            src="../src/images/logo.png"
            className="logo"
            onClick={() => navigate("/")}
          ></img>
        </div>
        <div className="title">
          <h3>ONLINE MARKET</h3>
        </div>
      </div>
      <div className="logotitle">
        <div>
          <input
            className="input"
            type="text"
            placeholder="Aramak istediğiniz nedir?"
            onChange={(e) => filterIt(e.target.value)}
          ></input>
        </div>
        <div style={{ display: "flex", marginTop: "20px" }}>
          {theme == false && (
            <FaLightbulb className="icon" onClick={() => changeTheme()} />
          )}
          {theme == true && (
            <FaRegLightbulb className="icon" onClick={() => changeTheme()} />
          )}
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginLeft: "10px",
            }}
          >
            <Badge
              badgeContent={productsIn.length}
              color="warning"
              style={{ margin: "0px" }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            
            >
              <FaBasketShopping className="icon" onClick={() => dispatch(toggleDrawer(true))}/>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
