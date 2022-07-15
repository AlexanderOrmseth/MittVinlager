import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Puff } from "react-loading-icons";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthRedirect from "./app/layout/AuthRedirect";
import Layout from "./app/layout/Layout";
import { useAppDispatch } from "./app/store/configureStore";
import GoogleButton from "./features/account/GoogleButton";
import HomePage from "./features/home/HomePage";
import { initTheme } from "./features/ui/themeSlice";
import DetailsPage from "./features/wine/DetailsPage";
import InventoryPage from "./features/wine/InventoryPage";
import NotFound from "./app/layout/NotFound";
import { useGetCurrentUserQuery } from "./app/services/authApi";
import { setToken, setUser } from "./features/account/accountSlice";

const ProfilePage = React.lazy(() => import("./features/account/ProfilePage"));
const Wishlist = React.lazy(() => import("./features/wishlist/Wishlist"));
const NewWinePage = React.lazy(() => import("./features/wine/NewWinePage"));
const UpdateWinePage = React.lazy(
  () => import("./features/wine/UpdateWinePage")
);

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // prevent fetch user
  const [skipToken, setSkipToken] = useState(true);


  const {
    data: authResponse,
    isLoading,
    isUninitialized,
    isSuccess
  } = useGetCurrentUserQuery(undefined, { skip: skipToken });


  useEffect(() => {
    if (isSuccess) return;

    // get token
    if (navigator.cookieEnabled) {
      const token = localStorage.getItem("token");
      if (token) {
        console.log("setting token to state");
        dispatch(setToken(token));
        setSkipToken(false);
      }
      dispatch(initTheme());
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log("Signed in user!");
      setSkipToken(true);
      dispatch(setUser(authResponse));
      navigate("/inventory");
    }
  }, [isSuccess]);

  const pageLoad = (
    <div className="w-screen h-screen flex justify-center items-center">
      <Puff height="6rem" width="6rem" stroke="#888" />
    </div>
  );

  if (isLoading) return pageLoad;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<GoogleButton />} />
          <Route
            path="profile"
            element={
              <AuthRedirect>
                <React.Suspense fallback={pageLoad}>
                  <ProfilePage />
                </React.Suspense>
              </AuthRedirect>
            }
          />
          <Route
            path="inventory"
            element={
              <AuthRedirect>
                <InventoryPage />
              </AuthRedirect>
            }
          />
          <Route
            path="inventory/new"
            element={
              <AuthRedirect>
                <React.Suspense fallback={pageLoad}>
                  <NewWinePage />
                </React.Suspense>
              </AuthRedirect>
            }
          />
          <Route
            path="inventory/:id"
            element={
              <AuthRedirect>
                <DetailsPage />
              </AuthRedirect>
            }
          />
          <Route
            path="inventory/:id/update"
            element={
              <AuthRedirect>
                <React.Suspense fallback={pageLoad}>
                  <UpdateWinePage />
                </React.Suspense>
              </AuthRedirect>
            }
          />
          <Route
            path="wishlist"
            element={
              <AuthRedirect>
                <React.Suspense fallback={pageLoad}>
                  <Wishlist />
                </React.Suspense>
              </AuthRedirect>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
