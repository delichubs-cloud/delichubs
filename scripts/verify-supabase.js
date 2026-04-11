#!/usr/bin/env node
/**
 * DLY Supabase 数据验证脚本
 * 
 * 用途：验证 Supabase 中的数据是否正确
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vixjolbzjztlwnssqgur.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpeGpvbGJ6anp0bHduc3NxZ3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNTEwNDYsImV4cCI6MjA4OTgyNzA0Nn0.f5MYr0Aaa4MWWw7-WZX8MUiubklTdDQKf_8FWDx6WSU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyData() {
  console.log('🔍 驗證 Supabase 數據...\n');
  
  // 验证 agents
  const { data: agents, error: agentsError } = await supabase
    .from('agents')
    .select('*');
  
  if (agentsError) {
    console.error('❌ agents 查詢失敗:', agentsError);
  } else {
    console.log(`✅ agents: ${agents.length} 筆記錄`);
    agents.forEach(agent => {
      console.log(`   - ${agent.name} (${agent.status})`);
    });
  }
  
  console.log('');
  
  // 验证 skills
  const { data: skills, error: skillsError } = await supabase
    .from('skills')
    .select('*');
  
  if (skillsError) {
    console.error('❌ skills 查詢失敗:', skillsError);
  } else {
    console.log(`✅ skills: ${skills.length} 筆記錄`);
    skills.forEach(skill => {
      console.log(`   - ${skill.name} (${skill.status})`);
    });
  }
  
  console.log('');
  
  // 验证 task_logs
  const { data: taskLogs, error: taskLogsError } = await supabase
    .from('task_logs')
    .select('*')
    .order('completed_at', { ascending: false })
    .limit(5);
  
  if (taskLogsError) {
    console.error('❌ task_logs 查詢失敗:', taskLogsError);
  } else {
    console.log(`✅ task_logs: ${taskLogs.length} 筆記錄`);
    taskLogs.forEach(task => {
      console.log(`   - ${task.task_name} (${task.duration}s)`);
    });
  }
  
  console.log('');
  
  // 验证 featured_posts
  const { data: featuredPosts, error: featuredPostsError } = await supabase
    .from('featured_posts')
    .select('*');
  
  if (featuredPostsError) {
    console.error('❌ featured_posts 查詢失敗:', featuredPostsError);
  } else {
    console.log(`✅ featured_posts: ${featuredPosts.length} 筆記錄`);
    featuredPosts.forEach(post => {
      console.log(`   - ${post.title} (${post.status})`);
    });
  }
  
  console.log('');
  
  // 验证 javis_claw_logs
  const { data: javisClawLogs, error: javisClawLogsError } = await supabase
    .from('javis_claw_logs')
    .select('*')
    .order('day_number', { ascending: false });
  
  if (javisClawLogsError) {
    console.error('❌ javis_claw_logs 查詢失敗:', javisClawLogsError);
  } else {
    console.log(`✅ javis_claw_logs: ${javisClawLogs.length} 筆記錄`);
    javisClawLogs.forEach(log => {
      console.log(`   - Day ${log.day_number}: ${log.title}`);
    });
  }
  
  console.log('\n📊 總結:');
  console.log('═'.repeat(50));
  console.log(`agents: ${agents?.length || 0}`);
  console.log(`skills: ${skills?.length || 0}`);
  console.log(`task_logs: ${taskLogs?.length || 0}`);
  console.log(`featured_posts: ${featuredPosts?.length || 0}`);
  console.log(`javis_claw_logs: ${javisClawLogs?.length || 0}`);
  console.log('═'.repeat(50));
}

verifyData().catch(console.error);
