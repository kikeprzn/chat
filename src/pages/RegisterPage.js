import React from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";

function RegisterPage() {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const form_ref = React.useRef();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [alertConfig, setAlertConfig] = React.useState({
    show_alert: false,
    message: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      handleAlert(true, "Passwords do not match", "alert-danger");
      return;
    }
    handleAlert();

    addUser(email, password);
  };

  const handleAlert = (show_alert = false, message = "", type = "") => {
    setAlertConfig({ show_alert, message, type });
  };
  const addUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user) {
          history.push("/");
          // // Auth.setLoggedIn(true);
          // handleAlert(true, "Successful registration", "alert-success");
          // form_ref.current.reset();
        }
      })
      .catch((e) => {
        handleAlert(true, e.message, "alert-danger");
      });
  };

  return (
    <div className="row">
      <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
        {alertConfig.show_alert ? (
          <div className={`alert ${alertConfig.type}`} role="alert">
            {alertConfig.message}
          </div>
        ) : null}
        <form ref={form_ref} className="card card-body" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">User</label>
            <input
              required
              value={email}
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              required
              value={password}
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm password</label>
            <input
              required
              value={confirmPassword}
              type="password"
              className="form-control"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </form>
        <div>
          <Link to="/signin" className="navbar-brand">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
