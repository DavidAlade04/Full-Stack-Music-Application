PRAGMA foreign_keys = ON;

create table if not exists artists(
    artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_name TEXT NOT NULL,
    genre TEXT,
    monthly_listeners INTEGER
);

create table if not exists albums(
    album_id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_name TEXT NOT NULL,
    release_year INTEGER,
    number_of_listens INTEGER,
    artist_id INTEGER,
    FOREIGN KEY (artist_id)
        REFERENCES artists(artist_id)
        ON DELETE CASCADE
);

create table if not exists songs(
    song_id INTEGER PRIMARY KEY AUTOINCREMENT,
    song_name TEXT NOT NULL,
    release_year INTEGER,
    album_id INTEGER,
    FOREIGN KEY (album_id)
        REFERENCES albums(album_id)
        ON DELETE CASCADE
);

INSERT INTO artists (artist_name, genre, monthly_listeners) VALUES
('The Weeknd', 'R&B', 100000000),
('Taylor Swift', 'Pop', 120000000);

INSERT INTO albums (album_name, release_year, number_of_listens, artist_id) VALUES
('After Hours', 2020, 5000000, 1),
('Dawn FM', 2022, 3000000, 1),
('1989', 2014, 8000000, 2),
('Red', 2012, 6000000, 2),
('Midnights', 2022, 9000000, 2);

INSERT INTO songs (song_name, release_year, album_id) VALUES

('Blinding Lights', 2020, 1),
('Save Your Tears', 2020, 1),


('Gasoline', 2022, 2),
('Take My Breath', 2022, 2),


('Blank Space', 2014, 3),
('Shake It Off', 2014, 3),


('I Knew You Were Trouble', 2012, 4),
('22', 2012, 4),


('Anti-Hero', 2022, 5),
('Lavender Haze', 2022, 5);