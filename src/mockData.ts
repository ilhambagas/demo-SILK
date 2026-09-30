import { SpecimenRecord, FacilityNode, SurveillanceAlert, AuditLog, LoincDictionaryItem } from './types';

export const INITIAL_SPECIMENS: SpecimenRecord[] = [
  {
    id: 'spec-001',
    specimenCode: 'LAB-2026-KN-0981',
    category: 'manusia',
    categoryLabel: 'Spesimen Manusia (Klinis)',
    subjectName: 'Naruto Uzumaki',
    subjectIdentifier: 'NIK-3201-KN-1010-001',
    ageGender: '32 Th / L',
    originFacility: 'Puskesmas Konoha Selatan',
    facilityLevel: 'Puskesmas',
    collectionDate: '2026-09-29 08:30',
    receivedDate: '2026-09-29 09:15',
    testType: 'Panel Hematologi Lengkap & Serologi Demam',
    status: 'selesai',
    technicianName: 'Shizune Katou, S.Tr.Kes',
    validatorDoctor: 'Dr. Tsunade Senju, Sp.PK',
    validatedAt: '2026-09-29 14:20',
    urgency: 'cito',
    surveillanceFlag: 'Kasus Konfirmasi Chakra Fever',
    fhirSyncStatus: 'synced',
    notes: 'Pasien mengalami demam tinggi mendadak hari ke-3, nyeri sendi, dan penurunan platelet signifikan.',
    tests: [
      {
        id: 't-1',
        name: 'Hemoglobin (Hb)',
        loincCode: '718-7',
        value: 14.8,
        unit: 'g/dL',
        referenceRange: '13.0 - 17.5',
        status: 'normal'
      },
      {
        id: 't-2',
        name: 'Leukosit (WBC)',
        loincCode: '6690-2',
        value: 3200,
        unit: '/µL',
        referenceRange: '4,000 - 10,000',
        status: 'low',
        notes: 'Leukopenia indikasi infeksi virus'
      },
      {
        id: 't-3',
        name: 'Trombosit (Platelet)',
        loincCode: '777-3',
        value: 82000,
        unit: '/µL',
        referenceRange: '150,000 - 450,000',
        status: 'critical',
        notes: 'Trombositopenia akut, perlu pemantauan ketat'
      },
      {
        id: 't-4',
        name: 'Hematokrit (Ht)',
        loincCode: '4544-3',
        value: 46.2,
        unit: '%',
        referenceRange: '40.0 - 52.0',
        status: 'normal'
      },
      {
        id: 't-5',
        name: 'NS1 Dengue / Chakra Antigen',
        loincCode: '68343-3',
        value: 'REAKTIF (POSITIF)',
        unit: 'Index',
        referenceRange: 'Non-Reaktif',
        status: 'positive',
        notes: 'Reaktif kuat, terlaporkan ke EWARS Nasional'
      }
    ]
  },
  {
    id: 'spec-002',
    specimenCode: 'LAB-2026-KN-0982',
    category: 'lingkungan',
    categoryLabel: 'Spesimen Lingkungan (Air Bersih)',
    subjectName: 'Mata Air Utama Lembah Senju',
    subjectIdentifier: 'LOC-WTR-SENJU-04',
    originFacility: 'Labkesda Distrik Senju',
    facilityLevel: 'Labkesda',
    collectionDate: '2026-09-29 07:00',
    receivedDate: '2026-09-29 10:00',
    testType: 'Bakteriologi Air Minum & Kimia Terbatas',
    status: 'validasi',
    technicianName: 'Inoichi Yamanaka, A.Md.AK',
    validatorDoctor: 'Dr. Tsunade Senju, Sp.PK',
    urgency: 'surveilans',
    surveillanceFlag: 'Pemantauan Sanitasi Pasca Hujan Lebat',
    fhirSyncStatus: 'synced',
    notes: 'Pengambilan sampel rutin bulanan untuk reservoir air minum publik Konoha.',
    tests: [
      {
        id: 't-6',
        name: 'Total Coliform',
        loincCode: '49765-1',
        value: 2,
        unit: 'CFU/100 mL',
        referenceRange: '0 (Maks 0)',
        status: 'high',
        notes: 'Ditemukan cemaran coliform ringan pada pipa transmisi'
      },
      {
        id: 't-7',
        name: 'Escherichia coli',
        loincCode: '43409-2',
        value: 0,
        unit: 'CFU/100 mL',
        referenceRange: '0 (Bebas E. coli)',
        status: 'normal'
      },
      {
        id: 't-8',
        name: 'Derajat Keasaman (pH)',
        loincCode: '2748-2',
        value: 7.2,
        unit: 'pH unit',
        referenceRange: '6.5 - 8.5',
        status: 'normal'
      },
      {
        id: 't-9',
        name: 'Kekeruhan (Turbidity)',
        loincCode: '14563-1',
        value: 1.8,
        unit: 'NTU',
        referenceRange: '< 3.0 NTU',
        status: 'normal'
      }
    ]
  },
  {
    id: 'spec-003',
    specimenCode: 'LAB-2026-KN-0983',
    category: 'vektor',
    categoryLabel: 'Spesimen Vektor & Reservoir (Nyamuk)',
    subjectName: 'Perangkap Ovitrap Blok Hutan Kematian',
    subjectIdentifier: 'VEC-OVI-HK-09',
    originFacility: 'Balai Labkesmas Regional Konoha',
    facilityLevel: 'Labkesmas Regional',
    collectionDate: '2026-09-28 16:00',
    receivedDate: '2026-09-29 08:00',
    testType: 'Survei Entomologi & Resistensi Insektisida Nyamuk Aedes',
    status: 'selesai',
    technicianName: 'Aburame Shino, S.Si (Entomolog)',
    validatorDoctor: 'Dr. Tsunade Senju, Sp.PK',
    validatedAt: '2026-09-29 16:30',
    urgency: 'surveilans',
    surveillanceFlag: 'Kepadatan Vektor Tinggi (ABJ < 85%)',
    fhirSyncStatus: 'synced',
    notes: 'Wilayah perbatasan hutan menunjukkan peningkatan densitas jentik dan nyamuk dewasa Aedes aegypti.',
    tests: [
      {
        id: 't-10',
        name: 'Kepadatan Larva (Breteau Index)',
        loincCode: '8234-1',
        value: 42,
        unit: 'per 100 rumah',
        referenceRange: '< 20 (Target Aman)',
        status: 'high',
        notes: 'Indeks tinggi berisiko memicu KLB di permukiman terdekat'
      },
      {
        id: 't-11',
        name: 'Angka Bebas Jentik (ABJ)',
        loincCode: '8235-8',
        value: 78.4,
        unit: '%',
        referenceRange: '≥ 95.0 %',
        status: 'low',
        notes: 'Perlu fogging terarah dan larvasidasi massal'
      },
      {
        id: 't-12',
        name: 'Uji Kerentanan Malathion',
        loincCode: '74512-5',
        value: 'Toleran Parsial',
        unit: 'Kategori',
        referenceRange: 'Rentan (>98% mortalitas)',
        status: 'high',
        notes: 'Disarankan rotasi insektisida ke golongan piretroid'
      }
    ]
  },
  {
    id: 'spec-004',
    specimenCode: 'LAB-2026-KN-0984',
    category: 'manusia',
    categoryLabel: 'Spesimen Manusia (Klinis)',
    subjectName: 'Hinata Hyuga',
    subjectIdentifier: 'NIK-3201-KN-1020-004',
    ageGender: '31 Th / P',
    originFacility: 'RSUD Konoha / Labkesda Pusat',
    facilityLevel: 'Labkesda',
    collectionDate: '2026-09-30 06:45',
    receivedDate: '2026-09-30 07:30',
    testType: 'Panel Tes Fungsi Tiroid & Glukosa Darah',
    status: 'analisis',
    technicianName: 'Shizune Katou, S.Tr.Kes',
    urgency: 'rutin',
    fhirSyncStatus: 'pending',
    notes: 'Pemeriksaan laboratorium berkala penapisan kesehatan ibu dan sindrom metabolik.',
    tests: [
      {
        id: 't-13',
        name: 'Glukosa Puasa (Fasting Blood Sugar)',
        loincCode: '1558-6',
        value: 94,
        unit: 'mg/dL',
        referenceRange: '70 - 100',
        status: 'normal'
      },
      {
        id: 't-14',
        name: 'Free T4 (FT4)',
        loincCode: '3024-7',
        value: 1.25,
        unit: 'ng/dL',
        referenceRange: '0.89 - 1.76',
        status: 'normal'
      },
      {
        id: 't-15',
        name: 'TSH Sensitif',
        loincCode: '3016-3',
        value: 2.14,
        unit: 'µIU/mL',
        referenceRange: '0.40 - 4.00',
        status: 'normal'
      }
    ]
  },
  {
    id: 'spec-005',
    specimenCode: 'LAB-2026-KN-0985',
    category: 'manusia',
    categoryLabel: 'Spesimen Manusia (Klinis)',
    subjectName: 'Sasuke Uchiha',
    subjectIdentifier: 'NIK-3201-KN-1033-009',
    ageGender: '33 Th / L',
    originFacility: 'Laboratorium Rujukan Nasional Konoha',
    facilityLevel: 'Lab Rujukan Nasional',
    collectionDate: '2026-09-30 08:00',
    receivedDate: '2026-09-30 08:30',
    testType: 'Tes Molekuler PCR & Genomik Patogen Rujukan',
    status: 'antrean',
    technicianName: 'Kabuto Yakushi, M.Biomed',
    urgency: 'cito',
    surveillanceFlag: 'Kecurigaan Mutasi Strain Patogen Baru',
    fhirSyncStatus: 'pending',
    notes: 'Spesimen rujukan dari Pos Batas Luar dengan gejala kelelahan ekstrem dan penurunan cadangan chakra.',
    tests: [
      {
        id: 't-16',
        name: 'PCR Multi-Target Viral RNA',
        loincCode: '94531-1',
        value: 'Proses Amplifikasi',
        unit: 'Ct Value',
        referenceRange: 'Negatif / Tidak Terdeteksi',
        status: 'normal'
      },
      {
        id: 't-17',
        name: 'Serum Kreatinin',
        loincCode: '2160-0',
        value: 1.05,
        unit: 'mg/dL',
        referenceRange: '0.70 - 1.30',
        status: 'normal'
      }
    ]
  },
  {
    id: 'spec-006',
    specimenCode: 'LAB-2026-KN-0986',
    category: 'lingkungan',
    categoryLabel: 'Spesimen Lingkungan (Udara Ambien)',
    subjectName: 'Titik Pengukuran Kawasan Industri Daun',
    subjectIdentifier: 'LOC-AIR-IND-01',
    originFacility: 'Labkesda Distrik Industri',
    facilityLevel: 'Labkesda',
    collectionDate: '2026-09-29 11:00',
    receivedDate: '2026-09-29 13:30',
    testType: 'Analisis Partikulat Udara PM2.5 & Gas Polutan',
    status: 'selesai',
    technicianName: 'Inoichi Yamanaka, A.Md.AK',
    validatorDoctor: 'Dr. Tsunade Senju, Sp.PK',
    validatedAt: '2026-09-29 17:00',
    urgency: 'surveilans',
    fhirSyncStatus: 'synced',
    notes: 'Pemantauan Indeks Standar Pencemar Udara (ISPU) mingguan.',
    tests: [
      {
        id: 't-18',
        name: 'Particulate Matter (PM2.5)',
        loincCode: '64146-4',
        value: 22.4,
        unit: 'µg/m³',
        referenceRange: '< 55.0 (Kategori Baik/Sedang)',
        status: 'normal'
      },
      {
        id: 't-19',
        name: 'Sulfur Dioksida (SO2)',
        loincCode: '64147-2',
        value: 12.1,
        unit: 'µg/m³',
        referenceRange: '< 75.0',
        status: 'normal'
      }
    ]
  }
];

