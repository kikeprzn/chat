import React from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";

function RestorePasswordPage() {
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [alertConfig, setAlertConfig] = React.useState({
    show_alert: false,
    message: "",
    type: "",
  });

  const handleAlert = (show_alert = false, message = "", type = "") => {
    setAlertConfig({ show_alert, message, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    restorePassword(user);
  };

  const restorePassword = (user) => {
    setLoading(true);
    firebase
      .auth()
      .sendPasswordResetEmail(user)
      .then((res) => {
        handleAlert(
          true,
          "An email was sent to reset the password",
          "alert-success"
        );
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
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
            <label className="form-label">Usuario</label>
            <input
              required
              type="email"
              className="form-control"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {loading ? "Loading..." : "Send to restore"}
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

export default RestorePasswordPage;
