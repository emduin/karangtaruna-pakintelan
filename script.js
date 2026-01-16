// SISTEM LOGIN
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const errorMsg = document.getElementById('error-msg');

        // Only admin login is allowed
        if (user === 'admin' && pass === '123') {
            sessionStorage.setItem('isAuth', 'true');
            sessionStorage.setItem('userRole', 'admin');
            window.location.href = 'dashboard.html';
        } else {
            errorMsg.innerText = "Akun admin tidak ditemukan!";
        }
    });
}

// SISTEM LOGOUT
function logout() {
    sessionStorage.removeItem('isAuth');
    window.location.href = 'login.html';
}
// Fungsi untuk mengganti konten Dashboard
function gantiMenu(menu) {
    const content = document.getElementById('dynamic-content');
    const title = document.getElementById('page-title');

    // Reset status active pada menu sidebar
    document.querySelectorAll('.side-menu a').forEach(a => a.classList.remove('active'));

    // Reset status active pada menu horizontal
    document.querySelectorAll('.horizontal-menu .menu-item').forEach(a => a.classList.remove('active'));

    if (menu === 'statistik') {
        title.innerText = "Statistik Organisasi";
        content.innerHTML = `
            <div class="stats-cards">
                <div class="card"><h3>154</h3><p>Anggota</p></div>
                <div class="card"><h3>4</h3><p>Kegiatan</p></div>
                <div class="card"><h3>Rp 3.2jt</h3><p>Kas</p></div>
            </div>
            <div class="chart-dummy" style="height:200px; background:#eee; margin-top:20px; display:flex; align-items:center; justify-content:center; border-radius:10px;">
                [ Grafik Pertumbuhan Anggota ]
            </div>`;
        // Set active pada menu horizontal
        document.querySelector('.horizontal-menu .menu-item:nth-child(1)').classList.add('active');
        // Set active pada menu sidebar
        document.querySelector('.side-menu a:nth-child(2)').classList.add('active');
    }
    else if (menu === 'anggota') {
        title.innerText = "Data Anggota";
        content.innerHTML = `
            <div class="member-management">
                <div class="member-actions">
                    <button class="btn-primary" onclick="showAddMemberForm()">+ Tambah Anggota</button>
                </div>
                <div id="member-form-container" style="display: none;">
                    <div class="member-form-card">
                        <h3 id="member-form-title">Tambah Anggota Baru</h3>
                        <form id="member-form">
                            <div class="form-group">
                                <label for="member-name">Nama Lengkap:</label>
                                <input type="text" id="member-name" required>
                            </div>
                            <div class="form-group">
                                <label for="member-position">Jabatan:</label>
                                <input type="text" id="member-position" required>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn-primary">Simpan</button>
                                <button type="button" class="btn-secondary" onclick="hideMemberForm()">Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="member-container" class="member-container">
                    <!-- Member items will be loaded here -->
                </div>
            </div>`;

        // Load existing members
        loadMembers();

        // Add form event listener
        document.getElementById('member-form').addEventListener('submit', handleMemberSubmit);

        // Set active pada menu sidebar
        document.querySelector('.side-menu a:nth-child(3)').classList.add('active');
    }
    else if (menu === 'kas') {
        title.innerText = "Laporan Kas Organisasi";
        content.innerHTML = `
            <div class="card">
                <h3>Total Saldo: Rp 3.250.000</h3>
                <hr style="margin:15px 0;">
                <ul>
                    <li>- Iuran Bulanan Des: + Rp 500.000</li>
                    <li>- Konsumsi Rapat: - Rp 150.000</li>
                    <li>- Sewa Alat Musik: - Rp 300.000</li>
                </ul>
            </div>`;

        // Set active pada menu sidebar
        document.querySelector('.side-menu a:nth-child(4)').classList.add('active');
    }
    else if (menu === 'berita') {
        title.innerText = "Berita Kegiatan";
        content.innerHTML = `
            <div class="news-management">
                <div class="news-actions">
                    <button class="btn-primary" onclick="showAddNewsForm()">+ Tambah Berita Baru</button>
                </div>
                <div id="news-form-container" style="display: none;">
                    <div class="news-form-card">
                        <h3 id="form-title">Tambah Berita Baru</h3>
                        <form id="news-form">
                            <div class="form-group">
                                <label for="news-title">Judul Berita:</label>
                                <input type="text" id="news-title" required>
                            </div>
                            <div class="form-group">
                                <label for="news-date">Tanggal:</label>
                                <input type="date" id="news-date" required>
                            </div>
                            <div class="form-group">
                                <label for="news-content">Isi Berita:</label>
                                <textarea id="news-content" rows="6" required></textarea>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn-primary">Simpan</button>
                                <button type="button" class="btn-secondary" onclick="hideNewsForm()">Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="news-container" class="news-container">
                    <!-- News items will be loaded here -->
                </div>
            </div>`;

        // Load existing news
        loadNewsItems();

        // Add form event listener
        document.getElementById('news-form').addEventListener('submit', handleNewsSubmit);

        // Set active pada menu horizontal
        document.querySelector('.horizontal-menu .menu-item:nth-child(2)').classList.add('active');
        // Set active pada menu sidebar
        document.querySelector('.side-menu a:nth-child(5)').classList.add('active');
    }
    else if (menu === 'galeri') {
        title.innerText = "Galeri Kegiatan";
        content.innerHTML = `
            <div class="gallery-container">
                <div class="upload-section">
                    <input type="file" id="photo-upload" multiple accept="image/*" style="display: none;">
                    <button class="btn-primary" onclick="document.getElementById('photo-upload').click();">📸 Upload Foto Kegiatan</button>
                    <p style="margin-top: 10px; color: #666; font-size: 0.9em;">Pilih satu atau lebih foto untuk ditambahkan ke galeri</p>
                </div>
                <div id="photo-gallery" class="photo-gallery">
                    <!-- Photos will be displayed here -->
                </div>
            </div>`;

        // Load existing photos from localStorage
        loadGalleryPhotos();

        // Add event listener for file upload
        document.getElementById('photo-upload').addEventListener('change', handlePhotoUpload);

        // Set active pada menu horizontal
        document.querySelector('.horizontal-menu .menu-item:nth-child(3)').classList.add('active');
        // Set active pada menu sidebar
        document.querySelector('.side-menu a:nth-child(6)').classList.add('active');
    }
}

