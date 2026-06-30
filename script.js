window.onload = function () {

  let products = JSON.parse(localStorage.getItem("products")) || [];

  function render() {
    let menu = document.getElementById("menu");
    menu.innerHTML = "";

    products.forEach(p => {
      menu.innerHTML += `
        <div class="card">
          <img src="${p.image}">
          <h3>${p.name}</h3>
          <p>${p.price} تومان</p>
        </div>
      `;
    });
  }

  window.saveProduct = function () {

    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let category = document.getElementById("category").value;
    let file = document.getElementById("image").files[0];

    if (!name || !price || !file) {
      alert("همه چیز را پر کن");
      return;
    }

    let reader = new FileReader();

    reader.onload = function (e) {

      products.push({
        name: name,
        price: price,
        category: category,
        image: e.target.result
      });

      localStorage.setItem("products", JSON.stringify(products));
      render();

      alert("ثبت شد ✔");
    };

    reader.readAsDataURL(file);
  }

  window.filter = function () {
    render();
  }

  window.openAdmin = function () {
    let pass = prompt("رمز:");
    if (pass === "4030") {
      document.getElementById("panel").classList.remove("hidden");
    } else {
      alert("اشتباه");
    }
  }

  window.closeAdmin = function () {
    document.getElementById("panel").classList.add("hidden");
  }

  render();
}
