// Data Awal Default (6 Sampel Sekolah) jika LocalStorage kosong
const defaultData = {
    akreditasi: [
        { npsn: "P2963449", nama: "LKP Family English Course (FEC)", alamat: "Jl. Raya Jatinangor No. 297", pimpinan: "Dra. SEKARWATI", nilai: "Belum", tahun: "0", masa: "0", sk: "-" },
        { npsn: "P9934728", nama: "LKP GANESHA PRATAMA", alamat: "Jl. P. Santri No. 78", pimpinan: "M. ARWAN AZIZ, ST", nilai: "B", tahun: "2019", masa: "2024", sk: "153/BAN PAUD/2019" },
        { npsn: "P5512349", nama: "LKP SUMEDANG KOMPUTER", alamat: "Jl. Prabu Geusan Ulun No. 12", pimpinan: "H. DEDI SUPRIADI", nilai: "A", tahun: "2021", masa: "2026", sk: "421/BAN-PNF/2021" },
        { npsn: "P7788912", nama: "LKP KARYA MANDIRI BUSANA", alamat: "Jl. Corenda No. 45", pimpinan: "NINA KARLINA, S.Pd", nilai: "B", tahun: "2022", masa: "2027", sk: "882/BAN-PNF/2022" },
        { npsn: "P1122334", nama: "LKP YANI 43 SUMEDANG", alamat: "Jl. Pendopo No. 17 Talun", pimpinan: "YANI SURYANI", nilai: "Belum", tahun: "0", masa: "0", sk: "-" },
        { npsn: "P6655443", nama: "LKP BINTANG BAHASA NOESANTARA", alamat: "Jl. Geusan Ulun No. 104", pimpinan: "RUDI HERMAWAN", nilai: "B", tahun: "2023", masa: "2028", sk: "1042/BAN/2023" }
    ],
    operasional: [
        { npsn: "K5659720", nama: "LKP Family English Course (FEC)", alamat: "Jl. Raya Jatinangor No. 297", pimpinan: "Dra. SEKARWATI", terbit: "0", habis: "0", sk: "-" },
        { npsn: "K5659721", nama: "LKP GANESHA PRATAMA", alamat: "Jl. P. Santri No. 78", pimpinan: "M. ARWAN AZIZ, ST", terbit: "2024", habis: "2027", sk: "503/002/PND-NF/2024" },
        { npsn: "K5659722", nama: "LKP SUMEDANG KOMPUTER", alamat: "Jl. Prabu Geusan Ulun No. 12", pimpinan: "H. DEDI SUPRIADI", terbit: "2025", habis: "2028", sk: "503/081/DISDIK/2025" },
        { npsn: "K5659723", nama: "LKP KARYA MANDIRI BUSANA", alamat: "Jl. Corenda No. 45", pimpinan: "NINA KARLINA, S.Pd", terbit: "2025", habis: "2028", sk: "421.9/104-DISDIK/2025" },
        { npsn: "K5659740", nama: "LKP YANI 43 SUMEDANG", alamat: "Jl. Pendopo No. 17 Talun", pimpinan: "YANI SURYANI", terbit: "2026", habis: "2029", sk: "0156 TA 2026" },
        { npsn: "K5659741", nama: "LKP BINTANG BAHASA NOESANTARA", alamat: "Jl. Geusan Ulun No. 104", pimpinan: "RUDI HERMAWAN", terbit: "2024", habis: "2027", sk: "503/214/PNF-IK/2024" }
    ],
    peserta: [
        { npsn: "K5659720", nama: "LKP Family English Course (FEC)", kec: "Sumedang Utara", jenis: "Kursus Bahasa", sl: 4, sp: 1, prog: "TOEFL Prep", pl: 4, pp: 1, verval: "Sudah" },
        { npsn: "K5659721", nama: "LKP GANESHA PRATAMA", kec: "Sumedang Selatan", jenis: "Kursus Tekno", sl: 12, sp: 8, prog: "Desain Grafis", pl: 10, pp: 8, verval: "Belum" },
        { npsn: "K5659722", nama: "LKP SUMEDANG KOMPUTER", kec: "Situraja", jenis: "Kursus Komputer", sl: 25, sp: 35, prog: "Perkantoran", pl: 25, pp: 35, verval: "Sudah" },
        { npsn: "K5659723", nama: "LKP KARYA MANDIRI BUSANA", kec: "Jatinangor", jenis: "Kursus Tata Busana", sl: 2, sp: 18, prog: "Menjahit Gaun", pl: 2, pp: 15, verval: "Sudah" },
        { npsn: "K5659740", nama: "LKP YANI 43 SUMEDANG", kec: "Tanjungsari", jenis: "Kursus Kecantikan", sl: 0, sp: 16, prog: "Tata Rias", pl: 0, pp: 14, verval: "Belum" },
        { npsn: "K5659741", nama: "LKP BINTANG BAHASA NOESANTARA", kec: "Conggeang", jenis: "Kursus Bahasa", sl: 12, sp: 8, prog: "Bahasa Jepang", pl: 10, pp: 8, verval: "Sudah" }
    ],
    program: [
        { npsn: "K5659720", nama: "LKP Family English Course (FEC)", alamat: "Jatinangor", l1: 100, l2: 0, l3: 0, l4: 0, l5: 0, l6: 0, l7: 0, l8: 0, l9: 0, text: "LEVEL 1" },
        { npsn: "K5659721", nama: "LKP GANESHA PRATAMA", alamat: "Kota Kulon", l1: 100, l2: 100, l3: 100, l4: 0, l5: 0, l6: 0, l7: 0, l8: 0, l9: 0, text: "LEVEL 3" },
        { npsn: "K5659722", nama: "LKP SUMEDANG KOMPUTER", alamat: "Situraja", l1: 100, l2: 100, l3: 0, l4: 0, l5: 0, l6: 0, l7: 0, l8: 0, l9: 0, text: "LEVEL 2" },
        { npsn: "K5659723", nama: "LKP KARYA MANDIRI BUSANA", alamat: "Situraja", l1: 100, l2: 100, l3: 100, l4: 100, l5: 0, l6: 0, l7: 0, l8: 0, l9: 0, text: "LEVEL 4" },
        { npsn: "K5659740", nama: "LKP YANI 43 SUMEDANG", alamat: "Talun", l1: 0, l2: 0, l3: 0, l4: 0, l5: 0, l6: 0, l7: 0, l8: 0, l9: 0, text: "KOSONG" },
        { npsn: "K5659741", nama: "LKP BINTANG BAHASA NOESANTARA", alamat: "Regol", l1: 100, l2: 100, l3: 0, l4: 0, l5: 0, l6: 0, l7: 0, l8: 0, l9: 0, text: "LEVEL 2" }
    ]
};

