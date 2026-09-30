import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Users, 
  Droplet, 
  Bug, 
  Check, 
  AlertCircle, 
  Building, 
  Clock,
  Sparkles
} from 'lucide-react';
import { SpecimenRecord, SpecimenCategory, TestParameter } from '../types';

interface NewSpecimenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSpecimen: (specimen: SpecimenRecord) => void;
  selectedFacility: string;
  currentUserName: string;
}

const TEST_PRESETS = {
  manusia: [
    {
      name: 'Panel Hematologi Rutin & Trombosit',
      parameters: [
        { id: 'p1', name: 'Hemoglobin (Hb)', loincCode: '718-7', value: 14.2, unit: 'g/dL', referenceRange: '13.0 - 17.5', status: 'normal' as const },
        { id: 'p2', name: 'Leukosit (WBC)', loincCode: '6690-2', value: 6500, unit: '/µL', referenceRange: '4,000 - 10,000', status: 'normal' as const },
        { id: 'p3', name: 'Trombosit (Platelet)', loincCode: '777-3', value: 240000, unit: '/µL', referenceRange: '150,000 - 450,000', status: 'normal' as const }
      ]
    },
    {
      name: 'Panel NS1 Demam Dengue / Chakra Reaktif',
      parameters: [
        { id: 'p4', name: 'Antigen Dengue NS1', loincCode: '68343-3', value: 'NON-REAKTIF', unit: 'Index', referenceRange: 'Non-Reaktif', status: 'normal' as const },
        { id: 'p5', name: 'Trombosit (Platelet)', loincCode: '777-3', value: 95000, unit: '/µL', referenceRange: '150,000 - 450,000', status: 'low' as const }
      ]
    },
    {
      name: 'Panel Skrining Glukosa & Profil Ginjal',
      parameters: [
        { id: 'p6', name: 'Glukosa Puasa', loincCode: '1558-6', value: 88, unit: 'mg/dL', referenceRange: '70 - 100', status: 'normal' as const },
        { id: 'p7', name: 'Serum Kreatinin', loincCode: '2160-0', value: 0.95, unit: 'mg/dL', referenceRange: '0.70 - 1.30', status: 'normal' as const }
      ]
    }
  ],
  lingkungan: [
    {
      name: 'Uji Mikrobiologi Air Minum (Permenkes)',
      parameters: [
        { id: 'pe1', name: 'Total Coliform', loincCode: '49765-1', value: 0, unit: 'CFU/100 mL', referenceRange: '0 (Maks 0)', status: 'normal' as const },
        { id: 'pe2', name: 'Escherichia coli', loincCode: '43409-2', value: 0, unit: 'CFU/100 mL', referenceRange: '0 (Bebas E. coli)', status: 'normal' as const },
        { id: 'pe3', name: 'Derajat Keasaman (pH)', loincCode: '2748-2', value: 7.4, unit: 'pH unit', referenceRange: '6.5 - 8.5', status: 'normal' as const }
      ]
    },
    {
      name: 'Pemantauan Indeks Kualitas Udara (PM2.5)',
      parameters: [
        { id: 'pe4', name: 'Particulate Matter (PM2.5)', loincCode: '64146-4', value: 18.5, unit: 'µg/m³', referenceRange: '< 55.0 (Baik)', status: 'normal' as const }
      ]
    }
  ],
  vektor: [
    {
      name: 'Survei Jentik Nyamuk Aedes (ABJ & Breteau)',
      parameters: [
        { id: 'pv1', name: 'Angka Bebas Jentik (ABJ)', loincCode: '8235-8', value: 92.5, unit: '%', referenceRange: '≥ 95.0 %', status: 'low' as const },
        { id: 'pv2', name: 'Breteau Index (BI)', loincCode: '8234-1', value: 15, unit: 'per 100 rumah', referenceRange: '< 20 (Aman)', status: 'normal' as const }
      ]
    },
    {
      name: 'Uji Kerentanan Insektisida Nyamuk Dewasa',
      parameters: [
        { id: 'pv3', name: 'Mortalitas Malathion 5%', loincCode: '74512-5', value: 'Rentan (99%)', unit: 'Kategori', referenceRange: 'Rentan (>98%)', status: 'normal' as const }
      ]
    }
  ]
};

