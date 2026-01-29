import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Signup } from "../screens";
import { Typography } from "antd";

const { Title } = Typography;

const AuthRouter = () => {
  return (
    <div className="container">
      <div className="row">
        <div
          className="col d-none d-lg-block  text-center"
          style={{ marginTop: "15%" }}
        >
          <div className="mb-4">
            <img
              className="rounded-circle"
              src={
                "https://res.cloudinary.com/defgbyoii/image/upload/v1769685200/logo_MIFATINO_900x900_jx0skm.jpg"
              }
              alt=""
              style={{ width: 256, height: 256, objectFit: "cover" }}
            />
          </div>
          <Title>MIFATINO</Title>
        </div>
        <div className="col content-center">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default AuthRouter;
