import { Button, Input, Spinner } from "@chakra-ui/react";
import { login } from "../services/AuthService";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "./ui/password-input";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user.username);
      navigate("/dashboard");
      toast.success("Login successful!");
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
    <div className="login">
      <div className="login-container">
        <div className="login-content">
          <div className="login-title">
            <h1>Linksheet</h1>
            <p>Log in to your account!</p>
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
              <div className="login-form">
                <form onSubmit={handleLogin}>
                  <div className="login-form-item">
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="login-form-item">
                    <PasswordInput
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="button-container">
                    <Button variant={"solid"} type="submit">
                      Log in
                    </Button>
                  </div>
                </form>
              </div>
              <div className="login-footer">
                <p>
                  Don't have an account?{" "}
                  <a href="/register" className="register-link">
                    Sign up free
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

export default Login;
