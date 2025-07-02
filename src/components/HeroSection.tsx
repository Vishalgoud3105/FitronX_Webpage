import React from 'react';
import { Activity, Heart, Trophy, Zap } from "lucide-react";

interface HeroSectionProps {
  currentSection: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ currentSection }) => {
  const sections = [
    { icon: Activity, title: "Personal Info", color: "text-blue-500" },
    { icon: Heart, title: "Physical Stats", color: "text-red-500" },
    { icon: Trophy, title: "Fitness Goals", color: "text-yellow-500" },
    { icon: Zap, title: "Experience", color: "text-green-500" }
  ];

  return (
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
  );
};

export default HeroSection;