// Fungsi untuk memuat anggota dari localStorage
function loadMembers() {
    const container = document.getElementById('member-container');
    let members = JSON.parse(localStorage.getItem('members') || '[]');

    // Initialize with default members if empty
    if (members.length === 0) {
        members = [
            {
                id: Date.now(),
                name: "Ahmad Surya",
                position: "Ketua Karang Taruna"
            },
            {
                id: Date.now() + 1,
                name: "Siti Nurhaliza",
                position: "Sekretaris"
            },
            {
                id: Date.now() + 2,
                name: "Budi Santoso",
                position: "Bendahara"
            }
        ];
        localStorage.setItem('members', JSON.stringify(members));
    }

    container.innerHTML = '';
    members.forEach((member, index) => {
        const memberItem = document.createElement('div');
        memberItem.className = 'member-item';
        memberItem.innerHTML = `
            <div class="member-info">
                <h3>${member.name}</h3>
                <p>${member.position}</p>
            </div>
            <div class="admin-actions">
                <button class="btn-edit" onclick="editMember(${member.id})">✏️ Edit</button>
                <button class="btn-delete" onclick="deleteMember(${member.id})">🗑️ Hapus</button>
            </div>
        `;
        container.appendChild(memberItem);
    });
}

// Fungsi untuk menampilkan form tambah anggota
function showAddMemberForm() {
    document.getElementById('member-form-title').innerText = 'Tambah Anggota Baru';
    document.getElementById('member-form').reset();
    document.getElementById('member-form-container').style.display = 'block';
    document.getElementById('member-name').focus();
}

// Fungsi untuk menyembunyikan form anggota
function hideMemberForm() {
    document.getElementById('member-form-container').style.display = 'none';
    document.getElementById('member-form').reset();
}