export const NETWORK_FACILITIES: FacilityNode[] = [
  {
    id: 'fac-1',
    name: 'Laboratorium Rujukan Nasional Konoha (Pusat)',
    code: 'FASKES-LRN-001',
    level: 'Tingkat 4 (Lab Rujukan Nasional)',
    region: 'Distrik Pusat Hokage',
    activeSpecimens: 142,
    syncRate: 99.8,
    status: 'online',
    ipAddress: '10.200.1.10',
    lastSync: '1 menit yang lalu'
  },
  {
    id: 'fac-2',
    name: 'Balai Labkesmas Regional Wilayah Timur',
    code: 'FASKES-BLKM-002',
    level: 'Tingkat 3 (Labkesmas Regional)',
    region: 'Lembah Senju & Sekitarnya',
    activeSpecimens: 86,
    syncRate: 99.2,
    status: 'online',
    ipAddress: '10.200.2.14',
    lastSync: '2 menit yang lalu'
  },
  {
    id: 'fac-3',
    name: 'RSUD Konoha / Labkesda Kota Pusat',
    code: 'FASKES-LKDA-003',
    level: 'Tingkat 2 (Labkesda)',
    region: 'Kawasan Perkotaan Konoha',
    activeSpecimens: 65,
    syncRate: 98.7,
    status: 'online',
    ipAddress: '10.200.3.22',
    lastSync: '3 menit yang lalu'
  },
  {
    id: 'fac-4',
    name: 'Puskesmas Konoha Selatan',
    code: 'FASKES-PKM-011',
    level: 'Tingkat 1 (Puskesmas)',
    region: 'Sektor Selatan & Pertanian',
    activeSpecimens: 28,
    syncRate: 97.9,
    status: 'online',
    ipAddress: '10.200.4.5',
    lastSync: '5 menit yang lalu'
  },
  {
    id: 'fac-5',
    name: 'Puskesmas Perbatasan Gerbang Pasir (Suna Border)',
    code: 'FASKES-PKM-019',
    level: 'Tingkat 1 (Puskesmas)',
    region: 'Perbatasan Gurun Angin',
    activeSpecimens: 19,
    syncRate: 94.5,
    status: 'warning',
    ipAddress: '10.200.5.12',
    lastSync: '18 menit yang lalu'
  },
  {
    id: 'fac-6',
    name: 'Pos Pengamatan Lingkungan Hutan Kematian',
    code: 'FASKES-POS-008',
    level: 'Tingkat 1 (Puskesmas)',
    region: 'Sektor Rimba Kematian',
    activeSpecimens: 14,
    syncRate: 96.1,
    status: 'online',
    ipAddress: '10.200.6.9',
    lastSync: '7 menit yang lalu'
  }
];

