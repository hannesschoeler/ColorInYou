import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Wrench, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button'; // Import Button component

const AdminLayout = () => {
  const navLinks = [
    { to: '/admin', text: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', text: 'Benutzer', icon: Users },
    { to: '/admin/settings', text: 'Einstellungen', icon: Wrench },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 flex-shrink-0 bg-white border-r hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center px-4 border-b">
          <Logo className="h-10 w-auto" />
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin'}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                )
              }
            >
              <link.icon className="w-5 h-5 mr-3" />
              {link.text}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center px-6 justify-between">
            {/* Mobile Header (e.g., for Logo or specific controls) */}
            <div className="md:hidden">
              <Logo className="h-8 w-auto" />
            </div>
            {/* Right side controls for desktop and mobile */}
            <div className="ml-auto"> {/* Pushes content to the right */}
                <Button asChild variant="outline">
                    <Link to="/">
                        <Globe className="w-4 h-4 mr-2" />
                        Zurück zur Website
                    </Link>
                </Button>
            </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;