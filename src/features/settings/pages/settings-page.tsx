import React from 'react';
import { User, Palette, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeSelector } from '@/components/theme';
import { useAuthStore } from '@/store/auth-store';
import { useToast } from '@/components/ui/toast';

export const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const toast = useToast();

  const [name, setName] = React.useState(user?.name || '');
  const [email, setEmail] = React.useState(user?.email || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email });
    toast.success('Profile updated successfully.');
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings & Preferences</h1>
        <p className="text-sm text-muted-foreground">Manage your personal profile and application theme preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> Profile Information
            </CardTitle>
            <CardDescription>Update your personal account display information</CardDescription>
          </CardHeader>
          <form onSubmit={handleSaveProfile}>
            <CardContent className="space-y-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </CardContent>
            <CardFooter className="justify-end border-t border-border pt-4">
              <Button type="submit" variant="primary" leftIcon={<Save className="h-4 w-4" />}>
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Appearance Theme Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" /> Appearance & Theme Customization
            </CardTitle>
            <CardDescription>Configure application theme mode and system accent color palette</CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeSelector />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
