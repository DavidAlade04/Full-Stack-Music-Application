let editId = null;
const API = "http://localhost:3000/songs";

// =====================
// LOAD SONGS (READ)
// =====================
async function loadSongs() {
    const res = await fetch(API);
    const data = await res.json();

    const table = document.getElementById("songTable");
    table.innerHTML = "";

    data.forEach(s => {
        table.innerHTML += `
        <tr>
            <td>${s.song_id}</td>
            <td>${s.song_name}</td>
            <td>${s.release_year}</td>
            <td>${s.album_id}</td>
            <td>
                <button onclick="editSong(${s.song_id}, '${s.song_name}', ${s.release_year}, ${s.album_id})">Edit</button>
                <button onclick="deleteSong(${s.song_id})">Delete</button>
            </td>
        </tr>`;
    });
}

// =====================
// CREATE SONG
// =====================
async function createSong() {
    const song = {
        song_name: document.getElementById("songName").value,
        release_year: document.getElementById("year").value,
        album_id: document.getElementById("albumId").value
    };

    await fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(song)
    });

    clearForm();
    loadSongs();
}

// =====================
// EDIT (fill form)
// =====================
function editSong(id, name, year, albumId) {
    editId = id;

    document.getElementById("songName").value = name;
    document.getElementById("year").value = year;
    document.getElementById("albumId").value = albumId;
}

// =====================
// UPDATE
// =====================
async function updateSong() {
    if (!editId) {
        alert("Please select a song to edit first");
        return;
    }

    const updated = {
        song_name: document.getElementById("songName").value,
        release_year: document.getElementById("year").value,
        album_id: document.getElementById("albumId").value
    };

    await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updated)
    });

    editId = null;
    clearForm();
    loadSongs();
}

// =====================
// DELETE
// =====================
async function deleteSong(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadSongs();
}

// =====================
// CLEAR FORM
// =====================
function clearForm() {
    document.getElementById("songName").value = "";
    document.getElementById("year").value = "";
    document.getElementById("albumId").value = "";
}

// INIT
loadSongs();