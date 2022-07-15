import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../../app/store/configureStore";
import { setUser } from "./accountSlice";
import { CredentialResponse } from "google-one-tap";
import { useNavigate } from "react-router-dom";
import { ExternalAuth } from "../../app/models/externalAuth";
import { useExternalLoginMutation } from "../../app/services/authApi";

const GoogleButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const googleButton = useRef<HTMLDivElement | null>(null);

  const [externalLogin, { isLoading }] = useExternalLoginMutation();

  const login = useCallback(
    async (response: CredentialResponse) => {
      const externalAuth: ExternalAuth = {
        accessToken: response.credential,
        provider: "GOOGLE",
      };
      await externalLogin(externalAuth)
        .unwrap()
        .then((res) => {
          console.log(res);
          dispatch(setUser(res));
          navigate("/inventory");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [dispatch, externalLogin, navigate]
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

  return (
    <div>
      {!isLoading ? (
        <div ref={googleButton} id="google-button"></div>
      ) : (
        <div className="text-less-mutes">Vennligst vent...</div>
      )}
    </div>
  );
};

export default GoogleButton;
