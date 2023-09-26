// pages/api/calles.js
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export default async function handler(req, res) {
  const db = await open({
    filename: './mydb.sqlite3',
    driver: sqlite3.Database,
  });

  if (req.method === 'GET') {
    try {
      const calles = await db.all('SELECT * FROM Calles');
      res.status(200).json(calles);
    } catch (err) {
      console.error('Error accessing the database', err);
      res.status(500).json({ error: 'Error accessing the database' });
    }
  } else if (req.method === 'POST') {
    try {
      const { nombre, longitud, numeracion_maxima, tipo_calle, historia_nombre } = req.body;
      await db.run(
        'INSERT INTO Calles (nombre, longitud, numeracion_maxima, tipo_calle, historia_nombre, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, longitud, numeracion_maxima, tipo_calle, historia_nombre, new Date().toISOString()]
      );
      res.status(201).json({ success: 'Calle added successfully' });
    } catch (err) {
      console.error('Error inserting into the database', err);
      res.status(500).json({ error: 'Error inserting into the database' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
