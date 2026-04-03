import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vixjolbzjztlwnssqgur.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpeGpvbGJ6anp0bHduc3NxZ3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNTEwNDYsImV4cCI6MjA4OTgyNzA0Nn0.f5MYr0Aaa4MWWw7-WZX8MUiubklTdDQKf_8FWDx6WSU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Agent {
  id: string;
  name: string;
  status: string;
  model?: string;
  description?: string;
  level?: number;
  last_active?: string;
}

export interface Skill {
  id: string;
  name: string;
  status: string;
  description?: string;
  level?: number;
}

export interface TaskLog {
  id: string;
  task_name: string;
  task_type?: string;
  duration: number;
  agent_used?: string;
  completed_at: string;
}

export interface FeaturedPost {
  id: string;
  type: string;
  title: string;
  summary?: string;
  content?: string;
  status: string;
  generated_at: string;
  published_at?: string;
}

export interface JavisClawLog {
  id: string;
  day_number: number;
  date: string;
  title?: string;
  story?: string;
  highlights?: string[];
  metrics?: Record<string, any>;
}

// Fetch functions
export async function getAgents() {
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('status', 'active')
    .order('name');

  if (error) throw error;
  return data as Agent[];
}

export async function getSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('name');

  if (error) throw error;

  // 去重：按 name 去重，保留第一个出现的
  const seen = new Set<string>();
  const uniqueSkills = (data as Skill[]).filter(skill => {
    if (seen.has(skill.name)) {
      return false;
    }
    seen.add(skill.name);
    return true;
  });

  return uniqueSkills;
}

export async function getTaskLogs(limit = 10) {
  const { data, error } = await supabase
    .from('task_logs')
    .select('*')
    .order('completed_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as TaskLog[];
}

export async function getTotalTimeSaved() {
  const { data, error } = await supabase
    .from('task_logs')
    .select('duration');

  if (error) throw error;
  return data.reduce((sum, task) => sum + (task.duration || 0), 0);
}

export async function getFeaturedPosts(status = 'approved') {
  const { data, error } = await supabase
    .from('featured_posts')
    .select('*')
    .eq('status', status)
    .order('published_at', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data as FeaturedPost[];
}

export async function getJavisClawLogs(limit = 10) {
  const { data, error } = await supabase
    .from('javis_claw_logs')
    .select('*')
    .order('day_number', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as JavisClawLog[];
}

export async function getJavisClawStats() {
  const { count, error } = await supabase
    .from('javis_claw_logs')
    .select('*', { count: 'exact', head: true });

  if (error) throw error;
  return count || 0;
}
