#!/usr/bin/env node
/**
 * 查看 Javis Claw 相關項目的詳細信息
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vixjolbzjztlwnssqgur.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpeGpvbGJ6anp0bHduc3NxZ3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNTEwNDYsImV4cCI6MjA4OTgyNzA0Nn0.f5MYr0Aaa4MWWw7-WZX8MUiubklTdDQKf_8FWDx6WSU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  console.log('📊 查看 Javis Claw 相關項目...\n');
  
  // 查詢所有相關項目
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .or('name.ilike.%Javis Claw%,name.ilike.%培育%,name.ilike.%Daily%')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.log('❌ 查詢失敗:', error.message);
    return;
  }
  
  console.log(`找到 ${data.length} 個相關項目:\n`);
  
  data.forEach((project, index) => {
    console.log(`════════════════════════════════════════`);
    console.log(`項目 ${index + 1}:`);
    console.log(`  名稱: ${project.name}`);
    console.log(`  狀態: ${project.status}`);
    console.log(`  進度: ${project.progress}%`);
    console.log(`  任務: ${project.tasks || 'N/A'}`);
    console.log(`  最後更新: ${project.last_update || 'N/A'}`);
    console.log(`  創建時間: ${project.created_at}`);
    console.log(`  更新時間: ${project.updated_at}`);
    console.log(`  描述: ${project.description || 'N/A'}`);
    console.log();
  });
  
  // 尋找培育日記項目
  const diaryProject = data.find(p => 
    p.name.includes('培育日记') || 
    p.name.includes('培育日記')
  );
  
  if (diaryProject) {
    console.log('✅ 找到 "Javis Claw 培育日记" 項目');
    console.log(`   當前進度: ${diaryProject.progress}%`);
    console.log(`   狀態: ${diaryProject.status}`);
    
    if (diaryProject.progress < 100) {
      console.log('\n💡 建議: 更新進度為 100%');
    } else {
      console.log('\n✅ 項目已完成！');
    }
  } else {
    console.log('❌ "Javis Claw 培育日记" 項目不存在');
    console.log('\n💡 建議: 創建該項目');
  }
}

main().catch(console.error);
