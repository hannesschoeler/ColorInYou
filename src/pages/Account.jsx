import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { LogOut, Trash2, Lock, Camera, Save } from 'lucide-react';
import { Helmet } from 'react-helmet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/lib/supabaseClient';

const Account = () => {
  const { user, profile, signOut, updateUser, deleteAccount } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const avatarInputRef = useRef(null);

  useEffect(() => {
    if (user && profile) {
      setFullName(profile.full_name || '');
      setEmail(user.email);
      setAvatarPreview(profile.avatar_url || null);
    }
  }, [user, profile]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    const { error } = await deleteAccount();
    setLoading(false);
    if (!error) {
      navigate('/');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    let avatar_url = profile.avatar_url;

    if (avatarFile) {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile, { upsert: true });

      if (uploadError) {
        toast({ variant: 'destructive', title: 'Fehler beim Hochladen des Avatars', description: uploadError.message });
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
      avatar_url = urlData.publicUrl;
    }

    const updates = {
      data: { full_name: fullName, avatar_url },
    };
    
    await updateUser(updates);
    
    setLoading(false);
  };
  
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword) {
        toast({ variant: 'destructive', title: 'Fehler', description: 'Bitte gib ein neues Passwort ein.' });
        return;
    }
    setLoading(true);
    await updateUser({ password: newPassword });
    setNewPassword('');
    setLoading(false);
  };

  if (!user || !profile) return null;
  
  const userInitial = fullName?.charAt(0) || email?.charAt(0) || 'A';

  return (
    <>
      <Helmet>
        <title>Mein Konto - ColorInYou</title>
        <meta name="description" content="Verwalte dein ColorInYou-Konto." />
      </Helmet>
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <h1 className="font-playful text-3xl md:text-4xl font-bold mb-8 text-center gradient-text">
          Kontoeinstellungen
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <Card className="shadow-lg text-center p-6">
                  <div className="relative w-32 h-32 mx-auto">
                    <Avatar className="w-32 h-32 text-4xl">
                      <AvatarImage src={avatarPreview || undefined} alt={fullName} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                        {userInitial.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
                    <Button size="icon" className="absolute bottom-0 right-0 rounded-full" onClick={() => avatarInputRef.current.click()}>
                        <Camera className="w-5 h-5" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold mt-4">{fullName || 'Anonymer Künstler'}</h2>
                  <p className="text-muted-foreground">{email}</p>
                </Card>
            </div>

            <div className="md:col-span-2 space-y-8">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Persönliche Informationen</CardTitle>
                    <CardDescription>Aktualisiere hier deine persönlichen Daten.</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleUpdateProfile}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Voller Name</Label>
                            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Dein voller Name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-Mail Adresse</Label>
                            <Input id="email" type="email" value={email} disabled />
                        </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={loading}>
                        <Save className="mr-2 h-4 w-4" />
                        {loading ? 'Speichere...' : 'Änderungen speichern'}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
                
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Passwort ändern</CardTitle>
                    <CardDescription>Wähle ein neues, sicheres Passwort.</CardDescription>
                  </CardHeader>
                   <form onSubmit={handleUpdatePassword}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">Neues Passwort</Label>
                            <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Mindestens 6 Zeichen" />
                        </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={loading}>
                        <Lock className="mr-2 h-4 w-4" />
                        {loading ? 'Aktualisiere...' : 'Passwort aktualisieren'}
                      </Button>
                    </CardFooter>
                   </form>
                </Card>

                <Card className="shadow-lg border-red-500/50">
                   <CardHeader>
                    <CardTitle className="text-destructive">Gefahrenzone</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Abmelden</p>
                        <p className="text-sm text-muted-foreground">Melde dich von deinem Konto ab.</p>
                      </div>
                      <Button onClick={handleSignOut} variant="outline">
                        <LogOut className="mr-2 h-4 w-4" />
                        Abmelden
                      </Button>
                    </div>
                     <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">Konto löschen</p>
                          <p className="text-sm text-muted-foreground">Dein Konto wird dauerhaft gelöscht.</p>
                        </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" disabled={loading}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Konto löschen
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Bist du dir absolut sicher?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Diese Aktion kann nicht rückgängig gemacht werden. Dein Konto und alle
                                  dazugehörigen Daten werden dauerhaft gelöscht.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteAccount} disabled={loading} className="bg-destructive hover:bg-destructive/90">
                                  {loading ? 'Lösche...' : 'Ja, Konto löschen'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                      </div>
                  </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </>
  );
};

export default Account;