import React, { useState } from 'react';
import { CUSTOMERS_LIST } from '../data';
import { CUSTOMER_DATA, CUSTOMER_STATUS } from '../types';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  Mail,
  UserPlus,
  TrendingUp,
  Globe2,
  Check,
} from 'lucide-react';

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<keyof CUSTOMER_DATA>('spent');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedUser, setSelectedUser] = useState<CUSTOMER_DATA | null>(null);

  // Sorting helper
  const handleSort = (field: keyof CUSTOMER_DATA) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Filter customers logic
  const filteredCustomers = CUSTOMERS_LIST.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.company.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus =
      statusFilter === 'All' || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (typeof aVal === 'string') {
      return sortAsc
        ? (aVal as string).localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal as string);
    } else {
      return sortAsc
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    }
  });

  const totalSpentOfFiltered = filteredCustomers.reduce((acc, curr) => acc + curr.spent, 0);

  return (
    <div className="space-y-6">
      {/* Top micro summary banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-5 rounded-2xl border border-zinc-805/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Aggregate Accounts</span>
            <h4 className="text-2xl font-bold font-display text-white mt-1">
              {filteredCustomers.length} <span className="text-zinc-650 text-xs">/ {CUSTOMERS_LIST.length} total</span>
            </h4>
          </div>
          <div className="p-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 rounded-xl">
            <Mail className="w-4 h-4" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-zinc-805/40 flex items-center justify-between font-sans">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Aggregate Platform Value</span>
            <h4 className="text-2xl font-bold font-display text-emerald-400 mt-1">
              ${totalSpentOfFiltered.toLocaleString()}
            </h4>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 rounded-xl">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-zinc-805/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Node Reach</span>
            <p className="text-sm font-semibold text-zinc-300 mt-1.5 flex items-center">
              <Globe2 className="w-4 h-4 text-purple-400 mr-1.5 shrink-0" />
              {Array.from(new Set(filteredCustomers.map((c) => c.country))).length} Sovereign Regions
            </p>
          </div>
          <button className="text-[11px] bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-1.5">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Invite</span>
          </button>
        </div>
      </div>

      {/* Main interactive grid control bar */}
      <div className="glass-card p-6 rounded-2xl border border-zinc-805/40">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-5 mb-5">
          {/* Active Status filter row */}
          <div className="flex space-x-1 bg-zinc-900/60 border border-zinc-800 p-0.5 rounded-xl">
            {['All', 'Active', 'Inactive', 'Pending'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer font-sans ${
                  statusFilter === status
                    ? 'bg-zinc-800 text-white font-medium shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search box tool */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-550" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter names, emails, company..."
              className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-indigo-500/80 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-550 outline-none transition"
            />
          </div>
        </div>

        {/* Live tabular list */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="text-zinc-550 border-b border-zinc-900">
                <th className="pb-3 pl-3">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center space-x-1 hover:text-white transition cursor-pointer"
                  >
                    <span>Customer Account</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="pb-3">
                  <button
                    onClick={() => handleSort('company')}
                    className="flex items-center space-x-1 hover:text-white transition cursor-pointer"
                  >
                    <span>Company affiliation</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="pb-3 text-center">Status Index</th>
                <th className="pb-3">
                  <button
                    onClick={() => handleSort('spent')}
                    className="flex items-center space-x-1 hover:text-white transition cursor-pointer"
                  >
                    <span>Operational Spend</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="pb-3">Country Hub</th>
                <th className="pb-3 text-right pr-3">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/40">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-zinc-650 font-mono text-sm leading-relaxed">
                    No customer nodes matching the current criteria in this workspace.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => {
                  return (
                    <tr
                      key={cust.id}
                      onClick={() => setSelectedUser(cust)}
                      className={`hover:bg-zinc-900/30 transition-colors cursor-pointer group ${
                        selectedUser?.id === cust.id ? 'bg-zinc-900/50' : ''
                      }`}
                    >
                      {/* Customer Name & Email */}
                      <td className="py-4 pl-3 flex items-center space-x-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-xs shrink-0 select-none ${cust.color}`}>
                          {cust.initials}
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-white block group-hover:text-indigo-400 transition-colors">
                            {cust.name}
                          </span>
                          <span className="text-[10px] text-zinc-550 block font-mono">
                            {cust.email}
                          </span>
                        </div>
                      </td>

                      {/* Company info */}
                      <td className="py-4 text-zinc-300 font-medium">
                        {cust.company}
                      </td>

                      {/* Status Roundel indicator */}
                      <td className="py-4 text-center">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          cust.status === 'Active'
                            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                            : cust.status === 'Inactive'
                            ? 'bg-zinc-900 border-zinc-800 text-zinc-500'
                            : 'bg-amber-500/5 border-amber-500/20 text-amber-400'
                        }`}>
                          {cust.status}
                        </span>
                      </td>

                      {/* Cash Spent */}
                      <td className="py-4 font-mono font-semibold text-white">
                        ${cust.spent.toLocaleString()}
                      </td>

                      {/* Country code node location */}
                      <td className="py-4 text-zinc-400 text-xs">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-mono text-[10px] text-zinc-500 border border-zinc-800 px-1 py-0.5 rounded bg-zinc-950 uppercase shrink-0">
                            {cust.countryCode}
                          </span>
                          <span className="truncate">{cust.country}</span>
                        </div>
                      </td>

                      {/* Date Joined */}
                      <td className="py-4 text-right pr-3 font-mono text-zinc-500 text-[11px]">
                        {cust.dateJoined}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer slide panel drawer details */}
      {selectedUser && (
        <div className="glass-card p-6 rounded-2xl border border-indigo-500/25 bg-gradient-to-tr from-stone-950 via-zinc-950/60 to-zinc-900/30 shadow-2xl relative select-none animate-in slide-in-from-bottom-2 duration-300">
          <div className="absolute right-4 top-4">
            <button
              onClick={() => setSelectedUser(null)}
              className="text-xs bg-zinc-900 hover:bg-zinc-800 p-1 rounded-md text-zinc-500 hover:text-white transition cursor-pointer"
            >
              Close Details
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-display font-extrabold text-lg shadow-inner ${selectedUser.color}`}>
                {selectedUser.initials}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white tracking-tight">{selectedUser.name}</h4>
                <p className="text-xs text-indigo-400 font-mono">{selectedUser.email}</p>
              </div>
            </div>

            <div className="flex gap-4 text-left font-mono">
              <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-900">
                <span className="block text-[9px] text-zinc-650 uppercase">Aggregate Spend</span>
                <span className="block text-sm font-bold text-emerald-400">${selectedUser.spent.toLocaleString()}</span>
              </div>
              <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-900">
                <span className="block text-[9px] text-zinc-650 uppercase">Region Location</span>
                <span className="block text-sm font-bold text-white uppercase">{selectedUser.countryCode} / {selectedUser.status}</span>
              </div>
            </div>
          </div>

          {/* Micro telemetry log line for selected user */}
          <div className="mt-5 pt-4 border-t border-zinc-900/60 flex flex-col sm:flex-row justify-between text-[11px] font-mono text-zinc-550 gap-2">
            <span>SAML SINGLE SIGN-ON TOKEN: sso-token-39499104-ok</span>
            <span>SYSTEM STATE: SECURITY SECURE STATUS (STABLE V1.4)</span>
          </div>
        </div>
      )}
    </div>
  );
}
