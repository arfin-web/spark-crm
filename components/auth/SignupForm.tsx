"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ArrowRight } from "lucide-react";

const signupSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  agencyName: z.string().min(2, { message: "Agency name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      agencyName: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  async function onSubmit(data: SignupFormValues) {
    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        agency_name: data.agencyName,
        email: data.email,
        password: data.password, // In real app, this would be hashed on backend
        subscription_tier: "trial",
        subscription_status: "active",
        created_at: new Date().toISOString(),
      };

      console.log("Signup submitted:", payload);

      // Simulate account creation success
      router.push("/login?signup=success");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-2 text-left">
        <h1 className="text-3xl font-bold font-heading tracking-tight">Create an account</h1>
        <p className="text-muted-foreground">
          Join 500+ agencies managing leads with Spark CRM.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Arfin"
              disabled={isLoading}
              {...form.register("firstName")}
              className={form.formState.errors.firstName ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {form.formState.errors.firstName && (
              <p className="text-[10px] font-medium text-destructive">{form.formState.errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Nafriz"
              disabled={isLoading}
              {...form.register("lastName")}
              className={form.formState.errors.lastName ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {form.formState.errors.lastName && (
              <p className="text-[10px] font-medium text-destructive">{form.formState.errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="agencyName">Agency Name</Label>
          <Input
            id="agencyName"
            placeholder="Pixel Perfect"
            disabled={isLoading}
            {...form.register("agencyName")}
            className={form.formState.errors.agencyName ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {form.formState.errors.agencyName && (
            <p className="text-[10px] font-medium text-destructive">{form.formState.errors.agencyName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Work Email</Label>
          <Input
            id="email"
            placeholder="name@agency.com"
            type="email"
            disabled={isLoading}
            {...form.register("email")}
            className={form.formState.errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {form.formState.errors.email && (
            <p className="text-sm font-medium text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            disabled={isLoading}
            {...form.register("password")}
            className={form.formState.errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {form.formState.errors.password && (
            <p className="text-sm font-medium text-destructive">{form.formState.errors.password.message}</p>
          )}
        </div>

        <div className="flex items-start space-x-2 py-2">
          <Checkbox
            id="terms"
            onCheckedChange={(checked) => form.setValue("terms", checked as boolean)}
            className="mt-1"
          />
          <Label
            htmlFor="terms"
            className="text-xs text-muted-foreground leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            By creating an account, you agree to our{" "}
          </Label>
        </div>
        {form.formState.errors.terms && (
          <p className="text-xs font-medium text-destructive mt-1">{form.formState.errors.terms.message}</p>
        )}

        <Button type="submit" className="w-full h-11 rounded-xl shadow-lg shadow-primary/20 group" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-primary hover:underline underline-offset-4">
          Sign In
        </Link>
      </p>

      <div className="flex justify-center items-center gap-x-2">
        <Link href="/terms" className="text-primary hover:underline font-medium">Terms of Service</Link>
        <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
      </div>
    </div>
  );
}
