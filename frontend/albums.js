const API = "http://localhost:3000/albums";
let editId = null;

// =====================
// LOAD ALBUMS
// =====================
async function loadAlbums() {
    const res = await fetch(API);
    const data = await res.json();

    const table = document.getElementById("albumTable");
    table.innerHTML = "";

    data.forEach(a => {
        table.innerHTML += `
        <tr>
            <td>${a.album_id}</td>
            <td>${a.album_name}</td>
            <td>${a.release_year}</td>
            <td>${a.number_of_listens}</td>
            <td>${a.artist_id}</td>
            <td>
                <button onclick="deleteAlbum(${a.album_id})">Delete</button>
                <button onclick="editAlbum(${a.album_id}, \`${a.album_name}\`, ${a.release_year}, ${a.number_of_listens}, ${a.artist_id})">Edit</button>
            </td>
        </tr>
        `;
    });
}

// =====================
// SAVE (CREATE OR UPDATE)
// =====================
async function saveAlbum() {
    if (editId) {
        await updateAlbum();
    } else {
        await createAlbum();
    }
}

// =====================
// CREATE
// =====================
async function createAlbum() {
    const album = {
        album_name: document.getElementById("albumName").value,
        release_year: document.getElementById("year").value,
        number_of_listens: document.getElementById("listens").value,
        artist_id: document.getElementById("artistId").value
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album)
    });

    clearForm();
    loadAlbums();
}

// =====================
// EDIT (fill form)
// =====================
function editAlbum(id, name, year, listens, artistId) {
    editId = id;

    document.getElementById("albumName").value = name;
    document.getElementById("year").value = year;
    document.getElementById("listens").value = listens;
    document.getElementById("artistId").value = artistId;

    document.getElementById("saveBtn").innerText = "Update Album";
}

// =====================
// UPDATE
// =====================
async function updateAlbum() {
    if (!editId) {
        alert("Select an album to update first");
        return;
    }

    const updated = {
        album_name: document.getElementById("albumName").value,
        release_year: document.getElementById("year").value,
        number_of_listens: document.getElementById("listens").value,
        artist_id: document.getElementById("artistId").value
    };

    await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
    });

    editId = null;
    clearForm();
    loadAlbums();

    document.getElementById("saveBtn").innerText = "Add Album";
}

// =====================
// DELETE
// =====================
async function deleteAlbum(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadAlbums();
}

// =====================
// CLEAR FORM
// =====================
function clearForm() {
    document.getElementById("albumName").value = "";
    document.getElementById("year").value = "";
    document.getElementById("listens").value = "";
    document.getElementById("artistId").value = "";
}

// =====================
// INIT
// =====================
loadAlbums();