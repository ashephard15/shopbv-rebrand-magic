import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, RefreshCw, CheckCircle2 } from "lucide-react";

const SyncProducts = () => {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const handleSyncToWix = async () => {
    setSyncing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('You must be logged in to sync products');
      }

      const { data, error } = await supabase.functions.invoke('sync-wix-products', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.success) {
        setLastSync(new Date());
        toast.success("Synced to Wix!", {
          description: `Successfully synced ${data.synced} products to Wix`,
          position: "top-center"
        });
      } else {
        throw new Error(data?.error || 'Sync failed');
      }
    } catch (error) {
      console.error('Sync error:', error);
      toast.error("Sync failed", {
        description: error instanceof Error ? error.message : 'Failed to sync products',
        position: "top-center"
      });
    } finally {
      setSyncing(false);
    }
  };

  const handleSyncFromWix = async () => {
    setSyncing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('You must be logged in to sync products');
      }

      const { data, error } = await supabase.functions.invoke('sync-from-wix', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.success) {
        setLastSync(new Date());
        toast.success("Synced from Wix!", {
          description: `Updated ${data.updated} products with Wix image URLs`,
          position: "top-center"
        });
      } else {
        throw new Error(data?.error || 'Sync failed');
      }
    } catch (error) {
      console.error('Sync error:', error);
      toast.error("Sync failed", {
        description: error instanceof Error ? error.message : 'Failed to sync from Wix',
        position: "top-center"
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold mb-8 text-center">Sync Products</h1>
          
          {lastSync && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Last synced: {lastSync.toLocaleString()}
            </div>
          )}

          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Pull from Wix (Recommended)
              </CardTitle>
              <CardDescription>
                After uploading the CSV to Wix, pull products back to update image URLs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="font-medium text-sm">✨ For Image URL Updates:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-2">
                  <li>Upload the CSV (from Export page) to your Wix store</li>
                  <li>Wix automatically downloads and re-hosts the images</li>
                  <li>Click "Pull from Wix" below to update your database with new URLs</li>
                </ol>
              </div>
              
              <Button
                onClick={handleSyncFromWix}
                disabled={syncing}
                size="lg"
                className="w-full"
              >
                {syncing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Pull from Wix
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <RefreshCw className="w-5 h-5" />
                Push to Wix
              </CardTitle>
              <CardDescription>
                Upload your database products to create new products in Wix
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium">What this does:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Finds products in database without Wix IDs</li>
                  <li>Creates those products in your Wix store</li>
                  <li>Links database products to Wix products</li>
                </ul>
              </div>
              
              <Button
                onClick={handleSyncToWix}
                disabled={syncing}
                size="lg"
                variant="outline"
                className="w-full"
              >
                {syncing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Push to Wix
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SyncProducts;
