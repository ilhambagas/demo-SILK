import React, { useState } from 'react';
import { 
  Code2, 
  Search, 
  Copy, 
  Check, 
  Send, 
  BookOpen, 
  Activity, 
  CheckCircle2, 
  Globe, 
  Database,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { SpecimenRecord } from '../types';
import { LOINC_DICTIONARY } from '../mockData';

interface FhirInteroperabilityProps {
  specimens: SpecimenRecord[];
}

export const FhirInteroperability: React.FC<FhirInteroperabilityProps> = ({ specimens }) => {
  const [selectedSpecimen, setSelectedSpecimen] = useState<SpecimenRecord>(specimens[0]);
  const [activeResourceType, setActiveResourceType] = useState<'DiagnosticReport' | 'Observation' | 'Specimen' | 'Bundle'>('DiagnosticReport');
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSimulatingSend, setIsSimulatingSend] = useState(false);
  const [sendLogs, setSendLogs] = useState<string[]>([]);

  // Generate real FHIR R4 compliant JSON
  const generateFhirJson = () => {
    if (!selectedSpecimen) return {};

    if (activeResourceType === 'DiagnosticReport') {
      return {
        resourceType: 'DiagnosticReport',
        id: selectedSpecimen.id,
        identifier: [
          {
            system: 'http://sys-ids.kemkes.kn/silk/report',
            value: selectedSpecimen.specimenCode
          }
        ],
        status: selectedSpecimen.status === 'selesai' ? 'final' : 'preliminary',
        category: [
          {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
                code: 'LAB',
                display: 'Laboratory'
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: selectedSpecimen.tests[0]?.loincCode || '11502-2',
              display: selectedSpecimen.testType
            }
          ],
          text: selectedSpecimen.testType
        },
        subject: {
          reference: `Patient/${selectedSpecimen.subjectIdentifier}`,
          display: selectedSpecimen.subjectName
        },
        effectiveDateTime: selectedSpecimen.collectionDate,
        issued: selectedSpecimen.validatedAt || selectedSpecimen.receivedDate,
        performer: [
          {
            reference: `Practitioner/${selectedSpecimen.technicianName.replace(/\s+/g, '-').toLowerCase()}`,
            display: selectedSpecimen.technicianName
          }
        ],
        result: selectedSpecimen.tests.map((t, idx) => ({
          reference: `Observation/${selectedSpecimen.id}-obs-${idx + 1}`,
          display: t.name
        }))
      };
    }

    if (activeResourceType === 'Observation') {
      const firstTest = selectedSpecimen.tests[0];
      return {
        resourceType: 'Observation',
        id: `${selectedSpecimen.id}-obs-1`,
        status: 'final',
        category: [
          {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/observation-category',
                code: 'laboratory',
                display: 'Laboratory'
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: firstTest?.loincCode || '718-7',
              display: firstTest?.name || 'Parameter'
            }
          ]
        },
        subject: {
          reference: `Patient/${selectedSpecimen.subjectIdentifier}`,
          display: selectedSpecimen.subjectName
        },
        valueQuantity: {
          value: firstTest?.value,
          unit: firstTest?.unit,
          system: 'http://unitsofmeasure.org'
        },
        referenceRange: [
          {
            text: firstTest?.referenceRange
          }
        ],
        interpretation: [
          {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
                code: firstTest?.status === 'critical' ? 'AA' : firstTest?.status === 'normal' ? 'N' : 'H',
                display: firstTest?.status
              }
            ]
          }
        ]
      };
    }

    if (activeResourceType === 'Specimen') {
      return {
        resourceType: 'Specimen',
        id: `specimen-${selectedSpecimen.id}`,
        identifier: [
          {
            system: 'http://sys-ids.kemkes.kn/silk/specimen',
            value: selectedSpecimen.specimenCode
          }
        ],
        type: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: selectedSpecimen.category === 'manusia' ? '119297000' : '11713004',
              display: selectedSpecimen.categoryLabel
            }
          ]
        },
        subject: {
          reference: `Patient/${selectedSpecimen.subjectIdentifier}`,
          display: selectedSpecimen.subjectName
        },
        collection: {
          collectedDateTime: selectedSpecimen.collectionDate,
          bodySite: {
            text: selectedSpecimen.category === 'manusia' ? 'Vena Mediana Cubiti' : 'Poin Reservoir Utama'
          }
        }
      };
    }

    // Bundle
    return {
      resourceType: 'Bundle',
      id: `bundle-${selectedSpecimen.id}`,
      type: 'transaction',
      timestamp: new Date().toISOString(),
      entry: [
        {
          fullUrl: `urn:uuid:report-${selectedSpecimen.id}`,
          resource: {
            resourceType: 'DiagnosticReport',
            status: 'final',
            code: { text: selectedSpecimen.testType }
          },
          request: { method: 'POST', url: 'DiagnosticReport' }
        },
        ...selectedSpecimen.tests.map((t, idx) => ({
          fullUrl: `urn:uuid:obs-${idx}`,
          resource: {
            resourceType: 'Observation',
            code: { coding: [{ system: 'http://loinc.org', code: t.loincCode }] },
            valueString: String(t.value)
          },
          request: { method: 'POST', url: 'Observation' }
        }))
      ]
    };
  };

  const fhirPayloadString = JSON.stringify(generateFhirJson(), null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(fhirPayloadString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateSync = () => {
    setIsSimulatingSend(true);
    setSendLogs([`[${new Date().toLocaleTimeString()}] Menghubungkan ke gateway https://api-satusehat.kemkes.kn/fhir-r4/v1...`]);

    setTimeout(() => {
      setSendLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Memvalidasi Schema HL7 FHIR Profile Labkesmas Konoha v2.6: VALID (0 errors)`]);
    }, 600);

    setTimeout(() => {
      setSendLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Mengirim HTTP POST /Bundle (Payload size: ${(fhirPayloadString.length / 1024).toFixed(2)} KB)...`]);
    }, 1200);

    setTimeout(() => {
      setSendLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Response 201 Created: ID DiagnosticReport/${selectedSpecimen.specimenCode} berhasil disimpan dan disinkronkan ke server pusat!`]);
      setIsSimulatingSend(false);
    }, 1900);
  };

  const filteredLoinc = LOINC_DICTIONARY.filter(item => 
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.indonesianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.system.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-600" />
              Interoperabilitas Standar HL7 FHIR & Kamus LOINC
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Standar integrasi data laboratorium internasional yang menghubungkan faskes Konoha dengan SatuSehat Nasional
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              FHIR R4 Compliant
            </span>
            <span className="bg-cyan-50 text-cyan-800 font-semibold px-2.5 py-1 rounded-lg border border-cyan-200 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-cyan-600" />
              LOINC v2.76
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: FHIR Payload Generator & LOINC Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live FHIR JSON Resource Viewer (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  Inspektor Resource HL7 FHIR (Live Payload)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Data JSON aktual yang ditransmisikan antar faskes berjenjang
                </p>
              </div>

              {/* Specimen Selector */}
              <select
                value={selectedSpecimen.id}
                onChange={(e) => {
                  const found = specimens.find(s => s.id === e.target.value);
                  if (found) setSelectedSpecimen(found);
                }}
                className="text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 max-w-[200px]"
              >
                {specimens.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.specimenCode} - {s.subjectName}
                  </option>
                ))}
              </select>
            </div>

            {/* Resource Type Switcher */}
            <div className="flex flex-wrap gap-1.5 mb-3 text-xs">
              {(['DiagnosticReport', 'Observation', 'Specimen', 'Bundle'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveResourceType(type)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    activeResourceType === type
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div className="relative">
              <pre className="bg-slate-950 text-emerald-400 p-4 rounded-xl text-[11px] font-mono overflow-x-auto max-h-[360px] border border-slate-800 leading-relaxed shadow-inner">
                <code>{fhirPayloadString}</code>
              </pre>

              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 bg-slate-800/80 hover:bg-slate-700 text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1 border border-slate-700 transition-colors"
                title="Salin JSON"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin JSON</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sync Trigger and Terminal Logs */}
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Gateway Transmisi SatuSehat Labkesmas:</span>
              <button
                onClick={handleSimulateSync}
                disabled={isSimulatingSend}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSimulatingSend ? 'Mengirim Data...' : 'Kirim Uji Gateway FHIR'}</span>
              </button>
            </div>

            {sendLogs.length > 0 && (
              <div className="bg-slate-900 text-slate-200 p-3 rounded-lg text-[10px] font-mono space-y-1 border border-slate-800 max-h-32 overflow-y-auto">
                {sendLogs.map((log, i) => (
                  <div key={i} className="text-emerald-300">{log}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: LOINC & SNOMED CT Master Catalog (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  Katalog Kode Medis LOINC Terstandar
                </h3>
                <p className="text-[11px] text-slate-500">
                  Kamus terminologi acuan Kementerian Kesehatan Konoha
                </p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari kode LOINC, nama tes (Hb, Coliform, PCR)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Dictionary List */}
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {filteredLoinc.map((item) => (
                <div
                  key={item.code}
                  className="p-3 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-slate-50/60 transition-all text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900">{item.indonesianName}</div>
                      <div className="text-[11px] text-slate-500">{item.component}</div>
                    </div>
                    <span className="font-mono text-[11px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                      {item.code}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                    <div>
                      Sistem / Sampel: <strong className="text-slate-700">{item.system}</strong>
                    </div>
                    <div>
                      Metode: <strong className="text-slate-700">{item.methodType}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Standar Regran: Regenstrief Institute / LOINC®</span>
            <span className="text-emerald-700 font-semibold">{filteredLoinc.length} Kode Aktif</span>
          </div>
        </div>
      </div>
    </div>
  );
};
