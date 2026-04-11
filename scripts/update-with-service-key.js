#!/usr/bin/env node
/**
 * 使用 service_role key 更新 Supabase projects 表
 * 
 * 使用方式:
 *   SUPABASE_SERVICE_KEY=your_key_here node update-with-service-key.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vixjolbzjztlwnssqgur.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_KEY;

if (!serviceRoleKey) {
  console.log('❌ 錯誤: 缺少 SUPABASE_SERVICE_KEY 環境變量');
  console.log('\n使用方式:');
  console.log('  SUPABASE_SERVICE_KEY=your_key_here node update-with-service-key.js');
  console.log('\n或者從 Supabase Dashboard 獲取 service_role key:');
  console.log('  https://supabase.com/dashboard/project/vixjolbzjztlwnssqgur/settings/api');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function updateProjects() {
  console.log('📝 使用 service_role key 更新 Supabase...\n');
  
  // 1. 查詢當前項目
  const { data: allProjects, error: fetchError } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (fetchError) {
    console.log('❌ 查詢失敗:', fetchError.message);
    return;
  }
  
  console.log(`📊 當前項目數量: ${allProjects.length}\n`);
  
  // 2. 找到需要更新的項目
  const projectToUpdate = allProjects.find(p => p.name === 'Javis Claw 培育日记');
  
  if (!projectToUpdate) {
    console.log('❌ 未找到 "Javis Claw 培育日记" 項目');
    return;
  }
  
  console.log('✅ 找到項目:');
  console.log(`   ID: ${projectToUpdate.id}`);
  console.log(`   名稱: ${projectToUpdate.name}`);
  console.log(`   當前進度: ${projectToUpdate.progress}%`);
  console.log(`   當前狀態: ${projectToUpdate.status}\n`);
  
  // 3. 更新項目
  console.log('🔄 更新項目...');
  
  const updates = {
    progress: 100,
    status: 'completed',
    last_update: '剛剛更新 (45天完整生成)',
    description: 'AI 成長日記自動生成系統，每天 08:00 自動生成並推送到 Telegram。包含 45 天完整日記，智能切換成長/私房話模式。',
    updated_at: new Date().toISOString()
  };
  
  const { data: updatedProject, error: updateError } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', projectToUpdate.id)
    .select();
  
  if (updateError) {
    console.log('❌ 更新失敗:', updateError.message);
    return;
  }
  
  if (!updatedProject || updatedProject.length === 0) {
    console.log('❌ 更新失敗: 沒有返回數據');
    return;
  }
  
  console.log('✅ 更新成功！\n');
  console.log('更新後的項目信息:');
  console.log(`   名稱: ${updatedProject[0].name}`);
  console.log(`   進度: ${updatedProject[0].progress}%`);
  console.log(`   狀態: ${updatedProject[0].status}`);
  console.log(`   最後更新: ${updatedProject[0].last_update}`);
  console.log(`   描述: ${updatedProject[0].description}`);
  console.log(`   更新時間: ${updatedProject[0].updated_at}\n`);
  
  // 4. 顯示所有已完成的項目
  const { data: completedProjects } = await supabase
    .from('projects')
    .select('name, progress, status')
    .eq('status', 'completed')
    .order('updated_at', { ascending: false });
  
  console.log('════════════════════════════════════════');
  console.log(`📊 已完成的項目 (${completedProjects.length} 個):`);
  console.log('════════════════════════════════════════');
  completedProjects.forEach((p, index) => {
    console.log(`   ${index + 1}. ${p.name} - ${p.progress}%`);
  });
  
  console.log('\n✅ Supabase 更新完成！');
}

updateProjects().catch(console.error);
