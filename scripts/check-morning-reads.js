#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vixjolbzjztlwnssqgur.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpeGpvbGJ6anp0bHduc3NxZ3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNTEwNDYsImV4cCI6MjA4OTgyNzA0Nn0.f5MYr0Aaa4MWWw7-WZX8MUiubklTdDQKf_8FWDx6WSU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTables() {
  // 嘗試查詢可能存在的表
  const tables = [
    'morning_reads',
    'daily_reads', 
    'readings',
    'feeds',
    'content_sources',
    'kol_insights',
    'task_logs'
  ];
  
  console.log('🔍 檢查晨讀相關表...\n');
  
  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(5);
    
    if (!error) {
      console.log(`✅ ${table}: ${data?.length || 0} 條記錄`);
      if (data && data.length > 0) {
        console.log('   欄位:', Object.keys(data[0]).join(', '));
        console.log('   範例:', JSON.stringify(data[0]).slice(0, 200) + '...');
      }
      console.log('');
    }
  }
  
  // 查詢 task_logs 中與晨讀相關的記錄
  console.log('📊 task_logs 中與晨讀相關的記錄:');
  const { data: logs } = await supabase
    .from('task_logs')
    .select('*')
    .ilike('task_name', '%晨讀%');
  
  if (logs && logs.length > 0) {
    logs.forEach(l => console.log(`  - ${l.task_name}`));
  } else {
    console.log('  無');
  }
}

checkTables();
