import { useRef, useCallback, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

interface PoseResults {
  repCount: number;
  plankDuration: number;
  isActive: boolean;
  lastCommand: string;
}

interface WorkoutConfig {
  workoutType: number; // 1: bicep, 2: squats, 3: pushups, 4: plank
  duration: number; // in seconds
}

export const usePoseDetection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [results, setResults] = useState<PoseResults>({
    repCount: 0,
    plankDuration: 0,
    isActive: false,
    lastCommand: ''
  });

  const calculateAngle = useCallback((a: number[], b: number[], c: number[]): number => {
    const radians = Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0]);
    let angle = Math.abs(radians * 180.0 / Math.PI);
    if (angle > 180.0) {
      angle = 360 - angle;
    }
    return angle;
  }, []);

  const startWorkout = useCallback(async (config: WorkoutConfig): Promise<PoseResults> => {
    return new Promise((resolve) => {
      if (!videoRef.current || !canvasRef.current) {
        resolve(results);
        return;
      }

      let repCount = 0;
      let plankDuration = 0;
      let plankStartTime: number | null = null;
      let inDownPosition = false;
      let lastCommand = '';
      const endTime = Date.now() + (config.duration * 1000);

      const pose = new Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      pose.onResults((results) => {
        if (!results.poseLandmarks || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')!;
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the video frame
        if (videoRef.current) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        }

        const landmarks = results.poseLandmarks;

        try {
          switch (config.workoutType) {
            case 1: // Bicep Curls
              const shoulderLeft = [landmarks[11].x, landmarks[11].y];
              const elbowLeft = [landmarks[13].x, landmarks[13].y];
              const wristLeft = [landmarks[15].x, landmarks[15].y];
              const shoulderRight = [landmarks[12].x, landmarks[12].y];
              const elbowRight = [landmarks[14].x, landmarks[14].y];
              const wristRight = [landmarks[16].x, landmarks[16].y];

              const angleLeft = calculateAngle(shoulderLeft, elbowLeft, wristLeft);
              const angleRight = calculateAngle(shoulderRight, elbowRight, wristRight);

              if (angleRight > 160 && angleLeft > 160) {
                lastCommand = "DOWN";
                inDownPosition = true;
              } else if (angleRight < 30 && angleLeft < 30 && inDownPosition) {
                lastCommand = "UP";
                repCount += 1;
                inDownPosition = false;
              }
              break;

            case 2: // Squats
              const hipLeft = [landmarks[23].x, landmarks[23].y];
              const kneeLeft = [landmarks[25].x, landmarks[25].y];
              const ankleLeft = [landmarks[27].x, landmarks[27].y];
              const hipRight = [landmarks[24].x, landmarks[24].y];
              const kneeRight = [landmarks[26].x, landmarks[26].y];
              const ankleRight = [landmarks[28].x, landmarks[28].y];

              const squatAngleLeft = calculateAngle(hipLeft, kneeLeft, ankleLeft);
              const squatAngleRight = calculateAngle(hipRight, kneeRight, ankleRight);

              if (squatAngleLeft < 60 && squatAngleRight < 60 && !inDownPosition) {
                lastCommand = "DOWN";
                inDownPosition = true;
              } else if (squatAngleLeft > 160 && squatAngleRight > 160 && inDownPosition) {
                lastCommand = "UP";
                repCount += 1;
                inDownPosition = false;
              }
              break;

            case 3: // Push-ups
              const pushupShoulderLeft = [landmarks[11].x, landmarks[11].y];
              const pushupElbowLeft = [landmarks[13].x, landmarks[13].y];
              const pushupWristLeft = [landmarks[15].x, landmarks[15].y];
              const pushupShoulderRight = [landmarks[12].x, landmarks[12].y];
              const pushupElbowRight = [landmarks[14].x, landmarks[14].y];
              const pushupWristRight = [landmarks[16].x, landmarks[16].y];

              const pushupAngleLeft = calculateAngle(pushupShoulderLeft, pushupElbowLeft, pushupWristLeft);
              const pushupAngleRight = calculateAngle(pushupShoulderRight, pushupElbowRight, pushupWristRight);

              if (pushupAngleLeft > 90 && pushupAngleRight > 90) {
                if (inDownPosition) {
                  lastCommand = "UP";
                  inDownPosition = false;
                }
              } else if (pushupAngleLeft < 90 && pushupAngleRight < 90) {
                if (!inDownPosition) {
                  lastCommand = "DOWN";
                  repCount += 1;
                  inDownPosition = true;
                }
              }
              break;

            case 4: // Plank
              const plankShoulderLeft = [landmarks[11].x, landmarks[11].y];
              const plankElbowLeft = [landmarks[13].x, landmarks[13].y];
              const plankWristLeft = [landmarks[15].x, landmarks[15].y];
              const plankShoulderRight = [landmarks[12].x, landmarks[12].y];
              const plankElbowRight = [landmarks[14].x, landmarks[14].y];
              const plankWristRight = [landmarks[16].x, landmarks[16].y];
              const plankHipLeft = [landmarks[23].x, landmarks[23].y];
              const plankKneeLeft = [landmarks[25].x, landmarks[25].y];
              const plankAnkleLeft = [landmarks[27].x, landmarks[27].y];
              const plankHipRight = [landmarks[24].x, landmarks[24].y];
              const plankKneeRight = [landmarks[26].x, landmarks[26].y];
              const plankAnkleRight = [landmarks[28].x, landmarks[28].y];

              const plankArmAngleLeft = calculateAngle(plankShoulderLeft, plankElbowLeft, plankWristLeft);
              const plankArmAngleRight = calculateAngle(plankShoulderRight, plankElbowRight, plankWristRight);
              const plankLegAngleLeft = calculateAngle(plankHipLeft, plankKneeLeft, plankAnkleLeft);
              const plankLegAngleRight = calculateAngle(plankHipRight, plankKneeRight, plankAnkleRight);

              if (plankArmAngleLeft > 80 && plankArmAngleLeft < 100 && 
                  plankArmAngleRight > 80 && plankArmAngleRight < 100 && 
                  plankLegAngleLeft > 160 && plankLegAngleRight > 160) {
                if (plankStartTime === null) {
                  plankStartTime = Date.now();
                }
                plankDuration = (Date.now() - plankStartTime) / 1000;
                lastCommand = "HOLD";
              } else {
                lastCommand = "ADJUST";
                plankStartTime = null;
                plankDuration = 0;
              }
              break;
          }

          // Draw text overlay
          ctx.fillStyle = 'white';
          ctx.font = '24px Arial';
          ctx.fillText(`Command: ${lastCommand}`, 10, 30);
          
          if (config.workoutType === 4) {
            ctx.fillText(`Plank Duration: ${plankDuration.toFixed(1)}s`, 10, 60);
          } else {
            ctx.fillText(`Reps: ${repCount}`, 10, 60);
          }

          const timeLeft = Math.max(0, (endTime - Date.now()) / 1000);
          ctx.fillText(`Time: ${timeLeft.toFixed(1)}s`, 10, 90);

        } catch (error) {
          console.error('Pose processing error:', error);
        }

        ctx.restore();

        // Update state
        setResults({
          repCount,
          plankDuration,
          isActive: Date.now() < endTime,
          lastCommand
        });

        // Check if workout is complete
        if (Date.now() >= endTime) {
          camera?.stop();
          pose.close();
          resolve({
            repCount,
            plankDuration,
            isActive: false,
            lastCommand
          });
        }
      });

      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await pose.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480
      });

      camera.start();
      setResults({ ...results, isActive: true });
    });
  }, [calculateAngle, results]);

  const stopWorkout = useCallback(() => {
    setResults(prev => ({ ...prev, isActive: false }));
  }, []);

  return {
    videoRef,
    canvasRef,
    results,
    startWorkout,
    stopWorkout
  };
};