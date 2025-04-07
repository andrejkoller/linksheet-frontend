import { Button, Input } from "@chakra-ui/react";

const Register = () => {
  return (
    <div className="register">
      <div className="register-container">
        <div className="register-content">
          <div className="register-title">
            <h1>Join Linksheet</h1>
            <p>Sign up to create your account!</p>
          </div>
          <div className="register-form">
            <form action="/register" method="post">
              <div className="form-group">
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="form-group">
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="form-group">
                <Input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
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
        </div>
      </div>
    </div>
  );
};

export default Register;
