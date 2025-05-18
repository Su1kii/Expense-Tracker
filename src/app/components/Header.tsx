import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import { CheckUser } from "../../../lib/CheckUser";

const Header = async () => {
  const user = await CheckUser();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2>Expense Tracker</h2>
        <div>
          <SignInButton>
            <UserButton />
          </SignInButton>
        </div>
      </div>
    </nav>
  );
};

export default Header;
