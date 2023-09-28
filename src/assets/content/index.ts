import fs from 'fs/promises';
import path from 'path';

export async function importJsonFromDirectory(directoryPath: string) {
  // Resolviendo la ruta del directorio
  const resolvedPath = path.resolve(directoryPath);
  
  try {
    // Leyendo el contenido del directorio
    const files = await fs.readdir(resolvedPath);
    
    // Filtrando archivos JSON
    const jsonFiles = files.filter(file => path.extname(file) === '.json');

    // Leyendo e importando archivos JSON
    const jsonData = await Promise.all(
      jsonFiles.map(async file => {
        const filePath = path.join(resolvedPath, file);
        const content = await fs.readFile(filePath, 'utf-8');
        return {
          ...JSON.parse(content),
          name: file.replace(/\.json/g, "")
        };
      })
    );
    
    return jsonData;
  } catch (error) {
    console.error(`Error reading JSON from ${resolvedPath}:`, error);
    throw error;
  }
}