export const SURVEILLANCE_ALERTS: SurveillanceAlert[] = [
  {
    id: 'alrt-01',
    disease: 'Chakra Fever / Demam Dengue Akut',
    loincCode: '68343-3',
    region: 'Distrik Selatan & Perbatasan Hutan',
    severity: 'high',
    caseCount: 38,
    caseTrend: '+24%',
    status: 'Peringatan Dini',
    dateReported: '2026-09-30 02:00',
    recommendation: 'Peningkatan PSN 3M Plus, larvasidasi massal pada permukiman radius 200m dari kasus positif.'
  },
  {
    id: 'alrt-02',
    disease: 'Kontaminasi Bakteriologis Sumber Air Bersih',
    loincCode: '49765-1',
    region: 'Aliran Sungai Sektor Senju Bawah',
    severity: 'medium',
    caseCount: 14,
    caseTrend: '+18%',
    status: 'Investigasi Lapangan',
    dateReported: '2026-09-29 18:30',
    recommendation: 'Inspeksi pipa distribusi, klorinasi darurat, dan anjuran merebus air hingga mendidih bagi warga.'
  },
  {
    id: 'alrt-03',
    disease: 'Tuberkulosis (TBC) MDR Rujukan',
    loincCode: '88344-7',
    region: 'Kawasan Padat Industri Timur',
    severity: 'medium',
    caseCount: 9,
    caseTrend: 'Stabil',
    status: 'Terkendali',
    dateReported: '2026-09-28 10:15',
    recommendation: 'Pelacakan kontak serumah (contact tracing) dan uji resistensi obat lini kedua via GeneXpert.'
  },
  {
    id: 'alrt-04',
    disease: 'Resistensi Larva Aedes terhadap Malathion',
    loincCode: '74512-5',
    region: 'Perbatasan Hutan Kematian',
    severity: 'low',
    caseCount: 5,
    caseTrend: '-5%',
    status: 'Investigasi Lapangan',
    dateReported: '2026-09-27 15:00',
    recommendation: 'Rotasi bahan aktif fogging ke Deltametrin / Lamda-sihalotrin untuk cegah kegagalan kontrol vektor.'
  }
];