// Fungsi untuk menangani submit form anggota
function handleMemberSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('member-name').value;
    const position = document.getElementById('member-position').value;

    let members = JSON.parse(localStorage.getItem('members') || '[]');

    // Check if editing existing member
    const editingId = document.getElementById('member-form').dataset.editingId;
    if (editingId) {
        const index = members.findIndex(item => item.id == editingId);
        if (index !== -1) {
            members[index] = { ...members[index], name, position };
        }
        delete document.getElementById('member-form').dataset.editingId;
    } else {
        // Add new member
        const newMember = {
            id: Date.now(),
            name,
            position
        };
        members.unshift(newMember); // Add to beginning
    }

    localStorage.setItem('members', JSON.stringify(members));
    loadMembers();
    hideMemberForm();
}

// Fungsi untuk edit anggota
function editMember(id) {
    const members = JSON.parse(localStorage.getItem('members') || '[]');
    const member = members.find(item => item.id == id);

    if (member) {
        document.getElementById('member-form-title').innerText = 'Edit Anggota';
        document.getElementById('member-name').value = member.name;
        document.getElementById('member-position').value = member.position;
        document.getElementById('member-form').dataset.editingId = id;
        document.getElementById('member-form-container').style.display = 'block';
        document.getElementById('member-name').focus();
    }
}

// Fungsi untuk hapus anggota
function deleteMember(id) {
    if (confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
        let members = JSON.parse(localStorage.getItem('members') || '[]');
        members = members.filter(item => item.id != id);
        localStorage.setItem('members', JSON.stringify(members));
        loadMembers();
    }
}

// Fungsi untuk memuat foto dari localStorage
function loadGalleryPhotos() {
    const gallery = document.getElementById('photo-gallery');
    let photos = JSON.parse(localStorage.getItem('galleryPhotos') || '[]');

    // Initialize with default photos if empty
    if (photos.length === 0) {
        photos = [
            {
                src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TZGFtYmVsIEZvdG8gS2VnaWF0YW48L3RleHQ+PC9zdmc+",
                name: "default-photo-1.jpg",
                description: ""
            },
            {
                src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Gb3RvIEtFZ2lhdGFuIDI8L3RleHQ+PC9zdmc+",
                name: "default-photo-2.jpg",
                description: ""
            },
            {
                src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5HYWxlcmkgS2VnZWlhdGFuPC90ZXh0Pjwvc3ZnPg==",
                name: "default-photo-3.jpg",
                description: ""
            }
        ];
        localStorage.setItem('galleryPhotos', JSON.stringify(photos));
    }

    gallery.innerHTML = '';
    photos.forEach((photoData, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <img src="${photoData.src}" alt="Foto Kegiatan ${index + 1}">
            <textarea id="desc-${index}" placeholder="Tambahkan deskripsi foto..." rows="2" style="width: 100%; margin-top: 10px; padding: 5px; border: 1px solid #ddd; border-radius: 4px;">${photoData.description || ''}</textarea>
            <button class="btn-primary" onclick="saveDescription(${index})" style="margin-top: 5px; font-size: 0.8em;">💾 Simpan Deskripsi</button>
            <button class="delete-btn" onclick="deletePhoto(${index})">🗑️</button>
        `;
        gallery.appendChild(photoItem);
    });
}

// Fungsi untuk menangani upload foto
function handlePhotoUpload(event) {
    const files = event.target.files;
    const photos = JSON.parse(localStorage.getItem('galleryPhotos') || '[]');

    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                photos.push({ src: e.target.result, name: file.name, description: '' });
                localStorage.setItem('galleryPhotos', JSON.stringify(photos));
                loadGalleryPhotos();
            };
            reader.readAsDataURL(file);
        }
    });

    // Reset input
    event.target.value = '';
}

// Fungsi untuk menghapus foto
function deletePhoto(index) {
    const photos = JSON.parse(localStorage.getItem('galleryPhotos') || '[]');
    photos.splice(index, 1);
    localStorage.setItem('galleryPhotos', JSON.stringify(photos));
    loadGalleryPhotos();
}

// Fungsi untuk menyimpan deskripsi foto
function saveDescription(index) {
    const photos = JSON.parse(localStorage.getItem('galleryPhotos') || '[]');
    const textarea = document.getElementById(`desc-${index}`);
    if (photos[index] && textarea) {
        photos[index].description = textarea.value;
        localStorage.setItem('galleryPhotos', JSON.stringify(photos));
        alert('Deskripsi berhasil disimpan!');
    }
}

// Fungsi untuk memuat berita dari localStorage
function loadNewsItems() {
    const container = document.getElementById('news-container');
    let newsItems = JSON.parse(localStorage.getItem('newsItems') || '[]');

    // Initialize with default news if empty
    if (newsItems.length === 0) {
        newsItems = [
            {
                id: Date.now(),
                title: "Gotong Royong Bersih Desa",
                date: "2023-10-15",
                content: "Karang Taruna Desa Tangkup mengadakan kegiatan gotong royong bersih desa di area persawahan. Acara ini diikuti oleh 50 anggota dan warga setempat."
            },
            {
                id: Date.now() + 1,
                title: "Pelatihan Keterampilan Wirausaha",
                date: "2023-10-10",
                content: "Pelatihan keterampilan wirausaha bagi pemuda desa telah berhasil dilaksanakan. Peserta belajar tentang manajemen usaha kecil dan menengah."
            },
            {
                id: Date.now() + 2,
                title: "Bakti Sosial Posyandu",
                date: "2023-10-05",
                content: "Anggota Karang Taruna membantu kegiatan posyandu di balai desa, memberikan edukasi kesehatan dan bantuan bagi ibu hamil dan balita."
            }
        ];
        localStorage.setItem('newsItems', JSON.stringify(newsItems));
    }

    container.innerHTML = '';
    newsItems.forEach((news, index) => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <div class="news-header">
                <h3>${news.title}</h3>
                <span class="news-date">${formatDate(news.date)}</span>
            </div>
            <p>${news.content}</p>
            <div class="news-actions">
                <a href="#" class="news-link">Baca Selengkapnya →</a>
                <div class="admin-actions">
                    <button class="btn-edit" onclick="editNews(${news.id})">✏️ Edit</button>
                    <button class="btn-delete" onclick="deleteNews(${news.id})">🗑️ Hapus</button>
                </div>
            </div>
        `;
        container.appendChild(newsItem);
    });
}

