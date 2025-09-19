---
marp: true
theme: default
paginate: true
math: katex
title: Manajemen Persediaan
description: Materi pelatihan untuk mahasiswa akuntansi/manajemen operasi
---

# Manajemen Persediaan
Program Pelatihan | Akuntansi & Manajemen Operasi

Pembicara: (Isi Nama) • Tanggal: (Isi Tanggal)

Note:
- Tujuan sesi: memahami konsep inti persediaan, metode penilaian, serta model pengendalian (EOQ, ROP, Safety Stock, ABC).
- Relevansi: keputusan biaya, layanan, dan profitabilitas di operasi & akuntansi.

---

# Tujuan Pembelajaran

- Memahami peran dan fungsi persediaan
- Mengidentifikasi komponen biaya persediaan (ordering, holding, stockout)
- Menerapkan metode penilaian: FIFO, LIFO, Rata-rata
- Menghitung EOQ, Reorder Point (ROP), dan Safety Stock
- Menerapkan klasifikasi ABC dan memantau KPI persediaan

Note:
- Hasil belajar: mampu menyusun kebijakan pemesanan & level persediaan berbasis data.

---

# Definisi & Fungsi Persediaan

- Definisi: aset lancar berupa barang untuk dijual/diolah
- Fungsi:
  - Buffer ketidakpastian permintaan & lead time
  - Ekonomi skala (diskon kuantitas, efisiensi setup)
  - Memisahkan proses (decoupling)
  - Mendukung tingkat layanan pelanggan

Note:
- Hubungkan fungsi dengan variabilitas demand dan keterbatasan kapasitas.

---

# Klasifikasi Persediaan

- Bahan baku (Raw Material/RM)
- Barang dalam proses (Work-in-Process/WIP)
- Barang jadi (Finished Goods/FG)
- MRO (Maintenance, Repair, and Operations)

Note:
- Klasifikasi mempengaruhi kebijakan pengendalian (frekuensi review, pengukuran akurasi, biaya).

---

# Komponen Biaya Persediaan

- Biaya pemesanan (S): admin PO, setup/ordering
- Biaya penyimpanan (H): modal, gudang, asuransi, shrinkage/obsolescence
- Biaya kekurangan (stockout/backorder)
- Biaya unit (c) untuk valuasi

Note:
- Rule-of-thumb: H tahunan sering 15–30% dari nilai barang (tergantung industri/risiko).

---

# Sistem Pengendalian (Q vs P)

- Q-system (continuous review):
  - Pesan saat stok ≤ ROP, kuantitas tetap Q
- P-system (periodic review):
  - Tinjau tiap periode P, pesan hingga target T
- Push vs Pull; gambaran JIT

Note:
- Q cocok untuk item A bernilai tinggi; P praktis untuk item C bernilai rendah.

---

# Metode Penilaian Persediaan (Konsep)

| Metode | Aliran Biaya | Saat Harga Naik | Dampak ke COGS | Dampak ke Persediaan Akhir |
|---|---|---|---|---|
| FIFO | Masuk awal keluar duluan | ↑ | Lebih rendah | Lebih tinggi |
| LIFO | Masuk terakhir keluar duluan | ↑ | Lebih tinggi | Lebih rendah |
| Rata-rata | Biaya rata-rata tertimbang | — | Moderat | Moderat |

Note:
- Implikasi margin & pajak mengikuti arah COGS.

---

# Contoh Perhitungan Penilaian

Transaksi:
- Awal: 100 @ 10
- Beli: 150 @ 11
- Jual: 120
- Beli: 200 @ 12
- Jual: 180

Hasil ringkas:
- FIFO: COGS = 3.250; Ending = 1.800
- LIFO: COGS = 3.480; Ending = 1.570
- Rata-rata: Unit cost = 5.050/450 = 11,22; COGS ≈ 3.366,67; Ending ≈ 1.683,33

Note:
- Validasi: COGS + Ending = Goods Available = 5.050.

---

# Klasifikasi ABC (Pareto)

Contoh nilai tahunan (harga × konsumsi):

| Item | Nilai (Rp) | % | Kumulatif | Kelas |
|---|---:|---:|---:|---|
| I1 | 120.000 | 40,0% | 40,0% | A |
| I2 | 80.000 | 26,7% | 66,7% | A |
| I3 | 50.000 | 16,7% | 83,3% | B |
| I4 | 30.000 | 10,0% | 93,3% | B |
| I5 | 15.000 | 5,0% | 98,3% | C |
| I6 | 5.000 | 1,7% | 100% | C |

