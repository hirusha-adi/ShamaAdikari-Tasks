import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ArrowRight, Eye, EyeSlash } from "react-bootstrap-icons";

import { login } from "../../utils/pocketbase";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = `Login`
  })

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMessage(""); // reset for new attempt
    setIsLoading(true);

    if (!email || !password) {
      setErrorMessage("Username and password are required.");
      setIsLoading(false);
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: errorMessage,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Close",
        customClass: {
          popup: "custom-swal-popup",
          cancelButton: "custom-swal-cancel-button",
        },
      });
      return;
    }

    try {
      await login(email, password);
      setErrorMessage("");
    } catch (error) {
      let errorMessage;
      if (error.status === 400) {
        errorMessage = "Invalid credentials. Please check your username and password.";
      } else if (error.status === 404) {
        errorMessage = "User not found. Please check your details.";
      } else {
        errorMessage = "An unexpected error occurred. Please try again later.";
      }
      setErrorMessage(errorMessage);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Close",
        customClass: {
          popup: "custom-swal-popup",
          cancelButton: "custom-swal-cancel-button",
        },
      });
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col text-center w-full">
          <div className="text-4xl font-bold mb-4">Login</div>
          {/* <p className="text-lg mb-8 text-gray-500">
            Staff Portal | ThriyaLanka is a restricted area.
          </p> */}
          <form onSubmit={handleLogin} className="w-full max-w-md mt-2">
            <div className="form-control mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 flex">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="btn ml-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlash className="text-lg" />
                ) : (
                  <Eye className="text-lg" />
                )}
              </div>
            </div>
            <button
              className={`btn btn-neutral w-full ${isLoading ? "btn-disabled" : ""
                }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                <>
                  Login <ArrowRight className="text-lg" />
                </>
              )}
            </button>
          </form>
          <p className="text-sm mt-4 text-gray-400">
            Forgot your password? Please contact Hirusha.
          </p>
        </div>
      </div>
    </>
  );
};

export { Login }