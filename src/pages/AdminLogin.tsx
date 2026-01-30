import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, Shield } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setupToken, setSetupToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showAdminSetup, setShowAdminSetup] = useState(false);
  const [isSettingUpAdmin, setIsSettingUpAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/admin");
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "Please check your email to verify your account, then log in.",
        });
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "Redirecting to admin panel...",
        });
        navigate("/admin");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminSetup = async () => {
    if (!setupToken.trim()) {
      toast({
        title: "Error",
        description: "Please enter the admin setup token",
        variant: "destructive",
      });
      return;
    }

    setIsSettingUpAdmin(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Error",
          description: "Please log in first before setting up admin access",
          variant: "destructive",
        });
        setIsSettingUpAdmin(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke("setup-admin", {
        body: { setupToken: setupToken.trim() },
      });

      if (error) throw error;

      if (data?.success) {
        toast({
          title: "Success!",
          description: data.message || "Admin access granted!",
        });
        setShowAdminSetup(false);
        setSetupToken("");
        // Refresh the page to reload with admin permissions
        window.location.reload();
      } else {
        throw new Error(data?.error || "Failed to set up admin access");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to set up admin access",
        variant: "destructive",
      });
    } finally {
      setIsSettingUpAdmin(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-background rounded-2xl shadow-xl border border-border p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">
              {isSignUp ? "Create an admin account" : "Sign in to manage enquiries"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline"
            >
              {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
            </button>
          </div>

          {/* Admin Setup Section */}
          <div className="mt-6 pt-6 border-t border-border">
            {!showAdminSetup ? (
              <button
                type="button"
                onClick={() => setShowAdminSetup(true)}
                className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Shield className="w-4 h-4" />
                First time? Set up admin access
              </button>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="font-medium text-foreground">Admin Setup</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Log in first, then enter your setup token
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="setupToken">Setup Token</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="setupToken"
                      type="password"
                      placeholder="Enter admin setup token"
                      value={setupToken}
                      onChange={(e) => setSetupToken(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAdminSetup(false);
                      setSetupToken("");
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleAdminSetup}
                    disabled={isSettingUpAdmin}
                    className="flex-1"
                  >
                    {isSettingUpAdmin ? "Setting up..." : "Grant Access"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-center">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
