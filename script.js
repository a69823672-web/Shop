let products = JSON.parse(localStorage.getItem("products")) || [];
let filterCat = "all";

function render() {
  let menu = document.getElementById("menu");
  menu.innerHTML = "";

  products
    .filter(p => filterCat === "all" || p.category === filterCat)
    .forEach(p => {
      menu.innerHTML += `
        <div class="card">
          <img src="${p.image}">
          <h3>${p.name}</h3>
          <p>${p.price} تومان</p>
        </div>
      `;
    });
}

function filter(cat) {
  filterCat = cat;
  render();
}

function openAdmin() {
  let pass = prompt("رمز:");
  if (pass === "4030") {
    document.getElementById("panel").classList.remove("hidden");
  } else {
    alert("رمز اشتباه");
  }
}

function closeAdmin() {
  document.getElementById("panel").classList.add("hidden");
}

// ✅ مهم: دکمه ثبت محصول
function saveProduct() {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let category = document.getElementById("category").value;
  let file = document.getElementById("image").files[0];

  if (!name || !price || !file) {
    alert("همه فیلدها را پر کن");
    return;
  }

  let reader = new FileReader();

  reader.onload = function(e) {
    products.push({
      name,
      price,
      category,
      image: e.target.result
    });

    localStorage.setItem("products", JSON.stringify(products));
    render();
    alert("محصول ثبت شد ✔");
  };

  reader.readAsDataURL(file);
}

// لوگو + ویدیو (بدون crash)
window.addEventListener("DOMContentLoaded", () => {

  let logoInput = document.getElementById("logo");
  let videoInput = document.getElementById("video");

  if (logoInput) {
    logoInput.addEventListener("change", function(e){
      let r = new FileReader();
      r.onload = ev => {
        localStorage.setItem("logo", ev.target.result);
        document.getElementById("logoPreview").src = ev.target.result;
      };
      r.readAsDataURL(e.target.files[0]);
    });
  }

  if (videoInput) {
    videoInput.addEventListener("change", function(e){
      let r = new FileReader();
      r.onload = ev => {
        localStorage.setItem("video", ev.target.result);
        document.getElementById("adVideo").src = ev.target.result;
      };
      r.readAsDataURL(e.target.files[0]);
    });
  }

  render();

  // load saved media
  let logo = localStorage.getItem("logo");
  let video = localStorage.getItem("video");

  if (logo) document.getElementById("logoPreview").src = logo;
  if (video) document.getElementById("adVideo").src = video;
});
