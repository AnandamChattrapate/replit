import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api.js";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("auth/register", {
        name,
        email,
        password,
      });

      console.log("Register success");
      navigate("/login"); // after register go to login
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      console.log("Register Failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <style>{`
        .register-box {
          max-width: 350px;
          margin: 80px auto;
          padding: 25px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: Arial, sans-serif;
        }

        .register-box h2 {
          margin-bottom: 20px;
          text-align: center;
        }

        .register-box input {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .register-box input:focus {
          outline: none;
          border-color: #2563eb;
        }

        .register-box button {
          width: 100%;
          padding: 8px;
          border: none;
          border-radius: 5px;
          background-color: #2563eb;
          color: white;
          cursor: pointer;
        }

        .register-box button:disabled {
          background-color: #999;
          cursor: not-allowed;
        }

        .error {
          color: red;
          font-size: 14px;
          margin-bottom: 10px;
          text-align: center;
        }
      `}</style>

      <div className="register-box">
        <h2>Register</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;