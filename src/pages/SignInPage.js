import React from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import SignInByGoogle from "../components/SignInByGoogle";
function SignInPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const [alertConfig, setAlertConfig] = React.useState({
    show_alert: false,
    message: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn(email, password);
  };
  const handleAlert = (show_alert = false, message = "", type = "") => {
    setAlertConfig({ show_alert, message, type });
  };
  const signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user) {
          history.push("/");
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
        <form className="card card-body" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">User</label>
            <input
              required
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              required
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
        <div>
          <SignInByGoogle />
        </div>
        <div>
          <Link to="/register" className="navbar-brand">
            Create an account.
          </Link>
        </div>
        <div>
          <Link to="/restore" className="navbar-brand">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
