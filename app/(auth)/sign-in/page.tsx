"use client";

import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const router = useRouter();
  const [demoLoading, setDemoLoading] = useState(false);
  const handleDemo = async () => {
    setDemoLoading(true);
    const data: SignInFormData = {
      email: "demo@finxai.app",
      password: "Demo@123",
    };

    try {
      const result = await signInWithEmail(data);
      if (result.success) router.push("/");
      else toast.error("Demo sign-in failed!", { description: result.error });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Demo sign-in failed!", {
        description:
          error instanceof Error ? error.message : "Failed to sign in.",
      });
    } finally {
      setDemoLoading(false);
    }
  };

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);
      if (result.success) router.push("/");
      else toast.error("Sign-in failed!", { description: result.error });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Sign in failed!", {
        description:
          error instanceof Error ? error.message : "Failed to sign in.",
      });
    }
  };

  return (
    <>
      <h5 className="form-title">Log Into Your Account</h5>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
          type="email"
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          register={register}
          error={errors.password}
          type="password"
          validation={{
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must include uppercase, lowercase, number, and special character",
            },
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="theme-btn w-full mt-5"
        >
          {isSubmitting ? "Logging in..." : "Enter Your Account"}
        </Button>

        <Button
          type="button"
          variant="secondary"
          disabled={demoLoading}
          className="w-full mt-2"
          onClick={handleDemo}
        >
          {demoLoading ? "Starting Demo..." : "Try Demo"}
        </Button>

        <FooterLink
          text="Dont't have an account?"
          linkText="Sign Up"
          href="/sign-up"
        />
      </form>
    </>
  );
};

export default SignIn;
