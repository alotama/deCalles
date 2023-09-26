// init-db.js
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./mydb.sqlite3', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

const createTables = `
CREATE TABLE IF NOT EXISTS Calles (
  id_calle INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  longitud INTEGER,
  numeracion_maxima INTEGER,
  historia_nombre TEXT,
  tipo_calle TEXT,
  fecha_creacion DATE,
  fecha_modificacion DATE
);

CREATE TABLE IF NOT EXISTS Barrios (
    id_barrio INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Calles_Barrios (
    id_calle INTEGER,
    id_barrio INTEGER,
    FOREIGN KEY (id_calle) REFERENCES Calles (id_calle),
    FOREIGN KEY (id_barrio) REFERENCES Barrios (id_barrio),
    PRIMARY KEY (id_calle, id_barrio)
);

CREATE TABLE IF NOT EXISTS Relaciones_Calles (
    id_calle1 INTEGER,
    id_calle2 INTEGER,
    tipo_relacion TEXT NOT NULL,
    FOREIGN KEY (id_calle1) REFERENCES Calles (id_calle),
    FOREIGN KEY (id_calle2) REFERENCES Calles (id_calle),
    PRIMARY KEY (id_calle1, id_calle2)
);

CREATE TABLE IF NOT EXISTS Puntos (
    id_punto INTEGER PRIMARY KEY,
    descripcion TEXT NOT NULL,
    id_calle INTEGER,
    latitud REAL,
    longitud REAL,
    FOREIGN KEY (id_calle) REFERENCES Calles (id_calle)
);

CREATE TABLE IF NOT EXISTS Medios (
    id_medio INTEGER PRIMARY KEY,
    tipo_medio TEXT NOT NULL, -- Por ejemplo: foto, video, etc.
    url TEXT NOT NULL,
    descripcion TEXT,
    fecha_creacion DATE
);

CREATE TABLE IF NOT EXISTS Calles_Medios (
    id_calle INTEGER,
    id_medio INTEGER,
    FOREIGN KEY (id_calle) REFERENCES Calles (id_calle),
    FOREIGN KEY (id_medio) REFERENCES Medios (id_medio),
    PRIMARY KEY (id_calle, id_medio)
);

CREATE TABLE IF NOT EXISTS Transportes (
    id_transporte INTEGER PRIMARY KEY,
    tipo_transporte TEXT NOT NULL, -- Por ejemplo: bus, metro, bicisenda, etc.
    descripcion TEXT
);

CREATE TABLE IF NOT EXISTS Calles_Transportes (
    id_calle INTEGER,
    id_transporte INTEGER,
    FOREIGN KEY (id_calle) REFERENCES Calles (id_calle),
    FOREIGN KEY (id_transporte) REFERENCES Transportes (id_transporte),
    PRIMARY KEY (id_calle, id_transporte)
);

CREATE INDEX IF NOT EXISTS idx_nombre ON Calles (nombre);
CREATE INDEX IF NOT EXISTS idx_nombre_barrio ON Barrios (nombre);
`;

db.exec(createTables, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Tables created successfully.');
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});
