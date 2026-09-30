import React, { useState } from 'react';
import { 
  Network, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Thermometer, 
  Truck, 
  Layers
} from 'lucide-react';
import { NETWORK_FACILITIES } from '../mockData';
import { FacilityNode } from '../types';

export const LabNetwork: React.FC = () => {
  const [facilities, setFacilities] = useState<FacilityNode[]>(NETWORK_FACILITIES);
  const [selectedFacility, setSelectedFacility] = useState<FacilityNode>(NETWORK_FACILITIES[0]);

  const totalSpecimens = facilities.reduce((sum, f) => sum + f.activeSpecimens, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Network className="w-5 h-5 text-emerald-600" />
              Jaringan Terintegrasi Laboratorium Kesehatan Masyarakat (Labkesmas)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Struktur jejaring rujukan berjenjang 4 tingkat di bawah koordinasi Kementerian Kesehatan Republik Konoha
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-200">
              {facilities.length} Fasilitas Terdaftar
            </span>
            <span className="bg-emerald-50 text-emerald-800 font-semibold px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Satu Jaringan Terpusat
            </span>
          </div>
        </div>
      </div>

      {/* 4-Tier Hierarchy Blueprint */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Tier 1 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-800">Tingkat 1</span>
            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">Puskesmas</span>
          </div>
          <div className="text-xs font-semibold text-slate-900 mb-1">
            Pelayanan Primer & Lapangan
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Skrining penyakit menular cepat, hematologi dasar, pemantauan jentik (ABJ), dan sanitasi lingkungan desa.
          </p>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-mono text-emerald-700 font-medium">
            Koneksi: Dial-up/Fiber Optic SILK
          </div>
        </div>

        {/* Tier 2 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-800">Tingkat 2</span>
            <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded text-[10px] font-bold">Labkesda Kab/Kota</span>
          </div>
          <div className="text-xs font-semibold text-slate-900 mb-1">
            Laboratorium Publik Daerah
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Kimia klinik terstandar, mikrobiologi air minum kabupaten, uji resistensi vektor, dan rujukan Puskesmas.
          </p>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-mono text-emerald-700 font-medium">
            Koneksi: VPN Dedicated Kemenkes
          </div>
        </div>

        {/* Tier 3 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-800">Tingkat 3</span>
            <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Labkesmas Regional</span>
          </div>
          <div className="text-xs font-semibold text-slate-900 mb-1">
            Balai Regional Pengendalian
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Virologi, uji molekuler PCR patogen, surveilans entomologi regional, dan pemantauan polutan udara ambien.
          </p>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-mono text-emerald-700 font-medium">
            Koneksi: Dedicated Redundant Hub
          </div>
        </div>

        {/* Tier 4 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-800">Tingkat 4</span>
            <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-[10px] font-bold">Rujukan Nasional</span>
          </div>
          <div className="text-xs font-semibold text-slate-900 mb-1">
            Pusat Surveilans & Genomik
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Whole Genome Sequencing (WGS), kalibrasi standar uji nasional, investigasi KLB luar biasa & patogen baru.
          </p>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-mono text-emerald-700 font-medium">
            Koneksi: National Data Center (Pusdatin)
          </div>
        </div>
      </div>

      {/* Facilities List & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Facilities Roster (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Node Faskes Terdaftar ({facilities.length})</h3>
              <p className="text-[11px] text-slate-500">Pilih faskes untuk meninjau status telemetri dan integrasi</p>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Total Beban Aktif: <strong>{totalSpecimens} spesimen</strong>
            </span>
          </div>

          <div className="space-y-3">
            {facilities.map((fac) => {
              const isSelected = selectedFacility.id === fac.id;
              return (
                <div
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-xs ring-1 ring-emerald-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">{fac.name}</span>
                        <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                          {fac.code}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">{fac.level} • {fac.region}</div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      fac.status === 'online'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${fac.status === 'online' ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                      {fac.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                    <div>
                      Spesimen Aktif: <strong className="text-slate-900">{fac.activeSpecimens}</strong>
                    </div>
                    <div>
                      Tingkat Sinkron: <strong className="text-emerald-700">{fac.syncRate}%</strong>
                    </div>
                    <div className="text-right text-slate-400 font-mono text-[10px]">
                      {fac.lastSync}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Node Telemetry & Referral Cold-Chain Management (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-wider font-bold">
                  TELEMETRI SIMULASI NODE
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                  {selectedFacility.name}
                </h3>
              </div>
              <div className="p-2 bg-slate-100 rounded-xl text-slate-700">
                <Building2 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>

            {/* Specimen Referral Pipeline */}
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-800 flex items-center justify-between">
                  <span>Protokol Rujukan Spesimen Berjenjang</span>
                  <Truck className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Spesimen yang memerlukan pengujian lanjutan (seperti PCR konfirmasi viral atau isolasi bakteri khusus) otomatis dialihkan ke fasilitas setingkat lebih tinggi dengan penjagaan rantai dingin (cold-chain).
                </p>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200 font-medium">
                  <span className="flex items-center gap-1 text-slate-700">
                    <Thermometer className="w-3.5 h-3.5 text-blue-600" /> Suhu Pengiriman: <strong>2°C - 8°C</strong>
                  </span>
                  <span className="text-emerald-700 font-bold">Status: Valid</span>
                </div>
              </div>

              {/* Network Health Stats */}
              <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-emerald-400">
                  <span>IP Jaringan: {selectedFacility.ipAddress}</span>
                  <span>Port: 3000 (SILK Core)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Enkripsi Data:</span>
                  <span className="text-white font-bold">TLS 1.3 / AES-256-GCM</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Format Payload:</span>
                  <span className="text-white font-bold">HL7 FHIR JSON Bundle</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Checksum Integritas:</span>
                  <span className="text-emerald-400 text-[10px]">SHA-256 OK</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Sesuai standar operasional ISO 15189</span>
            <span className="text-emerald-700 font-semibold">Tersinkronisasi</span>
          </div>
        </div>
      </div>
    </div>
  );
};
