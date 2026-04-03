'use client';

import { useEffect, useState } from 'react';
import { getAgents, getSkills, type Agent, type Skill } from '@/lib/supabase-client';

export default function AgentSkillCard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [agentsData, skillsData] = await Promise.all([
          getAgents(),
          getSkills()
        ]);
        setAgents(agentsData);
        setSkills(skillsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-red-800">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold">🤖 Agents & Skills</h2>
        <span className="text-xs text-gray-400">
          {agents.length} agents • {skills.length} skills
        </span>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-3">Active Agents ({agents.length})</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {agents.slice(0, 9).map((agent) => (
            <div
              key={agent.id}
              className="flex items-center gap-2 p-2 bg-gray-800 rounded"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full shrink-0"></div>
              <span className="text-xs sm:text-sm truncate">{agent.name}</span>
            </div>
          ))}
          {agents.length > 9 && (
            <div className="flex items-center justify-center p-2 bg-gray-800 rounded text-xs text-gray-400">
              +{agents.length - 9} more
            </div>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-400 mb-3">Installed Skills ({skills.length})</p>
        <div className="space-y-2">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-2 bg-gray-800 rounded"
            >
              <div className="flex items-center gap-2">
                <span className="text-blue-400">⚡</span>
                <span className="text-sm">{skill.name}</span>
              </div>
              <span className="text-xs text-gray-500">{skill.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
        Data from Supabase • Real-time
      </div>
    </div>
  );
}
