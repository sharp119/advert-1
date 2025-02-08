import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Map, Box, Settings, Activity, DollarSign } from 'lucide-react';

const VenueDetailView = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const VenueOverview = () => (
    <div className="space-y-6">
      {/* Venue Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm text-gray-500">Available Blocks</h3>
            <p className="text-2xl font-bold mt-1">180/500</p>
            <p className="text-sm text-green-500 mt-1">36% Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm text-gray-500">Active Advertisers</h3>
            <p className="text-2xl font-bold mt-1">24</p>
            <p className="text-sm text-blue-500 mt-1">↑ 4 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm text-gray-500">Monthly Revenue</h3>
            <p className="text-2xl font-bold mt-1">$12,450</p>
            <p className="text-sm text-green-500 mt-1">↑ 15% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm text-gray-500">Engagement Rate</h3>
            <p className="text-2xl font-bold mt-1">27.5%</p>
            <p className="text-sm text-green-500 mt-1">↑ 5% vs average</p>
          </CardContent>
        </Card>
      </div>

      {/* Block Map */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Block Map</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Box className="w-4 h-4 mr-2" />
                Add Block
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configure Grid
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="aspect-[16/9] bg-gray-50 rounded-lg relative">
            {/* 3D Grid Visualization would go here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Map className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-200" />
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-200" />
                <span className="text-sm">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-yellow-200" />
                <span className="text-sm">Reserved</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Zoom</Button>
              <Button variant="outline" size="sm">Rotate</Button>
              <Button variant="outline" size="sm">Reset</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Advertisers */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Active Advertisers</h3>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {[1, 2, 3].map((item) => (
              <div key={item} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Advertiser #{item}</p>
                  <p className="text-sm text-gray-500">12 blocks • Near Stage</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">5.5 ETH spent</p>
                  <p className="text-sm text-gray-500">Active until Jul 2025</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const BlockPricing = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Pricing Configuration</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Base Price per Block</label>
                <Input type="number" placeholder="ETH" defaultValue="0.5" />
              </div>
              <div>
                <label className="text-sm font-medium">Premium Location Multiplier</label>
                <Input type="number" placeholder="e.g. 1.5" defaultValue="1.5" />
              </div>
              <div>
                <label className="text-sm font-medium">Minimum Rental Duration</label>
                <Input type="number" placeholder="Days" defaultValue="7" />
              </div>
            </div>
            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <h4 className="font-medium">Price Preview</h4>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Standard Block</span>
                    <span className="font-medium">0.5 ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Premium Block</span>
                    <span className="font-medium">0.75 ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Weekly Revenue</span>
                    <span className="font-medium">5.25 ETH</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Price Zones</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {['Premium', 'Standard', 'Basic'].map((zone) => (
              <Card key={zone}>
                <CardContent className="pt-6">
                  <h4 className="font-medium">{zone} Zone</h4>
                  <p className="text-2xl font-bold mt-2">
                    {zone === 'Premium' ? '0.75' : zone === 'Standard' ? '0.5' : '0.25'} ETH
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {zone === 'Premium' ? 'Stage Front' : zone === 'Standard' ? 'Middle Area' : 'Back Area'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Revenue Analytics</h3>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { name: 'Jan', value: 4000 },
                { name: 'Feb', value: 5500 },
                { name: 'Mar', value: 4800 },
                { name: 'Apr', value: 6000 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Engagement Heat Map</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {Array(16).fill(null).map((_, i) => (
                <div 
                  key={i}
                  className={`aspect-square rounded-lg ${
                    ['bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400'][Math.floor(Math.random() * 4)]
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Block Performance</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['High Traffic', 'Medium Traffic', 'Low Traffic'].map((type) => (
                <div key={type} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{type}</p>
                    <p className="text-sm text-gray-500">
                      {type === 'High Traffic' ? '45%' : type === 'Medium Traffic' ? '35%' : '20%'} of total blocks
                    </p>
                  </div>
                  <div className="w-24 h-2 rounded-full bg-gray-100">
                    <div 
                      className={`h-full rounded-full ${
                        type === 'High Traffic' ? 'bg-green-500 w-[45%]' : 
                        type === 'Medium Traffic' ? 'bg-yellow-500 w-[35%]' : 
                        'bg-red-500 w-[20%]'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tech Expo Hall</h1>
          <p className="text-gray-500">500 total blocks • Last updated 2 hours ago</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Data</Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pricing">Block Pricing</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <VenueOverview />
        </TabsContent>

        <TabsContent value="pricing">
          <BlockPricing />
        </TabsContent>

        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VenueDetailView;