import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Activity, Heart, Trophy, Zap } from "lucide-react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phoneNumber: '',
    height: '',
    weight: '',
    workoutChoice: '',
    experience: ''
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [winners, setWinners] = useState<string[]>([]);
  const [showWinnersDialog, setShowWinnersDialog] = useState(false);
  const [celebrationEmojis, setCelebrationEmojis] = useState<{id: number, x: number, y: number}[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Generate random reps between 10-50
    const totalReps = Math.floor(Math.random() * 41) + 10;
    
    toast.success(`🎉 Workout data saved successfully. Total Reps: ${totalReps}`, {
      duration: 4000,
      style: {
        background: 'linear-gradient(135deg, #10b981, #3b82f6)',
        color: 'white',
        border: 'none',
        fontSize: '16px',
        fontWeight: '600'
      }
    });

    // Add email notification
    setTimeout(() => {
      toast.success(`📧 Email sent successfully!`, {
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
          color: 'white',
          border: 'none',
          fontSize: '16px',
          fontWeight: '600'
        }
      });
    }, 1000);
  };

  const pickWinner = (e: React.MouseEvent) => {
    const workouts = ['Bicep Curls', 'Squats', 'Pushups', 'Plank'];
    const randomWorkout = workouts[Math.floor(Math.random() * workouts.length)];
    
    // Add to winners list
    setWinners(prev => [...prev, randomWorkout]);
    
    // Create celebration emojis
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const newEmojis = Array.from({length: 8}, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }));
    
    setCelebrationEmojis(newEmojis);
    
    // Remove emojis after animation
    setTimeout(() => setCelebrationEmojis([]), 2000);
    
    // Show winners dialog
    setShowWinnersDialog(true);
    
    toast.success(`🎊 Congratulations! Winner: ${randomWorkout}!`, {
      duration: 3000,
      style: {
        background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        color: 'white',
        border: 'none',
        fontSize: '16px',
        fontWeight: '600'
      }
    });
  };

  const sections = [
    { icon: Activity, title: "Personal Info", color: "text-blue-500" },
    { icon: Heart, title: "Physical Stats", color: "text-red-500" },
    { icon: Trophy, title: "Fitness Goals", color: "text-yellow-500" },
    { icon: Zap, title: "Experience", color: "text-green-500" }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Fitness Background Images */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'}}></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'}}></div>
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)'}}></div>
        </div>
        
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 animate-scale-in relative z-10">
          <CardHeader className="text-center">
            <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4 animate-bounce" />
            <CardTitle className="text-2xl text-white">Assessment Complete!</CardTitle>
            <CardDescription className="text-gray-300">
              Thank you for completing your fitness assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              Take Another Assessment
            </Button>
            <Dialog open={showWinnersDialog} onOpenChange={setShowWinnersDialog}>
              <DialogTrigger asChild>
                <Button 
                  onClick={pickWinner}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Pick Winner
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-lg border border-white/20 text-white">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl">🏆 Winners List 🏆</DialogTitle>
                  <DialogDescription className="text-center text-gray-300">
                    Here are all your workout winners!
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {winners.length === 0 ? (
                    <p className="text-center text-gray-400">No winners yet! Click Pick Winner to start.</p>
                  ) : (
                    winners.map((winner, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
                        <span className="font-medium">#{index + 1}</span>
                        <span className="text-lg">{winner}</span>
                        <span className="text-2xl">🎉</span>
                      </div>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 relative overflow-hidden">
      {/* Celebration Emojis */}
      {celebrationEmojis.map(emoji => (
        <div
          key={emoji.id}
          className="fixed text-4xl animate-bounce pointer-events-none z-50"
          style={{
            left: emoji.x - 20 + Math.random() * 40,
            top: emoji.y - 20 + Math.random() * 40,
            animation: 'celebration 2s ease-out forwards'
          }}
        >
          🎉
        </div>
      ))}

      {/* Fitness Background Images */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 w-64 h-64 bg-cover bg-center rounded-full animate-pulse" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)', animationDelay: '1s'}}></div>
        <div className="absolute top-20 right-16 w-48 h-48 bg-cover bg-center rounded-lg animate-pulse" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)', animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-20 w-56 h-40 bg-cover bg-center rounded-xl animate-pulse" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)', animationDelay: '3s'}}></div>
        <div className="absolute bottom-20 right-12 w-72 h-48 bg-cover bg-center rounded-2xl animate-pulse" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1550345332-09e3ac987658?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80)', animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-60 bg-cover bg-center rounded-lg animate-pulse" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)', animationDelay: '5s'}}></div>
      </div>

      {/* Hero Section */}
      <div className="text-center py-12 animate-fade-in relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          FITRONX
        </h1>
        <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Know your Health status from your Fitness Standards
        </p>
        
        {/* Progress Indicators */}
        <div className="flex justify-center space-x-4 mb-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div 
                key={index}
                className={`flex flex-col items-center p-3 rounded-lg transition-all duration-500 ${
                  currentSection === index 
                    ? 'bg-white/20 scale-110' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <Icon className={`w-6 h-6 ${section.color} mb-2`} />
                <span className="text-xs text-gray-300">{section.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-2xl mx-auto relative z-10">
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">FITRONX TEST FORM</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Name:</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
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
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
                      placeholder="Enter your age"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Gender:</Label>
                  <RadioGroup 
                    value={formData.gender} 
                    onValueChange={(value) => handleInputChange('gender', value)}
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
                      onChange={(e) => handleInputChange('email', e.target.value)}
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
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
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
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
                      placeholder="e.g., 5'8&quot; or 173cm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-white">Weight:</Label>
                    <Input
                      id="weight"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
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
                  onValueChange={(value) => handleInputChange('workoutChoice', value)}
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
                  onValueChange={(value) => handleInputChange('experience', value)}
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
                <Dialog open={showWinnersDialog} onOpenChange={setShowWinnersDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      type="button"
                      onClick={pickWinner}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Pick Winner
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-lg border border-white/20 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-center text-2xl">🏆 Winners List 🏆</DialogTitle>
                      <DialogDescription className="text-center text-gray-300">
                        Here are all your workout winners!
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {winners.length === 0 ? (
                        <p className="text-center text-gray-400">No winners yet! Click Pick Winner to start.</p>
                      ) : (
                        winners.map((winner, index) => (
                          <div key={index} className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
                            <span className="font-medium">#{index + 1}</span>
                            <span className="text-lg">{winner}</span>
                            <span className="text-2xl">🎉</span>
                          </div>
                        ))
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Background Animation Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};

export default Index;
