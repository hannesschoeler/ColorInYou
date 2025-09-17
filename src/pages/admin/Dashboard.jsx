import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BarChart, Clock } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
} from 'recharts';
import { supabase } from '@/lib/supabaseClient';

const Dashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, newUsersToday: 0 });
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            const { data: users, count, error } = await supabase.from('profiles').select('*', { count: 'exact' });
            if (!error) {
                const today = new Date().toISOString().slice(0, 10);
                
                const { count: newTodayCount, error: todayError } = await supabase.from('profiles').select('id', { count: 'exact' }).like('created_at', `${today}%`);

                setStats({ totalUsers: count, newUsersToday: todayError ? 0 : newTodayCount });
            }
        };

        const fetchChartData = async () => {
             const { data, error } = await supabase.rpc('get_daily_user_registrations');
             if(!error) {
                const formattedData = data.map(d => ({
                    date: new Date(d.day).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }),
                    registrations: d.count
                }));
                setChartData(formattedData);
             }
        }
        
        fetchStats();
        fetchChartData();
    }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamte Benutzer</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Neue Benutzer (heute)</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.newUsersToday}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serverzeit</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date().toLocaleTimeString('de-DE')}</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <Card>
            <CardHeader>
                <CardTitle>Benutzerregistrierungen (Letzte 7 Tage)</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <ReBarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="registrations" fill="#8884d8" name="Neue Benutzer"/>
                    </ReBarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;