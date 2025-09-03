import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pageStyles/RegisterPage.css"; // CSS file
import { registerUser } from "../services/LoginServices"; // you will create this function

const UserRegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(email, password,name);
      console.log(`response ${JSON.stringify(response)}` )
      if (response.ok) {
        navigate("/user/login"); // redirect to login after successful registration
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
            <input
            type="name"
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p className="footer-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/user/login")}>Log In</span>
        </p>
      </div>
    </div>
  );
};

export default UserRegisterPage;
