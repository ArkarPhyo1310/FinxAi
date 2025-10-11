"use server";

import { connectToDatabase } from "@/database/mongoose";
import Watchlist from "@/database/models/watchlist.model";

/**
 * Retrieves the watchlist symbols for a given user email.
 * @param email The email of the user.
 * @returns A promise that resolves to an array of stock symbols (strings).
 */
export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB connection not found.");

    // Better Auth stores users in the "user" collection
    const user = await db.collection("user").findOne({ email });

    if (!user) {
      console.log(`User with email ${email} not found.`);
      return [];
    }

    const userId = (user.id as string) || String(user._id || "");
    if (!userId) return [];

    const watchlistItems = await Watchlist.find({ userId }, { symbol: 1 }).lean(); // Use lean() for faster queries when not modifying documents

    return watchlistItems.map((item) => String(item.symbol));
  } catch (error) {
    console.error("Error fetching watchlist symbols:", error);
    return [];
  }
}
