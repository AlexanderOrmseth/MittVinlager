import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../../app/store/configureStore";
import { signIn } from "./accountSlice";
import { CredentialResponse } from "google-one-tap";
import { useNavigate } from "react-router-dom";

const GoogleButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const googleButton = useRef<HTMLDivElement | null>(null);

  const login = useCallback(
    async (response: CredentialResponse) => {
      try {
        await dispatch(
          signIn({ accessToken: response.credential, provider: "GOOGLE" })
        );

        navigate("/inventory");
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    console.log("Render google button");
    if (typeof window === "undefined" || !google || !googleButton.current) {
      return;
    }

    try {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
        callback: login,
      });

      google.accounts.id.renderButton(googleButton.current, {
        theme: "outline",
        size: "large",
      });
    } catch (error) {
      console.error(error);
    }
  }, [login]);

  return <div ref={googleButton} id="google-button"></div>;
};

export default GoogleButton;
