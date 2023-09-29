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
            const processedAvenida = processAvenida(avenida, queryCalle.calle);

            // Paso 2: Guardar en la base de datos
            await saveAvenidaToDatabase(processedAvenida);
            res.status(200).json(processedAvenida)
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

/**
 * Función para transformar un objeto de entrada a un formato específico y filtrar por nombre.
 * - Agrupa las avenidas por nombre.
 * - Recolecta información de todas las entradas con el mismo nombre.
 * @param {object} input - El objeto de entrada que deseas transformar.
 * @param {string} nombreBuscado - El nombre de la avenida que estás buscando.
 * @returns {object} El objeto transformado y filtrado.
 */
const processAvenida = (input, nombreBuscado) => {
    // Crear un objeto para almacenar el resultado.
    const result = {};
    
    // Crear una expresión regular para validar el nombre de la avenida.
    const regex = new RegExp(nombreBuscado, 'i');
    
    // Iterar sobre cada avenida en el array de avenidas.
    input.calles.forEach(avenida => {
        // Si el nombre de la avenida no coincide con el nombre buscado, retornar.
        if (!regex.test(avenida.nombre)) return;
        
        // Normalizar el nombre de la avenida.
        const name = avenida.nombre.toLowerCase().replace(/\s+/g, '-');
        
        // Si la avenida no está en el resultado, añadirla.
        if (!result[name]) {
            result[name] = {
                number_max: 0,
                name: avenida.nombre,
                complete_name: {
                    name: avenida.nombre,
                    full_name: avenida.nomenclatura,
                },
                category: avenida.categoria.toLowerCase(),
                district: [],
                data: {
                    ...input.data[0]
                }
            };
        }
        
        // Añadir el departamento al array de barrios si no está ya presente.
        if (!result[name].district.includes(avenida.departamento.nombre.toLowerCase())) {
            result[name].district.push(avenida.departamento.nombre.toLowerCase());
        }
        
        // Actualizar el número máximo si es necesario.
        const maxNumber = Math.max(avenida.altura.fin.derecha, avenida.altura.fin.izquierda);
        if (maxNumber > result[name].number_max) {
            result[name].number_max = maxNumber;
        }
    });

    return result;
};



const fetchAvenidaData = async (calle: string) => {
    const requestOptions: { [type: string]: string } = {
        method: 'GET',
        redirect: 'follow'
    };

    const geoData = await fetch(`https://apis.datos.gob.ar/georef/api/calles?nombre=${calle}&localidad_censal=Ciudad Autónoma de Buenos Aires&max=100`, requestOptions)
    .then(response => response.json())

    return geoData
}