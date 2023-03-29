import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import IndexPage from "./pages/Home/IndexPage"
import ProfilePage from "./pages/Account/Profile/ProfilePage";
import LoginPage from "./pages/Login/LoginPage";
import PlacesPage from "./pages/Account/Places/PlacesPage";
import RegisterPage from "./pages/Register/RegisterPage";
import { UserContextProvider } from "./UserContext";
import PlacesFormPage from "./pages/PlacesForm/PlacesFormPage";
import PlacePage from "./pages/Place/PlacePage";
import BookingsPage from "./pages/Account/Bookings/BookingsPage";
import BookingPage from "./pages/Booking/BookingPage"



function App() {
  
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
