import axiosInstance from "../utils/axiosInstance";

export const loginUser = async ({ identifier, password }) => {
  const payload = {
    password,
    username: identifier.includes("@") ? undefined : identifier,
    email: identifier.includes("@") ? identifier : undefined,
  };

  return axiosInstance.post("/login", payload);
};

export const registerUser = async ({ username, email, password }) => {
  return axiosInstance.post("/register", { username, email, password });
};
