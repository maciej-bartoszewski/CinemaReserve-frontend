import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../security/AuthProvider";
import HeaderLink from "./HeaderLink";
import Title from "../titles/Title";
import SuccessDialog from "../dialogs/SuccessDialog";

import Logo from "../../assets/cinema.svg";
import { LuUserRound, LuMenu, LuX } from "react-icons/lu";
import { TbLogin2, TbLogout2 } from "react-icons/tb";
import { IoTicketSharp } from "react-icons/io5";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isLoggedIn, userRole, logout } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  const changeLanguage = () => {
    const newLang = i18n.language === "pl" ? "en" : "pl";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    SuccessDialog({ title: t("userLoggedOut") });
    closeMenu();
  };

  return (
    <header className="w-full bg-bg2 shadow-2xl text-primary font-medium p-2">
      <div className="flex justify-between items-center md:mx-3">
        <Link
          to="/"
          className="flex items-center gap-2 hover:text-secondary hover:scale-105 transition duration-300"
        >
          <img src={Logo} alt="Logo" width={40} />
          <Title text={"CineRes"} />
        </Link>

        <div className="hidden lg:flex justify-center w-3/5">
          {userRole === "ADMIN" && (
            <nav className="flex gap-3 lg:gap-6">
              <HeaderLink link="/screenings">{t("screenings")}</HeaderLink>
              <HeaderLink link="/halls">{t("halls")}</HeaderLink>
              <HeaderLink link="/movies">{t("movies")}</HeaderLink>
              <HeaderLink link="/genres">{t("genres")}</HeaderLink>
              <HeaderLink link="/tickets">{t("tickets")}</HeaderLink>
              <HeaderLink link="/reservations">{t("reservations")}</HeaderLink>
              <HeaderLink link="/users">{t("users")}</HeaderLink>
            </nav>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-4 sm:gap-5 md:gap-6">
          {isLoggedIn ? (
            <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
              <Link
                to="/user-tickets"
                onClick={closeMenu}
                className="hover:text-secondary hover:scale-105 transition duration-300"
              >
                <IoTicketSharp className="w-5 h-5 lg:w-7 lg:h-7" />
              </Link>
              <Link
                to="/account"
                onClick={closeMenu}
                className="hover:text-secondary hover:scale-105 transition duration-300"
              >
                <LuUserRound className="w-5 h-5 lg:w-7 lg:h-7" />
              </Link>
              <TbLogout2
                onClick={handleLogout}
                className="hover:text-secondary w-5 h-5 lg:w-7 lg:h-7 hover:scale-105 transition duration-300 cursor-pointer"
              />
            </div>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="hover:text-secondary hover:scale-105 transition duration-300"
            >
              <TbLogin2 className="w-5 h-5 lg:w-7 lg:h-7" />
            </Link>
          )}

          <select
            onChange={changeLanguage}
            value={i18n.language}
            className="w-fit text-primary bg-bg2 rounded cursor-pointer transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="pl">PL</option>
            <option value="en">EN</option>
          </select>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden z-50"
        >
          {menuOpen ? (
            <LuX className="w-6 h-6" />
          ) : (
            <LuMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col items-end bg-bg2 text-primary w-fit h-full gap-5 py-15 p-10 pr-6 lg:hidden absolute top-0 right-0 z-40">
          <div className="flex flex-col justify-between h-full items-end">
            <div className="flex flex-col gap-4 items-end">
              {isLoggedIn ? (
                <div className="flex flex-col gap-4 items-end">
                  <Link
                    to="/user-tickets"
                    onClick={closeMenu}
                    className="hover:text-secondary hover:scale-105 transition duration-300 flex items-center gap-2"
                  >
                    <IoTicketSharp className="w-5 h-5 lg:w-7 lg:h-7" />
                    {t("tickets")}
                  </Link>
                  <Link
                    to="/account"
                    onClick={closeMenu}
                    className="hover:text-secondary hover:scale-105 transition duration-300 flex items-center gap-2"
                  >
                    <LuUserRound className="w-5 h-5 lg:w-7 lg:h-7" />{" "}
                    {t("account")}
                  </Link>
                  <div
                    onClick={handleLogout}
                    className="hover:text-secondary hover:scale-105 transition duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <TbLogout2 className="w-5 h-5 lg:w-7 lg:h-7" />{" "}
                    {t("logout")}
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="hover:text-secondary hover:scale-105 transition duration-300 flex items-center gap-2"
                >
                  <TbLogin2 className="w-5 h-5 lg:w-7 lg:h-7" /> {t("login")}
                </Link>
              )}

              {userRole === "ADMIN" && (
                <div className="flex flex-col gap-4 mt-20 text-end">
                  <HeaderLink link="/screenings" onClick={closeMenu}>
                    {t("screenings")}
                  </HeaderLink>
                  <HeaderLink link="/halls" onClick={closeMenu}>
                    {t("halls")}
                  </HeaderLink>
                  <HeaderLink link="/movies" onClick={closeMenu}>
                    {t("movies")}
                  </HeaderLink>
                  <HeaderLink link="/genres" onClick={closeMenu}>
                    {t("genres")}
                  </HeaderLink>
                  <HeaderLink link="/tickets" onClick={closeMenu}>
                    {t("tickets")}
                  </HeaderLink>{" "}
                  <HeaderLink link="/reservations" onClick={closeMenu}>
                    {t("reservations")}
                  </HeaderLink>
                  <HeaderLink link="/users" onClick={closeMenu}>
                    {t("users")}
                  </HeaderLink>
                </div>
              )}
            </div>

            <select
              onChange={changeLanguage}
              value={i18n.language}
              className="w-fit text-primary bg-bg2 rounded cursor-pointer transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="pl">PL</option>
              <option value="en">EN</option>
            </select>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
