import type { NextApiRequest, NextApiResponse } from 'next'
import Calle from '../../models/calles'
 
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

      const test = result.calles.map(calle => {
        const newCalle = new Calle(calle.nombre, calle.altura.fin.izquierda, calle.categoria, 'lorem ipsum', new Date(), new Date())

        return newCalle
      })

      console.log('test >', test)

      res.status(200).json(result)
    })
    .catch(error => console.log('error', error));
    
    
    
  } catch (error) {
    console.error(error) 
  }
}