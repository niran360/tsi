const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const DEFAULT_MATCHES = {
  1: {
    id: 1,
    title: 'Ikoyi FC vs Lekki United',
    name: 'Ikoyi FC vs Lekki United',
    homeClub: 'Ikoyi FC',
    awayClub: 'Lekki United',
    homeGoals: 2,
    awayGoals: 1,
    minute: 45,
    status: 'live',
    category: 'Premier League',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
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
      { id: 'main', name: 'Main Camera', active: true, streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
      { id: 'tactical', name: 'Tactical View', active: false, streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
      { id: 'crowd', name: 'Crowd View', active: false, streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
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
    rating: 4.8,
    duration: '90m',
    date: 'Today',
    thumbnail: '🟢',
  },
  2: {
    id: 2,
    title: 'Mushin Elite vs Yaba United',
    name: 'Mushin Elite vs Yaba United',
    homeClub: 'Mushin Elite',
    awayClub: 'Yaba United',
    homeGoals: 3,
    awayGoals: 2,
    minute: 90,
    status: 'replay',
    category: 'Premier League',
    rating: 4.5,
    duration: '90m',
    date: 'Yesterday',
    thumbnail: '🎬',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    qualities: ['Auto', '1080p', '720p', '480p', '360p'],
    audioTracks: [{ id: 'en', name: 'English Commentary', active: true }],
    subtitles: [{ id: 'en', name: 'English', active: true }],
    cameras: [{ id: 'main', name: 'Main Camera', active: true, streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' }],
    stats: {
      possession: { home: 50, away: 50 },
      shots: { home: 10, away: 9 },
      fouls: { home: 6, away: 8 },
      corners: { home: 5, away: 4 },
    },
    events: [],
  },
  3: {
    id: 3,
    title: 'VI Stars vs Surulere Warriors',
    name: 'VI Stars vs Surulere Warriors',
    homeClub: 'VI Stars',
    awayClub: 'Surulere Warriors',
    homeGoals: null,
    awayGoals: null,
    minute: 0,
    status: 'upcoming',
    category: 'Cup',
    rating: 4.2,
    duration: '90m',
    date: 'Tomorrow',
    thumbnail: '🔵',
    time: 'Tomorrow, 6:00 PM',
    streamUrl: '',
    qualities: ['Auto'],
    audioTracks: [{ id: 'en', name: 'English Commentary', active: true }],
    subtitles: [{ id: 'en', name: 'English', active: true }],
    cameras: [],
    stats: {
      possession: { home: 50, away: 50 },
      shots: { home: 0, away: 0 },
      fouls: { home: 0, away: 0 },
      corners: { home: 0, away: 0 },
    },
    events: [],
  },
  4: {
    id: 4,
    title: 'Shomolu FC vs Bariga Strikers',
    name: 'Shomolu FC vs Bariga Strikers',
    homeClub: 'Shomolu FC',
    awayClub: 'Bariga Strikers',
    homeGoals: 1,
    awayGoals: 1,
    minute: 90,
    status: 'replay',
    category: 'League',
    rating: 4.0,
    duration: '90m',
    date: '3 days ago',
    thumbnail: '🎬',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    qualities: ['Auto', '1080p', '720p', '480p', '360p'],
    audioTracks: [{ id: 'en', name: 'English Commentary', active: true }],
    subtitles: [{ id: 'en', name: 'English', active: true }],
    cameras: [{ id: 'main', name: 'Main Camera', active: true, streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' }],
    stats: {
      possession: { home: 48, away: 52 },
      shots: { home: 7, away: 7 },
      fouls: { home: 12, away: 10 },
      corners: { home: 3, away: 5 },
    },
    events: [],
  },
  5: {
    id: 5,
    title: 'Training Session - Advanced Tactics',
    name: 'Training Session - Advanced Tactics',
    homeClub: 'TSI Academy',
    awayClub: 'Tactics Class',
    homeGoals: null,
    awayGoals: null,
    minute: 45,
    status: 'replay',
    category: 'Training',
    rating: 4.7,
    duration: '45m',
    date: '5 days ago',
    thumbnail: '📚',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    qualities: ['Auto', '720p', '480p'],
    audioTracks: [{ id: 'en', name: 'Coach Commentary', active: true }],
    subtitles: [],
    cameras: [{ id: 'main', name: 'Main Camera', active: true, streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' }],
    stats: {
      possession: { home: 50, away: 50 },
      shots: { home: 0, away: 0 },
      fouls: { home: 0, away: 0 },
      corners: { home: 0, away: 0 },
    },
    events: [],
  },
  6: {
    id: 6,
    title: 'Player Interviews & Behind the Scenes',
    name: 'Player Interviews & Behind the Scenes',
    homeClub: 'TSI Media',
    awayClub: 'Scouts',
    homeGoals: null,
    awayGoals: null,
    minute: 30,
    status: 'replay',
    category: 'Documentary',
    rating: 4.6,
    duration: '30m',
    date: '1 week ago',
    thumbnail: '🎙️',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    qualities: ['Auto', '720p'],
    audioTracks: [{ id: 'en', name: 'Interview Audio', active: true }],
    subtitles: [],
    cameras: [{ id: 'main', name: 'Main Camera', active: true, streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' }],
    stats: {
      possession: { home: 50, away: 50 },
      shots: { home: 0, away: 0 },
      fouls: { home: 0, away: 0 },
      corners: { home: 0, away: 0 },
    },
    events: [],
  }
};

// Memory fallback for environments without KV
let inMemoryMatches = null;

async function getMatchesDb(env) {
  if (env.TSI_KV) {
    const data = await env.TSI_KV.get('matches_db');
    if (data) {
      return JSON.parse(data);
    }
    // Initialize if empty
    await env.TSI_KV.put('matches_db', JSON.stringify(DEFAULT_MATCHES));
    return DEFAULT_MATCHES;
  }
  
  if (!inMemoryMatches) {
    inMemoryMatches = JSON.parse(JSON.stringify(DEFAULT_MATCHES));
  }
  return inMemoryMatches;
}

async function saveMatchesDb(env, db) {
  if (env.TSI_KV) {
    await env.TSI_KV.put('matches_db', JSON.stringify(db));
  } else {
    inMemoryMatches = db;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    try {
      // 1. GET /api/matches
      if (path === '/api/matches' && request.method === 'GET') {
        const db = await getMatchesDb(env);
        const matchesList = Object.values(db);
        return new Response(JSON.stringify(matchesList), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 2. GET /api/matches/:id
      const matchDetailsMatch = path.match(/^\/api\/matches\/(\d+)$/);
      if (matchDetailsMatch && request.method === 'GET') {
        const id = parseInt(matchDetailsMatch[1], 10);
        const db = await getMatchesDb(env);
        const match = db[id];
        
        if (!match) {
          return new Response(JSON.stringify({ error: 'Match not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }
        
        return new Response(JSON.stringify(match), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 3. GET /api/matches/:id/stream-url
      const streamUrlMatch = path.match(/^\/api\/matches\/(\d+)\/stream-url$/);
      if (streamUrlMatch && request.method === 'GET') {
        const id = parseInt(streamUrlMatch[1], 10);
        const db = await getMatchesDb(env);
        const match = db[id];
        
        if (!match) {
          return new Response(JSON.stringify({ error: 'Match not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        // Optional: Support Cloudflare Stream URL signing if API secrets are set
        // For standard streamUrl, we just return the streamUrl field
        return new Response(JSON.stringify({ streamUrl: match.streamUrl }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 4. POST /api/matches
      if (path === '/api/matches' && request.method === 'POST') {
        const body = await request.json();
        const { homeClub, awayClub, category, date, time } = body;

        if (!homeClub || !awayClub) {
          return new Response(JSON.stringify({ error: 'homeClub and awayClub are required fields' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        const db = await getMatchesDb(env);
        const nextId = Math.max(...Object.keys(db).map(Number)) + 1;

        let streamUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
        let cloudflareStreamUid = null;
        let rtmpUrl = 'rtmps://live.cloudflare.com:443/live/';
        let rtmpKey = 'mock-stream-key-' + Math.random().toString(36).substring(2, 10);

        // Attempt Cloudflare Stream Live Input integration if credentials exist
        const cfToken = env.CLOUDFLARE_API_TOKEN || env.vars?.CLOUDFLARE_API_TOKEN;
        const cfAccount = env.CLOUDFLARE_ACCOUNT_ID || env.vars?.CLOUDFLARE_ACCOUNT_ID;

        let cfCreated = false;
        if (cfToken && cfAccount) {
          try {
            const cfResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccount}/stream/live_inputs`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${cfToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                meta: { name: `${homeClub} vs ${awayClub}` },
                recording: { mode: 'automatic', timeoutSeconds: 3600 }
              })
            });

            if (cfResponse.ok) {
              const cfData = await cfResponse.json();
              if (cfData.success && cfData.result) {
                cloudflareStreamUid = cfData.result.uid;
                rtmpUrl = cfData.result.rtmps.url;
                rtmpKey = cfData.result.rtmps.streamKey;
                streamUrl = cfData.result.playback.hls;
                cfCreated = true;
              }
            }
          } catch (e) {
            console.error('Failed to create Cloudflare Live Input:', e);
          }
        }

        const newMatch = {
          id: nextId,
          title: `${homeClub} vs ${awayClub}`,
          name: `${homeClub} vs ${awayClub}`,
          homeClub,
          awayClub,
          homeGoals: null,
          awayGoals: null,
          minute: 0,
          status: 'upcoming',
          category: category || 'Premier League',
          rating: 0.0,
          duration: '90m',
          date: date || 'Today',
          time: time || '6:00 PM',
          streamUrl: cfCreated ? streamUrl : '', // Empty until live if mock, or holds actual url if CF succeeded
          cloudflareStreamUid,
          rtmpUrl,
          rtmpKey,
          qualities: ['Auto'],
          audioTracks: [{ id: 'en', name: 'English Commentary', active: true }],
          subtitles: [],
          cameras: [],
          stats: {
            possession: { home: 50, away: 50 },
            shots: { home: 0, away: 0 },
            fouls: { home: 0, away: 0 },
            corners: { home: 0, away: 0 },
          },
          events: [],
        };

        // If not using actual Cloudflare Stream, define fallback camera info
        if (!cfCreated) {
          newMatch.cameras = [
            { id: 'main', name: 'Main Camera', active: true, streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' }
          ];
        } else {
          newMatch.cameras = [
            { id: 'main', name: 'Main Camera', active: true, streamUrl: streamUrl }
          ];
        }

        db[nextId] = newMatch;
        await saveMatchesDb(env, db);

        return new Response(JSON.stringify({
          success: true,
          match: newMatch,
          cloudflareStreamCreated: cfCreated,
          rtmp: {
            url: rtmpUrl,
            streamKey: rtmpKey
          }
        }), {
          status: 201,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 5. POST /api/webhooks/cloudflare
      if (path === '/api/webhooks/cloudflare' && request.method === 'POST') {
        const body = await request.json();
        
        // Cloudflare webhook event types for stream status
        // e.g., stream.live_input.ready or stream.live_input.disconnected
        // Note: verify webhook signature here if needed for security
        const liveInputUid = body.liveInputUID;
        const status = body.status; // e.g. "connected", "disconnected"

        if (liveInputUid) {
          const db = await getMatchesDb(env);
          let matchUpdated = false;

          for (const key of Object.keys(db)) {
            const match = db[key];
            if (match.cloudflareStreamUid === liveInputUid) {
              if (status === 'connected') {
                match.status = 'live';
                match.streamUrl = match.streamUrl || `https://customer-${env.CLOUDFLARE_ACCOUNT_ID}.cloudflarestream.com/${liveInputUid}/manifest/video.m3u8`;
              } else if (status === 'disconnected') {
                match.status = 'replay';
              }
              matchUpdated = true;
              break;
            }
          }

          if (matchUpdated) {
            await saveMatchesDb(env, db);
            return new Response(JSON.stringify({ success: true, message: 'Match status updated via webhook' }), {
              status: 200,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
        }

        return new Response(JSON.stringify({ message: 'Webhook received but no action taken' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // Fallback
      return new Response(JSON.stringify({ error: 'Route not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  }
};
