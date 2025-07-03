import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, Target } from 'lucide-react';
import { WorkoutSession } from '@/hooks/useWorkoutData';

interface DailyStatsTableProps {
  sessions: WorkoutSession[];
}

const DailyStatsTable: React.FC<DailyStatsTableProps> = ({ sessions }) => {
  const formatWorkoutType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'bicepcurls': 'Bicep Curls',
      'squats': 'Squats',
      'pushups': 'Push-ups',
      'plank': 'Plank'
    };
    return typeMap[type] || type;
  };

  const getPerformanceBadge = (rating: string) => {
    const variants = {
      'awesome': 'default',
      'good': 'secondary',
      'poor': 'outline'
    } as const;
    
    const colors = {
      'awesome': 'text-green-400',
      'good': 'text-blue-400',
      'poor': 'text-orange-400'
    };

    return (
      <Badge variant={variants[rating as keyof typeof variants]} className={colors[rating as keyof typeof colors]}>
        {rating.toUpperCase()}
      </Badge>
    );
  };

  if (sessions.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Today's Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70 text-center py-8">No workout sessions recorded today</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          Today's Sessions ({sessions.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-white/90">Name</TableHead>
                <TableHead className="text-white/90">Age</TableHead>
                <TableHead className="text-white/90">Gender</TableHead>
                <TableHead className="text-white/90">Phone</TableHead>
                <TableHead className="text-white/90">Email</TableHead>
                <TableHead className="text-white/90">Height</TableHead>
                <TableHead className="text-white/90">Weight</TableHead>
                <TableHead className="text-white/90">Exercise</TableHead>
                <TableHead className="text-white/90">Experience</TableHead>
                <TableHead className="text-white/90">Count/Duration</TableHead>
                <TableHead className="text-white/90">Extra</TableHead>
                <TableHead className="text-white/90">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-white font-medium">{session.name}</TableCell>
                  <TableCell className="text-white/80">{session.age}</TableCell>
                  <TableCell className="text-white/80">{session.gender}</TableCell>
                  <TableCell className="text-white/80">{session.phone_number || '-'}</TableCell>
                  <TableCell className="text-white/80 max-w-[200px] truncate">{session.email}</TableCell>
                  <TableCell className="text-white/80">{session.height || '-'}</TableCell>
                  <TableCell className="text-white/80">{session.weight || '-'}</TableCell>
                  <TableCell className="text-white/80">{formatWorkoutType(session.workout_type)}</TableCell>
                  <TableCell className="text-white/80">{session.experience === 'yes' ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-white/80">
                    {session.workout_type === 'plank' 
                      ? `${session.plank_duration.toFixed(1)}s`
                      : `${session.rep_count} reps`
                    }
                  </TableCell>
                  <TableCell className="text-white/80">
                    <div className="flex items-center gap-1">
                      {session.extra > 0 && <Trophy className="w-4 h-4 text-yellow-400" />}
                      {session.extra}
                    </div>
                  </TableCell>
                  <TableCell>{getPerformanceBadge(session.performance_rating)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyStatsTable;