import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Users, 
  Droplet, 
  Bug, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  FileCheck, 
  Printer, 
  Eye, 
  Check, 
  Send,
  Building,
  Tag
} from 'lucide-react';
import { SpecimenRecord, SpecimenCategory, SpecimenStatus } from '../types';

interface LabOperationsProps {
  specimens: SpecimenRecord[];
  onSelectSpecimen: (specimen: SpecimenRecord) => void;
  onOpenNewSpecimen: () => void;
  onPrintReport: (specimen: SpecimenRecord) => void;
}

export const LabOperations: React.FC<LabOperationsProps> = ({
  specimens,
  onSelectSpecimen,
  onOpenNewSpecimen,
  onPrintReport
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('all');

  const filteredSpecimens = useMemo(() => {
    return specimens.filter((spec) => {
      const matchSearch =
        spec.specimenCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        spec.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        spec.subjectIdentifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        spec.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        spec.originFacility.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' || spec.category === selectedCategory;

      const matchStatus =
        selectedStatus === 'all' || spec.status === selectedStatus;

      const matchUrgency =
        selectedUrgency === 'all' || spec.urgency === selectedUrgency;

      return matchSearch && matchCategory && matchStatus && matchUrgency;
    });
  }, [specimens, searchTerm, selectedCategory, selectedStatus, selectedUrgency]);

  const counts = useMemo(() => {
    return {
      antrean: specimens.filter(s => s.status === 'antrean').length,
      analisis: specimens.filter(s => s.status === 'analisis').length,
      validasi: specimens.filter(s => s.status === 'validasi').length,
      selesai: specimens.filter(s => s.status === 'selesai').length,
      total: specimens.length
    };
  }, [specimens]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Pelayanan Laboratorium Kesehatan Masyarakat (Labkesmas)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manajemen alur kerja spesimen terpadu: Pra-Analitik, Analitik, Pasca-Analitik & Validasi Medis Sp.PK
          </p>
        </div>

        <button
          onClick={onOpenNewSpecimen}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Registrasi Spesimen Baru</span>
        </button>
      </div>

      {/* Workflow Stage Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setSelectedStatus(selectedStatus === 'antrean' ? 'all' : 'antrean')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedStatus === 'antrean'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-medium">
            <span>1. Pra-Analitik (Antrean)</span>
            <Clock className={`w-4 h-4 ${selectedStatus === 'antrean' ? 'text-slate-300' : 'text-slate-400'}`} />
          </div>
          <div className="text-2xl font-black mt-2">{counts.antrean}</div>
          <div className={`text-[10px] mt-0.5 ${selectedStatus === 'antrean' ? 'text-slate-300' : 'text-slate-400'}`}>
            Spesimen baru diterima
          </div>
        </button>

        <button
          onClick={() => setSelectedStatus(selectedStatus === 'analisis' ? 'all' : 'analisis')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedStatus === 'analisis'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white hover:bg-blue-50/50 text-slate-700 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-medium">
            <span>2. Analitik (Pemeriksaan)</span>
            <Filter className={`w-4 h-4 ${selectedStatus === 'analisis' ? 'text-blue-200' : 'text-blue-500'}`} />
          </div>
          <div className="text-2xl font-black mt-2">{counts.analisis}</div>
          <div className={`text-[10px] mt-0.5 ${selectedStatus === 'analisis' ? 'text-blue-200' : 'text-slate-400'}`}>
            Sedang diuji di lab
          </div>
        </button>

        <button
          onClick={() => setSelectedStatus(selectedStatus === 'validasi' ? 'all' : 'validasi')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedStatus === 'validasi'
              ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
              : 'bg-white hover:bg-amber-50/50 text-slate-700 border-amber-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-medium">
            <span>3. Menunggu Validasi</span>
            <AlertCircle className={`w-4 h-4 ${selectedStatus === 'validasi' ? 'text-amber-200' : 'text-amber-500'}`} />
          </div>
          <div className="text-2xl font-black mt-2">{counts.validasi}</div>
          <div className={`text-[10px] mt-0.5 ${selectedStatus === 'validasi' ? 'text-amber-200' : 'text-slate-400'}`}>
            Perlu TTD Dokter Sp.PK
          </div>
        </button>

        <button
          onClick={() => setSelectedStatus(selectedStatus === 'selesai' ? 'all' : 'selesai')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedStatus === 'selesai'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-white hover:bg-emerald-50/50 text-slate-700 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-medium">
            <span>4. Selesai / Terverifikasi</span>
            <CheckCircle2 className={`w-4 h-4 ${selectedStatus === 'selesai' ? 'text-emerald-200' : 'text-emerald-500'}`} />
          </div>
          <div className="text-2xl font-black mt-2">{counts.selesai}</div>
          <div className={`text-[10px] mt-0.5 ${selectedStatus === 'selesai' ? 'text-emerald-200' : 'text-slate-400'}`}>
            Siap cetak & rilis FHIR
          </div>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kode spesimen (LAB-2026-...), nama subjek, NIK, fasilitas, atau jenis uji..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700"
            >
              <option value="all">Semua Kategori Matriks (3)</option>
              <option value="manusia">👤 Spesimen Manusia (Klinis)</option>
              <option value="lingkungan">💧 Spesimen Lingkungan (Air/Udara)</option>
              <option value="vektor">🦟 Spesimen Vektor (Nyamuk/Reservoir)</option>
            </select>
          </div>

          {/* Urgency Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700"
            >
              <option value="all">Semua Derajat Urgensi</option>
              <option value="cito">⚡ CITO (Segera & Kritis)</option>
              <option value="surveilans">🔍 Surveilans Program Nasional</option>
              <option value="rutin">📋 Rutin Pelayanan</option>
            </select>
          </div>
        </div>

        {/* Category Pills shortcut */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium text-[11px]">Filter Cepat:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua ({specimens.length})
            </button>
            <button
              onClick={() => setSelectedCategory('manusia')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors inline-flex items-center gap-1 ${
                selectedCategory === 'manusia'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <Users className="w-3 h-3" /> Manusia ({specimens.filter(s => s.category === 'manusia').length})
            </button>
            <button
              onClick={() => setSelectedCategory('lingkungan')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors inline-flex items-center gap-1 ${
                selectedCategory === 'lingkungan'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'
              }`}
            >
              <Droplet className="w-3 h-3" /> Lingkungan ({specimens.filter(s => s.category === 'lingkungan').length})
            </button>
            <button
              onClick={() => setSelectedCategory('vektor')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors inline-flex items-center gap-1 ${
                selectedCategory === 'vektor'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              <Bug className="w-3 h-3" /> Vektor ({specimens.filter(s => s.category === 'vektor').length})
            </button>
          </div>

          <div className="text-slate-500 text-[11px]">
            Menampilkan <strong>{filteredSpecimens.length}</strong> dari {specimens.length} spesimen
          </div>
        </div>
      </div>

      {/* Specimens Grid / List */}
      <div className="space-y-3">
        {filteredSpecimens.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">Tidak ada spesimen ditemukan</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Cobalah ubah kata kunci pencarian atau reset filter kategori di atas.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedStatus('all');
                setSelectedUrgency('all');
              }}
              className="mt-4 text-xs font-semibold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          filteredSpecimens.map((specimen) => (
            <div
              key={specimen.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-emerald-300 p-4 sm:p-5 shadow-xs transition-all hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Left section: Category badge, Code, Name */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {specimen.specimenCode}
                    </span>

                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      specimen.category === 'manusia'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : specimen.category === 'lingkungan'
                        ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {specimen.category === 'manusia' && <Users className="w-3 h-3" />}
                      {specimen.category === 'lingkungan' && <Droplet className="w-3 h-3" />}
                      {specimen.category === 'vektor' && <Bug className="w-3 h-3" />}
                      <span>{specimen.categoryLabel}</span>
                    </span>

                    {specimen.urgency === 'cito' && (
                      <span className="text-[10px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                        CITO (Darurat)
                      </span>
                    )}

                    {specimen.urgency === 'surveilans' && (
                      <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded uppercase tracking-wider border border-teal-200">
                        Surveilans
                      </span>
                    )}

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      specimen.status === 'selesai'
                        ? 'bg-emerald-100 text-emerald-800'
                        : specimen.status === 'validasi'
                        ? 'bg-amber-100 text-amber-800'
                        : specimen.status === 'analisis'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      ● {specimen.status === 'selesai' ? 'Terverifikasi' : specimen.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-2 pt-0.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {specimen.subjectName}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">
                      ({specimen.subjectIdentifier})
                    </span>
                    {specimen.ageGender && (
                      <span className="text-xs text-slate-400 font-medium">
                        • {specimen.ageGender}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-medium">
                    {specimen.testType}
                  </p>
                </div>

                {/* Middle section: Facility info */}
                <div className="text-xs text-slate-500 space-y-1 md:text-right border-t md:border-t-0 md:border-l border-slate-100 pt-2 md:pt-0 md:pl-4 min-w-[200px]">
                  <div className="flex items-center md:justify-end gap-1.5 font-medium text-slate-700">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{specimen.originFacility}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Masuk: {specimen.receivedDate}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium">
                    ATLM: {specimen.technicianName}
                  </div>
                </div>

                {/* Right section: Action Buttons */}
                <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
                  <button
                    onClick={() => onSelectSpecimen(specimen)}
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl shadow-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Detail / Uji</span>
                  </button>

                  <button
                    onClick={() => onPrintReport(specimen)}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl transition-colors border border-slate-200"
                    title="Cetak Lembar Hasil Resmi Kemenkes Konoha"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-600" />
                    <span className="hidden sm:inline">Cetak</span>
                  </button>
                </div>
              </div>

              {/* Bottom Test Summary Chips */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[11px]">
                <span className="text-slate-400 font-medium">Hasil Parameter ({specimen.tests.length}):</span>
                {specimen.tests.map((t) => (
                  <span
                    key={t.id}
                    className={`px-2 py-0.5 rounded border ${
                      t.status === 'critical'
                        ? 'bg-rose-50 text-rose-700 border-rose-200 font-bold'
                        : t.status === 'positive' || t.status === 'high'
                        ? 'bg-amber-50 text-amber-800 border-amber-200 font-medium'
                        : t.status === 'low'
                        ? 'bg-blue-50 text-blue-700 border-blue-200 font-medium'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {t.name}: <strong>{t.value} {t.unit}</strong>
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
