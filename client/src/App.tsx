import { lazy, useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AuthRedirect from "./app/layout/AuthRedirect";
import Layout from "./app/layout/Layout";
import { useAppDispatch } from "./app/store/configureStore";
import HomePage from "./features/home/HomePage";
import { initTheme } from "./features/ui/themeSlice";
import NotFound from "./app/layout/NotFound";
import { authApi } from "./app/services/authApi";
import { setToken, setUser, signOut } from "./features/account/accountSlice";
import PageLoad from "./app/layout/PageLoad";
import Suspense from "./app/layout/Suspense";

const InventoryPage = lazy(() => import("./features/wine/InventoryPage"));
const DetailsPage = lazy(() => import("./features/wine/DetailsPage"));
const ProfilePage = lazy(() => import("./features/account/ProfilePage"));
const Wishlist = lazy(() => import("./features/wishlist/Wishlist"));
const NewWinePage = lazy(() => import("./features/wine/NewWinePage"));
const UpdateWinePage = lazy(() => import("./features/wine/UpdateWinePage"));

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

  if (loading) return <PageLoad />;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="profile"
          element={
            <AuthRedirect>
              <Suspense>
                <ProfilePage />
              </Suspense>
            </AuthRedirect>
          }
        />
        <Route
          path="inventory"
          element={
            <AuthRedirect>
              <Suspense>
                <InventoryPage />
              </Suspense>
            </AuthRedirect>
          }
        />
        <Route
          path="inventory/new"
          element={
            <AuthRedirect>
              <Suspense>
                <NewWinePage />
              </Suspense>
            </AuthRedirect>
          }
        />
        <Route
          path="inventory/:id"
          element={
            <AuthRedirect>
              <Suspense>
                <DetailsPage />
              </Suspense>
            </AuthRedirect>
          }
        />
        <Route
          path="inventory/:id/update"
          element={
            <AuthRedirect>
              <Suspense>
                <UpdateWinePage />
              </Suspense>
            </AuthRedirect>
          }
        />
        <Route
          path="wishlist"
          element={
            <AuthRedirect>
              <Suspense>
                <Wishlist />
              </Suspense>
            </AuthRedirect>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