// Ambil data dari localstorage atau gunakan default data
let appData = JSON.parse(localStorage.getItem('disdik_dashboard_data')) || defaultData;
let charts = {};

function initApp() {
    renderAllTables();
    calculateStats();
    initCharts();
}

function saveToStorage() {
    localStorage.setItem('disdik_dashboard_data', JSON.stringify(appData));
    calculateStats();
    updateCharts();
}

// Tab Switcher
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('text-gray-300', 'hover:bg-slate-800');
    });
    document.getElementById('content-' + tabId).classList.add('active');
    document.getElementById('nav-' + tabId).classList.add('bg-blue-600', 'text-white');
}

// Menampilkan semua tabel data
function renderAllTables() {
    // 1. Table Akreditasi
    const tbodyAkre = document.querySelector("#table-akreditasi tbody");
    tbodyAkre.innerHTML = appData.akreditasi.map((item, idx) => `
        <tr class="hover:bg-gray-50">
            <td class="p-3 text-center">${idx + 1}</td>
            <td class="p-3 text-blue-600 font-bold">${item.npsn}</td>
            <td class="p-3 font-semibold text-slate-900">${item.nama}</td>
            <td class="p-3 text-gray-500">${item.alamat}</td>
            <td class="p-3">${item.pimpinan}</td>
            <td class="p-3 text-center"><span class="px-2.5 py-0.5 rounded font-bold ${item.nilai === 'Belum' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-800'}">${item.nilai}</span></td>
            <td class="p-3 text-center">${item.tahun}</td>
            <td class="p-3 text-center"><span class="font-bold ${item.masa === '0' ? 'text-red-500':'text-emerald-600'}">${item.masa}</span></td>
            <td class="p-3 text-gray-600 text-[11px]">${item.sk}</td>
            <td class="p-3 text-center space-x-2 non-printable">
                <button onclick="editData('akreditasi', ${idx})" class="text-blue-600"><i class="fa fa-edit"></i></button>
                <button onclick="deleteData('akreditasi', ${idx})" class="text-red-500"><i class="fa fa-trash"></i></button>
            </td>
        </tr>
    `).join('');

    // 2. Table Operasional
    const tbodyOps = document.querySelector("#table-operasional tbody");
    tbodyOps.innerHTML = appData.operasional.map((item, idx) => `
        <tr class="hover:bg-gray-50">
            <td class="p-3 text-center">${idx + 1}</td>
            <td class="p-3 text-blue-600 font-bold">${item.npsn}</td>
            <td class="p-3 font-semibold text-slate-900">${item.nama}</td>
            <td class="p-3 text-gray-500">${item.alamat}</td>
            <td class="p-3">${item.pimpinan}</td>
            <td class="p-3 text-center">${item.terbit}</td>
            <td class="p-3 text-center"><span class="px-2 py-0.5 rounded font-bold ${item.habis === '0' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}">${item.habis}</span></td>
            <td class="p-3 text-gray-600">${item.sk}</td>
            <td class="p-3 text-center space-x-2 non-printable">
                <button onclick="editData('operasional', ${idx})" class="text-blue-600"><i class="fa fa-edit"></i></button>
                <button onclick="deleteData('operasional', ${idx})" class="text-red-500"><i class="fa fa-trash"></i></button>
            </td>
        </tr>
    `).join('');

    // 3. Table Peserta
    const tbodyPeserta = document.querySelector("#table-peserta tbody");
    tbodyPeserta.innerHTML = appData.peserta.map((item, idx) => `
        <tr class="hover:bg-gray-50 text-center">
            <td class="p-3 text-left">${idx + 1}</td>
            <td class="p-3 text-blue-600 font-bold text-left">${item.npsn}</td>
            <td class="p-3 font-semibold text-slate-900 text-left">${item.nama}</td>
            <td class="p-3 text-left">${item.kec}</td>
            <td class="p-3 text-amber-600 font-medium">${item.jenis}</td>
            <td class="p-3">${item.sl}</td><td class="p-3">${item.sp}</td><td class="p-3 font-bold bg-gray-50">${Number(item.sl)+Number(item.sp)}</td>
            <td class="p-3 font-bold text-blue-600">${item.prog}</td>
            <td class="p-3">${item.pl}</td><td class="p-3">${item.pp}</td><td class="p-3 font-bold bg-gray-50">${Number(item.pl)+Number(item.pp)}</td>
            <td class="p-3"><span class="px-2 py-0.5 rounded font-bold text-[10px] ${item.verval === 'Sudah' ? 'bg-emerald-100 text-emerald-700':'bg-rose-100 text-rose-700'}">${item.verval}</span></td>
            <td class="p-3 space-x-2 non-printable">
                <button onclick="editData('peserta', ${idx})" class="text-blue-600"><i class="fa fa-edit"></i></button>
                <button onclick="deleteData('peserta', ${idx})" class="text-red-500"><i class="fa fa-trash"></i></button>
            </td>
        </tr>
    `).join('');

    // 4. Table Program Level KKNI
    const tbodyProg = document.querySelector("#table-program tbody");
    tbodyProg.innerHTML = appData.program.map((item, idx) => {
        const renderLvl = (val) => val > 0 ? `<span class="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">${val}</span>` : `<span class="bg-rose-50 text-rose-600 border border-rose-100 px-2 py-0.5 rounded">0</span>`;
        return `
            <tr class="hover:bg-gray-50 text-center">
                <td class="p-3 text-left">${idx + 1}</td>
                <td class="p-3 text-blue-600 font-semibold text-left">${item.npsn}</td>
                <td class="p-3 font-semibold text-slate-900 text-left">${item.nama}</td>
                <td class="p-3 text-gray-500 text-left">${item.alamat}</td>
                <td class="p-1.5">${renderLvl(item.l1)}</td><td class="p-1.5">${renderLvl(item.l2)}</td><td class="p-1.5">${renderLvl(item.l3)}</td>
                <td class="p-1.5">${renderLvl(item.l4)}</td><td class="p-1.5">${renderLvl(item.l5)}</td><td class="p-1.5">${renderLvl(item.l6)}</td>
                <td class="p-1.5">${renderLvl(item.l7)}</td><td class="p-1.5">${renderLvl(item.l8)}</td><td class="p-1.5">${renderLvl(item.l9)}</td>
                <td class="p-3"><span class="px-2 py-0.5 rounded font-bold text-[9px] ${item.text === 'KOSONG'?'bg-red-600 text-white':'bg-slate-800 text-white'}">${item.text}</span></td>
                <td class="p-3 space-x-2 non-printable">
                    <button onclick="editData('program', ${idx})" class="text-blue-600"><i class="fa fa-edit"></i></button>
                    <button onclick="deleteData('program', ${idx})" class="text-red-500"><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

// Kalkulasi Ringkasan Data untuk Beranda
function calculateStats() {
    const totalLkp = appData.akreditasi.length;
    const terakreditasi = appData.akreditasi.filter(i => i.nilai === 'A' || i.nilai === 'B' || i.nilai === 'C').length;
    document.getElementById('stat-akreditasi').innerText = `${terakreditasi} / ${totalLkp} LKP`;

    const ijinAktif = appData.operasional.filter(i => Number(i.habis) >= 2026).length;
    document.getElementById('stat-operasional').innerText = `${ijinAktif} / ${appData.operasional.length} LKP`;

    let totalPd = 0;
    appData.peserta.forEach(i => totalPd += (Number(i.sl) + Number(i.sp)));
    document.getElementById('stat-total-pd').innerText = `${totalPd} PD`;

    const sudahVerval = appData.peserta.filter(i => i.verval === 'Sudah').length;
    const percentVerval = appData.peserta.length > 0 ? ((sudahVerval / appData.peserta.length) * 100).toFixed(1) : 0;
    document.getElementById('stat-verval').innerText = `${percentVerval}%`;
}

// Prosedur Buka Modal Form Tambah / Edit
function openModal(type, index = -1) {
    document.getElementById('form-type').value = type;
    document.getElementById('form-index').value = index;
    document.getElementById('modalTitle').innerText = (index > -1 ? 'Ubah Data ' : 'Tambah Data ') + type.toUpperCase();
    
    const fieldsContainer = document.getElementById('dynamic-fields');
    fieldsContainer.innerHTML = '';
    
    let fieldsHtml = '';
    const item = index > -1 ? appData[type][index] : {};

    // Generate form input dinamis berdasarkan tab yang dipilih
    if (type === 'akreditasi') {
        fieldsHtml = `
            <div><label class="block font-bold mb-1">NPSN</label><input type="text" id="f-npsn" value="${item.npsn||''}" class="w-full p-2 border rounded" required></div>
            <div><label class="block font-bold mb-1">Nama Lembaga</label><input type="text" id="f-nama" value="${item.nama||''}" class="w-full p-2 border rounded" required></div>
            <div><label class="block font-bold mb-1">Alamat</label><input type="text" id="f-alamat" value="${item.alamat||''}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Pimpinan</label><input type="text" id="f-pimpinan" value="${item.pimpinan||''}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Nilai Akreditasi</label><select id="f-nilai" class="w-full p-2 border rounded"><option value="Belum" ${item.nilai==='Belum'?'selected':''}>Belum</option><option value="A" ${item.nilai==='A'?'selected':''}>A</option><option value="B" ${item.nilai==='B'?'selected':''}>B</option><option value="C" ${item.nilai==='C'?'selected':''}>C</option></select></div>
            <div><label class="block font-bold mb-1">Tahun Akreditasi</label><input type="number" id="f-tahun" value="${item.tahun||'0'}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Masa Berlaku</label><input type="number" id="f-masa" value="${item.masa||'0'}" class="w-full p-2 border rounded"></div>
            <div class="sm:col-span-2"><label class="block font-bold mb-1">Nomor SK</label><input type="text" id="f-sk" value="${item.sk||'-'}" class="w-full p-2 border rounded"></div>
        `;
    } else if (type === 'operasional') {
        fieldsHtml = `
            <div><label class="block font-bold mb-1">NPSN</label><input type="text" id="f-npsn" value="${item.npsn||''}" class="w-full p-2 border rounded" required></div>
            <div><label class="block font-bold mb-1">Nama Lembaga</label><input type="text" id="f-nama" value="${item.nama||''}" class="w-full p-2 border rounded" required></div>
            <div><label class="block font-bold mb-1">Alamat</label><input type="text" id="f-alamat" value="${item.alamat||''}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Penanggung Jawab</label><input type="text" id="f-pimpinan" value="${item.pimpinan||''}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Tahun Terbit</label><input type="number" id="f-terbit" value="${item.terbit||'2026'}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Habis Masa Berlaku</label><input type="number" id="f-habis" value="${item.habis||'2029'}" class="w-full p-2 border rounded"></div>
            <div class="sm:col-span-2"><label class="block font-bold mb-1">Nomor SK Ijin</label><input type="text" id="f-sk" value="${item.sk||''}" class="w-full p-2 border rounded"></div>
        `;
    } else if (type === 'peserta') {
        fieldsHtml = `
            <div><label class="block font-bold mb-1">NPSN</label><input type="text" id="f-npsn" value="${item.npsn||''}" class="w-full p-2 border rounded" required></div>
            <div><label class="block font-bold mb-1">Nama LKP</label><input type="text" id="f-nama" value="${item.nama||''}" class="w-full p-2 border rounded" required></div>
            <div><label class="block font-bold mb-1">Kecamatan</label><input type="text" id="f-kec" value="${item.kec||''}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Jenis Kursus</label><input type="text" id="f-jenis" value="${item.jenis||''}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Siswa Utama (L)</label><input type="number" id="f-sl" value="${item.sl||0}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Siswa Utama (P)</label><input type="number" id="f-sp" value="${item.sp||0}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Nama Program</label><input type="text" id="f-prog" value="${item.prog||''}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Peserta Kursus (L)</label><input type="number" id="f-pl" value="${item.pl||0}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Peserta Kursus (P)</label><input type="number" id="f-pp" value="${item.pp||0}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Status Verval</label><select id="f-verval" class="w-full p-2 border rounded"><option value="Sudah" ${item.verval==='Sudah'?'selected':''}>Sudah Verval</option><option value="Belum" ${item.verval==='Belum'?'selected':''}>Belum Verval</option></select></div>
        `;
    } else if (type === 'program') {
        fieldsHtml = `
            <div><label class="block font-bold mb-1">NPSN</label><input type="text" id="f-npsn" value="${item.npsn||''}" class="w-full p-2 border rounded" required></div>
            <div><label class="block font-bold mb-1">Nama Lembaga</label><input type="text" id="f-nama" value="${item.nama||''}" class="w-full p-2 border rounded" required></div>
            <div class="sm:col-span-2"><label class="block font-bold mb-1">Alamat Singkat</label><input type="text" id="f-alamat" value="${item.alamat||''}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Level 1 (%)</label><input type="number" id="f-l1" value="${item.l1||0}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Level 2 (%)</label><input type="number" id="f-l2" value="${item.l2||0}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Level 3 (%)</label><input type="number" id="f-l3" value="${item.l3||0}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Level 4 (%)</label><input type="number" id="f-l4" value="${item.l4||0}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Level 5 (%)</label><input type="number" id="f-l5" value="${item.l5||0}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Level 6 (%)</label><input type="number" id="f-l6" value="${item.l6||0}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Level 7 (%)</label><input type="number" id="f-l7" value="${item.l7||0}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Level 8 (%)</label><input type="number" id="f-l8" value="${item.l8||0}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Level 9 (%)</label><input type="number" id="f-l9" value="${item.l9||0}" class="w-full p-2 border rounded"></div>
            <div><label class="block font-bold mb-1">Keterangan Label</label><input type="text" id="f-text" value="${item.text||'LEVEL 1'}" class="w-full p-2 border rounded" placeholder="Contoh: LEVEL 3"></div>
        `;
    }

    fieldsContainer.innerHTML = fieldsHtml;
    document.getElementById('crudModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('crudModal').classList.add('hidden');
}

// Simpan Data (Aksi Tambah & Edit)
function saveFormData(e) {
    e.preventDefault();
    const type = document.getElementById('form-type').value;
    const index = parseInt(document.getElementById('form-index').value);
    
    let obj = {};
    if (type === 'akreditasi') {
        obj = {
            npsn: document.getElementById('f-npsn').value,
            nama: document.getElementById('f-nama').value,
            alamat: document.getElementById('f-alamat').value,
            pimpinan: document.getElementById('f-pimpinan').value,
            nilai: document.getElementById('f-nilai').value,
            tahun: document.getElementById('f-tahun').value,
            masa: document.getElementById('f-masa').value,
            sk: document.getElementById('f-sk').value
        };
    } else if (type === 'operasional') {
        obj = {
            npsn: document.getElementById('f-npsn').value,
            nama: document.getElementById('f-nama').value,
            alamat: document.getElementById('f-alamat').value,
            pimpinan: document.getElementById('f-pimpinan').value,
            terbit: document.getElementById('f-terbit').value,
            habis: document.getElementById('f-habis').value,
            sk: document.getElementById('f-sk').value
        };
    } else if (type === 'peserta') {
        obj = {
            npsn: document.getElementById('f-npsn').value,
            nama: document.getElementById('f-nama').value,
            kec: document.getElementById('f-kec').value,
            jenis: document.getElementById('f-jenis').value,
            sl: parseInt(document.getElementById('f-sl').value) || 0,
            sp: parseInt(document.getElementById('f-sp').value) || 0,
            prog: document.getElementById('f-prog').value,
            pl: parseInt(document.getElementById('f-pl').value) || 0,
            pp: parseInt(document.getElementById('f-pp').value) || 0,
            verval: document.getElementById('f-verval').value
        };
    } else if (type === 'program') {
        obj = {
            npsn: document.getElementById('f-npsn').value,
            nama: document.getElementById('f-nama').value,
            alamat: document.getElementById('f-alamat').value,
            l1: parseInt(document.getElementById('f-l1').value) || 0,
            l2: parseInt(document.getElementById('f-l2').value) || 0,
            l3: parseInt(document.getElementById('f-l3').value) || 0,
            l4: parseInt(document.getElementById('f-l4').value) || 0,
            l5: parseInt(document.getElementById('f-l5').value) || 0,
            l6: parseInt(document.getElementById('f-l6').value) || 0,
            l7: parseInt(document.getElementById('f-l7').value) || 0,
            l8: parseInt(document.getElementById('f-l8').value) || 0,
            l9: parseInt(document.getElementById('f-l9').value) || 0,
            text: document.getElementById('f-text').value
        };
    }

    if (index > -1) {
        appData[type][index] = obj; // Proses Ubah/Edit data
    } else {
        appData[type].push(obj); // Proses Tambah data baru
    }

    renderAllTables();
    saveToStorage();
    closeModal();
}

// Fungsi Hapus Data
function deleteData(type, index) {
    if (confirm("Apakah Anda yakin ingin menghapus data LKP ini?")) {
        appData[type].splice(index, 1);
        renderAllTables();
        saveToStorage();
    }
}

function editData(type, index) {
    openModal(type, index);
}

// Ambil data distribusi Akreditasi untuk Chart
function getAkreditasiStats() {
    let counts = { A: 0, B: 0, C: 0, Belum: 0 };
    appData.akreditasi.forEach(item => {
        if (counts[item.nilai] !== undefined) counts[item.nilai]++;
    });
    return [counts.A, counts.B, counts.C, counts.Belum];
}

// Ambil data distribusi Gender untuk Chart
function getGenderStats() {
    let l = 0, p = 0;
    appData.peserta.forEach(i => {
        l += (Number(i.sl) + Number(i.pl));
        p += (Number(i.sp) + Number(i.pp));
    });
    return [l, p];
}

// Ambil data distribusi Verval untuk Chart
function getVervalStats() {
    let sudah = appData.peserta.filter(i => i.verval === 'Sudah').length;
    let belum = appData.peserta.filter(i => i.verval === 'Belum').length;
    return [sudah, belum];
}

// Inisialisasi Grafik Chart.js
function initCharts() {
    charts.bar = new Chart(document.getElementById('barChartAkreditasi').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Akreditasi A', 'Akreditasi B', 'Akreditasi C', 'Belum Terakreditasi'],
            datasets: [{
                data: getAkreditasiStats(),
                backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
                borderRadius: 5
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    charts.gender = new Chart(document.getElementById('donutGender').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Laki-Laki', 'Perempuan'],
            datasets: [{ data: getGenderStats(), backgroundColor: ['#0284c7', '#ec4899'] }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '65%' }
    });

    charts.verval = new Chart(document.getElementById('donutVerval').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Sudah Verval', 'Belum Verval'],
            datasets: [{ data: getVervalStats(), backgroundColor: ['#10b981', '#f97316'] }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '65%' }
    });
}

// Perbarui grafik secara otomatis setelah manipulasi data CRUD
function updateCharts() {
    if (charts.bar) {
        charts.bar.data.datasets[0].data = getAkreditasiStats();
        charts.bar.update();
    }
    if (charts.gender) {
        charts.gender.data.datasets[0].data = getGenderStats();
        charts.gender.update();
    }
    if (charts.verval) {
        charts.verval.data.datasets[0].data = getVervalStats();
        charts.verval.update();
    }
}

// Jalankan sistem saat dokumen web siap
document.addEventListener("DOMContentLoaded", initApp);
