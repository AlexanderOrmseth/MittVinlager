import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../../app/store/configureStore";
import { setUser } from "./accountSlice";
import { CredentialResponse } from "google-one-tap";
import { useNavigate } from "react-router-dom";
import { ExternalAuth } from "../../app/models/externalAuth";
import { useExternalLoginMutation } from "../../app/services/authApi";
import { toast } from "react-hot-toast";

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
          dispatch(setUser(res));
          toast.success("Velkommen!", { position: "bottom-right" });
          navigate("/inventory");
        })
        .catch((err) => {
          if (err?.data?.title) {
            toast.error(err.data.title);
            return;
          }

          toast.error("Server Error!");
          console.error(err);
        });
    },
    [dispatch, externalLogin, navigate]
  );

  useEffect(() => {
    try {
      if (typeof window === "undefined" || !google || !googleButton.current) {
        return;
      }

      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
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
    <div className="i-flex-row">
      <div
        ref={googleButton}
        className={`${isLoading ? "hidden" : "block"}`}
        id="google-button"
      ></div>
      {isLoading && <div className="text-less-mutes">Vennligst vent...</div>}
    </div>
  );
};

export default GoogleButton;
