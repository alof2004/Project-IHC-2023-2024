import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory hook
import userData from "../userData.json"; // Import userData.json
import { useUser } from "./UserContext";
import "../css/LoginBox.css";


interface User {
  email: string;
  password: string;
  type: string;
  birthdate: string;
  phone: string;
  firstname: string;
  lastname: string;
  job: string;
}

const LoginBox: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userDataState, setUserData] = useState<User[]>([]);
  const { login, isLoggedIn } = useAuth(); // Destructure isLoggedIn from useAuth
  const { loginUser } = useUser();
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
      const userData = { email: user.email, password: user.password, type: user.type, birthdate: user.birthdate, phone: user.phone, firstname: user.firstname, lastname: user.lastname, job: user.job};
      console.log("userData:", userData);
      loginUser(userData);
      console.log("user.email:", user.email);
      if (user.type === "client") {
        navigate("/homeClient");
      } else if (user.type === "senhorio") {
        navigate("/homeLandlord");
      }
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
            <Link to="/signup/landlord" className="signup">
            <button className="senhorio">Criar conta como senhorio</button>
            </Link>
            <Link to="/signup/client" className="signup">
            <button className="cliente">Criar conta como cliente</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginBox;
