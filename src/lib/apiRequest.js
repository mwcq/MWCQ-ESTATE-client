import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "You are not logged in"
    ) {
      // 重定向到登录页面
      window.location.href = "/login";
    }
  }
);

export default apiRequest;
