document.addEventListener('DOMContentLoaded', () => {
    // Set current date
    const dateEl = document.getElementById('currentDate');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = new Date().toLocaleDateString('id-ID', options);

    // Group 6 Data: 6 Machines
    const machines = [
        { id: "HD-01", status: "Aktif", note: "Siap digunakan" },
        { id: "HD-02", status: "Aktif", note: "Siap digunakan" },
        { id: "HD-03", status: "Maintenance", note: "Kalibrasi s.d 13.00" },
        { id: "HD-04", status: "Aktif", note: "Siap digunakan" },
        { id: "HD-05", status: "Aktif", note: "Perlu cek filter" },
        { id: "HD-06", status: "Aktif", note: "Siap digunakan" }
    ];

    // Group 6 Data: 15 Patients with Synthetic Names and "Risk Level" Feature
    const schedules = [
        { patient: "P001  ", risk: "Rendah", session: "Pagi",  machine: "HD-01", start: "07:00", end: "11:00", status: "Selesai",     note: "-" },
        { patient: "P002  ", risk: "Tinggi", session: "Pagi",  machine: "HD-02", start: "07:00", end: "11:00", status: "Berlangsung", note: "Tensi berfluktuasi" },
        { patient: "P003  ", risk: "Sedang", session: "Pagi",  machine: "HD-04", start: "07:00", end: "11:00", status: "Terlambat",  note: "Datang telat 25 menit" },
        { patient: "P004  ", risk: "Rendah", session: "Pagi",  machine: "HD-05", start: "07:00", end: "11:00", status: "Selesai",     note: "-" },
        { patient: "P005  ", risk: "Rendah", session: "Pagi",  machine: "HD-06", start: "07:00", end: "11:00", status: "Berlangsung", note: "-" },
        { patient: "P006  ", risk: "Sedang", session: "Pagi",  machine: "HD-03", start: "-", end: "-", status: "Batal",       note: "Mesin maintenance" },
        { patient: "P007  ", risk: "Tinggi", session: "Pagi",  machine: "HD-01", start: "11:15", end: "15:15", status: "Menunggu",   note: "Overlapping jadwal HD-01" },
        { patient: "P008  ", risk: "Sedang", session: "Pagi",  machine: "HD-02", start: "11:15", end: "15:15", status: "Menunggu",   note: "Ganti jadwal" },
        { patient: "P009  ",  risk: "Rendah", session: "Siang", machine: "HD-01", start: "13:00", end: "17:00", status: "Terjadwal",   note: "-" },
        { patient: "P010  ", risk: "Sedang", session: "Siang", machine: "HD-02", start: "13:00", end: "17:00", status: "Terjadwal",   note: "Bawa hasil lab baru" },
        { patient: "P011  ", risk: "Rendah", session: "Siang", machine: "HD-03", start: "13:30", end: "17:30", status: "Terjadwal",   note: "Setelah maintenance" },
        { patient: "P012  ", risk: "Rendah", session: "Siang", machine: "HD-04", start: "13:00", end: "17:00", status: "Terjadwal",    note: "-" },
        { patient: "P013  ", risk: "Tinggi", session: "Siang", machine: "HD-05", start: "13:00", end: "17:00", status: "Terjadwal",   note: "-" },
        { patient: "P014  ", risk: "Rendah", session: "Siang", machine: "HD-06", start: "13:00", end: "17:00", status: "Terjadwal",   note: "-" },
        { patient: "P015  ", risk: "Sedang", session: "Siang", machine: "HD-01", start: "17:30", end: "21:30", status: "Terjadwal",   note: "Shift ekstra" }
    ];

    const SESSION_CAPACITY = 8;

    const tbody = document.getElementById('scheduleBody');
    const filterSession = document.getElementById('filterSession');
    const filterStatus = document.getElementById('filterStatus');
    const filterMachine = document.getElementById('filterMachine');
    const searchInput = document.getElementById('searchPatient');
    const resetBtn = document.getElementById('resetBtn');
    const warningArea = document.getElementById('warningArea');
    const machineGrid = document.getElementById('machineGrid');

    const getStatusClass = (status) => {
        return `status-${status.toLowerCase().replace(' ', '-')}`;
    };

    const getRiskClass = (risk) => {
        return `risk-${risk.toLowerCase()}`;
    };

    const getSessionClass = (session) => {
        return `session-${session.toLowerCase()}`;
    };

    machines.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.id;
        filterMachine.appendChild(opt);
    });

    function renderDashboard() {
        const sSess = filterSession.value;
        const sStat = filterStatus.value;
        const sMach = filterMachine.value;
        const keyword = searchInput.value.toUpperCase().trim();

        const filtered = schedules.filter(p => {
            return (sSess === 'Semua' || p.session === sSess) &&
                   (sStat === 'Semua' || p.status === sStat) &&
                   (sMach === 'Semua' || p.machine === sMach) &&
                   (p.patient.toUpperCase().includes(keyword)); // Pencarian mencakup Nama dan ID
        });

        document.getElementById('visibleCount').textContent = filtered.length;
        tbody.innerHTML = '';

        if(filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--text-muted);">Tidak ada data jadwal yang sesuai dengan filter.</td></tr>`;
        }

        filtered.forEach((p, idx) => {
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td><strong style="color: var(--text-main);">${p.patient}</strong></td>
                <td><span class="badge ${getRiskClass(p.risk)}">${p.risk}</span></td>
                <td><span class="session-badge ${getSessionClass(p.session)}">${p.session}</span></td>
                <td style="color: var(--text-muted); font-size: 0.85rem;">${p.start} - ${p.end}</td>
                <td style="font-weight: 600;">${p.machine}</td>
                <td><span class="badge ${getStatusClass(p.status)}">${p.status}</span></td>
                <td style="color: var(--text-muted); font-size: 0.85rem; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${p.note}">${p.note}</td>
            `;
            tbody.appendChild(tr);
        });

        updateSummary();
        renderMachines();
        renderWarnings();
        updateSessions();
    }

    function updateSummary() {
        document.getElementById('countTotal').textContent = schedules.length;
        document.getElementById('countSelesai').textContent = schedules.filter(s => s.status === 'Selesai').length;
        document.getElementById('countBerlangsung').textContent = schedules.filter(s => s.status === 'Berlangsung').length;
        document.getElementById('countMenunggu').textContent = schedules.filter(s => s.status === 'Menunggu').length;
        document.getElementById('countTerlambat').textContent = schedules.filter(s => s.status === 'Terlambat').length;
        document.getElementById('countBatal').textContent = schedules.filter(s => s.status === 'Batal').length;
    }

    function renderMachines() {
        machineGrid.innerHTML = '';
        machines.forEach(m => {
            let stateClass = 'available';
            let statusHtml = '<span class="machine-status-text mt-emerald">🟢 Tersedia</span>';
            
            if (m.status === 'Maintenance') {
                stateClass = 'maintenance';
                statusHtml = '<span class="machine-status-text mt-red">🔴 Perbaikan</span>';
            } else {
                const inUse = schedules.some(s => s.machine === m.id && s.status === 'Berlangsung');
                if (inUse) {
                    stateClass = 'in-use';
                    statusHtml = '<span class="machine-status-text mt-purple">🟣 Dipakai</span>';
                }
            }

            const card = document.createElement('div');
            card.className = `machine-card ${stateClass}`;
            card.innerHTML = `
                <strong>${m.id}</strong>
                <small>${m.note}</small>
                ${statusHtml}
            `;
            machineGrid.appendChild(card);
        });
    }

    function findConflicts() {
        const conflicts = [];
        for (let i = 0; i < schedules.length; i++) {
            for (let j = i + 1; j < schedules.length; j++) {
                const a = schedules[i], b = schedules[j];
                if (a.machine === b.machine && a.session === b.session && a.start === b.start && a.status !== "Batal" && b.status !== "Batal") {
                    // Extract IDs to keep warning readable
                    const aID = a.patient.split(' - ')[0];
                    const bID = b.patient.split(' - ')[0];
                    conflicts.push(`${a.machine} (${aID} & ${bID})`);
                }
            }
        }
        return conflicts;
    }

    function renderWarnings() {
        warningArea.innerHTML = '';
        const warnings = [];

        // Rule 1: Scheduled on Maintenance Machine
        const maintenanceIds = machines.filter(m => m.status === 'Maintenance').map(m => m.id);
        const maintenanceConflicts = schedules.filter(s => maintenanceIds.includes(s.machine) && s.status !== 'Batal');
        if (maintenanceConflicts.length > 0) {
            warnings.push({ 
                type: 'danger', icon: '🚨', 
                title: 'Jadwal di Mesin Rusak', 
                desc: `Pasien ${maintenanceConflicts.map(s=>s.patient.split(' - ')[0]).join(', ')} dialokasikan ke mesin maintenance.` 
            });
        }

        // Rule 2: Overbooking / Conflicts
        const conflicts = findConflicts();
        if (conflicts.length > 0) {
            warnings.push({ 
                type: 'danger', icon: '⚠️', 
                title: 'Bentrok Jadwal Terdeteksi', 
                desc: `Overbooking di: ${conflicts.join(', ')}` 
            });
        }

        // Rule 3: Late Patients
        const late = schedules.filter(s => s.status === 'Terlambat');
        if (late.length > 0) {
            warnings.push({ 
                type: 'warning', icon: '⏱️', 
                title: 'Keterlambatan Pasien', 
                desc: `Terdapat ${late.length} pasien terlambat. Jadwal selanjutnya berisiko mundur.` 
            });
        }

        // Rule 4: High risk waiting
        const highRiskWaiting = schedules.filter(s => s.status === 'Menunggu' && s.risk === 'Tinggi');
        if (highRiskWaiting.length > 0) {
            warnings.push({ 
                type: 'warning', icon: '🩺', 
                title: 'Perhatian Klinis (Risiko Tinggi)', 
                desc: `Pasien ${highRiskWaiting.map(s=>s.patient.split(' - ')[0]).join(', ')} berstatus menunggu. Segera lakukan asesmen klinis.` 
            });
        }

        if (warnings.length === 0) {
            warningArea.innerHTML = `
                <div class="warning-card success" style="grid-column: 1 / -1;">
                    <div style="font-size: 1.5rem;">✅</div>
                    <div>
                        <strong>Sistem Berjalan Optimal</strong>
                        <span>Tidak ditemukan konflik jadwal, masalah mesin, atau peringatan klinis saat ini.</span>
                    </div>
                </div>`;
            return;
        }

        warnings.forEach(w => {
            const div = document.createElement('div');
            div.className = `warning-card ${w.type}`;
            div.innerHTML = `
                <div style="font-size: 1.5rem;">${w.icon}</div>
                <div>
                    <strong>${w.title}</strong>
                    <span>${w.desc}</span>
                </div>
            `;
            warningArea.appendChild(div);
        });
    }

    function updateSessions() {
        ['Pagi', 'Siang'].forEach(sess => {
            const count = schedules.filter(s => s.session === sess && s.status !== 'Batal').length;
            const pct = Math.min((count / SESSION_CAPACITY) * 100, 100);
            
            document.getElementById(`${sess.toLowerCase()}Text`).textContent = `${count} / ${SESSION_CAPACITY} Pasien`;
            const bar = document.getElementById(`${sess.toLowerCase()}Bar`);
            
            setTimeout(() => {
                bar.style.width = `${pct}%`;
            }, 50);
            
            if(pct >= 100) {
                bar.classList.add('over-capacity');
            } else {
                bar.classList.remove('over-capacity');
            }
        });
    }

    filterSession.addEventListener('change', renderDashboard);
    filterStatus.addEventListener('change', renderDashboard);
    filterMachine.addEventListener('change', renderDashboard);
    searchInput.addEventListener('input', renderDashboard);

    resetBtn.addEventListener('click', () => {
        filterSession.value = 'Semua';
        filterStatus.value = 'Semua';
        filterMachine.value = 'Semua';
        searchInput.value = '';
        renderDashboard();
    });

    renderDashboard();
});