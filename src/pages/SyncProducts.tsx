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

  const handleSync = async () => {
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke('sync-wix-products');

      if (error) throw error;

      if (data?.success) {
        setLastSync(new Date());
        toast.success("Products synced!", {
          description: `Successfully synced ${data.synced} products from Wix`,
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

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Sync Products</h1>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Wix Product Sync
              </CardTitle>
              <CardDescription>
                Sync your products from Wix store to your database. This will fetch all products
                and update your local catalog.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {lastSync && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Last synced: {lastSync.toLocaleString()}
                </div>
              )}
              
              <Button
                onClick={handleSync}
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
                    Sync Now
                  </>
                )}
              </Button>

              <div className="text-sm text-muted-foreground space-y-2 pt-4 border-t">
                <p className="font-medium">What happens when you sync:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Fetches all products from your Wix store</li>
                  <li>Updates existing products or adds new ones</li>
                  <li>Preserves product images and details</li>
                  <li>Syncs pricing and inventory information</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SyncProducts;
