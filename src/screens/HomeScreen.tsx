import { Button, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  refreshToken,
  removeAuth,
} from "../redux/reducers/authReducer";
import handleAPI from "../apis/handleAPI";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  const handleLogout = () => {
    dispatch(removeAuth({}));
    message.warning("Đã đăng xuất tài khoản");
  };

  const getProducts = async () => {
    const api = `/storage/products`;

    try {
      const res = await handleAPI(api);

      console.log(res);
    } catch (error: any) {
      console.log(error);
      if (error.error === "jwt expired") {
        handleRefreshToken();
      }
    }
  };

  const handleRefreshToken = async () => {
    const api = `/auth/refresh-token?id=${auth._id}`;

    try {
      const res = await handleAPI(api);
      dispatch(refreshToken(res.data.token));
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={getProducts}>Log out</Button>
    </div>
  );
};

export default HomeScreen;
