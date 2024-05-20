import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CityList from "./Components/CityList";
import CountriesList from "./Components/CountryList";
import { CitiesProvider } from "./Contexts/CitiesContext";
import City from "./Components/City";
import Form from "./Components/Form";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="form" element={<Form />} />
              <Route path="countries" element={<CountriesList />} />
              <Route path="" element={<>City List</>} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
