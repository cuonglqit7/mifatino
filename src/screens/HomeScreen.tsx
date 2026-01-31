import { Button, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { removeAuth } from "../redux/reducers/authReducer";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeAuth({}));
    message.warning("Đã đăng xuất tài khoản");
  };
  return (
    <div>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default HomeScreen;
