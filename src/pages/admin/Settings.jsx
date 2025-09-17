import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';

const Settings = () => {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchSettings = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase.from('settings').select('value').eq('key', 'maintenance_mode').single();
        if(error){
            toast({variant: 'destructive', title: 'Fehler', description: 'Einstellungen konnten nicht geladen werden.'});
        } else {
            setMaintenanceMode(data.value.enabled);
        }
        setLoading(false);
    }, [toast]);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const handleMaintenanceToggle = async (enabled) => {
        setMaintenanceMode(enabled);
        const { error } = await supabase
            .from('settings')
            .update({ value: { enabled } })
            .eq('key', 'maintenance_mode');
        
        if (error) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Wartungsmodus konnte nicht aktualisiert werden.' });
            // revert state
            setMaintenanceMode(!enabled);
        } else {
            toast({ title: 'Erfolg!', description: `Wartungsmodus wurde ${enabled ? 'aktiviert' : 'deaktiviert'}.` });
        }
    }

    if (loading) {
        return <div>Lade Einstellungen...</div>
    }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Einstellungen</h1>
      <Card>
        <CardHeader>
          <CardTitle>Website-Einstellungen</CardTitle>
          <CardDescription>Verwalte hier globale Einstellungen für deine Website.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="maintenance-mode" className="font-semibold">Wartungsmodus</Label>
              <p className="text-sm text-muted-foreground">
                Wenn aktiviert, wird allen Besuchern eine Wartungsseite angezeigt.
              </p>
            </div>
            <Switch
              id="maintenance-mode"
              checked={maintenanceMode}
              onCheckedChange={handleMaintenanceToggle}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;