import axios from "axios";
import { useState } from "react";
import { LoginResponse } from "../../types/response.types";
import { fetchService } from "../../utils/AxiosInterceptor";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      await fetchService.post("auth/register", {
        email,
        name,
        password,
      });
      setRegister(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="flex flex-col items-center justify-center w-1/2 p-8 bg-white rounded shadow"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold">Register</h1>
        <div>
          <p>
            {register && (
              <p className="text-green-600">You Are Registered Successfully</p>
            )}
          </p>
        </div>
        <div className="flex flex-col w-full mt-4">
          <label htmlFor="firstName">Name</label>
          <input
            className="p-2 border rounded"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        >
          Register
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
