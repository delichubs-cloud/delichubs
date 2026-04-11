#!/usr/bin/env node
/**
 * 直接更新 Supabase projects 表
 * 使用項目 ID 進行精確更新
 */

const { createClient } = require('@supabase/supabase-js');

// 使用 anon key 嘗試更新（可能會失敗）
const supabaseUrl = 'https://vixjolbzjztlwnssqgur.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpeGpvbGJ6anp0bHduc3NxZ3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNTEwNDYsImV4cCI6MjA4OTgyNzA0Nn0.f5MYr0Aaa4MWWw7-WZX8MUiubklTdDQKf_8FWDx6WSU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  console.log('📝 更新 Supabase projects 表...\n');
  
  // 1. 獲取項目 ID
  const { data: project, error: fetchError } = await supabase
    .from('projects')
    .select('id, name, progress, status')
    .eq('name', 'Javis Claw 培育日记')
    .single();
  
  if (fetchError) {
    console.log('❌ 查詢失敗:', fetchError.message);
    return;
  }
  
  console.log('✅ 找到項目:');
  console.log(`   ID: ${project.id}`);
  console.log(`   名稱: ${project.name}`);
  console.log(`   進度: ${project.progress}%\n`);
  
  // 2. 嘗試更新（使用 RPC 調用繞過 RLS）
  console.log('🔄 嘗試更新（可能因為 RLS 失敗）...\n');
  
  // 方法 1: 直接更新
  const { data: updateResult, error: updateError } = await supabase
    .from('projects')
    .update({
      progress: 100,
      status: 'completed',
      last_update: '剛剛更新 (45天完整生成)',
      description: 'AI 成長日記自動生成系統，每天 08:00 自動生成並推送到 Telegram。包含 45 天完整日記，智能切換成長/私房話模式。',
      updated_at: new Date().toISOString()
    })
    .eq('id', project.id);
  
  if (updateError) {
    console.log('❌ 更新失敗 (預期中的 RLS 錯誤):', updateError.message);
    console.log('\n💡 解決方案:');
    console.log('   請使用以下命令（需要 service_role key）:');
    console.log('\n   SUPABASE_SERVICE_KEY="你的service_role_key" \\');
    console.log('   node /Users/javis/projects/delichubs/scripts/update-with-service-key.js');
    console.log('\n   或者到 Supabase Dashboard 手動更新:');
    console.log('   https://supabase.com/dashboard/project/vixjolbzjztlwnssqgur/editor/20503633-7a94-4618-aa92-06a69ffe474c');
    return;
  }
  
  console.log('✅ 更新成功！');
  console.log('\n更新詳情:');
  console.log('   進度: 100%');
  console.log('   狀態: completed');
  console.log('   最後更新: 剛剛更新 (45天完整生成)');
  console.log('   描述: AI 成長日記自動生成系統...');
}

main().catch(console.error);
