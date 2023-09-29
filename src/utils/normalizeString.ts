/**
 * Función para normalizar un string.
 * - Convierte todas las letras a minúsculas.
 * - Reemplaza los espacios por guiones.
 * @param {string} input - El string de entrada que deseas normalizar.
 * @returns {string} El string normalizado.
 */
export const normalizeString = (input: string): string => 
    input.toLowerCase().replace(/\s+/g, '-');
