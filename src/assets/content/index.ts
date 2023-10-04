import { normalizeString } from '@/utils/normalizeString';
import fs from 'fs/promises';
import path from 'path';

export async function importJsonFromDirectory(directoryPath: string, requestedStreet?: string) {
  const resolvedPath = path.resolve(directoryPath);
  const normalizedRequestStreet = requestedStreet && normalizeString(requestedStreet)
  
  try {
    const files = await fs.readdir(resolvedPath);
    const jsonFiles = files.filter(file => path.extname(file) === '.json' && (!normalizedRequestStreet || file.includes(normalizedRequestStreet)));
    
    if(normalizedRequestStreet && jsonFiles.length === 0) throw new Error(`No file found for the requested street: ${normalizedRequestStreet}`);
    
    const jsonData = await Promise.all(
      jsonFiles.map(async file => {
        const filePath = path.join(resolvedPath, file);
        const content = await fs.readFile(filePath, 'utf-8');
        return {
          ...JSON.parse(content)
        };
      })
    );
    
    return jsonData;
  } catch (error) {
    console.error(`Error reading JSON from ${resolvedPath}:`, error);
    throw error;
  }
}
