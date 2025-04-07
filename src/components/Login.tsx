import { Button, Input } from "@chakra-ui/react";

const Login = () => {
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-content">
          <div className="login-title">
            <h1>Linksheet</h1>
            <p>Log in to your account!</p>
          </div>
          <div className="login-form">
            <form action="/login" method="post">
              <div className="login-form-item">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login-form-item">
                <Input
                  type="password"
                  name="password"
                  id="password"
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
        </div>
      </div>
    </div>
  );
};

export default Login;
