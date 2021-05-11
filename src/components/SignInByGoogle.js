import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import "firebase/auth";
import { auth, google_provider } from "../config/firebase";

class SignInByGoogle extends Component {
  render() {
    const { user, signOut, signInWithGoogle, not_in_sign_in } = this.props;

    return (
      <>
        {not_in_sign_in ? (
          <div>
            {user ? (
              <div>Welcome</div>
            ) : (
              <>
                <div>Welcome guess, sign in with Google</div>
                <button
                  className="btn btn-secondary"
                  onClick={signInWithGoogle}
                >
                  {" "}
                  Sign in{" "}
                </button>
              </>
            )}
          </div>
        ) : (
          <div>
            {user ? <div>Welcome</div> : <div>Sign in with Google</div>}

            {user ? (
              <button className="btn btn-secondary" onClick={signOut}>
                {" "}
                Sign out
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={signInWithGoogle}>
                {" "}
                Sign in{" "}
              </button>
            )}
          </div>
        )}
      </>
    );
  }
}
const providers = {
  googleProvider: google_provider,
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth: auth,
})(SignInByGoogle);
