import React, { useCallback, useEffect, useState } from "react";
import { Puff } from "react-loading-icons";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AuthRedirect from "./app/layout/AuthRedirect";
import Layout from "./app/layout/Layout";
import { useAppDispatch } from "./app/store/configureStore";
import HomePage from "./features/home/HomePage";
import { initTheme } from "./features/ui/themeSlice";
import DetailsPage from "./features/wine/DetailsPage";
import InventoryPage from "./features/wine/InventoryPage";
import NotFound from "./app/layout/NotFound";
import { authApi } from "./app/services/authApi";
import { setToken, setUser, signOut } from "./features/account/accountSlice";

const ProfilePage = React.lazy(() => import("./features/account/ProfilePage"));
const Wishlist = React.lazy(() => import("./features/wishlist/Wishlist"));
const NewWinePage = React.lazy(() => import("./features/wine/NewWinePage"));
const UpdateWinePage = React.lazy(
  () => import("./features/wine/UpdateWinePage")
);

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const initializeApp = useCallback(async () => {
    try {
      if (navigator.cookieEnabled) {
        dispatch(initTheme());

        // get token
        const token = localStorage.getItem("token");
        if (token) {

          // add token to account state
          dispatch(setToken(token));

          // get user with token from state
          const res = await dispatch(
            authApi.endpoints.getCurrentUser.initiate()
          ).unwrap();

          // set user
          dispatch(setUser(res));

          // navigate if user is on homePage
          if (location.pathname === "/") {
            navigate("/inventory");
          }
        }
      }
    } catch (error: any) {
      // only log error if status-code is not 401
      if (error?.status !== 401) {
        console.error(error);
      }
      
      dispatch(signOut());
      navigate("/");

    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    initializeApp().finally(() => setLoading(false));
  }, [initializeApp]);

  const pageLoad = (
    <div className="w-screen h-screen flex justify-center items-center">
      <Puff height="6rem" width="6rem" stroke="#888" />
    </div>
  );

  if (loading) return pageLoad;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
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
  );

}

export default App;
