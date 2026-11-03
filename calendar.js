let nomor = 1;
let calendar;

// Jalankan saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    // Inisialisasi Kalender
    let calendarEl = document.getElementById("calendar");

    if (calendarEl) {

        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: "dayGridMonth",

            headerToolbar: {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek"
            },

            events: []
        });

        calendar.render();
    }

    // Tombol Tambah
    const btnTambah = document.getElementById("btnTambah");

    if(btnTambah){

        btnTambah.addEventListener("click", function(){

            let tugas = document.getElementById("namaTugas").value;
            let matkul = document.getElementById("mataKuliah").value;
            let deadline = document.getElementById("deadline").value;

            if(tugas === "" || deadline === ""){
                alert("Lengkapi data terlebih dahulu!");
                return;
            }

            let tabel = document.getElementById("dataTugas");

            tabel.innerHTML += `
            <tr>

                <td>${nomor}</td>

                <td>${tugas}</td>

                <td>${matkul}</td>

                <td>${deadline}</td>

                <td>
                    <span class="badge bg-warning">
                        Aktif
                    </span>
                </td>

                <td>

                    <button class="btn btn-warning btn-sm edit">
                        Edit
                    </button>

                    <button class="btn btn-danger btn-sm hapus">
                        Hapus
                    </button>

                </td>

            </tr>
            `;

            // TAMBAH KE KALENDER
            calendar.addEvent({
                id: "task" + nomor,
                title: `${matkul} - ${tugas}`,
                start: deadline,
                color: "#0d6efd"
            });

            nomor++;

            updateLaporan();

            document.getElementById("namaTugas").value = "";
            document.getElementById("deadline").value = "";
        });

    }

    // Search
    const search = document.getElementById("search");

    if(search){

        search.addEventListener("keyup", function(){

            let keyword =
            this.value.toLowerCase();

            let rows =
            document.querySelectorAll("#dataTugas tr");

            rows.forEach(function(row){

                row.style.display =
                row.innerText.toLowerCase()
                .includes(keyword)

                ? ""

                : "none";

            });

        });

    }

});

// Edit & Hapus
document.addEventListener("click", function(e){

    // Hapus
    if(e.target.classList.contains("hapus")){

        e.target.closest("tr").remove();

        updateLaporan();
    }

    // Edit
    if(e.target.classList.contains("edit")){

        let row = e.target.closest("tr");

        let tugasBaru =
        prompt(
            "Edit Nama Tugas",
            row.cells[1].innerText
        );

        if(tugasBaru){
            row.cells[1].innerText = tugasBaru;
        }
    }

});

// Update Statistik
function updateLaporan(){

    let total =
    document.querySelectorAll("#dataTugas tr").length;

    let totalTugas =
    document.getElementById("totalTugas");

    let aktif =
    document.getElementById("aktif");

    let laporanTotal =
    document.getElementById("laporanTotal");

    let laporanAktif =
    document.getElementById("laporanAktif");

    if(totalTugas) totalTugas.innerText = total;
    if(aktif) aktif.innerText = total;
    if(laporanTotal) laporanTotal.innerText = total;
    if(laporanAktif) laporanAktif.innerText = total;
}