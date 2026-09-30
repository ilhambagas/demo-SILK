import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  MapPin, 
  Users, 
  Droplet, 
  Bug, 
  Search, 
  FileCheck2, 
  ShieldAlert, 
  ArrowUpRight, 
  ExternalLink,
  Flame,
  Radio,
  Clock
} from 'lucide-react';
import { SpecimenRecord, SurveillanceAlert } from '../types';

interface DashboardSurveillanceProps {
  specimens: SpecimenRecord[];
  alerts: SurveillanceAlert[];
  onSelectSpecimen: (specimen: SpecimenRecord) => void;
  onNavigateToTab: (tab: 'pelayanan' | 'jaringan' | 'fhir' | 'audit') => void;
}

interface RegionDetail {
  name: string;
  risk: 'Tinggi' | 'Sedang' | 'Rendah';
  dominantIssue: string;
  activeCases: number;
  r0Value: number;
  airQuality: string;
  vectorIndex: string;
  faskesCount: number;
}

const REGIONS: Record<string, RegionDetail> = {
  'Distrik Sektor Selatan': {
    name: 'Distrik Sektor Selatan',
    risk: 'Tinggi',
    dominantIssue: 'KLB Chakra Fever (DHF) & Trombositopenia Akut',
    activeCases: 38,
    r0Value: 2.4,
    airQuality: 'Baik (AQI 32)',
    vectorIndex: 'ABJ 78.4% (Rendah/Bahaya)',
    faskesCount: 6
  },
  'Lembah Senju & Aliran Sungai': {
    name: 'Lembah Senju & Aliran Sungai',
    risk: 'Sedang',
    dominantIssue: 'Peningkatan Cemaran Total Coliform Sumber Air Publik',
    activeCases: 14,
    r0Value: 1.2,
    airQuality: 'Sangat Bersih (AQI 18)',
    vectorIndex: 'ABJ 92.1% (Waspada)',
    faskesCount: 8
  },
  'Sektor Rimba Kematian': {
    name: 'Sektor Rimba Kematian',
    risk: 'Sedang',
    dominantIssue: 'Kepadatan Vektor Nyamuk Hutan & Resistensi Insektisida',
    activeCases: 5,
    r0Value: 1.5,
    airQuality: 'Lembab Alami (AQI 25)',
    vectorIndex: 'Breteau Index 42 (Kritis)',
    faskesCount: 2
  },
  'Distrik Pusat Hokage': {
    name: 'Distrik Pusat Hokage',
    risk: 'Rendah',
    dominantIssue: 'Surveilans Rutin Terkendali, Kepatuhan Prokes 98%',
    activeCases: 4,
    r0Value: 0.6,
    airQuality: 'Sedang (AQI 45)',
    vectorIndex: 'ABJ 97.2% (Aman)',
    faskesCount: 14
  },
  'Perbatasan Gerbang Pasir (Suna)': {
    name: 'Perbatasan Gerbang Pasir (Suna)',
    risk: 'Rendah',
    dominantIssue: 'Penapisan Pelintas Batas & Penyakit Menular Zoonosis',
    activeCases: 2,
    r0Value: 0.4,
    airQuality: 'Kering Berdebu (AQI 58)',
    vectorIndex: 'ABJ 98.0% (Aman)',
    faskesCount: 3
  }
};

