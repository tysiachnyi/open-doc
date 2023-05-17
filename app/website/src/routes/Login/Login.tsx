import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ROUTES } from "../../constants/routes";
import { LoginResponse } from "../../types/response.types";
import { fetchService } from "../../utils/AxiosInterceptor";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const cookies = new Cookies();
    try {
      const { data }: LoginResponse = await fetchService.post("auth/login", {
        email,
        password,
      });
      cookies.set("TOKEN", data.token, {
        path: "/",
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({ id: data.userId, email: data.email, name: data.name })
      );
      setLogin(true);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-1/2 p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold">Login</h1>
        {login && (
          <p className="text-green-600">You Are Logined Successfully</p>
        )}
        <div className="flex flex-col w-full mt-4">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 border rounded"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mt-4">
          <label htmlFor="password">Password</label>
          <input
            className="p-2 border rounded"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full p-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
        >
          Login
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
