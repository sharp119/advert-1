import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Search, Map, Activity, BarChart2 } from 'lucide-react';

const BlockMarketplace = () => (
  <div className="space-y-6">
    {/* Search and Filters */}
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input className="pl-10" placeholder="Search venues and blocks..." />
          </div>
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Sort</Button>
        </div>
      </CardContent>
    </Card>

    {/* Featured Venues */}
    <div className="grid grid-cols-3 gap-6">
      {['Tech Expo Hall', 'Conference Center', 'Stadium'].map((venue) => (
        <Card key={venue} className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <Map className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold">{venue}</h3>
            <p className="text-sm text-gray-500 mt-1">180 blocks available</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm">From <span className="font-semibold">0.5 ETH</span></p>
              <Button size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Block Details */}
    <div className="grid grid-cols-3 gap-6">
      <Card className="col-span-2">
        <CardHeader>
          <h3 className="text-lg font-semibold">Block Information</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Location Details</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Venue</span>
                    <span className="text-sm font-medium">Tech Expo Hall</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Section</span>
                    <span className="text-sm font-medium">Main Stage Area</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Height Level</span>
                    <span className="text-sm font-medium">Level 2</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Block Specifications</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Dimensions</span>
                    <span className="text-sm font-medium">2m × 2m × 2m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Volume</span>
                    <span className="text-sm font-medium">8m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Visibility Score</span>
                    <span className="text-sm font-medium">9.2/10</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Usage Statistics</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Average Daily Views</span>
                    <span className="text-sm font-medium">1,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Peak Hours</span>
                    <span className="text-sm font-medium">2PM - 6PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Engagement Rate</span>
                    <span className="text-sm font-medium">24.8%</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Technical Requirements</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Supported Formats</span>
                    <span className="text-sm font-medium">GLTF, GLB, USDZ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Max File Size</span>
                    <span className="text-sm font-medium">50MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Min Resolution</span>
                    <span className="text-sm font-medium">2K Textures</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Block Analytics</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Daily Traffic Pattern</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { hour: '8AM', traffic: 300 },
                    { hour: '12PM', traffic: 600 },
                    { hour: '4PM', traffic: 900 },
                    { hour: '8PM', traffic: 400 }
                  ]}>
                    <XAxis dataKey="hour" />
                    <Tooltip />
                    <Bar dataKey="traffic" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Engagement Distribution</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Direct Views', value: 60 },
                        { name: 'Interactions', value: 25 },
                        { name: 'Shares', value: 15 }
                      ]}
                      innerRadius={30}
                      outerRadius={50}
                      dataKey="value"
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#10b981" />
                      <Cell fill="#6366f1" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const MyBlocks = () => (
  <div className="space-y-6">
    {/* Stats Overview */}
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-sm text-gray-500">Active Blocks</h3>
          <p className="text-2xl font-bold mt-1">12</p>
          <p className="text-sm text-green-500 mt-1">Across 3 venues</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-sm text-gray-500">Total Investment</h3>
          <p className="text-2xl font-bold mt-1">5.5 ETH</p>
          <p className="text-sm text-blue-500 mt-1">≈ $12,450</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-sm text-gray-500">Total Views</h3>
          <p className="text-2xl font-bold mt-1">45.6K</p>
          <p className="text-sm text-green-500 mt-1">↑ 12% this week</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-sm text-gray-500">Engagement Rate</h3>
          <p className="text-2xl font-bold mt-1">24.8%</p>
          <p className="text-sm text-green-500 mt-1">↑ 5% vs average</p>
        </CardContent>
      </Card>
    </div>

    {/* Enhanced Analytics */}
    <div className="grid grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Engagement Over Time</h3>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { date: 'Mon', views: 4000, interactions: 2400 },
                { date: 'Tue', views: 3000, interactions: 1398 },
                { date: 'Wed', views: 2000, interactions: 9800 },
                { date: 'Thu', views: 2780, interactions: 3908 },
                { date: 'Fri', views: 1890, interactions: 4800 },
                { date: 'Sat', views: 2390, interactions: 3800 },
                { date: 'Sun', views: 3490, interactions: 4300 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#2563eb" strokeWidth={2} name="Views" />
                <Line type="monotone" dataKey="interactions" stroke="#10b981" strokeWidth={2} name="Interactions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Block Performance</h3>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { block: 'A1', views: 4000, engagement: 2400 },
                { block: 'A2', views: 3000, engagement: 1398 },
                { block: 'B1', views: 2000, engagement: 9800 },
                { block: 'B2', views: 2780, engagement: 3908 },
                { block: 'C1', views: 1890, engagement: 4800 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="block" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#2563eb" name="Views" />
                <Bar dataKey="engagement" fill="#10b981" name="Engagement" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const AdvertiserDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('marketplace');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">AR Space Platform</h1>
            <Button variant="outline">Connected: 0x1234...5678</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="myblocks">My Blocks</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace">
            <BlockMarketplace />
          </TabsContent>

          <TabsContent value="myblocks">
            <MyBlocks />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;