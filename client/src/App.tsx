import { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Layout from "./app/layout/Layout";
import { useAppDispatch } from "./app/store/configureStore";
import { fetchCurrentUser } from "./features/account/accountSlice";
import Login from "./features/account/Login";
import Register from "./features/account/Register";
import HomePage from "./features/home/HomePage";
import DetailsPage from "./features/wine/DetailsPage";
import InventoryPage from "./features/wine/InventoryPage";
import NewWinePage from "./features/wine/NewWinePage";
import UpdateWinePage from "./features/wine/UpdateWinePage";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      console.log("Fetching current user");
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().finally(() => setLoading(false));
  }, [initApp]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="inventory/new" element={<NewWinePage />} />
            <Route path="inventory/:id" element={<DetailsPage />} />
            <Route path="inventory/:id/update" element={<UpdateWinePage />} />
            <Route path="*" element={<div>Not Found!</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
