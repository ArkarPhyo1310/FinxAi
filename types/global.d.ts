import { FieldError, RegisterOptions } from "react-hook-form";

declare global {
  interface SignInFormData {
    email: string;
    password: string;
  }

  type SignUpFormData = {
    fullName: string;
    email: string;
    password: string;
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferredIndustry: string;
  };

  interface WelcomeEmailData {
    email: string;
    name: string;
    intro: string;
  }

  type FormInputProps = {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    register: UserFormRegister;
    error?: FieldError;
    validation?: RegisterOptions;
    disabled?: boolean;
    value?: string;
  };

  type SelectFileProps = {
    name: string;
    label: string;
    placeholder?: string;
    options: readonly Option[];
    control: Control;
    error?: FieldError;
    required?: boolean;
  };

  type CountrySelectProps = {
    name: string;
    label: string;
    control: Control;
    error?: FieldError;
    required?: boolean;
  };

  type FooterLinkProps = {
    text: string;
    linkText: string;
    href: string;
  };

  type User = {
    id: string;
    name: string;
    email: string;
  };

  type RawNewsArticle = {
    id: number;
    headline?: string;
    summary?: string;
    source?: string;
    url?: string;
    datetime?: number;
    image?: string;
    category?: string;
    related?: string;
  };

  type Alert = {
    id: string;
    symbol: string;
    company: string;
    alertName: string;
    currentPrice: number;
    alertType: "upper" | "lower";
    threshold: number;
    changePercent?: number;
  };

  type MarketNewsArticle = {
    id: number;
    headline: string;
    summary: string;
    source: string;
    url: string;
    datetime: number;
    category: string;
    related: string;
    image?: string;
  };
}

export {};
