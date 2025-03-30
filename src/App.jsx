import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import AuthProvider from "./security/AuthProvider.jsx";
import ProtectedRoute from "./security/ProtectedRoute.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import UserTickets from "./pages/UserTickets.jsx";
import Users from "./pages/admin/users/Users.jsx";
import AddUser from "./pages/admin/users/AddUser.jsx";
import EditUser from "./pages/admin/users/EditUser.jsx";
import Genres from "./pages/admin/genres/Genres.jsx";
import AddGenre from "./pages/admin/genres/AddGenre.jsx";
import EditGenre from "./pages/admin/genres/EditGenre.jsx";
import Halls from "./pages/admin/halls/Halls.jsx";
import AddHall from "./pages/admin/halls/AddHall.jsx";
import EditHall from "./pages/admin/halls/EditHall.jsx";
import Tickets from "./pages/admin/tickets/Tickets.jsx";
import AddTicket from "./pages/admin/tickets/AddTicket.jsx";
import EditTicket from "./pages/admin/tickets/EditTicket.jsx";
import Movies from "./pages/admin/movies/Movies.jsx";
import AddMovie from "./pages/admin/movies/AddMovie.jsx";
import EditMovie from "./pages/admin/movies/EditMovie.jsx";
import Screenings from "./pages/admin/screenings/Screenings.jsx";
import AddScreening from "./pages/admin/screenings/AddScreening.jsx";
import EditScreening from "./pages/admin/screenings/EditScreening.jsx";
import Reservations from "./pages/admin/reservations/Reservations.jsx";
import AddReservation from "./pages/admin/reservations/AddReservation.jsx";
import EditReservation from "./pages/admin/reservations/EditReservation.jsx";
import Movie from "./pages/Movie";
import ScreeningSeats from "./pages/ScreeningSeats.jsx";
import ErrorPage from "./pages/ErrorPage";

import "./App.css";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("lang");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <main className="text-xs sm:text-sm md:text-base lg:text-lg flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow m-2 md:m-3 lg:m-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies/:id" element={<Movie />} />
              <Route path="/screening/:id" element={<ScreeningSeats />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<Account />} />
              <Route path="/user-tickets" element={<UserTickets />} />

              <Route
                path="/screenings"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <Screenings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/screenings/add"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <AddScreening />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/screenings/edit/:id"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <EditScreening />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/halls"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <Halls />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/halls/add"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <AddHall />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/halls/edit/:id"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <EditHall />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/movies"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <Movies />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies/add"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <AddMovie />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies/edit/:id"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <EditMovie />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/genres"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <Genres />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/genres/add"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <AddGenre />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/genres/edit/:id"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <EditGenre />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/tickets"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <Tickets />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tickets/add"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <AddTicket />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tickets/edit/:id"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <EditTicket />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/reservations"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <Reservations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reservations/add"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <AddReservation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reservations/edit/:id"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <EditReservation />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/users"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users/add"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <AddUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users/edit/:id"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <EditUser />
                  </ProtectedRoute>
                }
              />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
