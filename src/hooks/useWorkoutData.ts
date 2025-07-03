import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface WorkoutSession {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone_number?: string;
  email: string;
  height?: string;
  weight?: string;
  workout_type: string;
  experience: string;
  rep_count: number;
  plank_duration: number;
  ideal_score: number;
  actual_score: number;
  performance_rating: string;
  extra: number;
  session_date: string;
  created_at: string;
}

export interface DailyStat {
  id: string;
  session_date: string;
  workout_type: string;
  total_participants: number;
  average_score: number;
  best_score: number;
  winner_name?: string;
  winner_email?: string;
}

export const useWorkoutData = () => {
  const [todaySessions, setTodaySessions] = useState<WorkoutSession[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayData();
    
    // Subscribe to real-time updates
    const sessionsChannel = supabase
      .channel('workout_sessions_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'workout_sessions'
        },
        () => {
          fetchTodayData();
        }
      )
      .subscribe();

    const statsChannel = supabase
      .channel('daily_stats_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'daily_stats'
        },
        () => {
          fetchDailyStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sessionsChannel);
      supabase.removeChannel(statsChannel);
    };
  }, []);

  const fetchTodayData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('workout_sessions')
        .select('*')
        .eq('session_date', today)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodaySessions(data || []);
    } catch (error) {
      console.error('Error fetching today sessions:', error);
      toast.error('Failed to load today\'s sessions');
    } finally {
      setLoading(false);
    }
  };

  const fetchDailyStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('daily_stats')
        .select('*')
        .eq('session_date', today)
        .order('workout_type');

      if (error) throw error;
      setDailyStats(data || []);
    } catch (error) {
      console.error('Error fetching daily stats:', error);
    }
  };

  const saveWorkoutSession = async (sessionData: Omit<WorkoutSession, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('workout_sessions')
        .insert([sessionData])
        .select()
        .single();

      if (error) throw error;

      // Update daily stats
      await supabase.rpc('update_daily_stats', {
        p_workout_type: sessionData.workout_type,
        p_session_date: sessionData.session_date
      });

      return data;
    } catch (error) {
      console.error('Error saving workout session:', error);
      throw error;
    }
  };

  const getDailyWinner = async (workoutType: string, date?: string) => {
    try {
      const targetDate = date || new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase.rpc('select_daily_winner', {
        workout_type_param: workoutType,
        target_date: targetDate
      });

      if (error) throw error;
      return data?.[0] || null;
    } catch (error) {
      console.error('Error getting daily winner:', error);
      throw error;
    }
  };

  return {
    todaySessions,
    dailyStats,
    loading,
    saveWorkoutSession,
    getDailyWinner,
    fetchTodayData,
    fetchDailyStats
  };
};