// Fungsi untuk menampilkan form tambah berita
function showAddNewsForm() {
    document.getElementById('form-title').innerText = 'Tambah Berita Baru';
    document.getElementById('news-form').reset();
    document.getElementById('news-form-container').style.display = 'block';
    document.getElementById('news-title').focus();
}

// Fungsi untuk menyembunyikan form
function hideNewsForm() {
    document.getElementById('news-form-container').style.display = 'none';
    document.getElementById('news-form').reset();
}

// Fungsi untuk menangani submit form berita
function handleNewsSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('news-title').value;
    const date = document.getElementById('news-date').value;
    const content = document.getElementById('news-content').value;

    let newsItems = JSON.parse(localStorage.getItem('newsItems') || '[]');

    // Check if editing existing news
    const editingId = document.getElementById('news-form').dataset.editingId;
    if (editingId) {
        const index = newsItems.findIndex(item => item.id == editingId);
        if (index !== -1) {
            newsItems[index] = { ...newsItems[index], title, date, content };
        }
        delete document.getElementById('news-form').dataset.editingId;
    } else {
        // Add new news
        const newNews = {
            id: Date.now(),
            title,
            date,
            content
        };
        newsItems.unshift(newNews); // Add to beginning
    }

    localStorage.setItem('newsItems', JSON.stringify(newsItems));
    loadNewsItems();
    hideNewsForm();
}

// Fungsi untuk edit berita
function editNews(id) {
    const newsItems = JSON.parse(localStorage.getItem('newsItems') || '[]');
    const news = newsItems.find(item => item.id == id);

    if (news) {
        document.getElementById('form-title').innerText = 'Edit Berita';
        document.getElementById('news-title').value = news.title;
        document.getElementById('news-date').value = news.date;
        document.getElementById('news-content').value = news.content;
        document.getElementById('news-form').dataset.editingId = id;
        document.getElementById('news-form-container').style.display = 'block';
        document.getElementById('news-title').focus();
    }
}

// Fungsi untuk hapus berita
function deleteNews(id) {
    if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
        let newsItems = JSON.parse(localStorage.getItem('newsItems') || '[]');
        newsItems = newsItems.filter(item => item.id != id);
        localStorage.setItem('newsItems', JSON.stringify(newsItems));
        loadNewsItems();
    }
}

