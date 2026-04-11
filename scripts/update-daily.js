#!/usr/bin/env node
/**
 * 交互式更新 Supabase Javis Claw Daily
 *
 * 使用方式:
 *   node update-daily.js
 *
 * 然後輸入 service_role key
 */

const readline = require('readline');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vixjolbzjztlwnssqgur.supabase.co';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function update() {
  console.log('\n════════════════════════════════════════');
  console.log('  更新 Javis Claw Daily 到 Supabase');
  console.log('════════════════════════════════════════\n');

  // 獲取 service_role key
  const serviceKey = await new Promise((resolve) => {
    rl.question('請輸入 Supabase service_role key: ', (key) => {
      rl.close();
      resolve(key.trim());
    });
  });

  if (!serviceKey) {
    console.log('\n❌ 未提供 service_role key');
    process.exit(1);
  }

  // 創建客戶端
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  console.log('\n🔄 連接到 Supabase...');

  // 更新數據
  const { data, error } = await supabase
    .from('projects')
    .update({
      last_update: '剛剛更新',
      description: 'AI 運營透明化展示 Dashboard。展示 Agent 技能、時間銀行、每週摘要、審批隊列、記憶健康等實時數據。Next.js + Tailwind + Supabase。',
      updated_at: new Date().toISOString()
    })
    .eq('name', 'Javis Claw Daily')
    .select();

  if (error) {
    console.log('\n❌ 更新失敗:', error.message);
    console.log('\n💡 可能原因:');
    console.log('   - service_role key 錯誤');
    console.log('   - 網絡問題');
    console.log('   - RLS 策略問題');
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log('\n❌ 未找到 "Javis Claw Daily" 項目');
    process.exit(1);
  }

  console.log('\n✅ 更新成功！\n');
  console.log('════════════════════════════════════════');
  console.log('更新後的數據:');
  console.log('════════════════════════════════════════');
  console.log('  名稱:', data[0].name);
  console.log('  進度:', data[0].progress + '%');
  console.log('  狀態:', data[0].status);
  console.log('  最後更新:', data[0].last_update);
  console.log('  描述:', data[0].description);
  console.log('  更新時間:', data[0].updated_at);
  console.log('════════════════════════════════════════\n');

  console.log('✅ Javis Claw Daily 已推送到 Supabase！');
}

update().catch(console.error);
