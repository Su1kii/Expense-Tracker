import React from "react";
import getUserBalance from "../actions/getUserBalance";
import { addCommas } from "../../../lib/utils";

const Balance = async () => {
  const { balance } = await getUserBalance();

  return (
    <>
      <h4>YOUR BAlANCE</h4>
      <h1 className="text-3xl font-semibold">${addCommas(balance ?? 0)}</h1>
    </>
  );
};

export default Balance;