export const LOINC_DICTIONARY: LoincDictionaryItem[] = [
  {
    code: '718-7',
    component: 'Hemoglobin',
    property: 'MCnc',
    system: 'Bld',
    scaleType: 'Qn',
    methodType: 'Automated Count',
    indonesianName: 'Kadar Hemoglobin Darah Lengkap',
    sampleType: 'manusia'
  },
  {
    code: '6690-2',
    component: 'Leukocytes',
    property: 'NCnc',
    system: 'Bld',
    scaleType: 'Qn',
    methodType: 'Automated Count',
    indonesianName: 'Hitung Jumlah Leukosit (Sel Darah Putih)',
    sampleType: 'manusia'
  },
  {
    code: '777-3',
    component: 'Platelets',
    property: 'NCnc',
    system: 'Bld',
    scaleType: 'Qn',
    methodType: 'Automated Count',
    indonesianName: 'Hitung Jumlah Trombosit',
    sampleType: 'manusia'
  },
  {
    code: '68343-3',
    component: 'Dengue virus NS1 Ag',
    property: 'PrThr',
    system: 'Ser/Plas',
    scaleType: 'Ord',
    methodType: 'Rapid Immunoassay',
    indonesianName: 'Antigen NS1 Virus Dengue / Demam Reaktif',
    sampleType: 'manusia'
  },
  {
    code: '1558-6',
    component: 'Fasting Glucose',
    property: 'MCnc',
    system: 'Ser/Plas',
    scaleType: 'Qn',
    methodType: 'Hexokinase / Photometry',
    indonesianName: 'Glukosa Darah Puasa',
    sampleType: 'manusia'
  },
  {
    code: '94531-1',
    component: 'Viral RNA Target Amplification',
    property: 'PrThr',
    system: 'Nasopharyngeal/Serum',
    scaleType: 'Ord',
    methodType: 'Real-Time RT-PCR',
    indonesianName: 'Deteksi Molekuler Asam Nukleat Virus (PCR)',
    sampleType: 'manusia'
  },
  {
    code: '49765-1',
    component: 'Total Coliform Count',
    property: 'NCnc',
    system: 'Water',
    scaleType: 'Qn',
    methodType: 'Membrane Filtration',
    indonesianName: 'Total Bakteri Koliform dalam Air Bersih',
    sampleType: 'lingkungan'
  },
  {
    code: '43409-2',
    component: 'Escherichia coli Detection',
    property: 'PrPresence',
    system: 'Water',
    scaleType: 'Ord',
    methodType: 'Culture / Chromogenic Agar',
    indonesianName: 'Deteksi Bakteri E. coli Air Minum',
    sampleType: 'lingkungan'
  },
  {
    code: '64146-4',
    component: 'Particulate Matter <2.5um (PM2.5)',
    property: 'MCnc',
    system: 'Air',
    scaleType: 'Qn',
    methodType: 'Gravimetric / Light Scattering',
    indonesianName: 'Konsentrasi Partikulat Udara Halus PM2.5',
    sampleType: 'lingkungan'
  },
  {
    code: '8234-1',
    component: 'Breteau Index (Aedes Larvae)',
    property: 'Ratio',
    system: 'Vector Habitat',
    scaleType: 'Qn',
    methodType: 'Visual Survey / Ovitrap',
    indonesianName: 'Indeks Kepadatan Jentik Breteau (BI)',
    sampleType: 'vektor'
  },
  {
    code: '8235-8',
    component: 'House Free of Larva Index (ABJ)',
    property: 'Percent',
    system: 'Vector Surveillance',
    scaleType: 'Qn',
    methodType: 'Larval Dipping Survey',
    indonesianName: 'Angka Bebas Jentik Nasional (ABJ)',
    sampleType: 'vektor'
  },
  {
    code: '74512-5',
    component: 'Insecticide Bioassay Mortality',
    property: 'PrThr',
    system: 'Adult Mosquito',
    scaleType: 'Ord',
    methodType: 'WHO Tube Test',
    indonesianName: 'Uji Kerentanan Vektor terhadap Insektisida',
    sampleType: 'vektor'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-001',
    timestamp: '2026-09-30 08:35:12',
    actor: 'Kabuto Yakushi, M.Biomed',
    role: 'ATLM Laboratorium Rujukan',
    action: 'PENERIMAAN_SPESIMEN',
    targetId: 'LAB-2026-KN-0985',
    details: 'Spesimen Cito Rujukan diterima, cek integritas suhu cold-chain 4°C valid.',
    ipAddress: '10.200.1.42',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'aud-002',
    timestamp: '2026-09-29 16:31:05',
    actor: 'Dr. Tsunade Senju, Sp.PK',
    role: 'Dokter Penanggung Jawab / Validator',
    action: 'VALIDASI_HASIL_MEDIS',
    targetId: 'LAB-2026-KN-0983',
    details: 'Verifikasi tanda tangan digital hasil surveilans entomologi vektor Hutan Kematian.',
    ipAddress: '10.200.1.10',
    hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4'
  },
  {
    id: 'aud-003',
    timestamp: '2026-09-29 14:21:40',
    actor: 'Dr. Tsunade Senju, Sp.PK',
    role: 'Dokter Penanggung Jawab / Validator',
    action: 'TRIGGER_EWARS_ALERT',
    targetId: 'LAB-2026-KN-0981',
    details: 'Pemicuan sinyal peringatan dini KLB Chakra Fever untuk wilayah Konoha Selatan.',
    ipAddress: '10.200.1.10',
    hash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb'
  },
  {
    id: 'aud-004',
    timestamp: '2026-09-29 14:20:18',
    actor: 'Sistem Gateway FHIR SILK',
    role: 'Automated Gateway Engine',
    action: 'SYNC_SATUSEHAT_FHIR',
    targetId: 'LAB-2026-KN-0981',
    details: 'Bundle DiagnosticReport & 5 Observations terkirim ke Server Pusat Kemenkes (HTTP 201 Created).',
    ipAddress: '10.200.0.1',
    hash: '3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d'
  },
  {
    id: 'aud-005',
    timestamp: '2026-09-29 09:16:02',
    actor: 'Shizune Katou, S.Tr.Kes',
    role: 'ATLM Puskesmas',
    action: 'REGISTRASI_BARU',
    targetId: 'LAB-2026-KN-0981',
    details: 'Pendaftaran spesimen manusia darah EDTA untuk pasien Naruto Uzumaki.',
    ipAddress: '10.200.4.5',
    hash: '2c624232cdd221771294dfbb310aca000a0df6ec8b660466c9be0fa41b8ac4f3'
  }
];
