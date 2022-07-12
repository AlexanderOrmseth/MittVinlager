import { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Puff } from "react-loading-icons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRedirect from "./app/layout/AuthRedirect";
import Layout from "./app/layout/Layout";
import { useAppDispatch } from "./app/store/configureStore";
import { fetchCurrentUser } from "./features/account/accountSlice";
import GoogleButton from "./features/account/GoogleButton";
import ProfilePage from "./features/account/ProfilePage";
import HomePage from "./features/home/HomePage";
import { initTheme } from "./features/ui/themeSlice";
import DetailsPage from "./features/wine/DetailsPage";
import InventoryPage from "./features/wine/InventoryPage";
import NewWinePage from "./features/wine/NewWinePage";
import UpdateWinePage from "./features/wine/UpdateWinePage";
import Wishlist from "./features/wishlist/Wishlist";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      console.log("Fetching current user");
      dispatch(initTheme());
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().finally(() => setLoading(false));
  }, [initApp]);

  if (loading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Puff height="6rem" width="6rem" stroke="#888" />
      </div>
    );

  return (
    <>
      <div id="google-button"></div>
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
                  <ProfilePage />
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
                  <NewWinePage />
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
                  <UpdateWinePage />
                </AuthRedirect>
              }
            />
            <Route
              path="wishlist"
              element={
                <AuthRedirect>
                  <Wishlist />
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
