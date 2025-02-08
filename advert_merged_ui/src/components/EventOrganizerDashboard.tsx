import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Plus } from 'lucide-react';

const mockData = {
  venues: [
    { 
      id: 'tech-expo-hall', 
      name: 'Tech Expo Hall', 
      blocksUsed: '320/500',
      description: 'Main exhibition space for technology showcases'
    },
    { 
      id: 'conference-center', 
      name: 'Conference Center', 
      blocksUsed: '420/750',
      description: 'Versatile space for corporate and academic events'
    }
  ],
  stats: {
    totalBlocks: 1250,
    activeVenues: 2,
    engagementRate: 27.5,
    revenue: 23500
  },
  revenueData: [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 19000 },
    { name: 'Mar', value: 15000 },
    { name: 'Apr', value: 23500 }
  ]
};

const StatCard = ({ 
  title, 
  value, 
  subtext, 
  icon: Icon 
}: { 
  title: string, 
  value: string | number, 
  subtext?: string, 
  icon: React.ElementType 
}) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
        </div>
        <Icon className="w-6 h-6 text-gray-400" />
      </div>
    </CardContent>
  </Card>
);

const EventOrganizerDashboard = () => {
  const router = useRouter();

  const handleAddSpace = () => {
    router.push('/venue-setup');
  };

  const handleVenueSelect = (venueId: string) => {
    router.push(`/venue?id=${venueId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">AR Space Platform</h1>
            <div className="flex gap-4">
              <Button variant="outline">Connect Wallet</Button>
              <Button onClick={handleAddSpace}>
                <Plus className="w-4 h-4 mr-2" />
                Add Space
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Venues Sidebar */}
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Your Venues</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.venues.map((venue) => (
                    <Card 
                      key={venue.id} 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleVenueSelect(venue.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{venue.name}</p>
                            <p className="text-sm text-gray-500">
                              {venue.blocksUsed} blocks used
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {venue.description}
                            </p>
                          </div>
                          <Building className="w-5 h-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <div className="col-span-9 space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-4 gap-4">
              <StatCard 
                title="Total Blocks" 
                value={mockData.stats.totalBlocks} 
                icon={Building}
              />
              <StatCard 
                title="Active Venues" 
                value={mockData.stats.activeVenues} 
                icon={Building}
              />
              <StatCard 
                title="Engagement Rate" 
                value={`${mockData.stats.engagementRate}%`}
                subtext="↑ 5% from average"
                icon={Building}
              />
              <StatCard 
                title="Revenue" 
                value={`$${mockData.stats.revenue}`}
                subtext="↑ 15% this month"
                icon={Building}
              />
            </div>

            {/* Recent Activity Section */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Recent Activity</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div 
                      key={item} 
                      className="flex items-center justify-between py-2 border-b last:border-b-0"
                    >
                      <div>
                        <p className="font-medium">Block #{item}00 Purchased</p>
                        <p className="text-sm text-gray-500">Tech Expo Hall</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">0.5 ETH</p>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOrganizerDashboard;