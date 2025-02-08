import React from 'react';
import Link from 'next/link';
import { Building, MapPin, Users, Settings } from 'lucide-react';

export default function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const navItems = [
    { 
      href: '/advertiser', 
      icon: MapPin, 
      label: 'Advertiser' 
    },
    { 
      href: '/venue', 
      icon: Building, 
      label: 'Venue' 
    },
    { 
      href: '/event-organizer', 
      icon: Users, 
      label: 'Event Organizer' 
    },
    { 
      href: '/venue-setup', 
      icon: Settings, 
      label: 'Venue Setup' 
    }
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <h1 className="text-2xl font-bold mb-8">AR Space</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className="flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <item.icon className="mr-3 w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        {children}
      </div>
    </div>
  );
}