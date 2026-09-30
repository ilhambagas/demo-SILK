import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  Download, 
  Lock, 
  Key, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Terminal,
  Database
} from 'lucide-react';
import { INITIAL_AUDIT_LOGS } from '../mockData';
import { AuditLog } from '../types';

export const AuditTrail: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');

  const filteredLogs = logs.filter(log => {
    const matchSearch =
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.targetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());

    const matchAction = filterAction === 'all' || log.action === filterAction;
    return matchSearch && matchAction;
  });

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `SILK-audit-trail-iso27001-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Tata Kelola Keamanan & Audit Trail (ISO 27001 & UU Privasi Data)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pencatatan jejak audit aktivitas yang tidak dapat diubah (immutable log) dengan verifikasi hash kriptografi
            </p>
          </div>

          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Log Audit (.JSON)</span>
          </button>
        </div>
      </div>

      {/* ISO 27001 Compliance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Enkripsi Saat Istirahat & Transit</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Data rekam medis pasien dienkripsi dengan standar AES-256 dan transmisi jaringan melalui TLS 1.3 bersertifikat resmi Kemenkes.
          </p>
          <div className="mt-2 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Kepatuhan 100%
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
            <Key className="w-4 h-4 text-blue-600" />
            <span>Role-Based Access Control (RBAC)</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Pemisahan ketat hak akses antara ATLM (entri analitik), Dokter Spesialis Patologi Klinik (validasi medis), dan Petugas Surveilans.
          </p>
          <div className="mt-2 text-[10px] text-blue-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-blue-600" /> Hak Akses Tervalidasi
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
            <Terminal className="w-4 h-4 text-purple-600" />
            <span>Integritas Log Kriptografi (SHA-256)</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Setiap perubahan data dan tanda tangan elektronik diverifikasi dengan rantai hash digital untuk mencegah manipulasi data laboratorium.
          </p>
          <div className="mt-2 text-[10px] text-purple-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-purple-600" /> Log Bebas Modifikasi
          </div>
        </div>
      </div>

      {/* Filter and Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari aktor, nomor spesimen, atau aksi audit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs"
            >
              <option value="all">Semua Tipe Aksi</option>
              <option value="VALIDASI_HASIL_MEDIS">VALIDASI_HASIL_MEDIS</option>
              <option value="PENERIMAAN_SPESIMEN">PENERIMAAN_SPESIMEN</option>
              <option value="TRIGGER_EWARS_ALERT">TRIGGER_EWARS_ALERT</option>
              <option value="SYNC_SATUSEHAT_FHIR">SYNC_SATUSEHAT_FHIR</option>
              <option value="REGISTRASI_BARU">REGISTRASI_BARU</option>
            </select>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Waktu & Tanggal</th>
                <th className="py-2.5 px-3">Aktor & Peran</th>
                <th className="py-2.5 px-3">Aksi Sistem</th>
                <th className="py-2.5 px-3">ID Target</th>
                <th className="py-2.5 px-3">Rincian Perubahan</th>
                <th className="py-2.5 px-3">IP & Hash Integritas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{log.actor}</div>
                    <div className="text-[10px] text-slate-500">{log.role}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono text-[10px] font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-emerald-700 font-semibold">
                    {log.targetId}
                  </td>
                  <td className="py-3 px-3 text-slate-700 max-w-xs">
                    {log.details}
                  </td>
                  <td className="py-3 px-3 font-mono text-[10px] text-slate-400">
                    <div>{log.ipAddress}</div>
                    <div className="truncate max-w-[120px]" title={log.hash}>
                      {log.hash.substring(0, 16)}...
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
