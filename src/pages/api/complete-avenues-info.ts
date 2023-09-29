import type { NextApiRequest, NextApiResponse } from 'next'
import Calle from '../../models/calles'
import { importJsonFromDirectory } from '../../assets/content'
import { transformName } from '../../utils/transformName'

type ResponseData = {
    message: string
}

interface ApiRequest {
    query: {
        comuna: string,
        calle: string,
        type: string,
    }
}

export default async function handler(
    req: ApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const queryCalle = req.query;
        if (!queryCalle) return res.status(400).send('Bad Request: Missing calle parameter');

        // Paso 1: Verificar en la base de datos
        let avenida = await findAvenidaInDatabase(queryCalle.calle);

        if (!avenida) { // Si no está en la base de datos

            // Obtén los datos de la API y el contenido estático
            avenida = await fetchAvenidaData(queryCalle.calle);
            const directoryPath = 'src/assets/content/streets';
            
            const staticContent = await importJsonFromDirectory(directoryPath, queryCalle.calle);
            avenida.data = staticContent;
            // Procesar la respuesta según las necesidades del negocio
            const processedAvenida = processAvenida(avenida);

            // Paso 2: Guardar en la base de datos
            await saveAvenidaToDatabase(processedAvenida);
        }

        res.json(avenida);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function findAvenidaInDatabase(calle: string): Promise<Avenida | null> {
    // Aquí tu lógica para buscar en la base de datos.
    // Retorna el objeto si se encuentra, o null si no se encuentra.
}

async function saveAvenidaToDatabase(avenida: Avenida): Promise<void> {
    // Aquí tu lógica para guardar en la base de datos.
}

function processAvenida(avenida: Avenida): Avenida {
    // Aquí tu lógica para procesar el objeto avenida según las necesidades del negocio.
    return avenida;
}

const fetchAvenidaData = async (calle: string) => {
    const requestOptions: { [type: string]: string } = {
        method: 'GET',
        redirect: 'follow'
    };

    const geoData = await fetch(`https://apis.datos.gob.ar/georef/api/calles?nombre=${calle}&localidad_censal=Ciudad Autónoma de Buenos Aires&max=100`, requestOptions)
    .then(response => response.json())

    return geoData
}