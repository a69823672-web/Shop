let products = JSON.parse(localStorage.getItem("products")) || [];
let currentCategory = "all";

const menu = document.getElementById("menu");
const logoPreview = document.getElementById("logoPreview");
const adVideo = document.getElementById("adVideo");

adVideo.src = "video.mp4";

// ====== RENDER ======
function renderProducts() {
    menu.innerHTML = "";

    const list = currentCategory === "all"
        ? products
        : products.filter(p => p.category === currentCategory);

    list.forEach((product, index) => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>${product.price} تومان</p>

            <button class="deleteBtn" onclick="deleteProduct(${index})">
                حذف
            </button>
        `;

        menu.appendChild(card);
    });
}

renderProducts();

// ====== CATEGORY ======
function filterCategory(cat){
    currentCategory = cat;
    renderProducts();
}

// ====== ADMIN ======
function openAdmin(){
    const pass = prompt("رمز مدیریت را وارد کنید");
    if(pass === "4030"){
        document.getElementById("adminPanel").style.display = "block";
    }else{
        alert("رمز اشتباه است");
    }
}

function closeAdmin(){
    document.getElementById("adminPanel").style.display = "none";
}

// ====== SAVE PRODUCT ======
function saveProduct(){

    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const category = document.getElementById("productCategory").value;
    const imageFile = document.getElementById("productImage").files[0];
    const logoFile = document.getElementById("logoImage").files[0];

    if(!name || !price || !imageFile){
        alert("اطلاعات کامل نیست");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e){

        products.push({
            name,
            price,
            category,
            image: e.target.result
        });

        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();

        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productImage").value = "";

        alert("محصول ثبت شد");
    };

    reader.readAsDataURL(imageFile);

    // logo
    if(logoFile){
        const r = new FileReader();
        r.onload = function(e){
            logoPreview.src = e.target.result;
            localStorage.setItem("logo", e.target.result);
        };
        r.readAsDataURL(logoFile);
    }
}

// ====== DELETE ======
function deleteProduct(index){

    const pass = prompt("رمز حذف را وارد کنید");

    if(pass !== "4030"){
        alert("رمز اشتباه است");
        return;
    }

    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();

    alert("حذف شد");
}
