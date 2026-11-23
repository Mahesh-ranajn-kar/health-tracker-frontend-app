import api from "@/services/api";



export const authService = {
  async login(credentials) {
    const response = await api.post("/api/auth/login", credentials);
    return response.data;
  },
  async verifyOtp(payload) {
    const response = await api.post("/api/auth/verify-otp", payload);
    return response.data;
  },
  async register(userData) {
    const response = await api.post("/api/auth/signup", userData);
    return response.data;
  },
};