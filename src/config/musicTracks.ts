export interface WinampTrack {
  metaData: {
    artist: string;
    title: string;
  };
  url: string;
  duration?: number;
}

/**
 * =====================================================================
 * LISTA DE CANCIONES DE WINAMP (WINAMP PLAYLIST)
 * =====================================================================
 * ¡Aquí puedes agregar toda la música que te guste!
 * 
 * INSTRUCCIONES:
 * 1. Copia tus archivos de música en formato .mp3 en la carpeta:
 *    public/music/ (por ejemplo: public/music/mi-cancion.mp3)
 * 2. Agrega una nueva entrada a la lista WINAMP_PLAYLIST abajo:
 *    {
 *      metaData: {
 *        artist: "Nombre del Artista",
 *        title: "Nombre de la Canción"
 *      },
 *      url: "/music/mi-cancion.mp3"
 *    }
 * 3. ¡Guarda el archivo y listo! Al abrir Winamp en tu portfolio
 *    aparecerán todas tus canciones cargadas en la lista de reproducción.
 * 
 * NOTA: También puedes arrastrar y soltar (drag & drop) cualquier archivo
 * MP3 directamente sobre la ventana de Winamp mientras esté abierto.
 */
export const WINAMP_PLAYLIST: WinampTrack[] = [
  {
    metaData: {
      artist: "Mike Llama",
      title: "Winamp Intro - It Really Whips the Llama's Ass"
    },
    url: "/music/winamp-intro.mp3",
    duration: 5
  }
];
