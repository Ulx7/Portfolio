export interface WinampTrack {
  metaData: {
    artist: string;
    title: string;
  };
  url: string;
  duration?: number;
}

export const WINAMP_PLAYLIST: WinampTrack[] = [
  {
    metaData: {
      artist: "Mike Llama",
      title: "Winamp Intro - It Really Whips the Llama's Ass"
    },
    url: "/music/winamp-intro.mp3",
    duration: 5
  },
  {
    metaData: {
      artist: "Avicii",
      title: "The Nights"
    },
    url: "/music/Avicii - The Nights - AviciiOfficialVEVO.mp3"
  },
  {
    metaData: {
      artist: "Glass Animals",
      title: "Heat Waves"
    },
    url: "/music/Glass Animals - Heat Waves (Official Video) - GlassAnimalsVEVO.mp3"
  },
  {
    metaData: {
      artist: "Green Day",
      title: "Boulevard of Broken Dreams"
    },
    url: "/music/Green Day - Boulevard Of Broken Dreams [Official Music Video] [4K Upgrade] - Green Day.mp3"
  },
  {
    metaData: {
      artist: "Labi Siffre",
      title: "Cannock Chase"
    },
    url: "/music/Labi Siffre - Cannock Chase (Official Lyric Video) - Labi Siffre.mp3"
  },
  {
    metaData: {
      artist: "WOS",
      title: "CONTANDO OVEJAS"
    },
    url: "/music/WOS - CONTANDO OVEJAS (Concept Video) - WOS DS3.mp3"
  }
];
