// Supabase 客戶端配置
// 用於 Dashboard 讀取 Javis Claw 日誌和訂閱數據

const SUPABASE_URL = 'https://vixjolbzjztlwnssqgur.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpeGpvbGJ6anp0bHduc3NxZ3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNTEwNDYsImV4cCI6MjA4OTgyNzA0Nn0.f5MYr0Aaa4MWWw7-WZX8MUiubklTdDQKf_8FWDx6WSU';

// 創建 Supabase 客戶端
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 獲取 Javis Claw 日誌
export async function getJavisClawLogs(limit = 10) {
  const { data, error } = await supabase
    .from('javis_claw_logs')
    .select('*')
    .order('day_number', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching logs:', error);
    return [];
  }

  return data;
}

// 獲取單篇日誌
export async function getJavisClawLog(dayNumber: number) {
  const { data, error } = await supabase
    .from('javis_claw_logs')
    .select('*')
    .eq('day_number', dayNumber)
    .single();

  if (error) {
    console.error('Error fetching log:', error);
    return null;
  }

  return data;
}

// 獲取訂閱統計（公開數據）
export async function getSubscriptionStats() {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('plan, status');

  if (error) {
    console.error('Error fetching stats:', error);
    return { total: 0, paid: 0 };
  }

  const total = data?.length || 0;
  const paid = data?.filter(s => s.plan !== 'free' && s.status === 'active').length || 0;

  return { total, paid };
}
