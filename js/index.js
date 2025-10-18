var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var ProductDescrptionInput = document.getElementById("ProductDescrption");
var productImgInput = document.getElementById("productImg");
var searchinput = document.getElementById("search");
var addbtn = document.getElementById("add");
var updatebtn = document.getElementById("update");
var myIndex;

var productList;
if (localStorage.getItem("products") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("products"));
  display();
}

function addProduct() {
  if (
    productNameInput.classList.contains("is-valid") &&
    productPriceInput.classList.contains("is-valid") &&
    productCategoryInput.classList.contains("is-valid") &&
    ProductDescrptionInput.classList.contains("is-valid")
  ) {
    var product = {
      code: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: ProductDescrptionInput.value,
      img: `images/${productImgInput.files[0]?.name}`,
    };

    productList.push(product);
    localStorage.setItem("products", JSON.stringify(productList));
    display();
  } else {
    alert("Not valid Date");
  }
  clear();
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  ProductDescrptionInput.classList.remove("is-valid");
}

function display() {
  var cartona = "";
  for (i = 0; i < productList.length; i++) {
    cartona += `<div class="col-md-2">
          <div class="item ps-3 ">
            <img src=${productList[i].img} alt="" class="w-100" />
            <h2 class="h4">Name : ${productList[i].code}</h2>
            <p>price : ${productList[i].price}</p>
            <p>category : ${productList[i].category}</p>
            <p>desc : ${productList[i].desc}</p>
            <button onclick="DeleteProduct(${i})" class="btn btn-outline-danger w-100">Delete <i class="fas fa-trash"></i></button>
            <button onclick="edit(${i})" class="btn btn-outline-warning w-100 my-2">Update <i class="fas fa-pen"></i></button>
          </div>
        </div>`;
  }

  document.getElementById("myRow").innerHTML = cartona;
}

function validateinputs(element) {
  var regex = {
    productName: /^[A-Z][a-z 1-9]{2,10}$/,
    productPrice: /^[1-9][0-9]{1,5}$/,
    productCategory: /^(tv|mobile|screen|laptop)$/i,
    ProductDescrption: /^\w{3,}$/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
  }
}

function edit(index) {
  myIndex = index;
  productNameInput.value = productList[index].code;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  ProductDescrptionInput.value = productList[index].desc;

  addbtn.classList.add("d-none");
  updatebtn.classList.remove("d-none");

  productNameInput.classList.add("is-valid");
  productPriceInput.classList.add("is-valid");
  productCategoryInput.classList.add("is-valid");
  ProductDescrptionInput.classList.add("is-valid");
}
function update() {
  if (
    productNameInput.classList.contains("is-valid") &&
    productPriceInput.classList.contains("is-valid") &&
    productCategoryInput.classList.contains("is-valid") &&
    ProductDescrptionInput.classList.contains("is-valid")
  ) {
    const file = productImgInput.files[0];

    productList[myIndex].code = productNameInput.value;
    productList[myIndex].price = productPriceInput.value;
    productList[myIndex].category = productCategoryInput.value;
    productList[myIndex].desc = ProductDescrptionInput.value;

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        productList[myIndex].img = e.target.result;
        localStorage.setItem("products", JSON.stringify(productList));
        display();
      };
      reader.readAsDataURL(file);
      clear();
      productNameInput.classList.remove("is-valid");
      productPriceInput.classList.remove("is-valid");
      productCategoryInput.classList.remove("is-valid");
      ProductDescrptionInput.classList.remove("is-valid");
      addbtn.classList.remove("d-none");
      updatebtn.classList.add("d-none");

    } else {
      localStorage.setItem("products", JSON.stringify(productList));
      display();
    }
  }
}

function DeleteProduct(deletedIndex) {
  productList.splice(deletedIndex, 1);
  display();
  localStorage.setItem("products", JSON.stringify(productList));
  clear();
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  ProductDescrptionInput.classList.remove("is-valid");
}

function search() {
  var word = searchinput.value;
  var cartona = "";

  for (i = 0; i < productList.length; i++) {
    if (productList[i].code.toLowerCase().includes(word.toLowerCase()))
      cartona += `<div class="col-md-2">
          <div class="item ps-3">
            <img src="${productList[i].img}" alt="" class="w-100" />
            <h2 class="h4">Name : ${productList[i].code}</h2>
            <p>price : ${productList[i].price}</p>
            <p>category : ${productList[i].category}</p>
            <p>desc : ${productList[i].desc}</p>
            <button onclick="DeleteProduct(${i})" class="btn btn-outline-danger w-100">Delete <i class="fas fa-trash"></i></button>
            <button class="btn btn-outline-warning w-100 my-2">Update <i class="fas fa-pen"></i></button>
          </div>
        </div>`;
  }
  if (cartona == "") {
    document.getElementById(
      "myRow"
    ).innerHTML = `<h2 class="bg-dark text-white text-center-p-3 rounded-2">No Data to Show</h2>`;
  } else {
    document.getElementById("myRow").innerHTML = cartona;
  }
}

function clear() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  ProductDescrptionInput.value = null;
  productImgInput.value = null;
}
