"use server";

import UserInfo from "@/database/models/userinfo.model";
import { connectToDatabase } from "@/database/mongoose";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { signOut } from "./auth.actions";

export const getAllUsersForNewsEmail = async () => {
  try {
    const users = await UserInfo.find(
      { email: { $exists: true, $nin: [null, "demo@finxai.app"] }, subscribe: true },
      { projection: { _id: 1, id: 1, email: 1, name: 1, country: 1 } }
    ).lean();

    return users
      .filter((user) => user.email && user.name)
      .map((user) => ({
        id: user.userId || user._id || "",
        email: user.email,
        name: user.name,
      }));
  } catch (err) {
    console.error("Error Get All Users For News Email", err);
    return [];
  }
};

export const isUserSubscribe = async ({ email }: { email: string }) => {
  try {
    const userItem = await UserInfo.findOne({ email }).lean();
    if (!userItem) {
      console.log(`User with email ${email} not found.`);
      return { success: false, error: `User with email ${email} not found.` };
    }

    return { success: true, data: userItem.subscribe ?? false };
  } catch (e) {
    console.error("Error getting user subscription status", e);
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
};

export const updateUserSubscription = async ({ email, subscribe }: { email: string; subscribe: boolean }) => {
  try {
    const result = await UserInfo.findOneAndUpdate({ email }, { subscribe });
    if (!result) {
      return { success: false, message: `User with email ${email} not found.` };
    }
    return { success: true, message: `Updated subscription status for user ${email}.` };
  } catch (e) {
    console.error("Error getting user subscription status", e);
    return {
      success: false,
      message: `Error getting user subscription statusL ${e instanceof Error ? e.message : String(e)}`,
    };
  }
};

export const registerUserInfo = async ({ userId, data }: { userId: string; data: SignUpFormData }) => {
  try {
    const user = new UserInfo({
      userId: userId,
      name: data.fullName,
      email: data.email,
      subscribe: data.subscribe,
      country: data.country,
      investmentGoals: data.investmentGoals,
      riskTolerance: data.riskTolerance,
      preferredIndustry: data.preferredIndustry,
    });

    await user.save();
    return { success: true, message: "Successfully added into userinfo collection." };
  } catch (e) {
    console.error("Error registering user info: ", e);
    return { success: false, error: e };
  }
};

export const deleteUser = async ({ password }: { password: string }) => {
  try {
    // Get the current session/user
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) throw new Error("Not authenticated");
    const userId = session.user.id;

    // Connect to DB
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB is not Connected!");

    // Optionally, delete user-related data from other collections
    await db.collection("userinfos").deleteOne({ userId });
    await db.collection("watchlists").deleteMany({ userId });

    // Delete user from auth (better-auth)
    await auth.api.deleteUser({ headers: await headers(), body: { password: password } });

    await signOut();

    await db.collection("session").deleteOne({ id: userId });

    return { success: true, message: "Successfully deleted user" };
  } catch (err) {
    console.error("Error deleting account", err);
    return { success: false, error: err || "Unknown error" };
  }
};
