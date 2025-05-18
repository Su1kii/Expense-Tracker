"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../../../lib/db";

async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    // Get all transactions for this user
    const transactions = await db.transaction.findMany({
      where: { userId },
    });

    // Extract just the amount values
    const amounts = transactions.map((transaction) => transaction.amount);

    // Sum all positive amounts (income)
    const income: number = amounts
      .filter((amount) => amount > 0)
      .reduce((sum, amount) => sum + amount, 0);

    // Sum all negative amounts (expenses)
    const expense: number = amounts
      .filter((amount) => amount < 0)
      .reduce((sum, amount) => sum + amount, 0);

    // Return income and the absolute value of expenses
    return { income, expense: Math.abs(expense) };
  } catch (error) {
    console.error("getIncomeExpense error:", error);
    return { error: "Database error" };
  }
}

export default getIncomeExpense;
