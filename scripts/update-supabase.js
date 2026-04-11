#!/usr/bin/env node
/**
 * 使用 service_role key 更新 Supabase
 *
 * 使用方式:
 *   方式 1: 命令行參數
 *     node update-supabase.js YOUR_SERVICE_ROLE_KEY
 *
 *   方式 2: 環境變量
 *     SUPABASE_SERVICE_KEY=YOUR_KEY node update-supabase.js
 *
 *   方式 3: 交互式輸入
 *     node update-supabase.js
 */

const { createClient } = require('@supabase/supabase-js');
const readline = require('readline');

const supabaseUrl = 'https://vixjolbzjztlwnssqgur.supabase.co';

// 從命令行參數、環境變量或交互輸入獲取 service_role key
async function getServiceKey() {
  // 1. 檢查命令行參數
  if (process.argv[2]) {
    return process.argv[2];
  }

  // 2. 檢查環境變量
  if (process.env.SUPABASE_SERVICE_KEY) {
    return process.env.SUPABASE_SERVICE_KEY;
  }

  // 3. 交互式輸入
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('請輸入 Supabase service_role key: ', (key) => {
      rl.close();
      resolve(key.trim());
    });
  });
}

async function updateSupabase() {
  console.log('📝 更新 Supabase projects 表...\n');

  // 獲取 service_role key
  const serviceKey = await getServiceKey();

  if (!serviceKey) {
    console.log('❌ 錯誤: 未提供 service_role key');
    console.log('\n使用方式:');
    console.log('  node update-supabase.js YOUR_SERVICE_ROLE_KEY');
    console.log('  或');
    console.log('  SUPABASE_SERVICE_KEY=YOUR_KEY node update-supabase.js');
    process.exit(1);
  }

  // 創建 Supabase 客戶端
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // 1. 查詢項目
  console.log('🔍 查詢項目...');
  const { data: project, error: fetchError } = await supabase
    .from('projects')
    .select('*')
    .eq('name', 'Javis Claw 培育日记')
    .single();

  if (fetchError) {
    console.log('❌ 查詢失敗:', fetchError.message);
    process.exit(1);
  }

  console.log('✅ 找到項目:');
  console.log(`   ID: ${project.id}`);
  console.log(`   名稱: ${project.name}`);
  console.log(`   當前進度: ${project.progress}%\n`);

  // 2. 更新項目
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
    .eq('id', project.id)
    .select();

  if (updateError) {
    console.log('❌ 更新失敗:', updateError.message);
    process.exit(1);
  }

  if (!updatedProject || updatedProject.length === 0) {
    console.log('❌ 更新失敗: 沒有返回數據');
    process.exit(1);
  }

  console.log('✅ 更新成功！\n');
  console.log('════════════════════════════════════════');
  console.log('更新後的項目信息:');
  console.log('════════════════════════════════════════');
  console.log(`   名稱: ${updatedProject[0].name}`);
  console.log(`   進度: ${updatedProject[0].progress}%`);
  console.log(`   狀態: ${updatedProject[0].status}`);
  console.log(`   最後更新: ${updatedProject[0].last_update}`);
  console.log(`   描述: ${updatedProject[0].description}`);
  console.log(`   更新時間: ${updatedProject[0].updated_at}\n`);

  // 3. 顯示所有已完成的項目
  const { data: completedProjects } = await supabase
    .from('projects')
    .select('name, progress, status, last_update')
    .eq('status', 'completed')
    .order('updated_at', { ascending: false });

  console.log('════════════════════════════════════════');
  console.log(`📊 已完成的項目 (${completedProjects.length} 個):`);
  console.log('════════════════════════════════════════');
  completedProjects.forEach((p, index) => {
    console.log(`   ${index + 1}. ${p.name} - ${p.progress}% (${p.last_update})`);
  });

  console.log('\n✅ Supabase 更新完成！');
}

updateSupabase().catch(console.error);
