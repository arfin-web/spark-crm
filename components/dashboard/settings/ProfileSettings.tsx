"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updateAgencyName, UserProfile } from "@/lib/actions/settings";

const profileSchema = z.object({
  agency_name: z.string().min(2, "Agency name must be at least 2 characters"),
});

interface ProfileSettingsProps {
  user: UserProfile;
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      agency_name: user.agency_name,
    },
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    setIsPending(true);
    try {
      await updateAgencyName(values.agency_name);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="border-border shadow-sm rounded-3xl overflow-hidden">
      <CardHeader className="bg-muted/30 border-b border-border pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Profile Information
        </CardTitle>
        <CardDescription>
          Manage your agency details and personal information.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</Label>
            <div className="px-4 py-2 bg-muted/50 rounded-xl border border-border text-sm text-muted-foreground italic">
              {user.email}
            </div>
            <p className="text-[10px] text-muted-foreground italic">Email cannot be changed.</p>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subscription Tier</Label>
            <div className="px-4 py-2 bg-primary/5 rounded-xl border border-primary/10 text-sm font-bold text-primary uppercase tracking-tight">
              {user.subscription_tier}
            </div>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" defaultValue={user.first_name} disabled className="bg-muted/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" defaultValue={user.last_name} disabled className="bg-muted/30" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="agency_name">Agency Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="agency_name" 
                  className="pl-10 h-12 rounded-xl"
                  {...form.register("agency_name")} 
                />
              </div>
              {form.formState.errors.agency_name && (
                <p className="text-xs text-destructive">{form.formState.errors.agency_name.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <Button type="submit" disabled={isPending} className="rounded-xl px-6 h-11 shadow-lg shadow-primary/20">
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
