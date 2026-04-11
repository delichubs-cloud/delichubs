#!/usr/bin/env node
/**
 * 檢查並更新 "Javis Claw 培育日记" 項目
 * 如果 RLS 阻止更新，則提示用戶
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vixjolbzjztlwnssqgur.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpeGpvbGJ6anp0bHduc3NxZ3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNTEwNDYsImV4cCI6MjA4OTgyNzA0Nn0.f5MYr0Aaa4MWWw7-WZX8MUiubklTdDQKf_8FWDx6WSU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkAndUpdate() {
  console.log('📝 檢查 "Javis Claw 培育日记" 項目...\n');
  
  // 1. 查詢項目
  const { data: project, error: fetchError } = await supabase
    .from('projects')
    .select('*')
    .eq('name', 'Javis Claw 培育日记')
    .single();
  
  if (fetchError) {
    console.log('❌ 查詢失敗:', fetchError.message);
    return;
  }
  
  console.log('✅ 找到項目:');
  console.log(`   ID: ${project.id}`);
  console.log(`   名稱: ${project.name}`);
  console.log(`   進度: ${project.progress}%`);
  console.log(`   狀態: ${project.status}`);
  console.log(`   最後更新: ${project.last_update}\n`);
  
  // 2. 嘗試更新
  console.log('🔄 嘗試更新項目...');
  
  const { data: updatedData, error: updateError } = await supabase
    .from('projects')
    .update({
      progress: 100,
      status: 'completed',
      last_update: '剛剛更新 (45天完整生成)',
      updated_at: new Date().toISOString()
    })
    .eq('id', project.id)
    .select();
  
  if (updateError) {
    console.log('❌ 更新失敗:', updateError.message);
    console.log('\n💡 可能原因:');
    console.log('   - RLS (Row Level Security) 阻止了更新操作');
    console.log('   - anon key 沒有 UPDATE 權限');
    console.log('\n建議解決方案:');
    console.log('   1. 使用 service_role key 進行更新');
    console.log('   2. 在 Supabase Dashboard 調整 RLS 設定');
    console.log('   3. 給 anon key 添加 UPDATE 權限');
    return;
  }
  
  if (!updatedData || updatedData.length === 0) {
    console.log('❌ 更新失敗: 沒有返回數據');
    console.log('\n💡 可能原因:');
    console.log('   - 更新操作被 RLS 阻止');
    console.log('   - 項目不存在或已被刪除');
    return;
  }
  
  console.log('✅ 更新成功！\n');
  console.log('更新後的項目信息:');
  console.log(`   名稱: ${updatedData[0].name}`);
  console.log(`   進度: ${updatedData[0].progress}%`);
  console.log(`   狀態: ${updatedData[0].status}`);
  console.log(`   最後更新: ${updatedData[0].last_update}`);
  console.log(`   更新時間: ${updatedData[0].updated_at}`);
  
  console.log('\n---\n');
  
  // 3. 顯示所有已完成的項目
  const { data: completedProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'completed')
    .order('updated_at', { ascending: false });
  
  console.log(`📊 已完成的項目 (${completedProjects.length} 個):`);
  completedProjects.forEach((p, index) => {
    console.log(`   ${index + 1}. ${p.name} - ${p.progress}%`);
  });
  
  console.log('\n✅ 操作完成！');
}

checkAndUpdate().catch(console.error);
