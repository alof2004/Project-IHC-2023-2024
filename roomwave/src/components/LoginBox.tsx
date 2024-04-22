import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import userData from "../userData.json"; // Import userData.json
import "../css/LoginBox.css";

interface User {
  email: string;
  password: string;
  type: string;
}

const LoginBox: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userDataState, setUserData] = useState<User[]>([]);
  const { login, isLoggedIn } = useAuth(); // Destructure isLoggedIn from useAuth
  const navigate = useNavigate();

  useEffect(() => {
    setUserData(userData);
  }, [userData]); // Add userData as a dependency  

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if email and password match any user data
    const user = userDataState.find((user) => user.email === email && user.password === password);

    if (user) {
      login(user.type);
    } else {
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    console.log("isLoggedIn after login:", isLoggedIn); // Log the value of isLoggedIn after logging in
  }, [isLoggedIn]); // Add isLoggedIn as a dependency to useEffect

  return (
    <div className="login-page">
      <div className="form">
        <p className="titulo">Log-In:</p>
        <form className="login-form" onSubmit={handleLogin}>
          <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Palavra-passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
          <div className="button-container">
            <button className="senhorio">Criar conta como senhorio</button>
            <button className="cliente">Criar conta como cliente</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginBox;
