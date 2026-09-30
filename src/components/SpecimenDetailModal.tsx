import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Send, 
  ShieldCheck, 
  FileCheck2, 
  AlertTriangle, 
  UserCheck, 
  Activity,
  Layers,
  Edit2,
  Save,
  Check
} from 'lucide-react';
import { SpecimenRecord, TestParameter } from '../types';

interface SpecimenDetailModalProps {
  specimen: SpecimenRecord | null;
  onClose: () => void;
  onUpdateSpecimen: (updated: SpecimenRecord) => void;
  onPrintReport: (specimen: SpecimenRecord) => void;
  currentUser: { name: string; role: string; level: string };
}

export const SpecimenDetailModal: React.FC<SpecimenDetailModalProps> = ({
  specimen,
  onClose,
  onUpdateSpecimen,
  onPrintReport,
  currentUser
}) => {
  if (!specimen) return null;

  const [activeTab, setActiveTab] = useState<'parameter' | 'informasi' | 'fhir'>('parameter');
  const [testParameters, setTestParameters] = useState<TestParameter[]>(specimen.tests);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const handleEditClick = (param: TestParameter) => {
    setEditingId(param.id);
    setTempValue(String(param.value));
  };

  const handleSaveParam = (paramId: string) => {
    const updatedTests = testParameters.map(p => {
      if (p.id === paramId) {
        let status = p.status;
        const numVal = parseFloat(tempValue);
        if (!isNaN(numVal)) {
          if (p.name.includes('Trombosit') && numVal < 100000) status = 'critical';
          else if (p.name.includes('Leukosit') && numVal < 4000) status = 'low';
          else if (p.name.includes('Coliform') && numVal > 0) status = 'high';
          else status = 'normal';
        }
        return { ...p, value: tempValue, status };
      }
      return p;
    });

    setTestParameters(updatedTests);
    setEditingId(null);
    onUpdateSpecimen({
      ...specimen,
      tests: updatedTests,
      status: specimen.status === 'antrean' ? 'analisis' : specimen.status
    });
  };

  const handleForwardToValidation = () => {
    onUpdateSpecimen({
      ...specimen,
      tests: testParameters,
      status: 'validasi'
    });
  };

  const handleDoctorValidate = () => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    onUpdateSpecimen({
      ...specimen,
      tests: testParameters,
      status: 'selesai',
      validatorDoctor: currentUser.name,
      validatedAt: now,
      fhirSyncStatus: 'synced'
    });
  };

  const handlePushFhir = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      onUpdateSpecimen({
        ...specimen,
        fhirSyncStatus: 'synced'
      });
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  {specimen.specimenCode}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {specimen.categoryLabel}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {specimen.subjectName} ({specimen.subjectIdentifier})
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Stepper */}
        <div className="bg-slate-50 px-5 sm:px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-semibold text-slate-600">Alur Spesimen:</span>
            <div className="flex items-center gap-1.5 font-medium">
              <span className={`px-2 py-0.5 rounded ${specimen.status === 'antrean' ? 'bg-slate-900 text-white font-bold' : 'text-slate-500'}`}>
                1. Registrasi
              </span>
              <span>→</span>
              <span className={`px-2 py-0.5 rounded ${specimen.status === 'analisis' ? 'bg-blue-600 text-white font-bold' : 'text-slate-500'}`}>
                2. Pengujian
              </span>
              <span>→</span>
              <span className={`px-2 py-0.5 rounded ${specimen.status === 'validasi' ? 'bg-amber-600 text-white font-bold' : 'text-slate-500'}`}>
                3. Validasi Medis
              </span>
              <span>→</span>
              <span className={`px-2 py-0.5 rounded ${specimen.status === 'selesai' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-500'}`}>
                4. Terverifikasi
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPrintReport(specimen)}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 font-semibold shadow-2xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Hasil Lab</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <div className="text-slate-400 font-medium">Fasilitas Pengirim</div>
              <div className="font-bold text-slate-800 mt-0.5">{specimen.originFacility}</div>
              <div className="text-[10px] text-slate-500">{specimen.facilityLevel}</div>
            </div>

            <div>
              <div className="text-slate-400 font-medium">Waktu Pengambilan / Terima</div>
              <div className="font-bold text-slate-800 mt-0.5">{specimen.collectionDate}</div>
              <div className="text-[10px] text-slate-500">Terima: {specimen.receivedDate}</div>
            </div>

            <div>
              <div className="text-slate-400 font-medium">ATLM Penanggung Jawab</div>
              <div className="font-bold text-slate-800 mt-0.5">{specimen.technicianName}</div>
              <div className="text-[10px] text-emerald-600 font-medium">SIP Terverifikasi</div>
            </div>

            <div>
              <div className="text-slate-400 font-medium">Dokter Sp.PK Validasi</div>
              <div className="font-bold text-slate-800 mt-0.5">
                {specimen.validatorDoctor || <span className="text-amber-600 italic">Belum divalidasi</span>}
              </div>
              {specimen.validatedAt && (
                <div className="text-[10px] text-slate-500">{specimen.validatedAt}</div>
              )}
            </div>
          </div>

          {specimen.notes && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
              <strong>Catatan Klinis / Lokasi Pengambilan:</strong> {specimen.notes}
            </div>
          )}

          {/* Test Parameters Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  Parameter Hasil Uji Laboratorium ({testParameters.length})
                </h3>
                <p className="text-[11px] text-slate-500">
                  Terstandarisasi dengan kode LOINC (Logical Observation Identifiers Names and Codes)
                </p>
              </div>

              <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Urgensi: <strong className="uppercase">{specimen.urgency}</strong>
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Nama Pemeriksaan & Kode LOINC</th>
                    <th className="py-2.5 px-3">Hasil Uji</th>
                    <th className="py-2.5 px-3">Satuan</th>
                    <th className="py-2.5 px-3">Nilai Rujukan Standar</th>
                    <th className="py-2.5 px-3">Status / Flag</th>
                    <th className="py-2.5 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {testParameters.map((param) => {
                    const isEditing = editingId === param.id;
                    return (
                      <tr key={param.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{param.name}</div>
                          <div className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded inline-block mt-0.5 border border-emerald-200">
                            LOINC: {param.loincCode}
                          </div>
                          {param.notes && (
                            <div className="text-[10px] text-slate-500 italic mt-0.5">
                              {param.notes}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-3 font-semibold text-slate-900">
                          {isEditing ? (
                            <div className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                className="w-24 px-2 py-1 text-xs border border-emerald-500 rounded focus:ring-1 focus:ring-emerald-500"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveParam(param.id)}
                                className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-sm">{param.value}</span>
                          )}
                        </td>

                        <td className="py-3 px-3 text-slate-500">{param.unit}</td>

                        <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                          {param.referenceRange}
                        </td>

                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            param.status === 'critical'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : param.status === 'positive' || param.status === 'high'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : param.status === 'low'
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}>
                            {param.status}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-right">
                          {!isEditing && (
                            <button
                              onClick={() => handleEditClick(param)}
                              className="text-slate-400 hover:text-emerald-700 p-1 rounded hover:bg-slate-100 transition-colors"
                              title="Ubah nilai hasil"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* FHIR SatuSehat Sync Status */}
          <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold flex items-center gap-2">
                  <span>HL7 FHIR R4 Bundle Gateway</span>
                  <span className={`text-[10px] px-2 py-0.2 rounded font-mono ${
                    specimen.fhirSyncStatus === 'synced' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {specimen.fhirSyncStatus === 'synced' ? 'Tersinkronisasi Kemenkes' : 'Menunggu Transmisi'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Resource: DiagnosticReport/{specimen.specimenCode} & {testParameters.length} Observations
                </div>
              </div>
            </div>

            <button
              onClick={handlePushFhir}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              {isSyncing ? (
                <span>Mengirim HL7 Bundle...</span>
              ) : syncSuccess ? (
                <span className="flex items-center gap-1 text-emerald-200">
                  <Check className="w-3.5 h-3.5" /> Berhasil Kirim!
                </span>
              ) : (
                <span>Kirim Ulang ke SatuSehat</span>
              )}
            </button>
          </div>
        </div>

        {/* Modal Footer: Action Bar depending on user role and specimen status */}
        <div className="bg-slate-50 px-5 sm:px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-500">
            Peran Anda: <strong>{currentUser.name}</strong> ({currentUser.role})
          </div>

          <div className="flex items-center gap-2">
            {specimen.status === 'analisis' && (
              <button
                onClick={handleForwardToValidation}
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Kirim ke Dokter untuk Validasi</span>
              </button>
            )}

            {specimen.status === 'validasi' && (
              <button
                onClick={handleDoctorValidate}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Tandatangani & Validasi Resmi (Sp.PK)</span>
              </button>
            )}

            {specimen.status === 'selesai' && (
              <span className="inline-flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Spesimen ini telah sah dan terverifikasi medis
              </span>
            )}

            <button
              onClick={onClose}
              className="bg-white hover:bg-slate-100 text-slate-700 font-medium px-4 py-2 rounded-xl border border-slate-200 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