Note:
- Kebijakan: A (kontrol ketat), B (menengah), C (sederhana).

---

# Model EOQ: Asumsi & Rumus

- Asumsi: permintaan (D) konstan, lead time tetap, tanpa kekurangan, S & H konstan
- Rumus:
  - $Q^* = \sqrt{\frac{2DS}{H}}$
  - $TC(Q) \approx \frac{D}{Q}S + \frac{Q}{2}H$

Note:
- Pada $Q^*$: biaya pemesanan = biaya penyimpanan.

---

# Contoh EOQ

Misal: $D=24{.}000$/tahun, $S=50$, $H=2$

- $Q^* = \sqrt{\frac{2\times 24{,}000\times 50}{2}} \approx 1{.}095$ unit
- Order/tahun $\approx D/Q \approx 22$
- Biaya order $\approx (D/Q)S \approx 1.096$
- Biaya simpan $\approx (Q/2)H \approx 1.095$

Note:
- Sensitivitas: $Q^*$ naik dengan $\sqrt{D}$ dan $\sqrt{S}$, turun dengan $\sqrt{H}$.

---

# Safety Stock & Service Level

- Variansi demand saja:
  - $\sigma_L = \sqrt{L}\,\sigma_d$
  - $SS = z \cdot \sigma_L$
- Variansi demand & lead time:
  - $\sigma_L = \sqrt{L\sigma_d^2 + d^2\sigma_L^2}$

Note:
- Cycle service level vs fill rate: pilih z sesuai target (contoh 95% → $z\approx1{,}65$).

---

# Reorder Point (ROP)

- Deterministik: $ROP = d \cdot L$
- Dengan stok pengaman:
  - $ROP = d \cdot L + z \cdot \sigma_L$

Note:
- $d$: rata-rata permintaan per periode; $L$: lead time (dalam periode yang sama).

---

# Contoh ROP + Safety Stock

Contoh: $d=100$/minggu, $L=3$ minggu, $\sigma_d=40$, $z=1{,}645$

- $\sigma_L = \sqrt{3}\cdot 40 \approx 69{,}28$
- $SS \approx 1{,}645 \times 69{,}28 \approx 114$
- $ROP = 100 \times 3 + 114 = 414$ unit

Note:
- Bulatkan sesuai MOQ/kelipatan lot.

---

# Periodic Review (P-System)

- Target level: $T = d\cdot(L+P) + z\cdot \sigma_{(L+P)}$
- Jika variansi demand saja: $\sigma_{(L+P)} = \sqrt{L+P}\cdot \sigma_d$
- Order pada review: $Order = T - \text{on-hand}$

Contoh: $d=100$, $L=3$, $P=2$, $z=1{,}645$, $\sigma_d=40$ → $T \approx 647$

Note:
- P-system praktis untuk banyak item bernilai rendah; 1 kali review per periode.

---

# JIT & Kanban (Gambaran)

- Fokus reduksi persediaan, lot kecil, lead time pendek
- Kanban: sinyal tarik untuk replenishment
- Prasyarat: kualitas tinggi, proses stabil, pemasok andal

Note:
- Risiko stockout naik jika variabilitas tinggi; butuh kedisiplinan dan kolaborasi pemasok.

---

# KPI Persediaan

- Inventory Turnover = $\dfrac{\text{COGS}}{\text{Average Inventory}}$
- Days Inventory Outstanding = $\dfrac{365}{\text{Turnover}}$
- Service level (cycle) dan Fill rate (definisi)
- Accuracy: selisih buku vs fisik

Note:
- Interpretasi KPI dan benchmark umum per industri.

---

# Ringkasan & Latihan

- Rekap: penilaian (FIFO/LIFO/Avg), EOQ, ROP/SS, ABC, KPI
- Latihan:
  1) EOQ: $D=18{,}000$, $S=60$, $H=1{,}8$
  2) ROP: $d=80$/mgg, $L=4$ mgg, $\sigma_d=25$, $z=1{,}96$

Kunci ringkas:
- (1) $2DS/H = 2\times 18{,}000\times 60 / 1{,}8 = 1{,}200{,}000/1{,}8 = 666{,}666{,}7 \Rightarrow Q^* \approx 817$
- (2) $\sigma_L=\sqrt{4}\cdot 25=50 \Rightarrow SS=1{,}96\times 50=98 \Rightarrow ROP=80\times 4+98=418$

Note:
- Diskusikan langkah perhitungan dan sensitivitas parameter.