import { useState } from "react";
import "./App.css";
import PageContainer from "./container/PageContainer";
import Header from "./components/Header";
import { getProducts } from "./redux/slices/productSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import RouterConfig from "./config/RouterConfig";
import Loading from "./components/Loading";
import ProductDetails from "./components/ProductDetails";
import TemporaryDrawer from "./components/Drawer";

function App() {

  return (
    <div>
      <PageContainer>
        <Loading />
        <Header />
        <RouterConfig />
        <TemporaryDrawer/>

      </PageContainer>
    </div>
  );
}

export default App;
