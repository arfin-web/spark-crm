import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Spark CRM",
  description: "Sign in to your agency dashboard.",
};

export default function LoginPage() {
  return <LoginForm />;
}
