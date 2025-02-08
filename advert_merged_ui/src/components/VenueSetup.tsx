import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Upload, Settings } from 'lucide-react';

const VenueSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [venueData, setVenueData] = useState({
    scanFile: null,
    blockSize: '',
    heightLevels: '',
    gridDensity: '',
    basePrice: '',
    minRentalDuration: '',
    premiumMultiplier: ''
  });
  const router = useRouter();

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
          `}>
            {step}
          </div>
          {step < 3 && (
            <div className={`w-20 h-1 mx-2 ${
              currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const ScanUpload = () => (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Upload Venue Scan</h2>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
          <Camera className="w-12 h-12 mx-auto text-gray-400" />
          <div>
            <h3 className="text-lg font-semibold">Upload LiDAR Scan</h3>
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: .obj, .fbx, .glb
              <br />Maximum file size: 500MB
            </p>
          </div>
          <Input 
            type="file" 
            accept=".obj,.fbx,.glb"
            onChange={(e) => {
                const file = e.target.files?.[0];
                setVenueData(prev => ({
                  ...prev,
                  scanFile: file ?? null
                }));
              }}
          />
        </div>
      </CardContent>
    </Card>
  );

  const GridConfiguration = () => (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Configure Grid System</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Block Size (meters)</label>
              <Input 
                type="number" 
                placeholder="Enter block size" 
                value={venueData.blockSize}
                onChange={(e) => setVenueData(prev => ({
                  ...prev,
                  blockSize: e.target.value
                }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Height Levels</label>
              <Input 
                type="number" 
                placeholder="Number of vertical layers"
                value={venueData.heightLevels}
                onChange={(e) => setVenueData(prev => ({
                  ...prev,
                  heightLevels: e.target.value
                }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Grid Density</label>
              <Input 
                type="number" 
                placeholder="Blocks per square meter"
                value={venueData.gridDensity}
                onChange={(e) => setVenueData(prev => ({
                  ...prev,
                  gridDensity: e.target.value
                }))}
              />
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2">Preview</h3>
            <div className="aspect-square bg-gray-50 rounded flex items-center justify-center">
              <Settings className="w-8 h-8 text-gray-400" />
              {venueData.blockSize && (
                <div className="text-sm text-gray-600 mt-2">
                  Block Size: {venueData.blockSize}m
                  <br />
                  Levels: {venueData.heightLevels}
                  <br />
                  Density: {venueData.gridDensity} blocks/m²
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PricingSetup = () => (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Set Pricing Structure</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Base Price per Block (ETH)</label>
              <Input 
                type="number" 
                placeholder="Enter base price"
                value={venueData.basePrice}
                onChange={(e) => setVenueData(prev => ({
                  ...prev,
                  basePrice: e.target.value
                }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Minimum Rental Duration (Days)</label>
              <Input 
                type="number" 
                placeholder="Minimum rental period"
                value={venueData.minRentalDuration}
                onChange={(e) => setVenueData(prev => ({
                  ...prev,
                  minRentalDuration: e.target.value
                }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Premium Location Multiplier</label>
              <Input 
                type="number" 
                placeholder="e.g. 1.5"
                value={venueData.premiumMultiplier}
                onChange={(e) => setVenueData(prev => ({
                  ...prev,
                  premiumMultiplier: e.target.value
                }))}
              />
            </div>
          </div>
          <Card className="bg-gray-50 p-4">
            <h3 className="text-sm font-medium mb-2">Pricing Preview</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Standard Block Price</span>
                <span className="font-medium">
                  {venueData.basePrice ? `${venueData.basePrice} ETH` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Premium Block Price</span>
                <span className="font-medium">
                  {venueData.basePrice && venueData.premiumMultiplier 
                    ? `${(parseFloat(venueData.basePrice) * parseFloat(venueData.premiumMultiplier)).toFixed(2)} ETH` 
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Minimum Rental</span>
                <span className="font-medium">
                  {venueData.minRentalDuration ? `${venueData.minRentalDuration} Days` : 'N/A'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );

  const handleNextStep = () => {
    // Basic validation for each step
    switch (currentStep) {
      case 1:
        if (!venueData.scanFile) {
          alert('Please upload a venue scan file');
          return;
        }
        break;
      case 2:
        if (!venueData.blockSize || !venueData.heightLevels || !venueData.gridDensity) {
          alert('Please fill in all grid configuration details');
          return;
        }
        break;
      case 3:
        if (!venueData.basePrice || !venueData.minRentalDuration || !venueData.premiumMultiplier) {
          alert('Please fill in all pricing details');
          return;
        }
        // Here you could also add more complex validation
        break;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission
      console.log('Venue Setup Complete', venueData);
      router.push('/venue?id=new-venue');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Venue Setup</h1>
      
      <StepIndicator />
      
      <div className="space-y-6">
        {currentStep === 1 && <ScanUpload />}
        {currentStep === 2 && <GridConfiguration />}
        {currentStep === 3 && <PricingSetup />}
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button onClick={handleNextStep}>
            {currentStep === 3 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VenueSetup;