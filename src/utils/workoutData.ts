// Ideal workout data based on age, gender, and experience
export const idealData = {
  bicepCurls: {
    experienced: {
      male: {
        18: 25, 19: 26, 20: 27, 21: 28, 22: 29, 23: 30, 24: 31, 25: 32,
        26: 31, 27: 30, 28: 29, 29: 28, 30: 27, 35: 25, 40: 23, 45: 21, 50: 19
      },
      female: {
        18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25,
        26: 24, 27: 23, 28: 22, 29: 21, 30: 20, 35: 18, 40: 16, 45: 14, 50: 12
      }
    },
    noExperience: {
      male: {
        18: 15, 19: 16, 20: 17, 21: 18, 22: 19, 23: 20, 24: 21, 25: 22,
        26: 21, 27: 20, 28: 19, 29: 18, 30: 17, 35: 15, 40: 13, 45: 11, 50: 9
      },
      female: {
        18: 10, 19: 11, 20: 12, 21: 13, 22: 14, 23: 15, 24: 16, 25: 17,
        26: 16, 27: 15, 28: 14, 29: 13, 30: 12, 35: 10, 40: 8, 45: 6, 50: 4
      }
    }
  },
  squats: {
    experienced: {
      male: {
        18: 35, 19: 36, 20: 37, 21: 38, 22: 39, 23: 40, 24: 41, 25: 42,
        26: 41, 27: 40, 28: 39, 29: 38, 30: 37, 35: 35, 40: 33, 45: 31, 50: 29
      },
      female: {
        18: 25, 19: 26, 20: 27, 21: 28, 22: 29, 23: 30, 24: 31, 25: 32,
        26: 31, 27: 30, 28: 29, 29: 28, 30: 27, 35: 25, 40: 23, 45: 21, 50: 19
      }
    },
    noExperience: {
      male: {
        18: 20, 19: 21, 20: 22, 21: 23, 22: 24, 23: 25, 24: 26, 25: 27,
        26: 26, 27: 25, 28: 24, 29: 23, 30: 22, 35: 20, 40: 18, 45: 16, 50: 14
      },
      female: {
        18: 15, 19: 16, 20: 17, 21: 18, 22: 19, 23: 20, 24: 21, 25: 22,
        26: 21, 27: 20, 28: 19, 29: 18, 30: 17, 35: 15, 40: 13, 45: 11, 50: 9
      }
    }
  },
  pushups: {
    experienced: {
      male: {
        18: 30, 19: 31, 20: 32, 21: 33, 22: 34, 23: 35, 24: 36, 25: 37,
        26: 36, 27: 35, 28: 34, 29: 33, 30: 32, 35: 30, 40: 28, 45: 26, 50: 24
      },
      female: {
        18: 20, 19: 21, 20: 22, 21: 23, 22: 24, 23: 25, 24: 26, 25: 27,
        26: 26, 27: 25, 28: 24, 29: 23, 30: 22, 35: 20, 40: 18, 45: 16, 50: 14
      }
    },
    noExperience: {
      male: {
        18: 15, 19: 16, 20: 17, 21: 18, 22: 19, 23: 20, 24: 21, 25: 22,
        26: 21, 27: 20, 28: 19, 29: 18, 30: 17, 35: 15, 40: 13, 45: 11, 50: 9
      },
      female: {
        18: 8, 19: 9, 20: 10, 21: 11, 22: 12, 23: 13, 24: 14, 25: 15,
        26: 14, 27: 13, 28: 12, 29: 11, 30: 10, 35: 8, 40: 6, 45: 4, 50: 2
      }
    }
  },
  plank: {
    experienced: {
      male: {
        18: 60, 19: 62, 20: 65, 21: 68, 22: 70, 23: 72, 24: 75, 25: 78,
        26: 75, 27: 72, 28: 70, 29: 68, 30: 65, 35: 60, 40: 55, 45: 50, 50: 45
      },
      female: {
        18: 45, 19: 47, 20: 50, 21: 53, 22: 55, 23: 57, 24: 60, 25: 63,
        26: 60, 27: 57, 28: 55, 29: 53, 30: 50, 35: 45, 40: 40, 45: 35, 50: 30
      }
    },
    noExperience: {
      male: {
        18: 30, 19: 32, 20: 35, 21: 38, 22: 40, 23: 42, 24: 45, 25: 48,
        26: 45, 27: 42, 28: 40, 29: 38, 30: 35, 35: 30, 40: 25, 45: 20, 50: 15
      },
      female: {
        18: 20, 19: 22, 20: 25, 21: 28, 22: 30, 23: 32, 24: 35, 25: 38,
        26: 35, 27: 32, 28: 30, 29: 28, 30: 25, 35: 20, 40: 15, 45: 10, 50: 5
      }
    }
  }
};

