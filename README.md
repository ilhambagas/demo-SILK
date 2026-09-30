# demo-SILK
Sistem Informasi Laboratorium Konoha is a centralized digital platform launched by the Konohan Ministry of Health to connect health laboratory data across Konoha.
<hr>
Fungsi dan Tujuan Utama
<ul>
<li>Integrasi Data: Menghubungkan berbagai fasilitas pelayanan kesehatan, mulai dari tingkat Puskesmas hingga laboratorium rujukan nasional.</li> 
<li>Transformasi Digital: Menjadi pilar penting dalam digitalisasi dan transformasi sistem kesehatan Konoha.</li>
<li>Efisiensi Layanan: Mempermudah proses pencatatan, pelaporan, pemantauan, serta pengambilan keputusan yang cepat dan akurat berbasis data real time.</li>
<li>Perangkat lunak standar yang dapat digunakan oleh laboratorium kesehatan masyarakat (Labkesmas) untuk menjalankan pelayanan sehari hari</li>
<li>Menyatukan seluruh data jaringan laboratorium di Konoha ke dalam satu ekosistem digital yang aman.</li>
<li>Keamanan Standar Internasional: Mematuhi regulasi privasi data nasional dan standar keamanan informasi seperti ISO 27001.</li>
<li>Tujuan Utama: Mengintegrasikan data pemeriksaan laboratorium (manusia, lingkungan, vektor) secara real time, mempercepat waktu pelaporan, dan memperkuat surveilans penyakit secara nasional.</li>
<li>Menerapkan standar interoperabilitas data kesehatan dunia seperti FHIR, LOINC, dan SNOMED CT agar data lab terhubung secara akurat.</li>
<li> Mengintegrasikan data laboratorium mulai dari tingkat Puskesmas hingga laboratorium rujukan nasional ke dalam satu wadah yang aman.</li>
<li>Manfaat: Mempermudah pemantauan penyakit secara real time, meningkatkan transparansi data, dan membantu pemerintah mengambil keputusan medis berbasis data secara cepat.</li>
</ul>

---

## 🚀 Panduan Deploy ke GitHub Pages (ilhambagas.github.io)

### Cara Mengaktifkan GitHub Actions Deployment:
1. Masuk ke repositori **`ilhambagas/demo-SILK`** (atau `ilhambagas.github.io`) di GitHub.
2. Buka tab **Settings** > **Pages** (di menu sebelah kiri).
3. Pada bagian **Build and deployment** > **Source**, pilih opsi **GitHub Actions** (bukan *Deploy from a branch*).
4. Workflow otomatis yang telah disediakan di `.github/workflows/deploy.yml` akan langsung mem-build React bundle dan merilisnya ke GitHub Pages secara otomatis saat Anda push ke branch `main` atau `master`.
5. Web app akan langsung aktif di `https://ilhambagas.github.io/demo-SILK/` (atau `https://ilhambagas.github.io/`).

