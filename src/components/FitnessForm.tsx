import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import WinnersDialog from "./WinnersDialog";

interface FormData {
  name: string;
  age: string;
  gender: string;
  email: string;
  phoneNumber: string;
  height: string;
  weight: string;
  workoutChoice: string;
  experience: string;
}

interface FitnessFormProps {
  formData: FormData;
  winners: string[];
  showWinnersDialog: boolean;
  setShowWinnersDialog: (show: boolean) => void;
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPickWinner: (e: React.MouseEvent) => void;
}

const FitnessForm: React.FC<FitnessFormProps> = ({
  formData,
  winners,
  showWinnersDialog,
  setShowWinnersDialog,
  onInputChange,
  onSubmit,
  onPickWinner
}) => {
  return (
    <div className="max-w-2xl mx-auto relative z-10">
      <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl animate-scale-in">
        <CardHeader>
          <CardTitle className="text-2xl text-white text-center">FITRONX TEST FORM</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Name:</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => onInputChange('name', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-white">Age:</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => onInputChange('age', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter your age"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Gender:</Label>
                <RadioGroup 
                  value={formData.gender} 
                  onValueChange={(value) => onInputChange('gender', value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" className="border-white/50 text-white" />
                    <Label htmlFor="male" className="text-white cursor-pointer">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" className="border-white/50 text-white" />
                    <Label htmlFor="female" className="text-white cursor-pointer">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email:</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => onInputChange('email', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone Number:</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => onInputChange('phoneNumber', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter your phone"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-white">Height:</Label>
                  <Input
                    id="height"
                    value={formData.height}
                    onChange={(e) => onInputChange('height', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
                    placeholder="e.g., 5'8&quot; or 173cm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-white">Weight:</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => onInputChange('weight', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
                    placeholder="e.g., 150lbs or 68kg"
                  />
                </div>
              </div>
            </div>

            {/* Workout Choice */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Label className="text-white text-lg">Workout Choice:</Label>
              <RadioGroup 
                value={formData.workoutChoice} 
                onValueChange={(value) => onInputChange('workoutChoice', value)}
                className="space-y-3"
              >
                {['Bicep Curls', 'Squats', 'Pushups', 'Plank'].map((workout) => (
                  <div key={workout} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <RadioGroupItem value={workout.toLowerCase().replace(' ', '')} id={workout} className="border-white/50 text-white" />
                    <Label htmlFor={workout} className="text-white cursor-pointer flex-1">{workout}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Experience */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Label className="text-white text-lg">Experience:</Label>
              <RadioGroup 
                value={formData.experience} 
                onValueChange={(value) => onInputChange('experience', value)}
                className="flex space-x-8"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" className="border-white/50 text-white" />
                  <Label htmlFor="yes" className="text-white cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" className="border-white/50 text-white" />
                  <Label htmlFor="no" className="text-white cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Submit
              </Button>
              <WinnersDialog
                winners={winners}
                showWinnersDialog={showWinnersDialog}
                setShowWinnersDialog={setShowWinnersDialog}
                onPickWinner={onPickWinner}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FitnessForm;