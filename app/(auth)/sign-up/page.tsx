"use client";

import CountrySelectField from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { INVESTMENT_GOALS, RISK_TOLERANCE_OPTIONS, PREFERRED_INDUSTRIES } from "@/lib/constans";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry: "Technology",
    },
    mode: "onBlur",
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUpWithEmail(data);
      if (result.success) router.push("/");
      else
        toast.error("Sign up failed!", {
          description: result.error ? result.error : "Failed to create an account.",
        });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Sign up failed!", {
        description: error instanceof Error ? error.message : "Failed to create an account.",
      });
    }
  };

  return (
    <>
      <h5 className="form-title">Sign Up & Personalize</h5>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          validation={{
            required: "Full Name is required.",
            minLength: { value: 2, message: "Minimum 2 characters" },
          }}
        />

        <InputField
          name="email"
          label="Email"
          type="email"
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
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: "Password must include uppercase, lowercase, number, and special character",
            },
          }}
        />

        <CountrySelectField name="country" label="Country" control={control} error={errors.country} required />

        <div className="grid w-full gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center">
          <SelectField
            name="investmentGoals"
            label="Investment Goals"
            placeholder="Select your investment goals"
            options={INVESTMENT_GOALS}
            control={control}
            error={errors.investmentGoals}
            required
          />

          <SelectField
            name="riskTolerance"
            label="Risk Tolerance"
            placeholder="Select your risk tolerance"
            options={RISK_TOLERANCE_OPTIONS}
            control={control}
            error={errors.riskTolerance}
            required
          />

          <SelectField
            name="preferredIndustry"
            label="Preferred Industry"
            placeholder="Select your preferred industry"
            options={PREFERRED_INDUSTRIES}
            control={control}
            error={errors.preferredIndustry}
            required
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="theme-btn w-full mt-5">
          {isSubmitting ? "Creating Account ... " : "Start Your Investing Journey"}
        </Button>

        <FooterLink text="Already have an account?" linkText="Sign In" href="/sign-in" />
      </form>
    </>
  );
};

export default SignUp;
