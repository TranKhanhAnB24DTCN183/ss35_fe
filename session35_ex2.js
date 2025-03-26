let addBookMark = document.querySelector(".addBook");
let bookmarkForm = document.querySelector(".bookmark-form");
let saveBtn = document.querySelector(".save-btn");
let closeBtns = document.querySelectorAll(".close-btn");
let container = document.querySelector(".container");

addBookMark.addEventListener("click", function () {
    bookmarkForm.style.display = "block";
});

closeBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        bookmarkForm.style.display = "none";
    });
});

function loadBookMark() {
    container.innerHTML = ``;
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    
    bookmarks.forEach(bookmark => {
        let newBookmark = document.createElement("div");
        newBookmark.classList.add("wed");
        newBookmark.innerHTML = `
            <button class="close-btn">&times;</button>
            <p class="text">
                <img src="https://www.google.com/s2/favicons?domain=${bookmark.url}" alt=""> 
                ${bookmark.name}
            </p>
        `;

        newBookmark.querySelector(".text").addEventListener("click", function () {
            window.location.href = bookmark.url;
        });

        newBookmark.querySelector(".close-btn").addEventListener("click", function () {
            let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
            bookmarks = bookmarks.filter(b => b.url !== bookmark.url);
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            loadBookMark();
        });

        container.appendChild(newBookmark);
    });
}

saveBtn.addEventListener("click", function () {
    let name = document.getElementById("name").value.trim();
    let url = document.getElementById("url").value.trim();

    if (name === "" || url === "") {
        alert("Vui lòng nhập đủ thông tin!");
        return;
    }

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.push({ name, url });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    loadBookMark();

    document.getElementById("name").value = "";
    document.getElementById("url").value = "";
    bookmarkForm.style.display = "none";
});

window.onload = loadBookMark;
