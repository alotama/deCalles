"use client"
import React, { useState, FC, FormEvent } from 'react';

interface FormProps {}

const CalleForm: FC<FormProps> = () => {
  const [nombre, setNombre] = useState<string>('');
  const [longitud, setLongitud] = useState<number | string>('');
  const [numeracion_maxima, setNumeracionMaxima] = useState<number | string>('');
  const [tipo_calle, setTipoCalle] = useState<string>('');
  const [historia_nombre, setHistoriaNombre] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aquí colocarás la lógica cuando el formulario sea enviado
    console.log('Formulario Enviado');
  };

  return (
    <form onSubmit={handleSubmit} className="w-auto flex flex-col">
      <label className="block mb-3">
        Nombre:
        <input type="text" value={nombre} onChange={(e) => setNombre(e.currentTarget.value)} className="w-full p-2 box-border" />
      </label>
      <label className="block mb-4">
        Longitud:
        <input type="number" value={longitud} onChange={(e) => setLongitud(e.currentTarget.value)} className="w-full p-2 box-border" />
      </label>
      <label className="block mb-4">
        Numeración Máxima:
        <input
          type="number"
          value={numeracion_maxima}
          onChange={(e) => setNumeracionMaxima(e.currentTarget.value)}
          className="w-full p-2 box-border"
        />
      </label>
      <label className="block mb-4">
        Tipo de Calle:
        <input type="text" value={tipo_calle} onChange={(e) => setTipoCalle(e.currentTarget.value)} className="w-full p-2 box-border" />
      </label>
      <label className="block mb-4">
        Historia del Nombre:
        <textarea value={historia_nombre} onChange={(e) => setHistoriaNombre(e.currentTarget.value)} className={"w-full p-2 box-border"} />
      </label>
      <button type="submit" className="block mb-4">Agregar Calle</button>
    </form>
  );
};

export default CalleForm;