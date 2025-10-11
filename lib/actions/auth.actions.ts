"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";

export const signUpWithEmail = async (data: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        name: data.fullName,
        email: data.email,
        password: data.password,
      },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email: data.email,
          name: data.fullName,
          country: data.country,
          investmentGoals: data.investmentGoals,
          riskTolerance: data.riskTolerance,
          preferredIndustry: data.preferredIndustry,
        },
      });
    }

    return { success: true, data: response };
  } catch (error) {
    console.error("Sign Up Failed!", error);
    return { sucess: false, error: `Sign up failed. ${error}` };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.error("Sign out failed!", error);
    return { success: false, error: "Sign out  failed." };
  }
};

export const signInWithEmail = async (data: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });

    return { success: true, data: response };
  } catch (error) {
    console.error("Sign In Failed!", error);
    return { sucess: false, error: "Sign in failed." };
  }
};
