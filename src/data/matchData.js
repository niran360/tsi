export const matchData = {
  1: {
    id: 1,
    name: 'Ikoyi FC vs Lekki United',
    homeClub: 'Ikoyi FC',
    awayClub: 'Lekki United',
    homeGoals: 2,
    awayGoals: 1,
    minute: 45,
    status: 'live',
    category: 'Premier League',
    streamUrl: '/7up-advertisement.mp4',
    qualities: ['Auto', '1080p', '720p', '480p', '360p'],
    audioTracks: [
      { id: 'en', name: 'English Commentary', active: true },
      { id: 'yo', name: 'Yoruba Commentary', active: false },
    ],
    subtitles: [
      { id: 'en', name: 'English', active: true },
      { id: 'es', name: 'Spanish', active: false },
    ],
    cameras: [
      { id: 'main', name: 'Main Camera', active: true, streamUrl: '/7up-advertisement.mp4' },
      { id: 'tactical', name: 'Tactical View', active: false, streamUrl: '/7up-advertisement.mp4' },
      { id: 'crowd', name: 'Crowd View', active: false, streamUrl: '/7up-advertisement.mp4' },
    ],
    stats: {
      possession: { home: 55, away: 45 },
      shots: { home: 8, away: 5 },
      fouls: { home: 3, away: 5 },
      corners: { home: 4, away: 2 },
    },
    events: [
      { minute: 45, team: 'Ikoyi FC', type: 'goal', player: 'Ahmed Hassan', description: 'Header from corner' },
      { minute: 38, team: 'Lekki United', type: 'goal', player: 'Chisom Okoro', description: 'Penalty kick' },
      { minute: 23, team: 'Ikoyi FC', type: 'goal', player: 'Tunde Oladele', description: 'Volley strike' },
      { minute: 12, team: 'Lekki United', type: 'yellow', player: 'David Adebayo', description: 'Rough tackle' },
    ],
  },
}
