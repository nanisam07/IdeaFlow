import React, { useState } from 'react';
import { PROJECTS_LIST } from '../data';
import { PROJECT_DATA, PROJECT_STATUS } from '../types';
import {
  FolderKanban,
  CheckSquare,
  Clock,
  Calendar,
  Layers,
  ArrowRight,
  TrendingDown,
  User,
  Plus,
  Trash2,
} from 'lucide-react';

interface MOCK_TASK {
  id: string;
  name: string;
  isCompleted: boolean;
  project: string;
}

export default function ProjectsPage() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const activeProject = PROJECTS_LIST[activeProjectIdx];

  const [tasks, setTasks] = useState<MOCK_TASK[]>([
    { id: 'task-1', name: 'Draft SAML client integration parameters', isCompleted: true, project: 'proj-4' },
    { id: 'task-2', name: 'Conduct ClickHouse query optimization profiling review', isCompleted: false, project: 'proj-2' },
    { id: 'task-3', name: 'Refactor standard React Context states to modular helper objects', isCompleted: true, project: 'proj-3' },
    { id: 'task-4', name: 'Prepare premium glass and steel graphic visual assets', isCompleted: false, project: 'proj-3' },
    { id: 'task-5', name: 'Formulate predictive Gemini pipeline forecasting model structures', isCompleted: false, project: 'proj-5' },
    { id: 'task-6', name: 'Upgrade standard Stripe schema models to webhook compliance version', isCompleted: false, project: 'proj-1' },
    { id: 'task-7', name: 'Test global latency speeds for Canadian regional nodes', isCompleted: true, project: 'proj-1' },
  ]);

  const [newTaskName, setNewTaskName] = useState('');

  // Handle checking off tasks
  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  // Add tasks
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;
    const newTask: MOCK_TASK = {
      id: `task-${Date.now()}`,
      name: newTaskName,
      isCompleted: false,
      project: activeProject.id,
    };
    setTasks([...tasks, newTask]);
    setNewTaskName('');
  };

  // Delete task helper
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const projectTasks = tasks.filter((t) => t.project === activeProject.id);
  const completedCount = projectTasks.filter((t) => t.isCompleted).length;
  const projectProgress = projectTasks.length
    ? Math.round((completedCount / projectTasks.length) * 10) * 10
    : activeProject.progress;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Navigation Left Column */}
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-widest font-mono text-zinc-550 pl-1">
            PROJECT PATH NODES
          </p>

          <div className="space-y-2.5">
            {PROJECTS_LIST.map((proj, idx) => {
              const isActive = idx === activeProjectIdx;
              const hasStatusCol =
                proj.status === 'Completed'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : proj.status === 'In Progress'
                  ? 'text-indigo-400 bg-indigo-505/10'
                  : proj.status === 'In Review'
                  ? 'bg-pink-500/10 text-pink-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500';

              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveProjectIdx(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 select-none cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-zinc-900/80 border-indigo-500/30 shadow-inner'
                      : 'bg-zinc-950/40 border-zinc-900 hover:bg-zinc-900/20'
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="font-semibold text-xs text-white truncate max-w-[170px]">
                      {proj.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-wide uppercase font-mono border border-transparent ${hasStatusCol}`}>
                      {proj.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-500 mt-1 truncate w-full font-sans">
                    {proj.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-zinc-900/60 w-full flex items-center justify-between text-[10px] text-zinc-555 font-mono">
                    <span>PROGRESS: {proj.id === activeProject.id ? projectProgress : proj.progress}%</span>
                    <span>DUE: {proj.dueDate}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Detail Center Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-zinc-805/40 relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header detail */}
            <div className="border-b border-zinc-900 pb-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="text-xl font-bold text-white font-display tracking-tight leading-none">
                    {activeProject.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1.5 font-sans leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center space-x-2 shrink-0 select-none">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 font-display font-semibold text-xs flex items-center justify-center">
                    {activeProject.owner.initials}
                  </div>
                  <div className="text-left font-sans">
                    <span className="block text-[9px] text-zinc-500 font-mono">Workspace Advocate</span>
                    <span className="block text-[11px] text-white font-semibold">{activeProject.owner.name}</span>
                  </div>
                </div>
              </div>

              {/* Progress visual bar */}
              <div className="mt-6">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-zinc-500">Workspace Pipeline Progress</span>
                  <span className="text-indigo-400 font-bold">{projectProgress}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-850">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${projectProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Financial tracking metric block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-zinc-950/40 border border-zinc-900 p-3.5 rounded-xl text-left font-mono">
                <span className="text-[9px] text-zinc-650 uppercase">Project Budget allocation</span>
                <span className="block text-sm font-semibold text-white mt-1">
                  ${activeProject.budget.toLocaleString()}
                </span>
              </div>
              <div className="bg-zinc-950/40 border border-zinc-900 p-3.5 rounded-xl text-left font-mono">
                <span className="text-[9px] text-zinc-650 uppercase">Committed spend Ledger</span>
                <span className="block text-sm font-semibold text-indigo-300 mt-1">
                  ${activeProject.spent.toLocaleString()}
                </span>
              </div>
              <div className="bg-zinc-950/40 border border-zinc-900 p-3.5 rounded-xl text-left font-mono">
                <span className="text-[9px] text-zinc-650 uppercase">Operational Headroom</span>
                <span className="block text-sm font-semibold text-emerald-450 mt-1">
                  ${(activeProject.budget - activeProject.spent).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Interactive Checklist Manager (Requested Feature) */}
            <div className="space-y-4 pt-4 border-t border-zinc-900">
              <div className="flex justify-between items-center select-none">
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  Interactive checklist Manager ({completedCount}/{projectTasks.length})
                </h4>
                <span className="text-[10px] text-zinc-550 font-sans">
                  Double-click or press checkbox to toggle pipeline state
                </span>
              </div>

              {/* Add form */}
              <form onSubmit={handleAddTask} className="flex gap-2.5">
                <input
                  type="text"
                  required
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  placeholder="Insert new technical dependency check..."
                  className="flex-1 bg-zinc-900/60 border border-zinc-800 text-xs text-white placeholder-zinc-650 px-3.5 py-2.5 rounded-xl focus:border-indigo-500/80 outline-none transition"
                />
                <button
                  type="submit"
                  className="bg-indigo-650 hover:bg-indigo-600 text-white font-semibold text-xs px-3.5 rounded-xl transition cursor-pointer flex items-center space-x-1.5 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Add Task</span>
                </button>
              </form>

              {/* Task Items List */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {projectTasks.length === 0 ? (
                  <p className="text-center py-6 text-zinc-650 font-mono text-xs leading-relaxed">
                    No active tasks are assigned to this project node. Formulate some above!
                  </p>
                ) : (
                  projectTasks.map((t) => (
                    <div
                      key={t.id}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 select-none ${
                        t.isCompleted
                          ? 'bg-zinc-900/30 border-zinc-900 text-zinc-500'
                          : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <button
                          onClick={() => toggleTask(t.id)}
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                            t.isCompleted
                              ? 'bg-indigo-600 border-indigo-500 text-white'
                              : 'bg-zinc-850 border-zinc-700'
                          }`}
                        >
                          {t.isCompleted && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <span className={`text-xs truncate ${t.isCompleted ? 'line-through' : ''}`}>
                          {t.name}
                        </span>
                      </div>

                      <button
                        onClick={() => deleteTask(t.id)}
                        className="p-1 rounded bg-zinc-950 hover:bg-rose-500/10 text-zinc-555 hover:text-rose-455 transition shrink-0 cursor-pointer"
                        title="Delete checkpoint"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
