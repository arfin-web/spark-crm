import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Database, Key } from "lucide-react";
import { ProfileSettings } from "@/components/dashboard/settings/ProfileSettings";
import { PreferenceSettings } from "@/components/dashboard/settings/PreferenceSettings";
import { DataSettings } from "@/components/dashboard/settings/DataSettings";
import { APIKeySettings } from "@/components/dashboard/settings/APIKeySettings";
import { getUserProfile } from "@/lib/actions/settings";

export const metadata: Metadata = {
  title: "Settings | Spark CRM",
};

export default async function SettingsPage() {
  const user = await getUserProfile();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">Account Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your agency profile, preferences, and data.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <div className="bg-card p-1 rounded-2xl border border-border shadow-sm inline-flex">
          <TabsList className="bg-transparent border-none">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl px-6">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl px-6">
              <Settings className="mr-2 h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl px-6">
              <Database className="mr-2 h-4 w-4" />
              Data
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl px-6">
              <Key className="mr-2 h-4 w-4" />
              API Access
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile" className="mt-0">
          <ProfileSettings user={user} />
        </TabsContent>
        <TabsContent value="preferences" className="mt-0">
          <PreferenceSettings />
        </TabsContent>
        <TabsContent value="data" className="mt-0">
          <DataSettings />
        </TabsContent>
        <TabsContent value="api" className="mt-0">
          <APIKeySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
