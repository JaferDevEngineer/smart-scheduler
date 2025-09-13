import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../pageStyles/RegisterPage.css"; // CSS file
import { registerProvider } from "../services/LoginServices"; // you will create this function
import {getProfessions} from '../services/Utils';

const ProviderRegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [professions, setProfessions] = useState([]); // list from API
  const [professionId, setProfessionId] = useState(""); // selected

   useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const res = await getProfessions(); 
        setProfessions(res);
      } catch (err) {
        console.error("Error fetching professions:", err);
        setError("Error loading professions");
      }
    };
    fetchProfessions();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await registerProvider(email, password,name,professionId);
      console.log(`response ${JSON.stringify(response)}` )
      if (response.ok) {
        navigate("/provider/login"); // redirect to login after successful registration
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
          <select
            value={professionId}
            onChange={(e) => setProfessionId(e.target.value)}
            required
          >
            <option value="" disabled> Select Profession</option>
            {professions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
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
          <span onClick={() => navigate("/login")}>Log In</span>
        </p>
      </div>
    </div>
  );
};

export default ProviderRegisterPage;
