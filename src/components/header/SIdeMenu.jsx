function SideMenu() {
  return (
    <nav className="flex flex-col items-end bg-bg2 text-primary w-fit h-full gap-5 py-15 p-10 pr-6 lg:hidden absolute top-0 right-0 z-40">
      <div className="flex flex-col justify-between h-full items-end">
        <div className="flex flex-col gap-4 items-end">
          {isLoggedIn ? (
            <div className="flex flex-col gap-4 items-end">
              <Link
                to="/profile"
                onClick={closeMenu}
                className="hover:text-secondary hover:scale-105 transition duration-300 flex gap-2"
              >
                <LuUserRound className="w-5 h-5 lg:w-7 lg:h-7" /> Konto
              </Link>
              <div
                onClick={handleLogout}
                className="hover:text-secondary hover:scale-105 transition duration-300 flex gap-2 cursor-pointer"
              >
                <LuLogOut className="w-5 h-5 lg:w-7 lg:h-7" /> Wyloguj
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="hover:text-secondary hover:scale-105 transition duration-300 flex gap-2"
            >
              <LuLogIn className="w-5 h-5 lg:w-7 lg:h-7" /> Login
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
                {t("home")}
              </HeaderLink>
              <HeaderLink link="/genres" onClick={closeMenu}>
                {t("genres")}
              </HeaderLink>
              <HeaderLink link="/tickets" onClick={closeMenu}>
                {t("tickets")}
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
          className="w-fit text-primary rounded cursor-pointer transition duration-300 mt-6"
        >
          <option value="pl">PL</option>
          <option value="en">EN</option>
        </select>
      </div>
    </nav>
  );
}

export default SideMenu;
