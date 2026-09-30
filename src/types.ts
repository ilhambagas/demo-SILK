export type SpecimenCategory = 'manusia' | 'lingkungan' | 'vektor';

export type SpecimenStatus = 'antrean' | 'analisis' | 'validasi' | 'selesai' | 'ditolak';

export interface TestParameter {
  id: string;
  name: string;
  loincCode: string;
  snomedCode?: string;
  value: string | number;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'low' | 'high' | 'positive' | 'negative' | 'critical';
  notes?: string;
}

export interface SpecimenRecord {
  id: string;
  specimenCode: string; // e.g. LAB-2026-KN-0912
  category: SpecimenCategory;
  categoryLabel: string;
  subjectName: string; // Patient name or Location/Sample Source
  subjectIdentifier: string; // NIK / Location ID
  ageGender?: string; // e.g. "34 Th / L"
  originFacility: string;
  facilityLevel: 'Puskesmas' | 'Labkesda' | 'Labkesmas Regional' | 'Lab Rujukan Nasional';
  collectionDate: string;
  receivedDate: string;
  testType: string;
  tests: TestParameter[];
  status: SpecimenStatus;
  technicianName: string; // ATLM
  validatorDoctor?: string; // Sp.PK
  validatedAt?: string;
  urgency: 'rutin' | 'cito' | 'surveilans';
  surveillanceFlag?: string; // e.g. "Peringatan Dini KLB", "Waspada Zoonosis"
  fhirSyncStatus: 'synced' | 'pending' | 'failed';
  notes?: string;
}

export interface FacilityNode {
  id: string;
  name: string;
  code: string;
  level: 'Tingkat 1 (Puskesmas)' | 'Tingkat 2 (Labkesda)' | 'Tingkat 3 (Labkesmas Regional)' | 'Tingkat 4 (Lab Rujukan Nasional)';
  region: string;
  activeSpecimens: number;
  syncRate: number;
  status: 'online' | 'warning' | 'offline';
  ipAddress: string;
  lastSync: string;
}

export interface SurveillanceAlert {
  id: string;
  disease: string;
  loincCode: string;
  region: string;
  severity: 'high' | 'medium' | 'low';
  caseCount: number;
  caseTrend: '+18%' | '+24%' | '-5%' | '+45%' | 'Stabil';
  status: 'Investigasi Lapangan' | 'Peringatan Dini' | 'Terkendali' | 'Karantina Parsial';
  dateReported: string;
  recommendation: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  targetId: string;
  details: string;
  ipAddress: string;
  hash: string;
}

export interface LoincDictionaryItem {
  code: string;
  component: string;
  property: string;
  system: string;
  scaleType: string;
  methodType: string;
  indonesianName: string;
  sampleType: SpecimenCategory;
}
