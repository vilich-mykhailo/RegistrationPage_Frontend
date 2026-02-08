import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  /* ===== LOAD FROM BACKEND ===== */
  const loadFavourites = async () => {
    if (!token) return;

    const res = await api.get("/auth/favourites");
    setFavourites(res.data);
  };

  /* ===== TOGGLE ===== */
  const toggleFavourite = async (item) => {
    await api.post("/auth/favourites/toggle", item);
    loadFavourites();
  };

  const isFavourite = (title) =>
    favourites.some((f) => f.title === title);

  useEffect(() => {
    loadFavourites();
  }, [token]);

  return (
    <FavouritesContext.Provider
      value={{ favourites, toggleFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
