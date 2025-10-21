import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Dirent } from 'node:fs';


export async function listDirectories(targetPath: string): Promise<void> {
    const absolutePath: string = resolve(targetPath);

    console.log(`Buscando directorios en: ${absolutePath}\n`);

    try {
        const entries: Dirent[] = await readdir(absolutePath, { withFileTypes: true });

        const directories: string[] = entries
            .filter((dirent: Dirent) => dirent.isDirectory())
            .map((dirent: Dirent) => dirent.name);

        if (directories.length === 0) {
            console.log("No se encontraron subdirectorios en esta ubicación.");
            return;
        }

        console.log("Directorios encontrados:");
        directories.forEach((dirName: string) => {
            console.log(`- ${dirName}`);
        });

    } catch (error: unknown) {
        if (error instanceof Error && 'code' in error) {
            const nodeError = error as NodeJS.ErrnoException; // Casteo para acceder a la propiedad 'code'
            if (nodeError.code === 'ENOENT') {
                console.error(`Error: El directorio no existe en la ruta: ${absolutePath}`);
            } else if (nodeError.code === 'ENOTDIR') {
                console.error(`Error: La ruta ${absolutePath} no es un directorio.`);
            } else {
                console.error(`Ocurrió un error al listar los directorios: ${nodeError.message}`);
            }
        } else {
            console.error("Ocurrió un error desconocido.");
        }
    }
}