import React, { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Puff } from "react-loading-icons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRedirect from "./app/layout/AuthRedirect";
import Layout from "./app/layout/Layout";
import { useAppDispatch } from "./app/store/configureStore";
import { fetchCurrentUser } from "./features/account/accountSlice";
import GoogleButton from "./features/account/GoogleButton";
import HomePage from "./features/home/HomePage";
import { initTheme } from "./features/ui/themeSlice";
import DetailsPage from "./features/wine/DetailsPage";
import InventoryPage from "./features/wine/InventoryPage";

// lazy load
const ProfilePage = React.lazy(() => import("./features/account/ProfilePage"));
const Wishlist = React.lazy(() => import("./features/wishlist/Wishlist"));
const NewWinePage = React.lazy(() => import("./features/wine/NewWinePage"));
const UpdateWinePage = React.lazy(
  () => import("./features/wine/UpdateWinePage")
);

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      dispatch(initTheme());
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().finally(() => setLoading(false));
  }, [initApp]);

  const pageLoad = (
    <div className="w-screen h-screen flex justify-center items-center">
      <Puff height="6rem" width="6rem" stroke="#888" />
    </div>
  );

  if (loading) return pageLoad;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
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
            <Route path="*" element={<div>Not Found!</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
