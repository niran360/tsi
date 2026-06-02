var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-1PkZmk/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// src/index.js
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
var DEFAULT_MATCHES = {
  1: {
    id: 1,
    title: "Ikoyi FC vs Lekki United",
    name: "Ikoyi FC vs Lekki United",
    homeClub: "Ikoyi FC",
    awayClub: "Lekki United",
    homeGoals: 2,
    awayGoals: 1,
    minute: 45,
    status: "live",
    category: "Premier League",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    qualities: ["Auto", "1080p", "720p", "480p", "360p"],
    audioTracks: [
      { id: "en", name: "English Commentary", active: true },
      { id: "yo", name: "Yoruba Commentary", active: false }
    ],
    subtitles: [
      { id: "en", name: "English", active: true },
      { id: "es", name: "Spanish", active: false }
    ],
    cameras: [
      { id: "main", name: "Main Camera", active: true, streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" },
      { id: "tactical", name: "Tactical View", active: false, streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" },
      { id: "crowd", name: "Crowd View", active: false, streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }
    ],
    stats: {
      possession: { home: 55, away: 45 },
      shots: { home: 8, away: 5 },
      fouls: { home: 3, away: 5 },
      corners: { home: 4, away: 2 }
    },
    events: [
      { minute: 45, team: "Ikoyi FC", type: "goal", player: "Ahmed Hassan", description: "Header from corner" },
      { minute: 38, team: "Lekki United", type: "goal", player: "Chisom Okoro", description: "Penalty kick" },
      { minute: 23, team: "Ikoyi FC", type: "goal", player: "Tunde Oladele", description: "Volley strike" },
      { minute: 12, team: "Lekki United", type: "yellow", player: "David Adebayo", description: "Rough tackle" }
    ],
    rating: 4.8,
    duration: "90m",
    date: "Today",
    thumbnail: "\u{1F7E2}"
  },
  2: {
    id: 2,
    title: "Mushin Elite vs Yaba United",
    name: "Mushin Elite vs Yaba United",
    homeClub: "Mushin Elite",
    awayClub: "Yaba United",
    homeGoals: 3,
    awayGoals: 2,
    minute: 90,
    status: "replay",
    category: "Premier League",
    rating: 4.5,
    duration: "90m",
    date: "Yesterday",
    thumbnail: "\u{1F3AC}",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    qualities: ["Auto", "1080p", "720p", "480p", "360p"],
    audioTracks: [{ id: "en", name: "English Commentary", active: true }],
    subtitles: [{ id: "en", name: "English", active: true }],
    cameras: [{ id: "main", name: "Main Camera", active: true, streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }],
    stats: {
      possession: { home: 50, away: 50 },
      shots: { home: 10, away: 9 },
      fouls: { home: 6, away: 8 },
      corners: { home: 5, away: 4 }
    },
    events: []
  },
  3: {
    id: 3,
    title: "VI Stars vs Surulere Warriors",
    name: "VI Stars vs Surulere Warriors",
    homeClub: "VI Stars",
    awayClub: "Surulere Warriors",
    homeGoals: null,
    awayGoals: null,
    minute: 0,
    status: "upcoming",
    category: "Cup",
    rating: 4.2,
    duration: "90m",
    date: "Tomorrow",
    thumbnail: "\u{1F535}",
    time: "Tomorrow, 6:00 PM",
    streamUrl: "",
    qualities: ["Auto"],
    audioTracks: [{ id: "en", name: "English Commentary", active: true }],
    subtitles: [{ id: "en", name: "English", active: true }],
    cameras: [],
    stats: {
      possession: { home: 50, away: 50 },
      shots: { home: 0, away: 0 },
      fouls: { home: 0, away: 0 },
      corners: { home: 0, away: 0 }
    },
    events: []
  },
  4: {
    id: 4,
    title: "Shomolu FC vs Bariga Strikers",
    name: "Shomolu FC vs Bariga Strikers",
    homeClub: "Shomolu FC",
    awayClub: "Bariga Strikers",
    homeGoals: 1,
    awayGoals: 1,
    minute: 90,
    status: "replay",
    category: "League",
    rating: 4,
    duration: "90m",
    date: "3 days ago",
    thumbnail: "\u{1F3AC}",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    qualities: ["Auto", "1080p", "720p", "480p", "360p"],
    audioTracks: [{ id: "en", name: "English Commentary", active: true }],
    subtitles: [{ id: "en", name: "English", active: true }],
    cameras: [{ id: "main", name: "Main Camera", active: true, streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }],
    stats: {
      possession: { home: 48, away: 52 },
      shots: { home: 7, away: 7 },
      fouls: { home: 12, away: 10 },
      corners: { home: 3, away: 5 }
    },
    events: []
  },
  5: {
    id: 5,
    title: "Training Session - Advanced Tactics",
    name: "Training Session - Advanced Tactics",
    homeClub: "TSI Academy",
    awayClub: "Tactics Class",
    homeGoals: null,
    awayGoals: null,
    minute: 45,
    status: "replay",
    category: "Training",
    rating: 4.7,
    duration: "45m",
    date: "5 days ago",
    thumbnail: "\u{1F4DA}",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    qualities: ["Auto", "720p", "480p"],
    audioTracks: [{ id: "en", name: "Coach Commentary", active: true }],
    subtitles: [],
    cameras: [{ id: "main", name: "Main Camera", active: true, streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }],
    stats: {
      possession: { home: 50, away: 50 },
      shots: { home: 0, away: 0 },
      fouls: { home: 0, away: 0 },
      corners: { home: 0, away: 0 }
    },
    events: []
  },
  6: {
    id: 6,
    title: "Player Interviews & Behind the Scenes",
    name: "Player Interviews & Behind the Scenes",
    homeClub: "TSI Media",
    awayClub: "Scouts",
    homeGoals: null,
    awayGoals: null,
    minute: 30,
    status: "replay",
    category: "Documentary",
    rating: 4.6,
    duration: "30m",
    date: "1 week ago",
    thumbnail: "\u{1F399}\uFE0F",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    qualities: ["Auto", "720p"],
    audioTracks: [{ id: "en", name: "Interview Audio", active: true }],
    subtitles: [],
    cameras: [{ id: "main", name: "Main Camera", active: true, streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }],
    stats: {
      possession: { home: 50, away: 50 },
      shots: { home: 0, away: 0 },
      fouls: { home: 0, away: 0 },
      corners: { home: 0, away: 0 }
    },
    events: []
  }
};
var inMemoryMatches = null;
async function getMatchesDb(env) {
  if (env.TSI_KV) {
    const data = await env.TSI_KV.get("matches_db");
    if (data) {
      return JSON.parse(data);
    }
    await env.TSI_KV.put("matches_db", JSON.stringify(DEFAULT_MATCHES));
    return DEFAULT_MATCHES;
  }
  if (!inMemoryMatches) {
    inMemoryMatches = JSON.parse(JSON.stringify(DEFAULT_MATCHES));
  }
  return inMemoryMatches;
}
__name(getMatchesDb, "getMatchesDb");
async function saveMatchesDb(env, db) {
  if (env.TSI_KV) {
    await env.TSI_KV.put("matches_db", JSON.stringify(db));
  } else {
    inMemoryMatches = db;
  }
}
__name(saveMatchesDb, "saveMatchesDb");
var src_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }
    try {
      if (path === "/api/matches" && request.method === "GET") {
        const db = await getMatchesDb(env);
        const matchesList = Object.values(db);
        return new Response(JSON.stringify(matchesList), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }
      const matchDetailsMatch = path.match(/^\/api\/matches\/(\d+)$/);
      if (matchDetailsMatch && request.method === "GET") {
        const id = parseInt(matchDetailsMatch[1], 10);
        const db = await getMatchesDb(env);
        const match = db[id];
        if (!match) {
          return new Response(JSON.stringify({ error: "Match not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json", ...corsHeaders }
          });
        }
        return new Response(JSON.stringify(match), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }
      const streamUrlMatch = path.match(/^\/api\/matches\/(\d+)\/stream-url$/);
      if (streamUrlMatch && request.method === "GET") {
        const id = parseInt(streamUrlMatch[1], 10);
        const db = await getMatchesDb(env);
        const match = db[id];
        if (!match) {
          return new Response(JSON.stringify({ error: "Match not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json", ...corsHeaders }
          });
        }
        return new Response(JSON.stringify({ streamUrl: match.streamUrl }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }
      if (path === "/api/matches" && request.method === "POST") {
        const body = await request.json();
        const { homeClub, awayClub, category, date, time } = body;
        if (!homeClub || !awayClub) {
          return new Response(JSON.stringify({ error: "homeClub and awayClub are required fields" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders }
          });
        }
        const db = await getMatchesDb(env);
        const nextId = Math.max(...Object.keys(db).map(Number)) + 1;
        let streamUrl = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
        let cloudflareStreamUid = null;
        let rtmpUrl = "rtmps://live.cloudflare.com:443/live/";
        let rtmpKey = "mock-stream-key-" + Math.random().toString(36).substring(2, 10);
        const cfToken = env.CLOUDFLARE_API_TOKEN || env.vars?.CLOUDFLARE_API_TOKEN;
        const cfAccount = env.CLOUDFLARE_ACCOUNT_ID || env.vars?.CLOUDFLARE_ACCOUNT_ID;
        let cfCreated = false;
        if (cfToken && cfAccount) {
          try {
            const cfResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccount}/stream/live_inputs`, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${cfToken}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                meta: { name: `${homeClub} vs ${awayClub}` },
                recording: { mode: "automatic", timeoutSeconds: 3600 }
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
            console.error("Failed to create Cloudflare Live Input:", e);
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
          status: "upcoming",
          category: category || "Premier League",
          rating: 0,
          duration: "90m",
          date: date || "Today",
          time: time || "6:00 PM",
          streamUrl: cfCreated ? streamUrl : "",
          // Empty until live if mock, or holds actual url if CF succeeded
          cloudflareStreamUid,
          rtmpUrl,
          rtmpKey,
          qualities: ["Auto"],
          audioTracks: [{ id: "en", name: "English Commentary", active: true }],
          subtitles: [],
          cameras: [],
          stats: {
            possession: { home: 50, away: 50 },
            shots: { home: 0, away: 0 },
            fouls: { home: 0, away: 0 },
            corners: { home: 0, away: 0 }
          },
          events: []
        };
        if (!cfCreated) {
          newMatch.cameras = [
            { id: "main", name: "Main Camera", active: true, streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }
          ];
        } else {
          newMatch.cameras = [
            { id: "main", name: "Main Camera", active: true, streamUrl }
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
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }
      if (path === "/api/webhooks/cloudflare" && request.method === "POST") {
        const body = await request.json();
        const liveInputUid = body.liveInputUID;
        const status = body.status;
        if (liveInputUid) {
          const db = await getMatchesDb(env);
          let matchUpdated = false;
          for (const key of Object.keys(db)) {
            const match = db[key];
            if (match.cloudflareStreamUid === liveInputUid) {
              if (status === "connected") {
                match.status = "live";
                match.streamUrl = match.streamUrl || `https://customer-${env.CLOUDFLARE_ACCOUNT_ID}.cloudflarestream.com/${liveInputUid}/manifest/video.m3u8`;
              } else if (status === "disconnected") {
                match.status = "replay";
              }
              matchUpdated = true;
              break;
            }
          }
          if (matchUpdated) {
            await saveMatchesDb(env, db);
            return new Response(JSON.stringify({ success: true, message: "Match status updated via webhook" }), {
              status: 200,
              headers: { "Content-Type": "application/json", ...corsHeaders }
            });
          }
        }
        return new Response(JSON.stringify({ message: "Webhook received but no action taken" }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }
      return new Response(JSON.stringify({ error: "Route not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-1PkZmk/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-1PkZmk/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
