// ======================
// 1. Hamburger Menu
// ======================
const menuIcon = document.getElementById("menu-icon");
const navList = document.getElementById("nav-list");
const overlay = document.getElementById("overlay");

// Toggle the navbar menu and overlay when hamburger icon is clicked
menuIcon.addEventListener("click", () => {
  navList.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Close the navbar when the overlay is clicked
overlay.addEventListener("click", () => {
  navList.classList.remove("active");
  overlay.classList.remove("active");
});

// ======================
// 2. Hidden Menu
// ======================
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    const cardType = card.getAttribute("data-category");
    const menuContainer = document.querySelector(`[data-menu="${cardType}"]`);

    // Tampilkan menu yang sesuai
    menuContainer.classList.add("active");
    document.body.style.overflow = "hidden"; // Mencegah scroll
  });
});

document.querySelectorAll(".close-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const menuContainer = button.closest(".menu-container");

    // Tutup menu
    menuContainer.classList.remove("active");
    document.body.style.overflow = "auto"; // Mengembalikan scroll
  });
});

// ======================
// 3. Number Counter & Pembelian
// ======================
const menus = document.querySelectorAll(".menucard");

menus.forEach(function (menu) {
  const counter = menu.querySelector(".counter");
  const warning = menu.querySelector(".warning"); // Pesan warning, disembunyikan awalnya
  const buyButton = menu.querySelector(".buyButton");

  let numberDisplay = counter.querySelector(".number-result");
  let min = counter.querySelector(".min");
  let plus = counter.querySelector(".plus");
  const itemName = menu.querySelector("h2").textContent; // Ambil nama item dari elemen h2

  // Inisialisasi nilai untuk setiap menu
  let number = 0;

  // Sembunyikan warning dari awal
  warning.style.display = "none";

  // Fungsi untuk memperbarui tampilan angka
  function display() {
    numberDisplay.textContent = number;
  }

  // Event listener untuk tombol tambah
  plus.addEventListener("click", function () {
    number += 1;
    display();
    warning.style.display = "none"; // Sembunyikan pesan peringatan saat jumlah bertambah
    menu.classList.remove("show-warning"); // Hilangkan kelas show-warning saat jumlah bertambah
  });

  // Event listener untuk tombol kurang
  min.addEventListener("click", function () {
    if (number > 0) {
      number -= 1;
      display();
    }
  });

  // Ketika tombol beli diklik
  buyButton.addEventListener("click", function () {
    if (number === 0) {
      warning.style.display = "block"; // Tampilkan pesan warning jika jumlah pesanan 0
      menu.classList.add("show-warning");
    } else {
      warning.style.display = "none"; // Sembunyikan warning jika pembelian berhasil
      menu.classList.remove("show-warning");

      // Ubah alert menjadi spesifik
      handlePurchaseSuccess(itemName, number); // Tampilkan alert pembelian berhasil dan modal rating
    }
  });
});

// ======================
// 4. Modal Pop Up dan Rating
// ======================
const ratingModal = document.getElementById("ratingModal");
const closeModal = document.getElementById("closeModal");
const submitRating = document.getElementById("submitRating");
const stars = document.querySelectorAll(".star");

// Fungsi untuk menampilkan modal
function showRatingModal() {
  ratingModal.classList.add("active");
}

// Fungsi untuk menutup modal
closeModal.addEventListener("click", function () {
  ratingModal.classList.remove("active");
  resetRating(); // Reset pilihan rating setelah modal ditutup
});

// Fungsi untuk menangani rating
let selectedRating = 0;

stars.forEach((star) => {
  star.addEventListener("click", function () {
    selectedRating = this.getAttribute("data-value");

    // Update tampilan bintang yang dipilih
    stars.forEach((star) => star.classList.remove("selected"));
    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add("selected");
    }
  });
});

// Fungsi reset rating setelah submit atau modal ditutup
function resetRating() {
  selectedRating = 0;
  stars.forEach((star) => star.classList.remove("selected"));
}

// Ketika rating disubmit
submitRating.addEventListener("click", function () {
  if (selectedRating > 0) {
    alert("Terima kasih atas rating " + selectedRating + " bintang!");
    ratingModal.classList.remove("active"); // Tutup modal setelah rating diberikan
    resetRating(); // Reset tampilan rating
  } else {
    alert("Mohon pilih rating sebelum submit!"); // Jika belum memilih rating
  }
});

// Fungsi yang dipanggil saat pembelian berhasil
function handlePurchaseSuccess(itemName, quantity) {
  alert(`Pembelian berhasil untuk ${quantity}x ${itemName}!`); // Tampilkan alert dengan jumlah dan nama item

  // Setelah OK di alert, tampilkan modal rating
  setTimeout(showRatingModal, 100); // Memberi sedikit jeda sebelum modal muncul
}
