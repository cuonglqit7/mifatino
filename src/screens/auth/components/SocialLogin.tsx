import { Button, message } from "antd";
import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebases/firebaseConfig";
import handleAPI from "../../../apis/handleAPI";
import { addAuth } from "../../../redux/reducers/authReducer";
import { localDataNames } from "../../../constants/appInfos";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
provider.setCustomParameters({
  login_hint: "mifatinofashion@gmail.com",
});

interface Props {
  isRemember: boolean;
}

const SocialLogin = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { isRemember } = props;

  const dispatch = useDispatch();
  const handleLoginWithGoodle = async () => {
    setIsLoading(true);

    try {
      const result: UserCredential = await signInWithPopup(auth, provider);

      if (result) {
        const user = result.user;

        const data = {
          name: user.displayName,
          email: user.email,
        };

        const api = `/auth/google-login`;

        try {
          const res: any = await handleAPI(api, data, "post");

          res && dispatch(addAuth(res.data));
          message.success(res.message);

          if (isRemember) {
            localStorage.setItem(
              localDataNames.authData,
              JSON.stringify(res.data),
            );
          }
        } catch (error: any) {
          message.error(error.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        message.error("Không thể đăng nhập bằng Google");
      }
    } catch (error: any) {
      message.error("Không thể đăng nhập");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      loading={isLoading}
      onClick={handleLoginWithGoodle}
      style={{
        width: "100%",
      }}
      size="large"
      icon={
        <img
          width={24}
          height={24}
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google-logo"
        />
      }
    >
      Đăng nhập bằng Google
    </Button>
  );
};

export default SocialLogin;
