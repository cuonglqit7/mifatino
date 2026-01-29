import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Signup } from "../screens";

const AuthRouter = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col d-none d-lg-block">
          <img src="" alt="" />
        </div>
        <div className="col content-center">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default AuthRouter;
