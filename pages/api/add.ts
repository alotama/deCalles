import type { NextApiRequest, NextApiResponse } from 'next'
 
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
    console.log('req >', req.query)

    

    fetch(`https://apis.datos.gob.ar/georef/api/calles?departamento=Comuna ${req.query.comuna}&categoria=avenida`, requestOptions)
    .then(response => response.json())
    .then(result => res.status(200).json(result))
    .catch(error => console.log('error', error));
    
    
    
  } catch (error) {
    console.error(error) 
  }
}