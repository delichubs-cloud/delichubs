#!/usr/bin/env node
/**
 * 更新 Supabase projects 表（安全版本）
 * 使用環境變量管理 API keys
 *
 * 使用方式:
 *   SUPABASE_SERVICE_KEY=your_key node update-projects-secure.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vixjolbzjztlwnssqgur.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseServiceKey) {
  console.log('❌ 錯誤: 缺少 SUPABASE_SERVICE_KEY 環境變量');
  console.log('\n使用方式:');
  console.log('  SUPABASE_SERVICE_KEY=your_key_here node update-projects-secure.js');
  console.log('\n獲取 service_role key:');
  console.log('  https://supabase.com/dashboard/project/vixjolbzjztlwnssqgur/settings/api');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function updateProjects() {
  console.log('📝 更新 Supabase projects 表...\n');

  // 查詢所有項目
  const { data: allProjects, error: fetchError } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (fetchError) {
    console.error('❌ 查詢失敗:', fetchError.message);
    return;
  }

  console.log(`📊 當前項目數量: ${allProjects.length}\n`);

  // 顯示所有項目
  allProjects.forEach((project, index) => {
    const status = project.status === 'completed' ? '✅' : '🔵';
    console.log(`${status} ${index + 1}. ${project.name} - ${project.progress}%`);
  });

  console.log('\n✅ 查詢完成！');
}

updateProjects().catch(console.error);
