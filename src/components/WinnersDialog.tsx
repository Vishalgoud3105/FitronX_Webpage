import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface WinnersDialogProps {
  winners: string[];
  showWinnersDialog: boolean;
  setShowWinnersDialog: (show: boolean) => void;
  onPickWinner: (e: React.MouseEvent) => void;
}

const WinnersDialog: React.FC<WinnersDialogProps> = ({
  winners,
  showWinnersDialog,
  setShowWinnersDialog,
  onPickWinner
}) => {
  const handlePickWinner = (e: React.MouseEvent) => {
    const workouts = ['Bicep Curls', 'Squats', 'Pushups', 'Plank'];
    const randomWorkout = workouts[Math.floor(Math.random() * workouts.length)];
    
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
    
    onPickWinner(e);
  };

  return (
    <Dialog open={showWinnersDialog} onOpenChange={setShowWinnersDialog}>
      <DialogTrigger asChild>
        <Button 
          type="button"
          onClick={handlePickWinner}
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
  );
};

export default WinnersDialog;