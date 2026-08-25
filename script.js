let keranjang = [];


/* =========================
   TAMBAH KERANJANG
========================= */

function tambahKeranjang(nama, harga) {

    const produkLama = keranjang.find(
        item => item.nama === nama
    );

    if (produkLama) {

        produkLama.jumlah++;

    } else {

        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });

    }

    updateKeranjang();

    alert(nama + " berhasil ditambahkan ke keranjang!");
}


/* =========================
   UPDATE KERANJANG
========================= */

function updateKeranjang() {

    const jumlah = keranjang.reduce(
        (total, item) => total + item.jumlah,
        0
    );

    document.getElementById("jumlahKeranjang").textContent = jumlah;


    const isiKeranjang =
        document.getElementById("isiKeranjang");

    const totalHarga =
        document.getElementById("totalHarga");


    if (keranjang.length === 0) {

        isiKeranjang.innerHTML = `
            <p class="keranjang-kosong">
                Keranjang masih kosong.
            </p>
        `;

        totalHarga.textContent = "Rp 0";

        return;
    }


    let total = 0;

    isiKeranjang.innerHTML = "";


    keranjang.forEach((item, index) => {

        const subtotal =
            item.harga * item.jumlah;

        total += subtotal;


        isiKeranjang.innerHTML += `

            <div class="cart-item">

                <div>

                    <h4>${item.nama}</h4>

                    <p>
                        ${item.jumlah} x
                        Rp ${item.harga.toLocaleString("id-ID")}
                    </p>

                </div>

                <button
                    class="hapus-item"
                    onclick="hapusKeranjang(${index})"
                >
                    Hapus
                </button>

            </div>

        `;

    });


    totalHarga.textContent =
        "Rp " + total.toLocaleString("id-ID");
}


/* =========================
   HAPUS PRODUK
========================= */

function hapusKeranjang(index) {

    keranjang.splice(index, 1);

    updateKeranjang();
}


/* =========================
   BUKA KERANJANG
========================= */

function bukaKeranjang() {

    document
        .getElementById("cartModal")
        .classList.add("active");

}


/* =========================
   TUTUP KERANJANG
========================= */

function tutupKeranjang() {

    document
        .getElementById("cartModal")
        .classList.remove("active");

}


/* =========================
   FILTER KATEGORI
========================= */

function filterProduk(kategori) {

    const produk =
        document.querySelectorAll(".produk-card");


    produk.forEach(item => {

        if (
            kategori === "semua" ||
            item.dataset.kategori === kategori
        ) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });

}


/* =========================
   SEARCH PRODUK
========================= */

function cariProduk() {

    const keyword =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const produk =
        document.querySelectorAll(".produk-card");


    produk.forEach(item => {

        const nama =
            item
                .querySelector("h3")
                .textContent
                .toLowerCase();


        if (nama.includes(keyword)) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });

}


/* =========================
   CHECKOUT
========================= */

function checkout() {

    if (keranjang.length === 0) {

        alert("Keranjang masih kosong!");

        return;
    }


    const nama =
        document.getElementById("namaPembeli").value.trim();

    const nomor =
        document.getElementById("nomorPembeli").value.trim();

    const alamat =
        document.getElementById("alamatPembeli").value.trim();


    if (nama === "" || nomor === "" || alamat === "") {

        alert("Mohon lengkapi data pembeli terlebih dahulu.");

        return;
    }


    let pesan =
        "Halo ALAT TULIS KANTOR DICKY 👋%0A%0A";

    pesan +=
        "*Saya ingin melakukan pemesanan:*%0A%0A";


    pesan +=
        "*Nama:* " + nama + "%0A";

    pesan +=
        "*No. WhatsApp:* " + nomor + "%0A";

    pesan +=
        "*Alamat:* " + alamat + "%0A%0A";


    pesan +=
        "*Daftar Pesanan:*%0A";


    let total = 0;


    keranjang.forEach((item, index) => {

        const subtotal =
            item.harga * item.jumlah;

        total += subtotal;


        pesan +=
            `${index + 1}. ${item.nama} - ${item.jumlah} x Rp ${item.harga.toLocaleString("id-ID")} = Rp ${subtotal.toLocaleString("id-ID")}%0A`;

    });


    pesan += "%0A";

    pesan +=
        "*TOTAL: Rp " +
        total.toLocaleString("id-ID") +
        "*%0A%0A";

    pesan +=
        "Mohon diproses ya. Terima kasih 🙏";


    /*
       GANTI NOMOR INI
       dengan nomor WhatsApp toko kamu.

       Format:
       628xxxxxxxxxx

       Jangan menggunakan:
       +62
       08
       tanda -
    */

    const nomorToko = "6281234567890";


    const url =
        "https://wa.me/" +
        nomorToko +
        "?text=" +
        pesan;


    window.open(url, "_blank");

}