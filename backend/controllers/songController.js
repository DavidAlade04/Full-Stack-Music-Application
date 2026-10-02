const db = require('../db');

exports.getAllSongs = (req, res) => {
    db.all('SELECT * FROM songs', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getSongById = (req, res) => {
    db.get('SELECT * FROM songs WHERE song_id=?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

exports.createSong = (req, res) => {
    const { song_name, duration, album_id } = req.body;

    db.run(
        `INSERT INTO songs (song_name, duration, album_id)
         VALUES (?, ?, ?)`,
        [song_name, duration, album_id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
};

exports.updateSong = (req, res) => {
    const { song_name, duration, album_id } = req.body;

    db.run(
        `UPDATE songs SET song_name=?, duration=?, album_id=? WHERE song_id=?`,
        [song_name, duration, album_id, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
};

exports.deleteSong = (req, res) => {
    db.run(`DELETE FROM songs WHERE song_id=?`, req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
};