import { Button, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { register } from "../../../services/auth-service";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PasswordInput } from "../password-input/password-input";
import "./register.css";

const MIN_PASSWORD_LENGTH = 6;

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const { username } = (location.state as { username: string }) || {};
  const [formData, setFormData] = useState({
    email: "",
    username: username || "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password.length < MIN_PASSWORD_LENGTH) {
      setIsLoading(false);
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setIsLoading(false);
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const data = await register(
        formData.email,
        formData.username,
        formData.password,
        formData.confirmPassword
      );

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
            <Link to="/">
              <h1>Join Linksheet</h1>
            </Link>
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
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <PasswordInput
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <PasswordInput
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
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
}

export default Register;
