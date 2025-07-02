import React, { useEffect, useState } from 'react';
import { usePoseDetection } from '@/hooks/usePoseDetection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface WorkoutCameraProps {
  isOpen: boolean;
  onClose: () => void;
  workoutType: number;
  onWorkoutComplete: (repCount: number, plankDuration: number) => void;
}

const WorkoutCamera: React.FC<WorkoutCameraProps> = ({
  isOpen,
  onClose,
  workoutType,
  onWorkoutComplete
}) => {
  const { videoRef, canvasRef, results, startWorkout, stopWorkout } = usePoseDetection();
  const [isStarted, setIsStarted] = useState(false);

  const workoutNames = {
    1: 'Bicep Curls',
    2: 'Squats', 
    3: 'Push-ups',
    4: 'Plank'
  };

  const handleStart = async () => {
    setIsStarted(true);
    const finalResults = await startWorkout({
      workoutType,
      duration: 60 // 1 minute
    });
    
    onWorkoutComplete(finalResults.repCount, finalResults.plankDuration);
    setIsStarted(false);
    onClose();
  };

  const handleStop = () => {
    stopWorkout();
    setIsStarted(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setIsStarted(false);
      stopWorkout();
    }
  }, [isOpen, stopWorkout]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-lg border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            🏋️ {workoutNames[workoutType as keyof typeof workoutNames]} Workout
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Get ready for your 1-minute workout session!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="bg-white/10 backdrop-blur border border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-center">Camera Feed</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <video
                  ref={videoRef}
                  className="hidden"
                  autoPlay
                  playsInline
                  muted
                />
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={480}
                  className="border border-white/30 rounded-lg"
                />
              </div>
              
              {/* Workout Stats */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <Card className="bg-white/10 border border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {workoutType === 4 ? results.plankDuration.toFixed(1) : results.repCount}
                    </div>
                    <div className="text-sm text-gray-300">
                      {workoutType === 4 ? 'Duration (s)' : 'Reps'}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 border border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-blue-400">
                      {results.lastCommand || 'Ready'}
                    </div>
                    <div className="text-sm text-gray-300">Command</div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Control Buttons */}
              <div className="flex space-x-4">
                {!isStarted ? (
                  <Button
                    onClick={handleStart}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    Start Workout
                  </Button>
                ) : (
                  <Button
                    onClick={handleStop}
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    Stop Workout
                  </Button>
                )}
                
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Close
                </Button>
              </div>
              
              {/* Instructions */}
              <div className="text-center text-sm text-gray-400 max-w-md">
                <p>Position yourself in front of the camera and click "Start Workout" to begin.</p>
                <p>The session will automatically end after 1 minute.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutCamera;