import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { InfoBanner } from './components/InfoBanner';
import { DashboardSurveillance } from './components/DashboardSurveillance';
import { LabOperations } from './components/LabOperations';
import { LabNetwork } from './components/LabNetwork';
import { FhirInteroperability } from './components/FhirInteroperability';
import { AuditTrail } from './components/AuditTrail';
import { SpecimenDetailModal } from './components/SpecimenDetailModal';
import { NewSpecimenModal } from './components/NewSpecimenModal';
import { OfficialLabReportModal } from './components/OfficialLabReportModal';
import { INITIAL_SPECIMENS, SURVEILLANCE_ALERTS } from './mockData';
import { SpecimenRecord, SurveillanceAlert } from './types';
import { ShieldCheck, HeartPulse, Building2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'surveilans' | 'pelayanan' | 'jaringan' | 'fhir' | 'audit'>('surveilans');
  const [specimens, setSpecimens] = useState<SpecimenRecord[]>(INITIAL_SPECIMENS);
  const [alerts, setAlerts] = useState<SurveillanceAlert[]>(SURVEILLANCE_ALERTS);

  const [selectedFacility, setSelectedFacility] = useState<string>(
    'Laboratorium Rujukan Nasional Konoha (Tingkat 4)'
  );

  const [currentUser, setCurrentUser] = useState<{ name: string; role: string; level: string }>({
    name: 'Dr. Tsunade Senju, Sp.PK',
    role: 'Dokter Penanggung Jawab Lab / Validator',
    level: 'Lab Rujukan Nasional'
  });

  const [selectedSpecimenForDetail, setSelectedSpecimenForDetail] = useState<SpecimenRecord | null>(null);
  const [selectedSpecimenForPrint, setSelectedSpecimenForPrint] = useState<SpecimenRecord | null>(null);
  const [isNewSpecimenOpen, setIsNewSpecimenOpen] = useState(false);

  const handleAddSpecimen = (newSpecimen: SpecimenRecord) => {
    setSpecimens([newSpecimen, ...specimens]);
    setSelectedSpecimenForDetail(newSpecimen);
  };

  const handleUpdateSpecimen = (updated: SpecimenRecord) => {
    setSpecimens(prev => prev.map(s => (s.id === updated.id ? updated : s)));
    setSelectedSpecimenForDetail(updated);
  };

  const pendingCount = specimens.filter(s => s.status === 'validasi').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedFacility={selectedFacility}
        setSelectedFacility={setSelectedFacility}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onOpenNewSpecimen={() => setIsNewSpecimenOpen(true)}
        pendingCount={pendingCount}
      />

      {/* Overview Banner */}
      <InfoBanner />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {activeTab === 'surveilans' && (
          <DashboardSurveillance
            specimens={specimens}
            alerts={alerts}
            onSelectSpecimen={(spec) => setSelectedSpecimenForDetail(spec)}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'pelayanan' && (
          <LabOperations
            specimens={specimens}
            onSelectSpecimen={(spec) => setSelectedSpecimenForDetail(spec)}
            onOpenNewSpecimen={() => setIsNewSpecimenOpen(true)}
            onPrintReport={(spec) => setSelectedSpecimenForPrint(spec)}
          />
        )}

        {activeTab === 'jaringan' && <LabNetwork />}

        {activeTab === 'fhir' && <FhirInteroperability specimens={specimens} />}

        {activeTab === 'audit' && <AuditTrail />}
      </main>

      {/* Modals */}
      <SpecimenDetailModal
        specimen={selectedSpecimenForDetail}
        onClose={() => setSelectedSpecimenForDetail(null)}
        onUpdateSpecimen={handleUpdateSpecimen}
        onPrintReport={(spec) => {
          setSelectedSpecimenForDetail(null);
          setSelectedSpecimenForPrint(spec);
        }}
        currentUser={currentUser}
      />

      <NewSpecimenModal
        isOpen={isNewSpecimenOpen}
        onClose={() => setIsNewSpecimenOpen(false)}
        onAddSpecimen={handleAddSpecimen}
        selectedFacility={selectedFacility}
        currentUserName={currentUser.name}
      />

      <OfficialLabReportModal
        specimen={selectedSpecimenForPrint}
        onClose={() => setSelectedSpecimenForPrint(null)}
      />

      {/* Official Government Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white tracking-wide">
                SILK - Sistem Informasi Laboratorium Konoha
              </div>
              <div className="text-[11px] text-slate-500">
                Kementerian Kesehatan Republik Konoha • Direktorat Jenderal Pelayanan Kesehatan
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> ISO 27001:2022 Certified
            </span>
            <span>HL7 FHIR R4 Specification</span>
            <span>LOINC® Standard Terminology</span>
            <span>© 2026 Kemenkes Konoha</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
