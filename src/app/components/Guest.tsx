import { SignInButton } from "@clerk/nextjs";
import React from "react";

const Guest = () => {
  return (
    <div className="guest">
      <h1>Welcome</h1>
      <p>Please sign in to manage you transaction</p>
      <SignInButton />
    </div>
  );
};

export default Guest;
