import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedFavorites = localStorage.getItem("favorites");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));

    // Cargar favoritos del localStorage
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setFavorites([]);
    localStorage.removeItem("user");
    // No eliminamos los favoritos de localStorage para mantener la info.
  };

  const addFavorite = (favorite) => {
    const updatedFavorites = [...favorites, favorite];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (favorite) => {
    const updatedFavorites = favorites.filter((fav) => fav !== favorite);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
