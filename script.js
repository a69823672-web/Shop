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

render();

function filter(cat) {
  filterCat = cat;
  render();
}

function openAdmin() {
  let pass = prompt("رمز:");
  if (pass === "4030") {
    document.getElementById("panel").classList.remove("hidden");
  } else {
    alert("اشتباه");
  }
}

function closeAdmin() {
  document.getElementById("panel").classList.add("hidden");
}

function saveProduct() {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let category = document.getElementById("category").value;
  let file = document.getElementById("image").files[0];

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
    alert("ثبت شد");
  };

  if (file) reader.readAsDataURL(file);
}

// لوگو + ویدیو
window.onload = function () {
  let logo = localStorage.getItem("logo");
  let video = localStorage.getItem("video");

  if (logo) document.getElementById("logoPreview").src = logo;
  if (video) document.getElementById("adVideo").src = video;
};

// ذخیره رسانه ساده (داخل همین ثبت محصول)
document.getElementById("logo").addEventListener("change", function(e){
  let r = new FileReader();
  r.onload = ev => localStorage.setItem("logo", ev.target.result);
  r.readAsDataURL(e.target.files[0]);
});

document.getElementById("video").addEventListener("change", function(e){
  let r = new FileReader();
  r.onload = ev => localStorage.setItem("video", ev.target.result);
  r.readAsDataURL(e.target.files[0]);
});
