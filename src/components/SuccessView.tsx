import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import WinnersDialog from "./WinnersDialog";

interface WorkoutResults {
  repCount: number;
  plankDuration: number;
}

interface SuccessViewProps {
  workoutResults: WorkoutResults | null;
  workoutChoice: string;
  winners: string[];
  showWinnersDialog: boolean;
  setShowWinnersDialog: (show: boolean) => void;
  onTakeAnother: () => void;
  onPickWinner: (e: React.MouseEvent) => void;
  getWorkoutTypeNumber: (workoutChoice: string) => number;
}

const SuccessView: React.FC<SuccessViewProps> = ({
  workoutResults,
  workoutChoice,
  winners,
  showWinnersDialog,
  setShowWinnersDialog,
  onTakeAnother,
  onPickWinner,
  getWorkoutTypeNumber
}) => {
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
          <div className="text-center space-y-2">
            {workoutResults && (
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Your Results:</h3>
                {getWorkoutTypeNumber(workoutChoice) === 4 ? (
                  <p className="text-2xl font-bold text-green-400">
                    Plank Duration: {workoutResults.plankDuration.toFixed(1)}s
                  </p>
                ) : (
                  <p className="text-2xl font-bold text-green-400">
                    Total Reps: {workoutResults.repCount}
                  </p>
                )}
              </div>
            )}
          </div>
          <Button 
            onClick={onTakeAnother}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Take Another Assessment
          </Button>
          <WinnersDialog
            winners={winners}
            showWinnersDialog={showWinnersDialog}
            setShowWinnersDialog={setShowWinnersDialog}
            onPickWinner={onPickWinner}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessView;