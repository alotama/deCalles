"use client"
import { useState } from 'react';
import Card from '../../component/card';
import CalleForm from '../../component/form';

export default function AddCalle() {
  const [nombre, setNombre] = useState('');
  const [longitud, setLongitud] = useState('');
  const [numeracion_maxima, setNumeracionMaxima] = useState('');
  const [tipo_calle, setTipoCalle] = useState('');
  const [historia_nombre, setHistoriaNombre] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/calles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          longitud,
          numeracion_maxima,
          tipo_calle,
          historia_nombre,
        }),
      });

      if (!res.ok) throw new Error('Error adding calle');

      const data = await res.json();
      setMessage(data.success);
    } catch (error) {
      setMessage(error.message);
    }
  };



  return (
    <div>      
      <h1 className="text-3xl font-bold underline">
            Hello world!
      </h1>
      <Card>
        <CalleForm />
      </Card>
      {message && <p>{message}</p>}
    </div>
  );
}
