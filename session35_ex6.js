document.addEventListener("DOMContentLoaded", function () {
    loadCategories(); 


document.querySelector(".add-category").addEventListener("click", function () {
    document.getElementById("categoryModal").style.display = "flex";
});


document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("categoryModal").style.display = "none";
});


document.getElementById("saveCategory").addEventListener("click", function () {
    let id = document.getElementById("categoryId").value.trim();
    let name = document.getElementById("categoryName").value.trim();
    let status = document.querySelector('input[name="status"]:checked').value;

    if (!id || !name) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let categories = JSON.parse(localStorage.getItem("categories")) || [];


    let existingIndex = categories.findIndex(cat => cat.id === id);
    if (existingIndex !== -1) {
        categories[existingIndex].name = name;
        categories[existingIndex].status = status;
    } else {
        categories.push({ id, name, status });
    }

    localStorage.setItem("categories", JSON.stringify(categories));
    loadCategories(); 

    document.getElementById("categoryModal").style.display = "none";
});

document.getElementById("statusFilter").addEventListener("change", function () {
    let selectedStatus = this.value; 
    loadCategories(selectedStatus);
});
});


function loadCategories(selectedStatus = "all") {
let categories = JSON.parse(localStorage.getItem("categories")) || [];


if (selectedStatus !== "all") {
    categories = categories.filter(category => category.status === selectedStatus);
}

let table = document.getElementById("categoryTable");
table.innerHTML = ""; 

categories.forEach(addCategoryToTable);
}

function addCategoryToTable(category) {
let table = document.getElementById("categoryTable");
let row = table.insertRow();

let statusText = category.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động";
let statusClass = category.status === "active" ? "status-active" : "status-inactive";

row.innerHTML = `
    <td>${category.id}</td>
    <td>${category.name}</td>
    <td class="${statusClass}">${statusText}</td>
    <td class="actions">
        <i class="fas fa-edit" onclick="editCategory('${category.id}')"></i>
        <i class="fas fa-trash" onclick="deleteCategory('${category.id}', this)"></i>
    </td>
`;
}

function deleteCategory(id, element) {
let categories = JSON.parse(localStorage.getItem("categories")) || [];
categories = categories.filter(category => category.id !== id);
localStorage.setItem("categories", JSON.stringify(categories));

element.closest("tr").remove();
}

function editCategory(id) {
let categories = JSON.parse(localStorage.getItem("categories")) || [];
let category = categories.find(category => category.id === id);

if (!category) return;

let newName = prompt("Nhập tên danh mục mới:", category.name);
if (newName === null || newName.trim() === "") return;

let newStatus = confirm("Nhấn OK để đặt trạng thái 'Đang hoạt động', hoặc Hủy để chọn 'Ngừng hoạt động'.")
    ? "active"
    : "inactive";

category.name = newName.trim();
category.status = newStatus;

localStorage.setItem("categories", JSON.stringify(categories));
loadCategories(); 
}
