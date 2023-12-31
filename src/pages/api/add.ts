import type { NextApiRequest, NextApiResponse } from 'next'
import Calle from '../../models/calles'
import { importJsonFromDirectory } from '../../assets/content'
import { transformName } from '../../utils/transformName'

type ResponseData = {
  message: string
}


const requestOptions: { [type: string]: string } = {
  method: 'GET',
  redirect: 'follow'
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {

    fetch(`https://apis.datos.gob.ar/georef/api/calles?departamento=Comuna ${req.query.comuna}&categoria=avenida`, requestOptions)
      .then(response => response.json())
      .then(result => {
        const findCalle = result.calles.find(calle => transformName(calle.nombre).includes(`${req.query.calle}`))

        const directoryPath = 'src/assets/content/streets';

        // Crear un array de Promises
        const promises = result.calles.map(calle =>
          importJsonFromDirectory(directoryPath).then(history => {
            const findHistory = history.find(story => story.name.includes(req.query.calle))
            return new Calle(calle.nombre, calle.altura.fin.izquierda, calle.categoria, findHistory, new Date(), new Date());
          })
        );

        // Retornar Promise.all para esperar a que todas las Promises se resuelvan
        return Promise.all(promises).then(newCalles => {
          res.status(200).json({ test: newCalles, findCalle })
        });
      })

      .catch(error => console.log('error', error));



  } catch (error) {
    console.error(error)
  }
}