const API = "http://localhost:3000/artists";

let editId = null;

// =====================
// LOAD ARTISTS
// =====================
async function loadArtists() {
    const res = await fetch(API);
    const data = await res.json();

    const table = document.getElementById("artistTable");
    table.innerHTML = "";

    data.forEach(a => {
        table.innerHTML += `
        <tr>
            <td>${a.artist_id}</td>
            <td>${a.artist_name}</td>
            <td>${a.genre}</td>
            <td>${a.monthly_listeners}</td>
            <td>
            <button onclick="editArtist(${a.artist_id}, \`${a.artist_name}\`, \`${a.genre}\`, ${a.monthly_listeners})">Edit</button>
            <button onclick="deleteArtist(${a.artist_id})">Delete</button>
            </td>
        </tr>
        `;
    });
}

// =====================
// SAVE (CREATE OR UPDATE)
// =====================
async function saveArtist() {
    if (editId) {
        await updateArtist();
    } else {
        await createArtist();
    }
}

// =====================
// CREATE
// =====================
async function createArtist() {
    const artist = {
        artist_name: document.getElementById("name").value,
        genre: document.getElementById("genre").value,
        monthly_listeners: document.getElementById("listeners").value
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(artist)
    });

    clearForm();
    loadArtists();
}

// =====================
// EDIT (fill form)
// =====================
function editArtist(id, name, genre, listeners) {
    editId = id;

    document.getElementById("name").value = name;
    document.getElementById("genre").value = genre;
    document.getElementById("listeners").value = listeners;

    document.getElementById("saveBtn").innerText = "Update Artist";
}

// =====================
// UPDATE (PUT)
// =====================
async function updateArtist() {
    if (!editId) {
        alert("Select an artist to update first");
        return;
    }

    const updated = {
        artist_name: document.getElementById("name").value,
        genre: document.getElementById("genre").value,
        monthly_listeners: document.getElementById("listeners").value
    };

    await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
    });

    editId = null;
    clearForm();
    loadArtists();

    document.getElementById("saveBtn").innerText = "Add Artist";
}

// =====================
// DELETE
// =====================
async function deleteArtist(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadArtists();
}

// =====================
// CLEAR FORM
// =====================
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("listeners").value = "";
}

// =====================
// INIT
// =====================
loadArtists();