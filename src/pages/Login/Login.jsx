import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ArrowRight, Eye, EyeSlash } from "react-bootstrap-icons";

import { login } from "../utils/pocketbase"

const Login = () => {

  useEffect(() => {
    document.title = `Login`
  })

  return (
    <>
      <div className="flex justify-center items-center">
        <h1>Usawi Dina Potha</h1>
      </div>
      <div className="btn">Button</div>
    </>
  );
};

export { Login }