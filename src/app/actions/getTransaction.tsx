"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../../../lib/db";
import { Transaction } from "../../../types/Transaction";

async function getTransactions(): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { transactions };
  } catch (error) {
    console.error("getTransactions error:", error);
    return { error: "Database error" };
  }
}

export default getTransactions;
