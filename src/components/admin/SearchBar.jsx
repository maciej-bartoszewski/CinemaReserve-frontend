import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuSearch } from "react-icons/lu";

function SearchBar({ className, placeholder, isAdminSearch, onSearch, value }) {
  const { t } = useTranslation();
  const [search, setSearch] = useState(value);

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className={`flex items-center px-3 py-1 rounded-full w-full ${isAdminSearch ? "bg-bg2" : "bg-bg1"}`}
      >
        <LuSearch size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full lg:h-10 outline-none px-2 text-white placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-primary hover:bg-secondary hover:scale-105 text-white cursor-pointer px-3 py-1 rounded-full ml-2 transition duration-300"
        >
          {t("search")}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
