"use client"
import { useEffect, useState } from 'react';
import Card from '../component/card';
import Input from '../component/form/input';
import Select from '../component/form/select';

export default function Home() {
  const [calles, setCalles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchConfig, setSearchConfig] = useState({
    comuna: "",
    calle: "",
    categoria: ["calle", "avenida"],
    selectedCategoria: ""
  })

  const [calle, setCalle] = useState("")
  const [response, setResponse] = useState("")

  useEffect(() => {
    const fetchCalles = async () => {
      try {
        const res = await fetch('/api/calles');
        if (!res.ok) throw new Error('Error fetching calles');
        const data = await res.json();
        setCalles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCalles();
  }, []);

  const getInformation = async (calle: string, comuna: string) => {
    try {
      const res = await fetch(`/api/add?comuna=${comuna}&calle=${calle}`);
      if (!res.ok) throw new Error('Error fetching calles');
      const data = await res.text();
      setResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Calles de Buenos Aires</h1>


      <Card>
        <form className='flex flex-col'>
          <Input
            label='Comuna:'
            value={searchConfig.comuna}
            onChange={(e: any) => setSearchConfig(prevState => ({
              ...prevState,
              comuna: e.target.value,
            }))}
          />
          <Select
            label="Mi Select"
            value={searchConfig.selectedCategoria}
            onChange={(value) => setSearchConfig(prevState => ({
              ...prevState,
              selectedCategoria: value,
            }))}
            options={searchConfig.categoria}
          />
          <Input
            label='Calle:'
            value={calle}
            onChange={(e: any) => setCalle(e.target.value)}
          />
        </form>
        <button className='bg-green-300 rounded-sm p-2' onClick={() => {
          console.log('ok')
          getInformation(searchConfig.calle, searchConfig.comuna)
        }}>
          Buscar
        </button>
      </Card>

      {response}

      {loading ? (
        <p>"Loading..."</p>
      ) : (
        <ul>
          {calles.map(calle => (
            <li key={calle.id_calle}>{calle.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
