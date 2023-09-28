// Función para transformar el nombre de la calle en un formato comparable con el parámetro
export const transformName = (nombre: string) => {
    return nombre.toLowerCase().replace(/ /g, '-');
}