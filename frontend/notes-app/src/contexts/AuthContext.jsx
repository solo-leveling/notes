import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext(null);
const STORAGE_KEY = "notes-app-token";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY));
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ["user"],
    async () => {
      const response = await axiosInstance.get("/get-user");
      return response.data.user;
    },
    {
      enabled: !!token,
      staleTime: 1000 * 60,
      retry: false,
      onError: () => {
        setToken(null);
        localStorage.removeItem(STORAGE_KEY);
      },
    },
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [token]);

  const login = (accessToken) => {
    setToken(accessToken);
    queryClient.invalidateQueries(["user"]);
  };

  const logout = () => {
    setToken(null);
    queryClient.clear();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token && !isLoading,
      isLoading,
      isError,
      login,
      logout,
      refetchUser: refetch,
    }),
    [user, token, isLoading, isError, refetch],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
