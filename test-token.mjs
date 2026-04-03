// 测试 getTokenData 函数
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vixjolbzjztlwnssqgur.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpeGpvbGJ6anp0bHduc3NxZ3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNTEwNDYsImV4cCI6MjA4OTgyNzA0Nn0.f5MYr0Aaa4MWWw7-WZX8MUiubklTdDQKf_8FWDx6WSU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const { data, error } = await supabase.from('api_usage').select('*');

if (error) {
  console.error('Error:', error);
} else {
  console.log('Records:', data.length);
  console.log('Total tokens:', data.reduce((sum, r) => sum + r.tokens_used, 0));
  console.log('Total cost:', data.reduce((sum, r) => sum + r.cost, 0));
}