export const NewSpecimenModal: React.FC<NewSpecimenModalProps> = ({
  isOpen,
  onClose,
  onAddSpecimen,
  selectedFacility,
  currentUserName
}) => {
  if (!isOpen) return null;

  const [category, setCategory] = useState<SpecimenCategory>('manusia');
  const [subjectName, setSubjectName] = useState('');
  const [subjectIdentifier, setSubjectIdentifier] = useState('');
  const [ageGender, setAgeGender] = useState('28 Th / L');
  const [urgency, setUrgency] = useState<'rutin' | 'cito' | 'surveilans'>('rutin');
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [notes, setNotes] = useState('');

  const currentPresets = TEST_PRESETS[category];
  const activePreset = currentPresets[selectedPresetIndex] || currentPresets[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName.trim()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newRecord: SpecimenRecord = {
      id: `spec-${Date.now()}`,
      specimenCode: `LAB-2026-KN-${randomSuffix}`,
      category,
      categoryLabel:
        category === 'manusia'
          ? 'Spesimen Manusia (Klinis)'
          : category === 'lingkungan'
          ? 'Spesimen Lingkungan (Air/Udara)'
          : 'Spesimen Vektor & Reservoir',
      subjectName,
      subjectIdentifier: subjectIdentifier || (category === 'manusia' ? `NIK-3201-KN-${randomSuffix}` : `LOC-${category.toUpperCase()}-${randomSuffix}`),
      ageGender: category === 'manusia' ? ageGender : undefined,
      originFacility: selectedFacility,
      facilityLevel: selectedFacility.includes('Rujukan')
        ? 'Lab Rujukan Nasional'
        : selectedFacility.includes('Regional')
        ? 'Labkesmas Regional'
        : selectedFacility.includes('RSUD')
        ? 'Labkesda'
        : 'Puskesmas',
      collectionDate: formattedDate,
      receivedDate: formattedDate,
      testType: activePreset.name,
      tests: activePreset.parameters.map(p => ({ ...p, id: `test-${Math.random()}` })),
      status: 'antrean',
      technicianName: currentUserName,
      urgency,
      surveillanceFlag: urgency === 'surveilans' ? 'Program Surveilans Rutin Labkesmas' : undefined,
      fhirSyncStatus: 'pending',
      notes: notes.trim() || undefined
    };

    onAddSpecimen(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Registrasi Spesimen Baru (SILK)
              </h2>
              <p className="text-xs text-slate-300">
                Pencatatan spesimen berstandar Labkesmas & kode LOINC
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* 1. Category Selection */}
          <div>
            <label className="font-bold text-slate-800 block mb-2">
              1. Pilih Matriks / Kategori Pemeriksaan:
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setCategory('manusia');
                  setSelectedPresetIndex(0);
                }}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  category === 'manusia'
                    ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500/20 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Users className="w-5 h-5 text-blue-600" />
                <span>Manusia (Klinis)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCategory('lingkungan');
                  setSelectedPresetIndex(0);
                }}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  category === 'lingkungan'
                    ? 'bg-cyan-50 border-cyan-500 text-cyan-900 ring-2 ring-cyan-500/20 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Droplet className="w-5 h-5 text-cyan-600" />
                <span>Lingkungan (Air/Udara)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCategory('vektor');
                  setSelectedPresetIndex(0);
                }}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  category === 'vektor'
                    ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-500/20 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Bug className="w-5 h-5 text-amber-600" />
                <span>Vektor & Reservoir</span>
              </button>
            </div>
          </div>

          {/* 2. Subject Demographics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                {category === 'manusia' ? 'Nama Pasien *' : 'Nama Titik / Lokasi Sampel *'}
              </label>
              <input
                type="text"
                required
                placeholder={category === 'manusia' ? 'Contoh: Shikamaru Nara' : 'Contoh: Mata Air Sektor Senju'}
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                {category === 'manusia' ? 'Nomor Induk Kependudukan (NIK)' : 'Kode Lokasi / GPS'}
              </label>
              <input
                type="text"
                placeholder={category === 'manusia' ? 'NIK-3201-KN-...' : 'LOC-WTR-...'}
                value={subjectIdentifier}
                onChange={(e) => setSubjectIdentifier(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {category === 'manusia' && (
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Umur & Jenis Kelamin
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 32 Th / L"
                  value={ageGender}
                  onChange={(e) => setAgeGender(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            )}

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Tingkat Urgensi Pemeriksaan
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="rutin">Rutin Pelayanan</option>
                <option value="cito">CITO (Darurat / Segera)</option>
                <option value="surveilans">Surveilans Penyakit Nasional</option>
              </select>
            </div>
          </div>

          {/* 3. Test Preset Selection */}
          <div>
            <label className="font-bold text-slate-800 block mb-2">
              2. Pilih Paket Uji Laboratorium Terstandar LOINC:
            </label>
            <div className="space-y-2">
              {currentPresets.map((preset, idx) => (
                <div
                  key={preset.name}
                  onClick={() => setSelectedPresetIndex(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedPresetIndex === idx
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-2xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold text-slate-900">
                    <span>{preset.name}</span>
                    {selectedPresetIndex === idx && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5 text-[11px]">
                    {preset.parameters.map((p) => (
                      <span key={p.name} className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-mono">
                        {p.name} ({p.loincCode})
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Notes */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Catatan Khusus / Riwayat Gejala / Kondisi Spesimen:
            </label>
            <textarea
              rows={2}
              placeholder="Catatan tambahan untuk analis lab atau dokter penanggung jawab..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Spesimen baru akan otomatis memiliki kode barcode unik, terdaftar di antrean Pra-Analitik, dan siap diteruskan ke gateway HL7 FHIR.
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs transition-colors inline-flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Daftarkan ke Sistem SILK</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
