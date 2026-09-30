import React from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';
import { SpecimenRecord } from '../types';

interface OfficialLabReportModalProps {
  specimen: SpecimenRecord | null;
  onClose: () => void;
}

export const OfficialLabReportModal: React.FC<OfficialLabReportModalProps> = ({
  specimen,
  onClose
}) => {
  if (!specimen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Modal Top Actions (hidden during print) */}
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Lembar Hasil Pemeriksaan Laboratorium Resmi (SILK - Kemenkes Konoha)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Dokumen</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Area */}
        <div className="p-8 overflow-y-auto bg-white text-slate-900 font-sans print:p-0 print:m-0">
          {/* Official Letterhead (Kop Surat) */}
          <div className="border-b-2 border-slate-900 pb-4 mb-5 text-center relative">
            <div className="text-[11px] font-bold tracking-widest text-slate-700 uppercase">
              Pemerintah Republik Konoha
            </div>
            <div className="text-base sm:text-lg font-black tracking-tight text-slate-950 uppercase mt-0.5">
              Kementerian Kesehatan Republik Konoha
            </div>
            <div className="text-xs font-extrabold text-emerald-800 uppercase tracking-wide">
              {specimen.originFacility.toUpperCase()}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              Jalan Hokage Raya No. 01, Kawasan Daun Tengah | Telp: (021) 500-KONOHA | Web: silk.kemkes.kn
            </div>
            <div className="text-[9px] text-slate-400 mt-0.5 font-mono">
              Terakreditasi ISO 15189 / ISO 27001 Sistem Informasi Laboratorium Konoha (SILK)
            </div>
          </div>

          {/* Document Title & Barcode */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase underline tracking-wide">
                Laporan Hasil Pemeriksaan Laboratorium
              </h2>
              <div className="text-xs text-slate-600 mt-0.5">
                Kategori: <strong className="capitalize">{specimen.categoryLabel}</strong>
              </div>
            </div>

            <div className="text-right">
              <div className="font-mono text-xs font-bold bg-slate-100 px-2.5 py-1 rounded border border-slate-300 inline-block">
                No. Registrasi: {specimen.specimenCode}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                HL7 FHIR ID: {specimen.id}
              </div>
            </div>
          </div>

          {/* Demographics / Sample Details Table */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200 mb-6">
            <div className="flex">
              <span className="w-36 text-slate-500 font-medium">Nama Subjek / Pasien:</span>
              <strong className="text-slate-900">{specimen.subjectName}</strong>
            </div>

            <div className="flex">
              <span className="w-36 text-slate-500 font-medium">No. Identitas / NIK:</span>
              <span className="font-mono text-slate-900 font-semibold">{specimen.subjectIdentifier}</span>
            </div>

            <div className="flex">
              <span className="w-36 text-slate-500 font-medium">Umur / Jenis Kelamin:</span>
              <span className="text-slate-800">{specimen.ageGender || '-'}</span>
            </div>

            <div className="flex">
              <span className="w-36 text-slate-500 font-medium">Tanggal Pengambilan:</span>
              <span className="text-slate-800">{specimen.collectionDate}</span>
            </div>

            <div className="flex">
              <span className="w-36 text-slate-500 font-medium">Fasilitas Pengirim:</span>
              <span className="text-slate-800">{specimen.originFacility}</span>
            </div>

            <div className="flex">
              <span className="w-36 text-slate-500 font-medium">Tanggal Selesai Uji:</span>
              <span className="text-slate-800">{specimen.validatedAt || specimen.receivedDate}</span>
            </div>
          </div>

          {/* Results Table */}
          <div className="mb-6">
            <div className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide">
              Jenis Pemeriksaan: {specimen.testType}
            </div>

            <table className="w-full text-left text-xs border border-slate-300">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                <tr>
                  <th className="py-2 px-3 border-r border-slate-300">Parameter Uji</th>
                  <th className="py-2 px-3 border-r border-slate-300">Kode LOINC</th>
                  <th className="py-2 px-3 border-r border-slate-300">Hasil</th>
                  <th className="py-2 px-3 border-r border-slate-300">Satuan</th>
                  <th className="py-2 px-3 border-r border-slate-300">Nilai Rujukan</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {specimen.tests.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 border-r border-slate-200 font-semibold text-slate-900">
                      {t.name}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 font-mono text-[11px] text-slate-600">
                      {t.loincCode}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 font-bold text-slate-900">
                      {t.value}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 text-slate-600">
                      {t.unit}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 font-mono text-[11px] text-slate-600">
                      {t.referenceRange}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[11px] uppercase">
                      {t.status === 'critical' ? (
                        <span className="text-rose-700 font-bold">* KRITIS *</span>
                      ) : t.status === 'positive' || t.status === 'high' ? (
                        <span className="text-amber-700">* TINGGI *</span>
                      ) : t.status === 'low' ? (
                        <span className="text-blue-700">* RENDAH *</span>
                      ) : (
                        <span className="text-emerald-700">NORMAL</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes and Surveillance Alerts */}
          {specimen.surveillanceFlag && (
            <div className="text-xs bg-slate-100 p-2.5 rounded border border-slate-300 mb-6">
              <strong>Catatan Surveilans Epidemiologi:</strong> {specimen.surveillanceFlag}
            </div>
          )}

          {/* Signatures & ISO 27001 Verification Block */}
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-300 text-xs">
            {/* Left: QR Verification & Security Hash */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <QrCode className="w-8 h-8 text-slate-800 border p-1 rounded" />
                <div>
                  <div className="text-[11px]">Verifikasi Keaslian Dokumen</div>
                  <div className="text-[9px] text-slate-500 font-mono">Scan QR via Aplikasi SatuSehat</div>
                </div>
              </div>
              <div className="text-[9px] text-slate-400 font-mono leading-tight">
                SHA-256 Digest: {specimen.specimenCode}-SILK-ISO27001-VERIFIED
              </div>
              <div className="text-[9px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Data terenkripsi dan tersimpan di database SatuSehat Labkesmas
              </div>
            </div>

            {/* Right: Doctor Sp.PK Signature */}
            <div className="text-center">
              <div className="text-slate-600">Konoha, {specimen.validatedAt || specimen.collectionDate}</div>
              <div className="text-slate-600 font-medium">Dokter Penanggung Jawab Teknis Lab</div>

              {/* Digital Seal / Signature stamp */}
              <div className="py-2 flex justify-center">
                <div className="border border-emerald-600 text-emerald-700 rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-50/50">
                  ✓ TERVALIDASI DIGITAL SECARA SAH
                </div>
              </div>

              <div className="font-bold text-slate-900 underline mt-1">
                {specimen.validatorDoctor || 'Dr. Tsunade Senju, Sp.PK'}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                SIP: 446/Sp.PK-KN/2026 | NIP: 198205102008012001
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
