import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("1234");

  const { login, isAthenticated } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  useEffect(() => {
    if (isAthenticated) navigate("/", { replace: true });
  }, [isAthenticated, navigate]);

  return (
    <div className="loginContainer">
      <h2 style={{ color: "lightskyblue" }}>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
          />
        </div>
        <div className="formControl">
          <label htmlFor="email">Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}
