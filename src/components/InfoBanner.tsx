import React, { useState } from 'react';
import { Info, X, CheckCircle2, Shield, Layers, FileCheck } from 'lucide-react';

export const InfoBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        <button
          onClick={() => setIsOpen(true)}
          className="text-xs text-emerald-800 hover:text-emerald-950 font-medium inline-flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 transition-colors"
        >
          <Info className="w-3.5 h-3.5 text-emerald-600" />
          Lihat Profil & Misi Sistem SILK Kemenkes Konoha
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-emerald-800/60 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-start justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-300 mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Sistem Informasi Laboratorium Konoha (SILK)
                </h2>
                <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Kemenkes Konoha
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-4xl">
                Platform digital terpusat yang diluncurkan oleh Kementerian Kesehatan Konoha untuk mengintegrasikan data laboratorium kesehatan masyarakat (Labkesmas) secara berjenjang dari tingkat Puskesmas hingga Laboratorium Rujukan Nasional. Mempercepat pelaporan surveilans penyakit real-time, memenuhi regulasi privasi ISO 27001, serta menerapkan standar internasional HL7 FHIR, LOINC, dan SNOMED CT.
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-emerald-800/60 text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>3 Matriks Pemeriksaan:</strong> Manusia, Lingkungan & Vektor</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-teal-400 shrink-0" />
                  <span><strong>Standar Dunia:</strong> FHIR R4, LOINC & SNOMED CT</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Keamanan Nasional:</strong> Kepatuhan Audit ISO 27001</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-emerald-300/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            title="Tutup Ringkasan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
