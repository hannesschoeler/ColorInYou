import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (user) => {
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } else {
      setProfile(null);
    }
  }, []);

  const handleAuthChange = useCallback(async (session) => {
    setSession(session);
    const currentUser = session?.user ?? null;
    setUser(currentUser);
    await fetchProfile(currentUser);
    setLoading(false);
  }, [fetchProfile]);

  const cleanUpSession = useCallback(async () => {
    await supabase.auth.signOut({ scope: 'local' });
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setProfile(null);
    setSession(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    const checkUserAndSession = async () => {
      const { data: { session: localSession } } = await supabase.auth.getSession();
      
      if (localSession?.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', localSession.user.id)
          .single();

        if (profileError || !profileData) {
          await cleanUpSession();
        } else {
          await handleAuthChange(localSession);
        }
      } else {
        await handleAuthChange(null);
      }
      setLoading(false);
    };

    checkUserAndSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
         if (_event === 'SIGNED_OUT') {
           await cleanUpSession();
         } else if (session) {
           await handleAuthChange(session);
         }
      }
    );

    return () => subscription.unsubscribe();
  }, [handleAuthChange, cleanUpSession]);


  const signUp = useCallback(async (fullName, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://colorinyou.de',
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Registrierung fehlgeschlagen",
        description: error.message || "Etwas ist schiefgelaufen",
      });
      return { data, error };
    }

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (signInError) {
        toast({
            variant: "destructive",
            title: "Automatisches Einloggen fehlgeschlagen",
            description: "Bitte melde dich manuell an.",
        });
        return { data: signInData, error: signInError };
    }
    
    if (signInData.user && !signInData.user.email_confirmed_at) {
        toast({
            title: "Fast geschafft!",
            description: "Dein Konto wurde erstellt. Bitte bestätige deine E-Mail-Adresse.",
            duration: 9000,
        });
    }

    return { data: signInData, error: null };
  }, [toast]);

  const signIn = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
       if (error.message === "Email not confirmed") {
         toast({
           variant: "destructive",
           title: "Anmeldung fehlgeschlagen",
           description: "Bitte bestätige zuerst deine E-Mail-Adresse.",
         });
       } else {
         toast({
           variant: "destructive",
           title: "Anmeldung fehlgeschlagen",
           description: "Falsche E-Mail oder falsches Passwort.",
         });
       }
    } else if (data.user && !data.user.email_confirmed_at) {
        toast({
            title: "Bitte E-Mail bestätigen",
            description: "Du kannst die Seite nutzen, aber bitte bestätige deine E-Mail-Adresse bald.",
            duration: 9000,
        });
    }
    return { data, error };
  }, [toast]);

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://colorinyou.de'
      }
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Google-Anmeldung fehlgeschlagen",
        description: error.message || "Etwas ist schiefgelaufen",
      });
    }
    return { error };
  }, [toast]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);
  
  const resetPasswordForEmail = useCallback(async (email) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://colorinyou.de',
      });
      if (error) {
        toast({ variant: 'destructive', title: 'Fehler', description: error.message });
      } else {
        toast({ title: 'E-Mail gesendet', description: 'Überprüfe dein Postfach für den Link zum Zurücksetzen des Passworts.' });
      }
    }, [toast]);

  const updateUser = useCallback(async (data) => {
    const { data: updatedUser, error } = await supabase.auth.updateUser(data);
    if(error) {
       toast({ variant: 'destructive', title: 'Fehler', description: "Kontodaten konnten nicht aktualisiert werden. " + error.message });
    } else {
       toast({ title: 'Erfolg!', description: 'Deine Kontodaten wurden erfolgreich aktualisiert.' });
       setUser(updatedUser.user);
       // Also update profile
        if (data.data) {
           const { error: profileError } = await supabase
            .from('profiles')
            .update({ full_name: data.data.full_name, avatar_url: data.data.avatar_url, updated_at: new Date() })
            .eq('id', updatedUser.user.id);
            
            if (!profileError) {
                await fetchProfile(updatedUser.user);
            }
        }
    }
    return { updatedUser, error };
  }, [toast, fetchProfile]);

  const deleteAccount = useCallback(async () => {
    const { data, error: deleteError } = await supabase.functions.invoke('delete-user');

    if (deleteError || !data.success) {
      toast({
        variant: "destructive",
        title: "Fehler beim Löschen des Kontos",
        description: deleteError?.message || data?.message || "Ein unbekannter Fehler ist aufgetreten.",
      });
      return { error: deleteError || new Error(data?.message) };
    }
    
    await cleanUpSession();

    toast({
      title: "Konto gelöscht",
      description: "Dein Konto wurde erfolgreich und dauerhaft gelöscht.",
    });
    
    return {};
  }, [toast, cleanUpSession]);

  const value = useMemo(() => ({
    user,
    profile,
    session,
    loading,
    isAdmin: profile?.role === 'admin',
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    resetPasswordForEmail,
    updateUser,
    deleteAccount,
  }), [user, profile, session, loading, signUp, signIn, signOut, signInWithGoogle, resetPasswordForEmail, updateUser, deleteAccount]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};