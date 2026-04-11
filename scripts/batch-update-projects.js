#!/usr/bin/env node
/**
 * 批量更新 Supabase projects 表
 * 根據 PROJECTS.md 更新所有項目的描述和最後更新時間
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vixjolbzjztlwnssqgur.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseServiceKey) {
  console.log('❌ 錯誤: 缺少 SUPABASE_SERVICE_KEY');
  console.log('\n使用方式:');
  console.log('  SUPABASE_SERVICE_KEY=your_key node batch-update-projects.js');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const projectUpdates = [
  {
    name: 'AI 晨读系统',
    description: '每週一三五,從 10 位 AI KOL 提煉 7 個關鍵洞察',
    last_update: 'Daily 08:00'
  },
  {
    name: '内容工厂',
    description: '自動化內容生產線（delic club + ripple）',
    last_update: '剛剛更新'
  },
  {
    name: 'GEAR Console 2.0',
    description: '多代理系統控制台。已完成優化：三層備用模型、監控告警、數據同步正常',
    last_update: '2026-04-06'
  },
  {
    name: '课程工厂',
    description: '課程生產自動化管線',
    last_update: '剛剛更新'
  },
  {
    name: '元机突触包',
    description: '第一個 Pack 已創建',
    last_update: '2026-03-31'
  },
  {
    name: '香港升學資訊',
    description: '每日資訊搜集 + Pack 生成',
    last_update: '剛剛更新'
  },
  {
    name: '三层记忆架构',
    description: 'AI 持久化記憶系統。三層架構：工作記憶、情境記憶、語義記憶',
    last_update: '2026-04-06'
  },
  {
    name: 'OpenClaw Interactive',
    description: '幼兒學習遊戲系統（2-5歲）。已完成 + Playwright 測試。單一 HTML + Tailwind CDN',
    last_update: '2026-04-03'
  },
  {
    name: 'AI 戦略転型大師課',
    description: '課程引流顧問變現。4週課程：G/E/A/R。Google Drive 已建檔',
    last_update: '2026-04-05'
  },
  {
    name: '社群内容工廠',
    description: 'GEAR 課程 → IG/Threads 內容。已生成 32 篇貼文。Google Drive 已上傳',
    last_update: '剛剛更新'
  },
  {
    name: 'Delic Club 腳本流水線',
    description: 'Python + Flask API + 3個 Agent（Refiner/Hook/Assembler）。ROI 58x',
    last_update: '剛剛更新'
  },
  {
    name: 'Javis Claw 培育日记',
    description: 'AI 成長日記自動生成系統。每天 08:00 自動生成並推送到 Telegram。45 天完整日記',
    last_update: '剛剛更新'
  },
  {
    name: 'Javis Claw Dashboard',
    description: 'AI 運營透明化展示 Dashboard。展示 Agent 技能、時間銀行、每週摘要、審批隊列、記憶健康等實時數據。Next.js + Tailwind + Supabase',
    last_update: '剛剛更新'
  }
];

async function batchUpdate() {
  console.log('📝 批量更新 Supabase projects 表...\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  const results = [];

  for (const update of projectUpdates) {
    console.log(`🔄 更新: ${update.name}`);
    
    const { data, error } = await supabase
      .from('projects')
      .update({
        description: update.description,
        last_update: update.last_update,
        updated_at: new Date().toISOString()
      })
      .eq('name', update.name)
      .select();

    if (error) {
      console.log(`   ❌ 失敗: ${error.message}\n`);
      results.push({ name: update.name, status: 'failed', error: error.message });
      continue;
    }

    if (!data || data.length === 0) {
      console.log(`   ⚠️  未找到項目\n`);
      results.push({ name: update.name, status: 'not_found' });
      continue;
    }

    console.log(`   ✅ 成功\n`);
    results.push({ name: update.name, status: 'success' });

    // 延遲避免 API 限流
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('═══════════════════════════════════════════════════════════\n');
  console.log('📊 更新結果:\n');

  const successCount = results.filter(r => r.status === 'success').length;
  const failedCount = results.filter(r => r.status === 'failed').length;
  const notFoundCount = results.filter(r => r.status === 'not_found').length;

  console.log(`✅ 成功: ${successCount} 個`);
  console.log(`❌ 失敗: ${failedCount} 個`);
  console.log(`⚠️  未找到: ${notFoundCount} 個\n`);

  if (failedCount > 0) {
    console.log('失敗詳情:');
    results.filter(r => r.status === 'failed').forEach(r => {
      console.log(`  - ${r.name}: ${r.error}`);
    });
  }

  if (notFoundCount > 0) {
    console.log('\n未找到的項目:');
    results.filter(r => r.status === 'not_found').forEach(r => {
      console.log(`  - ${r.name}`);
    });
  }

  console.log('\n✅ 批量更新完成！');
}

batchUpdate().catch(console.error);