// Fungsi untuk format tanggal
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

// Fungsi untuk menangani tampilan berdasarkan role
function handleRoleBasedDisplay() {
    const userRole = sessionStorage.getItem('userRole');
    const userContent = document.getElementById('user-content');
    const dashboardLink = document.querySelector('a[href="dashboard.html"]');

    if (userRole === 'admin') {
        // Admin: hide public content, show dashboard link
        if (userContent) userContent.style.display = 'none';
        if (dashboardLink) dashboardLink.style.display = 'inline-block';
    } else {
        // Non-admin (public users): always show public content, remove dashboard link
        if (userContent) userContent.style.display = 'block';
        if (dashboardLink) dashboardLink.parentElement.removeChild(dashboardLink);

        // Public content sections will be loaded on demand when clicked
    }
}

// Fungsi untuk memuat berita publik (tanpa tombol edit/hapus)
function loadPublicNews() {
    const container = document.getElementById('public-news-container');
    if (!container) return;

    let newsItems = JSON.parse(localStorage.getItem('newsItems') || '[]');

    // Initialize with default news if empty
    if (newsItems.length === 0) {
        newsItems = [
            {
                id: Date.now(),
                title: "Gotong Royong Bersih Desa",
                date: "2023-10-15",
                content: "Karang Taruna Desa Tangkup mengadakan kegiatan gotong royong bersih desa di area persawahan. Acara ini diikuti oleh 50 anggota dan warga setempat."
            },
            {
                id: Date.now() + 1,
                title: "Pelatihan Keterampilan Wirausaha",
                date: "2023-10-10",
                content: "Pelatihan keterampilan wirausaha bagi pemuda desa telah berhasil dilaksanakan. Peserta belajar tentang manajemen usaha kecil dan menengah."
            },
            {
                id: Date.now() + 2,
                title: "Bakti Sosial Posyandu",
                date: "2023-10-05",
                content: "Anggota Karang Taruna membantu kegiatan posyandu di balai desa, memberikan edukasi kesehatan dan bantuan bagi ibu hamil dan balita."
            }
        ];
        localStorage.setItem('newsItems', JSON.stringify(newsItems));
    }

    container.innerHTML = '';
    newsItems.forEach((news) => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <div class="news-header">
                <h3>${news.title}</h3>
                <span class="news-date">${formatDate(news.date)}</span>
            </div>
            <p>${news.content}</p>
            <div class="news-actions">
                <a href="#" class="news-link">Baca Selengkapnya →</a>
            </div>
        `;
        container.appendChild(newsItem);
    });
}

// Fungsi untuk memuat galeri publik
function loadPublicGallery() {
    const gallery = document.getElementById('public-gallery-container');
    if (!gallery) return;

    const photos = JSON.parse(localStorage.getItem('galleryPhotos') || '[]');

    gallery.innerHTML = '';
    if (photos.length > 0) {
        photos.forEach((photoData, index) => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.innerHTML = `
                <img src="${photoData.src}" alt="Foto Kegiatan ${index + 1}">
            `;
            gallery.appendChild(photoItem);
        });
    } else {
        gallery.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Belum ada foto di galeri.</p>';
    }
}

// Function to show specific section
function showSection(sectionId) {
    const userContent = document.getElementById('user-content');
    if (userContent && userContent.style.display === 'none') {
        userContent.style.display = 'block';
    }

    // Hide all sections
    const sections = document.querySelectorAll('.public-stats, .public-news, .public-gallery');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Load content for specific sections
    if (sectionId === 'public-news') {
        loadPublicNews();
    } else if (sectionId === 'public-gallery') {
        loadPublicGallery();
    }

    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize role-based display when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        handleRoleBasedDisplay();
        // Load all public content for non-admin users
        if (!sessionStorage.getItem('userRole') || sessionStorage.getItem('userRole') !== 'admin') {
            loadPublicNews();
            loadPublicGallery();
        }
    }
    if (window.location.pathname.includes('dashboard.html')) {
        gantiMenu('statistik'); // Load default content
    }
});
