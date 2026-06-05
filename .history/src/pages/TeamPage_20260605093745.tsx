import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../data';
import { TEAM_MEMBER_DATA } from '../types';
import {
  Users,
  ShieldCheck,
  UserPlus,
  Compass,
  CheckCircle2,
  Lock,
  Trash2,
  Mail,
} from 'lucide-react';

export default function TeamPage() {
  const [members, setMembers] = useState<TEAM_MEMBER_DATA[]>(TEAM_MEMBERS);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<'Owner' | 'Admin' | 'Developer' | 'Viewer' | 'Billing Manager'>('Developer');
  const [isAdding, setIsAdding] = useState(false);

  // Add team member dynamically
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newName.trim()) return;

    setIsAdding(true);

    setTimeout(() => {
      // Formulate mock initial letters
      const initials = newName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

      const colors = [
        'bg-blue-500/10 text-blue-400',
        'bg-pink-500/10 text-pink-400',
        'bg-purple-500/10 text-purple-400',
        'bg-amber-500/10 text-amber-400',
        'bg-cyan-500/10 text-cyan-400',
      ];
      const selectedColor = colors[Math.floor(Math.random() * colors.length)];

      const newM: TEAM_MEMBER_DATA = {
        id: `team-${Date.now()}`,
        name: newName,
        email: newEmail,
        avatar: '',
        initials,
        color: selectedColor,
        role: newRole,
        status: 'Invited',
        lastActive: 'Never',
      };

      setMembers([...members, newM]);
      setNewName('');
      setNewEmail('');
      setIsAdding(false);
    }, 900);
  };

  // Remove collaborator helper
  const handleRemoveMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Invite codes */}
        <div className="glass-card p-6 rounded-3xl border border-zinc-805/40 relative overflow-hidden flex flex-col justify-between h-full col-span-1 select-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

          <div>
            <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-indigo-400" />
              Invite Workspace Admin
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Add engineers, billing assistants, or viewer advocates to this domain.
            </p>
          </div>

          <form onSubmit={handleInvite} className="space-y-4 mt-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-wider text-zinc-550 uppercase">
                Collaborator Full Name
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Marcus Aurelius"
                className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-650 px-3.5 py-2.5 rounded-xl focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-wider text-zinc-555 uppercase">
                Workspace Email Address
              </label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="marcus@stoic.im"
                className="w-full bg-zinc-900 border border-zinc-805 text-xs text-white placeholder-zinc-650 px-3.5 py-2.5 rounded-xl focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-wider text-zinc-555 uppercase">
                RBAC Access Level Role
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as any)}
                className="w-full bg-zinc-900 border border-zinc-805 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-xs text-zinc-200 outline-none transition"
              >
                <option>Admin</option>
                <option>Developer</option>
                <option>Viewer</option>
                <option>Billing Manager</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isAdding}
              className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-semibold py-3 rounded-xl cursor-pointer text-xs transition duration-200 mt-2 flex items-center justify-center space-x-1.5"
            >
              {isAdding ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Mailing Invite Key...</span>
                </>
              ) : (
                <>
                  <span>Dispatch Invitation</span>
                </>
              )}
            </button>
          </form>

          <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-805/60 mt-6 text-[11px] text-zinc-500 flex items-start gap-2 leading-relaxed">
            <Lock className="w-3.5 h-3.5 mt-0.5 text-emerald-400 shrink-0" />
            <span>
              All dispatch actions are securely hashed and tracked via active workspace audit log codes.
            </span>
          </div>
        </div>

        {/* Right Column: Dynamic team roster table */}
        <div className="glass-card p-6 rounded-3xl border border-zinc-800/45 h-full lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center select-none">
              <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-450" />
                Active Team Administrators ({members.length})
              </h3>
              <span className="text-[10px] font-mono tracking-wider text-zinc-555 border border-zinc-900 bg-zinc-950 px-2 py-0.5 rounded uppercase">
                RBAC MATRIX
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5 font-sans">
              Domain operators having access to clickhouse production tunnels.
            </p>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-zinc-900 text-zinc-550">
                  <th className="pb-3 pl-2">Domain Collaborator</th>
                  <th className="pb-3">Security Role</th>
                  <th className="pb-3 text-center">Status</th>
                  <th className="pb-3 text-right">Last Telemetry Active</th>
                  <th className="pb-3 text-right pr-2">Revoke</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/40">
                {members.map((mem) => {
                  return (
                    <tr key={mem.id} className="hover:bg-zinc-900/20 group">
                      {/* Name & Mail */}
                      <td className="py-3.5 pl-2 flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-[11px] shrink-0 uppercase select-none ${mem.color}`}>
                          {mem.initials}
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-white block truncate">{mem.name}</span>
                          <span className="text-[9px] text-zinc-550 block font-mono truncate">{mem.email}</span>
                        </div>
                      </td>

                      {/* RBAC Role */}
                      <td className="py-3.5 text-zinc-300 font-medium">
                        <div className="flex items-center space-x-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span>{mem.role}</span>
                        </div>
                      </td>

                      {/* Status badge */}
                      <td className="py-3.5 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold border font-mono uppercase ${
                          mem.status === 'Active'
                            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                            : mem.status === 'Offline'
                            ? 'bg-zinc-950 border-zinc-900 text-zinc-500'
                            : 'bg-amber-500/5 border-amber-505/20 text-amber-400 animate-pulse'
                        }`}>
                          {mem.status}
                        </span>
                      </td>

                      {/* Active Time */}
                      <td className="py-3.5 text-right font-mono text-[10px] text-zinc-500">
                        {mem.lastActive}
                      </td>

                      {/* Flush trash button */}
                      <td className="py-3.5 text-right pr-2">
                        <button
                          onClick={() => handleRemoveMember(mem.id)}
                          disabled={mem.role === 'Owner'}
                          className="p-1 rounded text-zinc-650 hover:text-rose-400 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                          title="Revoke access tokens"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-3 border-t border-zinc-900 mt-6 text-[10px] font-mono text-zinc-555 flex justify-between">
            <span>SAML SINGLE SIGN-ON: ENABLED CERT RE-ISSUED</span>
            <span>DOM: IDEAFLOW ADMIN ENGINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
