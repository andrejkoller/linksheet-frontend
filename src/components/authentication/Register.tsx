import { Button, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { register } from "../../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "./password-input";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await register(email, username, password, confirmPassword);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.username));
      navigate("/login");
      toast.success("Registration successful!");
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-content">
          <div className="register-title">
            <h1>Join Linksheet</h1>
            <p>Sign up to create your account!</p>
          </div>
          {isLoading ? (
            <div className="loading-screen">
              <Spinner
                className="loading-spinner"
                size="lg"
                color="purple"
              ></Spinner>
            </div>
          ) : (
            <>
              <div className="register-form">
                <form onSubmit={handleRegister}>
                  <div className="form-group">
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      type="text"
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <PasswordInput
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <PasswordInput
                      type="password"
                      id="confirm-password"
                      name="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  <div className="button-container">
                    <Button variant={"solid"} type="submit">
                      Register
                    </Button>
                  </div>
                </form>
              </div>
              <div className="register-footer">
                <p>
                  Already have an account?{" "}
                  <a href="/login" className="login-link">
                    Log in
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