export const DashboardSurveillance: React.FC<DashboardSurveillanceProps> = ({
  specimens,
  alerts,
  onSelectSpecimen,
  onNavigateToTab
}) => {
  const [selectedRegionKey, setSelectedRegionKey] = useState<string>('Distrik Sektor Selatan');
  const selectedRegion = REGIONS[selectedRegionKey] || REGIONS['Distrik Sektor Selatan'];

  const totalSpecimens = specimens.length;
  const humanCount = specimens.filter(s => s.category === 'manusia').length;
  const envCount = specimens.filter(s => s.category === 'lingkungan').length;
  const vectorCount = specimens.filter(s => s.category === 'vektor').length;
  const pendingValidation = specimens.filter(s => s.status === 'validasi').length;
  const criticalCount = specimens.filter(s => 
    s.tests.some(t => t.status === 'critical' || t.status === 'positive')
  ).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Spesimen */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Spesimen Terkoneksi</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalSpecimens + 248}</span>
            <span className="text-xs font-semibold text-emerald-700 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +14.2% hr ini
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-blue-500" /> Manusia: <strong>{humanCount + 180}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Droplet className="w-3 h-3 text-cyan-500" /> Lingkungan: <strong>{envCount + 42}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Bug className="w-3 h-3 text-amber-500" /> Vektor: <strong>{vectorCount + 26}</strong>
            </span>
          </div>
        </div>

        {/* Card 2: Menunggu Validasi Medis */}
        <div 
          onClick={() => onNavigateToTab('pelayanan')}
          className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs cursor-pointer hover:border-amber-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">Menunggu Validasi Dokter</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-105 transition-transform">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-900">{pendingValidation}</span>
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Perlu Tanda Tangan Sp.PK
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-amber-100 flex items-center justify-between text-[11px] text-amber-800">
            <span>Standar SLA: Maksimal 2 Jam</span>
            <span className="font-semibold text-emerald-800 flex items-center gap-0.5">
              Review Lab <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 3: Kasus Kritis / Outbreak Alert */}
        <div className="bg-white p-5 rounded-2xl border border-rose-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-800">Peringatan Dini EWARS</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-700">{alerts.length} Klaster</span>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 animate-pulse">
              1 Siaga Tinggi
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-rose-100 flex items-center justify-between text-[11px] text-rose-800">
            <span>Chakra Fever di Konoha Selatan</span>
            <span className="font-semibold">38 Kasus Reaktif</span>
          </div>
        </div>

        {/* Card 4: Faskes Terintegrasi */}
        <div 
          onClick={() => onNavigateToTab('jaringan')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer hover:border-emerald-300 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Integritas Jaringan Lab</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600 group-hover:scale-105 transition-transform">
              <Radio className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">99.4%</span>
            <span className="text-xs font-semibold text-emerald-700">Tersinkronisasi</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>6 Faskes Aktif (Tk 1 - 4)</span>
            <span className="font-semibold text-teal-700 flex items-center gap-0.5">
              Lihat Topologi <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Regional Interactive Map + Outbreak Alert Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Regional Epidemiological Map (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  Peta Surveilans Wilayah & Zonasi Epidemiologi
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Integrasi data real-time laboratorium lintas sektor Kementerian Kesehatan Konoha
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs bg-slate-100 px-2.5 py-1 rounded-lg text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Live Feed</span>
              </div>
            </div>

            {/* Interactive Region Selector Tabs */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {Object.keys(REGIONS).map((key) => {
                const reg = REGIONS[key];
                const isActive = selectedRegionKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedRegionKey(key)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 border ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      reg.risk === 'Tinggi' ? 'bg-rose-500' : reg.risk === 'Sedang' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    {key}
                  </button>
                );
              })}
            </div>

            {/* Visual Territorial Map Display */}
            <div className="bg-slate-950 text-slate-100 rounded-xl p-5 border border-slate-800 relative overflow-hidden my-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                    SEKTOR TERPILIH
                  </span>
                  <h4 className="text-lg font-extrabold text-white mt-0.5">{selectedRegion.name}</h4>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                    selectedRegion.risk === 'Tinggi'
                      ? 'bg-rose-900/70 text-rose-300 border border-rose-700'
                      : selectedRegion.risk === 'Sedang'
                      ? 'bg-amber-900/70 text-amber-300 border border-amber-700'
                      : 'bg-emerald-900/70 text-emerald-300 border border-emerald-700'
                  }`}>
                    Status: {selectedRegion.risk}
                  </span>
                </div>
              </div>

              {/* Geo Diagram Vector Canvas */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-center">
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div className="text-[11px] text-slate-400">Kasus Aktif Lab</div>
                  <div className="text-xl font-black text-rose-400 mt-1">{selectedRegion.activeCases}</div>
                  <div className="text-[10px] text-slate-500">Konfirmasi Terkini</div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div className="text-[11px] text-slate-400">Angka Reproduksi (R₀)</div>
                  <div className="text-xl font-black text-amber-400 mt-1">{selectedRegion.r0Value}</div>
                  <div className="text-[10px] text-slate-500">Transmisi Wilayah</div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div className="text-[11px] text-slate-400">Indeks Vektor (ABJ)</div>
                  <div className="text-xs font-bold text-cyan-300 mt-2 truncate">{selectedRegion.vectorIndex}</div>
                  <div className="text-[10px] text-slate-500">Target ≥ 95%</div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div className="text-[11px] text-slate-400">Faskes Terkoneksi</div>
                  <div className="text-xl font-black text-emerald-400 mt-1">{selectedRegion.faskesCount}</div>
                  <div className="text-[10px] text-slate-500">Puskesmas / Lab</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Fokus Utama:</strong> {selectedRegion.dominantIssue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Bar under map */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Protokol Respons Cepat Terpadu Kemenkes aktif
            </span>
            <button
              onClick={() => onNavigateToTab('pelayanan')}
              className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
            >
              Buka Antrean Spesimen Sektor Ini <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: EWARS Early Warning & Alert System (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Peringatan Dini Penyakit (EWARS)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Algoritma deteksi lonjakan kasus berdasar kode LOINC
                </p>
              </div>
              <span className="text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                Sistem Otomatis
              </span>
            </div>

            {/* List of Alerts */}
            <div className="space-y-3">
              {alerts.map((alrt) => (
                <div
                  key={alrt.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    alrt.severity === 'high'
                      ? 'bg-rose-50/60 border-rose-200 hover:border-rose-300'
                      : alrt.severity === 'medium'
                      ? 'bg-amber-50/60 border-amber-200 hover:border-amber-300'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{alrt.disease}</span>
                        <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">
                          LOINC: {alrt.loincCode}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>Wilayah: <strong>{alrt.region}</strong></span>
                        <span>•</span>
                        <span className="text-rose-600 font-semibold">{alrt.caseTrend} mgg ini</span>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
                      alrt.status === 'Peringatan Dini'
                        ? 'bg-rose-600 text-white'
                        : alrt.status === 'Investigasi Lapangan'
                        ? 'bg-amber-600 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}>
                      {alrt.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 mt-2 bg-white/80 p-2 rounded-lg border border-slate-200/60 leading-relaxed">
                    💡 <strong>Rekomendasi:</strong> {alrt.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Diperbarui tiap 5 menit via sinkronisasi faskes
            </span>
            <button
              onClick={() => onNavigateToTab('fhir')}
              className="text-emerald-700 hover:text-emerald-800 font-semibold text-xs inline-flex items-center gap-1"
            >
              Lihat Payload FHIR <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Laboratory Records Preview Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-600" />
              Spesimen Laboratorium Terkini (Lintas 3 Matriks)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar pemeriksaan laboratorium aktif di tingkat Puskesmas hingga Rujukan Nasional
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('pelayanan')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
          >
            Lihat Semua Antrean ({specimens.length}) →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Kode Spesimen</th>
                <th className="py-2.5 px-3">Kategori</th>
                <th className="py-2.5 px-3">Subjek / Sumber Sampel</th>
                <th className="py-2.5 px-3">Faskes Pengirim</th>
                <th className="py-2.5 px-3">Jenis Uji</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {specimens.slice(0, 5).map((specimen) => (
                <tr key={specimen.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-mono font-medium text-slate-900">
                    {specimen.specimenCode}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-medium text-[11px] ${
                      specimen.category === 'manusia'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : specimen.category === 'lingkungan'
                        ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {specimen.category === 'manusia' && <Users className="w-3 h-3" />}
                      {specimen.category === 'lingkungan' && <Droplet className="w-3 h-3" />}
                      {specimen.category === 'vektor' && <Bug className="w-3 h-3" />}
                      <span className="capitalize">{specimen.category}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{specimen.subjectName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{specimen.subjectIdentifier}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    <div>{specimen.originFacility}</div>
                    <div className="text-[10px] text-slate-400">{specimen.facilityLevel}</div>
                  </td>
                  <td className="py-3 px-3 max-w-[200px] truncate text-slate-700" title={specimen.testType}>
                    {specimen.testType}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      specimen.status === 'selesai'
                        ? 'bg-emerald-100 text-emerald-800'
                        : specimen.status === 'validasi'
                        ? 'bg-amber-100 text-amber-800'
                        : specimen.status === 'analisis'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {specimen.status === 'selesai' ? 'Terverifikasi' : specimen.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onSelectSpecimen(specimen)}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 px-2 py-1 rounded hover:bg-emerald-50 transition-colors"
                    >
                      Buka Rincian →
                    </button>
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
