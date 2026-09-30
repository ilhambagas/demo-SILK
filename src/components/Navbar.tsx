import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Activity, 
  FileText, 
  Network, 
  Code2, 
  UserCheck, 
  PlusCircle, 
  RefreshCw,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'surveilans' | 'pelayanan' | 'jaringan' | 'fhir' | 'audit';
  setActiveTab: (tab: 'surveilans' | 'pelayanan' | 'jaringan' | 'fhir' | 'audit') => void;
  selectedFacility: string;
  setSelectedFacility: (fac: string) => void;
  currentUser: { name: string; role: string; level: string };
  setCurrentUser: (user: { name: string; role: string; level: string }) => void;
  onOpenNewSpecimen: () => void;
  pendingCount: number;
}

const AVAILABLE_USERS = [
  { name: 'Dr. Tsunade Senju, Sp.PK', role: 'Dokter Penanggung Jawab Lab / Validator', level: 'Lab Rujukan Nasional' },
  { name: 'Shizune Katou, S.Tr.Kes', role: 'Ahli Teknologi Laboratorium Medik (ATLM)', level: 'Puskesmas Konoha Selatan' },
  { name: 'Sakura Uchiha, S.Si', role: 'Petugas Surveilans Epidemiologi Kemenkes', level: 'Kemenkes Konoha Pusat' },
  { name: 'Inoichi Yamanaka, A.Md.AK', role: 'Analis Lab Lingkungan & Vektor', level: 'Labkesda Sektor Timur' }
];

const AVAILABLE_FACILITIES = [
  'Laboratorium Rujukan Nasional Konoha (Tingkat 4)',
  'Balai Labkesmas Regional Wilayah Timur (Tingkat 3)',
  'RSUD Konoha / Labkesda Kota Pusat (Tingkat 2)',
  'Puskesmas Konoha Selatan (Tingkat 1)'
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedFacility,
  setSelectedFacility,
  currentUser,
  setCurrentUser,
  onOpenNewSpecimen,
  pendingCount
}) => {
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showFacilityMenu, setShowFacilityMenu] = React.useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Ministry Banner */}
      <div className="bg-emerald-900 text-emerald-100 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center gap-1.5 font-semibold text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            KEMENTERIAN KESEHATAN REPUBLIK KONOHA
          </span>
          <span className="hidden sm:inline text-emerald-300">|</span>
          <span className="hidden sm:inline text-emerald-200">
            Direktorat Jenderal Pelayanan Kesehatan & Pengendalian Penyakit (P2P)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1 bg-emerald-800/80 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            ISO 27001 Certified
          </span>
          <span className="hidden md:inline-flex items-center gap-1 bg-emerald-800/80 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-700">
            <Code2 className="w-3.5 h-3.5 text-cyan-300" />
            HL7 FHIR & LOINC Ready
          </span>
          <div className="flex items-center gap-1 text-[11px] text-emerald-200">
            <RefreshCw className="w-3 h-3 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>SatuSehat Sinkron 100%</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">SILK</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-emerald-200">
                  Labkesmas v2.6
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Sistem Informasi Laboratorium Konoha
              </p>
            </div>
          </div>

          {/* Quick Facility & User Context Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Facility Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowFacilityMenu(!showFacilityMenu);
                  setShowUserMenu(false);
                }}
                className="hidden lg:flex items-center gap-2 text-xs bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                title="Ganti Fasilitas Pelayanan Kesehatan"
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-medium max-w-[200px] truncate">{selectedFacility}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showFacilityMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Pilih Fasilitas Laboratorium Aktif
                  </div>
                  {AVAILABLE_FACILITIES.map((fac) => (
                    <button
                      key={fac}
                      onClick={() => {
                        setSelectedFacility(fac);
                        setShowFacilityMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 ${
                        selectedFacility === fac ? 'bg-emerald-50/70 text-emerald-700 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      <span>{fac}</span>
                      {selectedFacility === fac && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowFacilityMenu(false);
                }}
                className="flex items-center gap-2 text-xs bg-emerald-50 hover:bg-emerald-100/80 text-emerald-950 px-2.5 py-1.5 rounded-lg border border-emerald-200 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px]">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left hidden md:block">
                  <div className="font-semibold text-slate-900 leading-tight truncate max-w-[140px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium">
                    {currentUser.role.split('/')[0]}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-emerald-700" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Simulasi Akses Peran Pengguna (RBAC)
                  </div>
                  {AVAILABLE_USERS.map((usr) => (
                    <button
                      key={usr.name}
                      onClick={() => {
                        setCurrentUser(usr);
                        setShowUserMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 text-xs hover:bg-slate-50 border-b border-slate-100 last:border-none ${
                        currentUser.name === usr.name ? 'bg-emerald-50/60' : ''
                      }`}
                    >
                      <div className="font-semibold text-slate-900">{usr.name}</div>
                      <div className="text-[11px] text-emerald-700 font-medium">{usr.role}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{usr.level}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Action: New Specimen */}
            <button
              onClick={onOpenNewSpecimen}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm shadow-emerald-700/30 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Daftar Sampel Baru</span>
              <span className="sm:hidden">Daftar</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-1 scrollbar-none border-t border-slate-100">
          <button
            onClick={() => setActiveTab('surveilans')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'surveilans'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Surveilans & Dasbor Nasional</span>
          </button>

          <button
            onClick={() => setActiveTab('pelayanan')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'pelayanan'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Pelayanan Lab & Spesimen</span>
            {pendingCount > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'pelayanan' ? 'bg-white text-emerald-700' : 'bg-amber-100 text-amber-800'
              }`}>
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('jaringan')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'jaringan'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Jaringan Labkesmas 4 Tingkat</span>
          </button>

          <button
            onClick={() => setActiveTab('fhir')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'fhir'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Interoperabilitas (FHIR / LOINC)</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'audit'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Audit Trail & ISO 27001</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
