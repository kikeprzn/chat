import React from "react";
import SignInByGoogle from "../components/SignInByGoogle";
function HomePage() {
  return (
    <div>
      <h1>
        <SignInByGoogle not_in_sign_in={true} />
      </h1>
    </div>
  );
}

export default HomePage;
