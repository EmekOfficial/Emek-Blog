document.addEventListener("DOMContentLoaded", runEvents); //sayfa yüklendiğinde bu fonksiyonu çalıştır

function changeTheme() {
  const currentTheme = document.documentElement.getAttribute("data-bs-theme");
  if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-bs-theme", "light");
  } else {
      document.documentElement.setAttribute("data-bs-theme", "dark");
  }
}



function runEvents(){
    document.getElementById("create").addEventListener("submit", kaydet); //submit butonuna basılınca kaydet() fonksiyonunu çalıştır

}


function filtrele(kategori = null) {
  let blogKartlari = document.querySelectorAll("#blogs .col-md-6");
  // Tüm blog kartlarını seçiyoruz

  blogKartlari.forEach(card => {
      let cardKategori = card.querySelector(".card-subtitle").innerText;
      // Her bir kartın kategori kısmını alıyoruz

      if (kategori === null || cardKategori === kategori) {
          // Eğer kategori null (tümünü göstermek istiyorsak) veya kartın kategorisi eşleşiyorsa göster
          card.style.display = "block";
      } else {
          // Aksi takdirde, kartı gizle
          card.style.display = "none";
      }
  });
}



let kategoriler = []


function kaydet(e) {
  e.preventDefault(); 
  // Formun sayfayı yenilemesini engeller

  let baslik = document.getElementById("formBaslik").value;
  // Formdan girilen başlık bilgisini alır

  let kategori = document.getElementById("formKategori").value;
  // Formdan girilen kategori bilgisini alır

  let icerik = document.getElementById("formİcerik").value;
  // Formdan girilen içerik bilgisini alır
  
  if(!kategoriler.includes(kategori)){ //mevcut kategori yoksa ekle 
    kategoriler.push(kategori)
    // Buton oluştur
    let kategoriButonu = document.createElement("button");
    kategoriButonu.textContent = kategori; // Butonun metnini kategori ismi yap
    kategoriButonu.classList.add("btn", "btn-outline-primary", "m-2"); // Butona stil ekle
    kategoriButonu.addEventListener("click", function() {
        filtrele(kategori); // Butona tıklandığında filtreleme işlemi yapılacak
    });

    // Butonu ekle
    document.getElementById("kategoriButonlari").appendChild(kategoriButonu);
  }


  if (aktifKart) {
      // Eğer aktifKart doluysa, düzenleme işlemi yapılıyor demektir

      aktifKart.querySelector(".card-title").innerText = baslik;
      // Kartın başlık kısmını günceller

      aktifKart.querySelector(".card-subtitle").innerText = kategori;
      // Kartın kategori kısmını günceller

      aktifKart.querySelector(".card-text").innerText = icerik;
      // Kartın içerik kısmını günceller

      aktifKart.querySelector(".duzenleme-tarihi").innerHTML = `<strong>Düzenleme:</strong> ${new Date().toLocaleString("tr-TR")}`;
      // Kartın "Düzenleme" tarihini günceller

      aktifKart = null;
      // Aktif kart sıfırlanır, artık yeni kart eklenebilir
  } else {
      // Eğer aktifKart yoksa, yeni kart ekleniyor demektir

      let simdi = new Date().toLocaleString("tr-TR");
      // Oluşturulma tarihi Türkçe formatta alınır

      let cardHTML = `
      <div class="col-md-6 col-lg-3 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${baslik}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${kategori}</h6>
            <p class="card-text">${icerik}</p>
            <button class="btn btn-sm btn-warning me-2" onclick="duzenle(this)">Düzenle</button>
            <button class="btn btn-sm btn-danger" onclick="sil(this)">Sil</button>
          </div>
          <div class="card-footer text-muted small">
            <div><strong>Oluşturulma:</strong> ${simdi}</div>
            <div class="duzenleme-tarihi"><strong>Düzenleme:</strong> -</div>
          </div>
        </div>
      </div>`;

      document.getElementById("blogs").innerHTML += cardHTML;
      // Yeni kart HTML olarak sayfaya eklenir
  }

  document.getElementById("create").reset();
  // Form sıfırlanır
}



function sil(button) {
  let card = button.closest('.col-md-6'); // Butonun içinde bulunduğu kartı seç
  card.remove(); // Kartı DOM'dan kaldır
}


let aktifKart = null; // Şu anda düzenlenen kartı global olarak tutar


function duzenle(buton) {
    // buton: Tıklanan "Düzenle" butonudur

    aktifKart = buton.closest(".card"); 
    // En yakın .card sınıfına sahip elemanı bulur (yani bu butonun bulunduğu kart)

    let baslik = aktifKart.querySelector(".card-title").innerText;
    // Kart içindeki başlık metnini alır

    let kategori = aktifKart.querySelector(".card-subtitle").innerText;
    // Kart içindeki kategori metnini alır

    let icerik = aktifKart.querySelector(".card-text").innerText;
    // Kart içindeki içerik metnini alır

    document.getElementById("formBaslik").value = baslik;
    // Formdaki başlık alanına karttaki başlığı yazar

    document.getElementById("formKategori").value = kategori;
    // Formdaki kategori alanına karttaki kategoriyi yazar

    document.getElementById("formİcerik").value = icerik;
    // Formdaki içerik alanına karttaki içeriği yazar
}

























