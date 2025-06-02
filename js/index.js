var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescriptionInput = document.getElementById('productDescription');
var productImageInput = document.getElementById('productImage');
var productsearchInput = document.getElementById('searchInput');
var addBtnInput = document.getElementById('addBtn');
var updateBtnInput = document.getElementById('updateBtn');
var updateIndex;
var productsContainer = [];

if (localStorage.getItem('products') !== null) {
    productsContainer = JSON.parse(localStorage.getItem('products'));
    displayProducts();
}

function addProducts() {
    var product = {
        code: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescriptionInput.value,
        image: `images/${productImageInput.files[0]?.name}`
    };

    productsContainer.push(product);
    displayProducts();
    localStorage.setItem("products", JSON.stringify(productsContainer));
    clearForm();
}

function clearForm() {
    productNameInput.value = null;
    productPriceInput.value = null;
    productCategoryInput.value = null;
    productDescriptionInput.value = null;
    productImageInput.value = null;
}

function displayProducts() {
    var cartona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        cartona += `<div class="col-md-2">
        <div>
            <img class="w-100" src="${productsContainer[i].image}" alt="photo">
            <h2 class="h4"> ${productsContainer[i].code}</h2>
            <p class="text-secondary mb-2">${productsContainer[i].desc}</p>
            <h3 class="h6"><span class="fw-bolder">Price:</span> ${productsContainer[i].price}</h3>
            <h3 class="h6"><span class="fw-bolder">Category:</span> ${productsContainer[i].category}</h3>
            <button onclick="deleteProduct(${i});" class="btn btn-danger border-1 ">Delete</button>
            <button onclick= "setFormUpdate(${i});" class="btn btn-warning border-1">Update</button>
        </div>
        </div>`;
    }
    document.getElementById('rowData').innerHTML = cartona;
}

function deleteProduct(deletedIndex) {
    productsContainer.splice(deletedIndex, 1);
    displayProducts();
    localStorage.setItem("products", JSON.stringify(productsContainer));
}

function seaechProducts() {
    var term = searchInput.value;
    var cartona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].code.toLowerCase().includes(term.toLowerCase()) == true ) {

            cartona += `<div class="col-md-2">
            <div>
                <img class="w-100" src="${productsContainer[i].image}" alt="photo">
                <h2 class="h4"> ${productsContainer[i].code}</h2>
                <p class="text-secondary mb-2">${productsContainer[i].desc}</p>
                <h3 class="h6"><span class="fw-bolder">Price:</span> ${productsContainer[i].price}</h3>
                <h3 class="h6"><span class="fw-bolder">Category:</span> ${productsContainer[i].category}</h3>
                
                    <button onclick="deleteProduct(${i});" class="btn btn-danger border-1 ">Delete</button>
                    <button onclick= "setFormUpdate(${i});" class="btn btn-warning border-1">Update</button>
                
            </div>
            </div>`;
        }
    }
    document.getElementById('rowData').innerHTML = cartona;
}

function setFormUpdate(i){
    updateIndex =i
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    productNameInput.value = productsContainer[i].code;
    productPriceInput.value = productsContainer[i].price;
    productCategoryInput.value = productsContainer[i].category;
    productDescriptionInput.value = productsContainer[i].desc;
}

function updateProducts(){
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    productsContainer[updateIndex].code = productNameInput.value;
    productsContainer[updateIndex].price = productPriceInput.value;
    productsContainer[updateIndex].category = productCategoryInput.value;
    productsContainer[updateIndex].desc = productDescriptionInput.value;
    displayProducts();
    localStorage.setItem("products" , JSON.stringify(productsContainer));
    clearForm();
}

