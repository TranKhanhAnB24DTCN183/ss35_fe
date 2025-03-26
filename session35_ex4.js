let data = JSON.parse(localStorage.getItem("databai5")) || [];
let but = document.querySelector("button");
let tableData = document.querySelector("tbody");
let tab = document.querySelector(".tab");

let currentPage = 1;
const itemsPerPage = 3;

function displayEmployee() {
    tableData.innerHTML = "";
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let pageData = data.slice(start, end);

    tableData.innerHTML = pageData.map((employ, i) => {
        return `<tr>
            <td>${start + i + 1}</td>
            <td>${employ.name}</td>
            <td>${employ.position}</td> 
        </tr>`;
    }).join("");

    localStorage.setItem("databai5", JSON.stringify(data));
    updatePagination();
}

function updatePagination() {
    let totalPages = Math.ceil(data.length / itemsPerPage);
    tab.innerHTML = `<button class="page prev">Previous</button>`;

    for (let i = 1; i <= totalPages; i++) {
        tab.innerHTML += `<button class="page num" data-page="${i}">${i}</button>`;
    }

    tab.innerHTML += `<button class="page next">Next</button>`;

    document.querySelector(".prev").addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            displayEmployee();
        }
    });

    document.querySelector(".next").addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            displayEmployee();
        }
    });

    document.querySelectorAll(".num").forEach(button => {
        button.addEventListener("click", function () {
            currentPage = parseInt(this.dataset.page);
            displayEmployee();
            updateActivePage();
        });
    });

    updateActivePage();
}

function updateActivePage() {
    document.querySelectorAll(".num").forEach(btn => {
        btn.classList.remove("active");
        if (parseInt(btn.dataset.page) === currentPage) {
            btn.classList.add("active");
        }
    });
}

but.addEventListener("click", function (event) {
    event.preventDefault();
    let inputNameValue = document.getElementById("name").value.trim();
    let inputPositionValue = document.getElementById("position").value.trim();

    if (inputNameValue === "" || inputPositionValue === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let newEmployee = {
        name: inputNameValue,
        position: inputPositionValue
    };

    data.push(newEmployee);
    displayEmployee();
});

displayEmployee();



