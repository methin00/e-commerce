import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useSelector } from "react-redux";

function Loading() {
  const { loading } = useSelector((store) => store.product);
  return (
    <div>
      {loading == true && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {loading == false && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={false}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default Loading;
