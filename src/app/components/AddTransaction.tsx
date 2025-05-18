"use client";
import React, { useRef } from "react";
import addTransaction from "../actions/addTransaction";
import { toast } from "react-toastify";

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const ClientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Transaction added");
      formRef.current?.reset;
    }
  };
  return (
    <>
      <h3 className="text-2xl font-bold">Add Transaction</h3>
      <form ref={formRef} action={ClientAction}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" id="text" name="text" placeholder="Enter Text" />
        </div>
        <div className="form-control">
          <label htmlFor="amount" className="">
            Amount <br /> (negative - expense, postive - income)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter An Amount"
            step="0.01"
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
