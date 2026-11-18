// JavaScript portofolio Athaya Zeyhan
// Dipasang di ketiga halaman dengan defer

// 1. Daftar keahlian (halaman Beranda), data dari data/keahlian.json

const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
  try {
    const response = await fetch("data/keahlian.json");

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const skills = await response.json();

    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkill.appendChild(item);
    });

    jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;

  } catch (error) {
    jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
    console.error(error);
  }
}

if (daftarSkill) {
  muatKeahlian();
}

// 2. Tema gelap (semua halaman)
const tombolTema = document.querySelector("#tombol-tema");

if (tombolTema) {
  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");
    tombolTema.textContent = document.body.classList.contains("gelap")
      ? "Mode Terang"
      : "Mode Gelap";
  });
}

// 3. Penghitung karakter pesan (halaman Kontak)
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan && hitungKarakter) {
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/300 karakter`;
  });
}

// 4. Daftar proyek dan filter (halaman Proyek)
const proyek = [
  {
    judul: "Halaman Profil Pertama",
    kategori: "HTML",
    gambar: "img/proyek-profil.png",
    alt: "Tangkapan layar halaman profil Athaya Zeyhan",
    deskripsi: "Halaman web pertama saya, dibuat dengan HTML dasar.",
  },
  {
    judul: "Form Kontak",
    kategori: "HTML",
    gambar: "img/proyek-kontak.png",
    alt: "Tangkapan layar form kontak berisi lima isian",
    deskripsi: "Form dengan label dan validasi bawaan browser.",
  },
  {
    judul: "Tabel Jadwal Belajar",
    kategori: "HTML",
    gambar: "img/proyek-jadwal.png",
    alt: "Tangkapan layar tabel jadwal belajar mandiri",
    deskripsi: "Jadwal belajar mingguan dengan thead dan tbody.",
  },
  {
    judul: "Portofolio Responsif",
    kategori: "CSS",
    gambar: "tampilanprofil.png",
    alt: "Tangkapan layar portofolio di ponsel dan laptop",
    deskripsi: "Rapi di ponsel, tablet, dan laptop dengan Flexbox.",
  },
  {
    judul: "Kalkulator Nilai Rapor",
    kategori: "JavaScript",
    gambar: "kalkulator.png",
    alt: "Tangkapan layar hasil kalkulator nilai di Console",
    deskripsi: "Rata-rata dan predikat nilai dengan fungsi JavaScript.",
  },
  {
    judul: "Lima Soal Logika",
    kategori: "JavaScript",
    gambar: "proyekkalkulator.png",
    alt: "Tangkapan layar hasil uji lima soal logika",
    deskripsi: "Lima fungsi logika yang masing-masing diuji 3 masukan.",
  },
];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      <img src="${item.gambar}" alt="${item.alt}" width="280">
      <p>${item.deskripsi}</p>
    </article>`;
}

function tampilkanProyek(daftar) {
  const semuaKartu = daftar.map((item) => buatKartu(item));
  daftarProyek.innerHTML = semuaKartu.join("");
  jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);

  if (!tombol) {
    return;
  }

  tombol.addEventListener("click", () => {
    if (kategori === "Semua") {
      tampilkanProyek(proyek);
    } else {
      tampilkanProyek(proyek.filter((item) => item.kategori === kategori));
    }

    const tombolAktif = document.querySelector(".tombol-filter.aktif");

    if (tombolAktif) {
      tombolAktif.classList.remove("aktif");
    }

    tombol.classList.add("aktif");
  });
}

if (daftarProyek && jumlahProyek) {
  tampilkanProyek(proyek);
  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-html", "HTML");
  pasangFilter("#filter-css", "CSS");
  pasangFilter("#filter-javascript", "JavaScript");
}

// ==========================================
// 5. GITHUB API DENGAN ASYNC/AWAIT
// ==========================================

async function ambilRepo() {
  const daftarRepo = document.querySelector("#daftar-repo-github");
  const statusRepo = document.querySelector("#status-repo-github");

  if (!daftarRepo || !statusRepo) return;

  statusRepo.textContent = "Memuat repositori GitHub...";
  daftarRepo.innerHTML = "";

  try {
    const response = await fetch(
      "https://api.github.com/users/Athaya17/repos?sort=updated&per_page=100"
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data repositori.");
    }

    const repositori = await response.json();

    if (repositori.length === 0) {
      statusRepo.textContent = "Belum ada repositori publik.";
      return;
    }

    daftarRepo.innerHTML = repositori.map((repo) => `
      <article class="kartu">
        <span class="label">${repo.language || "Repository"}</span>
        <h3>${repo.name}</h3>
        <p>${repo.description || "Belum ada deskripsi."}</p>
        <p>Bintang: ${repo.stargazers_count}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
          Lihat repositori di GitHub
        </a>
      </article>
    `).join("");

    statusRepo.textContent =
      `Berhasil memuat ${repositori.length} repositori GitHub.`;

  } catch (error) {
    console.error(error);
    statusRepo.textContent =
      "Repositori gagal dimuat. Periksa koneksi internet.";
  }
}

ambilRepo();