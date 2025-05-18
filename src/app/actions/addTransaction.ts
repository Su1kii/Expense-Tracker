"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "../../../lib/db";

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  const textValue = formData.get("text");
  const amountValue = formData.get("amount");

  // Input validation
  if (!textValue || textValue === "" || !amountValue) {
    return { error: "Text or amount is missing" };
  }

  const text = textValue.toString();
  const amount = parseFloat(amountValue.toString());

  const { userId } = await auth();
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transaction = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    revalidatePath("/");

    return {
      data: {
        text: transaction.text,
        amount: transaction.amount,
      },
    };
  } catch (error) {
    console.error("Failed to add transaction:", error);
    return { error: "Transaction not added" };
  }
}

export default addTransaction;
