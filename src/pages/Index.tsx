import React, { useState } from 'react';
import { toast } from "sonner";
import WorkoutCamera from "@/components/WorkoutCamera";
import { getIdealScore, evaluatePerformance, getRandomEmailTemplate } from "@/utils/workoutData";
import HeroSection from "@/components/HeroSection";
import FitnessForm from "@/components/FitnessForm";
import SuccessView from "@/components/SuccessView";

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
  const [showCamera, setShowCamera] = useState(false);
  const [workoutResults, setWorkoutResults] = useState<{repCount: number, plankDuration: number} | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.age || !formData.gender || !formData.workoutChoice) {
      toast.error("Please fill in all required fields before starting workout.", {
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: 'white',
          border: 'none',
          fontSize: '16px',
          fontWeight: '600'
        }
      });
      return;
    }

    console.log('Form submitted:', formData);
    
    // Open camera for workout
    setShowCamera(true);
  };

  const handleWorkoutComplete = (repCount: number, plankDuration: number) => {
    setWorkoutResults({ repCount, plankDuration });
    
    const age = parseInt(formData.age);
    const workoutType = getWorkoutTypeNumber(formData.workoutChoice);
    const score = workoutType === 4 ? plankDuration : repCount;
    
    const idealScore = getIdealScore(workoutType, age, formData.gender, formData.experience);
    const performance = evaluatePerformance(score, idealScore);
    const emailTemplate = getRandomEmailTemplate(performance, formData.name);
    
    const extra = Math.max(0, score - idealScore);
    
    // Show workout results
    toast.success(`🎉 Workout completed! ${workoutType === 4 ? `Plank Duration: ${plankDuration.toFixed(1)}s` : `Total Reps: ${repCount}`}`, {
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

    setIsSubmitted(true);
  };

  const getWorkoutTypeNumber = (workoutChoice: string): number => {
    const workoutMap: { [key: string]: number } = {
      'bicepcurls': 1,
      'squats': 2,
      'pushups': 3,
      'plank': 4
    };
    return workoutMap[workoutChoice] || 1;
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
  };

  if (isSubmitted) {
    return (
      <SuccessView
        workoutResults={workoutResults}
        workoutChoice={formData.workoutChoice}
        winners={winners}
        showWinnersDialog={showWinnersDialog}
        setShowWinnersDialog={setShowWinnersDialog}
        onTakeAnother={() => setIsSubmitted(false)}
        onPickWinner={pickWinner}
        getWorkoutTypeNumber={getWorkoutTypeNumber}
      />
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
      <HeroSection currentSection={currentSection} />

      {/* Main Form */}
      <FitnessForm
        formData={formData}
        winners={winners}
        showWinnersDialog={showWinnersDialog}
        setShowWinnersDialog={setShowWinnersDialog}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onPickWinner={pickWinner}
      />
      
      {/* Workout Camera Modal */}
      <WorkoutCamera
        isOpen={showCamera}
        onClose={() => setShowCamera(false)}
        workoutType={getWorkoutTypeNumber(formData.workoutChoice)}
        onWorkoutComplete={handleWorkoutComplete}
      />

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