export const emailTemplates = {
  awesome: {
    subjects: [
      "🎉 Outstanding Performance, {Name}!",
      "🏆 You Crushed It, {Name}!",
      "🌟 Exceptional Workout Results!",
      "💪 Amazing Achievement, {Name}!",
      "🔥 You're on Fire, {Name}!"
    ],
    bodies: [
      `<h2>Congratulations, {Name}!</h2><p>Your performance was absolutely outstanding! You exceeded expectations and showed incredible strength and determination.</p><p>Keep up the fantastic work!</p>`,
      `<h2>Wow, {Name}!</h2><p>You absolutely crushed your workout today! Your dedication and hard work are really paying off.</p><p>You're an inspiration!</p>`,
      `<h2>Exceptional Results, {Name}!</h2><p>Your workout performance today was simply amazing. You've shown what true fitness dedication looks like!</p><p>Stay strong!</p>`,
      `<h2>Amazing Work, {Name}!</h2><p>Your fitness level is impressive! Today's performance shows you're in excellent shape.</p><p>Keep pushing those limits!</p>`,
      `<h2>You're on Fire, {Name}!</h2><p>What an incredible workout session! Your results today are proof of your commitment to fitness.</p><p>Keep blazing those trails!</p>`
    ]
  },
  good: {
    subjects: [
      "👍 Great Job, {Name}!",
      "💪 Solid Performance Today!",
      "🎯 Well Done, {Name}!",
      "⭐ Good Workout Results!",
      "👏 Nice Work, {Name}!"
    ],
    bodies: [
      `<h2>Great Job, {Name}!</h2><p>You had a solid workout today! Your performance shows good fitness levels and consistent effort.</p><p>Keep up the good work!</p>`,
      `<h2>Well Done, {Name}!</h2><p>Your workout results today were right on target. You're maintaining good fitness standards!</p><p>Stay consistent!</p>`,
      `<h2>Solid Performance, {Name}!</h2><p>Today's workout showed good form and effort. You're on the right track with your fitness journey!</p><p>Keep it up!</p>`,
      `<h2>Good Work, {Name}!</h2><p>Your results today demonstrate steady progress and good fitness habits.</p><p>Continue building on this foundation!</p>`,
      `<h2>Nice Effort, {Name}!</h2><p>You put in good work today! Your performance reflects dedication to your fitness goals.</p><p>Stay motivated!</p>`
    ]
  },
  poor: {
    subjects: [
      "💪 Room for Improvement, {Name}",
      "🎯 Let's Work Together, {Name}!",
      "📈 Building Your Strength, {Name}",
      "🌱 Every Journey Starts Somewhere!",
      "💫 Your Fitness Journey, {Name}"
    ],
    bodies: [
      `<h2>Keep Going, {Name}!</h2><p>Today's workout is just the beginning of your fitness journey. Everyone starts somewhere, and improvement comes with consistency.</p><p>You've got this!</p>`,
      `<h2>Building Strength, {Name}!</h2><p>Your workout today shows you're taking the first steps toward better fitness. With regular practice, you'll see amazing improvements!</p><p>Stay committed!</p>`,
      `<h2>Starting Strong, {Name}!</h2><p>Every fitness expert was once a beginner. Today's results are your baseline - focus on gradual improvement!</p><p>Keep pushing forward!</p>`,
      `<h2>Your Journey Begins, {Name}!</h2><p>Today's workout is the foundation for future progress. With dedication and consistency, you'll achieve your fitness goals!</p><p>Believe in yourself!</p>`,
      `<h2>Growing Stronger, {Name}!</h2><p>Your fitness journey is just getting started. Each workout builds upon the last - stay patient and persistent!</p><p>You're capable of more than you know!</p>`
    ]
  }
};

export const getIdealScore = (
  workoutType: number,
  age: number,
  gender: string,
  experience: string
): number => {
  const genderKey = gender.toLowerCase() === 'male' ? 'male' : 'female';
  const experienceKey = experience === 'yes' ? 'experienced' : 'noExperience';
  
  let workoutData;
  switch (workoutType) {
    case 1:
      workoutData = idealData.bicepCurls;
      break;
    case 2:
      workoutData = idealData.squats;
      break;
    case 3:
      workoutData = idealData.pushups;
      break;
    case 4:
      workoutData = idealData.plank;
      break;
    default:
      return 0;
  }
  
  return workoutData[experienceKey]?.[genderKey]?.[age] || 0;
};

export const evaluatePerformance = (
  score: number,
  idealScore: number
): 'awesome' | 'good' | 'poor' => {
  if (score > idealScore + 5) return 'awesome';
  if (score < idealScore - 5) return 'poor';
  return 'good';
};

export const getRandomEmailTemplate = (performance: 'awesome' | 'good' | 'poor', name: string) => {
  const templates = emailTemplates[performance];
  const randomSubject = templates.subjects[Math.floor(Math.random() * templates.subjects.length)];
  const randomBody = templates.bodies[Math.floor(Math.random() * templates.bodies.length)];
  
  return {
    subject: randomSubject.replace('{Name}', name),
    body: randomBody.replace(/{Name}/g, name)
  };
};