#!/usr/bin/env node
/**
 * 更新 "Javis Claw 培育日记" 項目
 * - 更新進度為 100%
 * - 更新狀態為 completed
 * - 更新最後更新時間
 * - 添加描述
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vixjolbzjztlwnssqgur.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpeGpvbGJ6anp0bHduc3NxZ3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNTEwNDYsImV4cCI6MjA4OTgyNzA0Nn0.f5MYr0Aaa4MWWw7-WZX8MUiubklTdDQKf_8FWDx6WSU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateDiaryProject() {
  console.log('📝 更新 "Javis Claw 培育日记" 項目...\n');
  
  // 先查詢項目
  const { data: existingProject, error: fetchError } = await supabase
    .from('projects')
    .select('*')
    .eq('name', 'Javis Claw 培育日记')
    .single();
  
  if (fetchError) {
    console.log('❌ 查詢失敗:', fetchError.message);
    return;
  }
  
  console.log('✅ 找到項目:');
  console.log(`   名稱: ${existingProject.name}`);
  console.log(`   當前進度: ${existingProject.progress}%`);
  console.log(`   當前狀態: ${existingProject.status}\n`);
  
  // 更新項目
  const updates = {
    progress: 100,
    status: 'completed',
    last_update: '剛剛更新 (45天完整生成)',
    updated_at: new Date().toISOString(),
    description: 'AI 成長日記自動生成系統，每天 08:00 自動生成並推送到 Telegram。包含 45 天完整日記，智能切換成長/私房話模式。'
  };
  
  const { data: updatedProject, error: updateError } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', existingProject.id)
    .select();
  
  if (updateError) {
    console.log('❌ 更新失敗:', updateError.message);
    return;
  }
  
  if (!updatedProject || updatedProject.length === 0) {
    console.log('❌ 更新失敗: 沒有返回數據');
    return;
  }
  
  const project = updatedProject[0];
  
  console.log('✅ 更新成功！\n');
  console.log('更新後的項目信息:');
  console.log(`   名稱: ${project.name}`);
  console.log(`   進度: ${project.progress}%`);
  console.log(`   狀態: ${project.status}`);
  console.log(`   最後更新: ${project.last_update}`);
  console.log(`   描述: ${project.description}`);
  console.log(`   更新時間: ${project.updated_at}`);
  
  console.log('\n---\n');
  
  // 顯示所有 completed 項目
  const { data: completedProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'completed')
    .order('updated_at', { ascending: false });
  
  console.log(`📊 已完成的項目 (${completedProjects.length} 個):`);
  completedProjects.forEach((project, index) => {
    console.log(`   ${index + 1}. ${project.name} - ${project.progress}%`);
  });
  
  console.log('\n✅ Supabase 更新完成！');
}

updateDiaryProject().catch(console.error);
