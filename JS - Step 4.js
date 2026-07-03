/**
 * Browser APIs Deep Notes - Part 31, 32, 33
 * File style: JavaScript (.js)
 * How to use: paste into VS Code as browser_apis_notes.js.
 * Most code examples are browser-side examples. Run them in browser console or in a frontend app.
 * References checked: MDN docs for IndexedDB, Fetch, Web APIs, etc.
 */

/**********************************************************************************************
 * 31. BROWSER STORAGE
 * --------------------------------------------------------------------------------------------
 * Browser storage exists because web apps need to remember data between user actions, page loads,
 * tabs, sessions, and even offline usage. Without browser storage, every refresh would lose UI
 * state and every data read/write would need a server round trip.
 *
 * Main storage families:
 * 1. localStorage      -> small, synchronous, persistent key-value strings.
 * 2. sessionStorage    -> small, synchronous, per-tab-session key-value strings.
 * 3. cookies           -> small HTTP-aware key-value data sent with requests when applicable.
 * 4. IndexedDB         -> large, asynchronous, transactional object database for structured data.
 *
 * Quick mental model:
 * - Need simple theme/token-ish non-sensitive preference? localStorage.
 * - Need temporary per-tab wizard state? sessionStorage.
 * - Need server to receive data automatically on HTTP requests? cookies.
 * - Need offline app data, large JSON, files/blobs, indexes, search? IndexedDB.
 **********************************************************************************************/

/**********************************************************************************************
 * 31.1 localStorage
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * localStorage is part of the Web Storage API. It stores key-value pairs for an origin.
 * Origin means scheme + host + port, for example: https://example.com:443.
 *
 * WHY IT EXISTS:
 * It gives frontend code a very simple way to persist small pieces of data after browser refresh
 * or browser restart without needing a backend database.
 *
 * DATA MODEL:
 * - Keys are strings.
 * - Values are strings.
 * - If you store objects/arrays, convert them using JSON.stringify() and read with JSON.parse().
 *
 * LIFETIME:
 * - Persists until explicitly removed by code, user clears site data, browser eviction, or privacy
 *   settings remove it.
 *
 * SCOPE:
 * - Same-origin. One website cannot normally read another website's localStorage.
 *
 * COMMON USE CASES:
 * - Theme: dark/light.
 * - Sidebar collapsed state.
 * - Last selected language.
 * - Small non-sensitive cached preferences.
 * - Draft text for simple forms.
 *
 * LIMITATIONS:
 * 1. Synchronous API: it blocks the main thread. Avoid heavy repeated reads/writes.
 * 2. String-only values: objects need serialization.
 * 3. Small quota: varies by browser and device.
 * 4. Not secure for secrets: any JavaScript running on the page can read it. If XSS happens,
 *    attackers can steal localStorage data.
 * 5. No expiry built in.
 * 6. Poor for complex querying.
 *
 * HOW TO SOLVE / MITIGATE LIMITATIONS:
 * - For large/structured/offline data, use IndexedDB.
 * - For secrets/session auth, prefer secure HttpOnly cookies set by server.
 * - Add your own expiry wrapper.
 * - Batch writes and avoid writing inside scroll/mousemove loops.
 * - Validate JSON.parse with try/catch.
 **********************************************************************************************/

// Basic localStorage example: store and read a simple string.
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
console.log("Theme:", theme); // "dark"

// Store object by converting to JSON.
const userPreferences = {
  language: "en",
  compactMode: true,
  fontSize: 16,
};
localStorage.setItem("userPreferences", JSON.stringify(userPreferences));

// Read object safely.
function readJSONFromLocalStorage(key, fallbackValue) {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue === null ? fallbackValue : JSON.parse(rawValue);
  } catch (error) {
    console.error("Invalid JSON in localStorage for key:", key, error);
    return fallbackValue;
  }
}

const preferences = readJSONFromLocalStorage("userPreferences", {});
console.log("Preferences:", preferences);

// Add manual expiry to localStorage.
function setLocalStorageWithExpiry(key, value, ttlMs) {
  const record = {
    value,
    expiresAt: Date.now() + ttlMs,
  };
  localStorage.setItem(key, JSON.stringify(record));
}

function getLocalStorageWithExpiry(key) {
  const record = readJSONFromLocalStorage(key, null);
  if (!record) return null;

  if (Date.now() > record.expiresAt) {
    localStorage.removeItem(key);
    return null;
  }
  return record.value;
}

setLocalStorageWithExpiry("promoBannerClosed", true, 24 * 60 * 60 * 1000); // 1 day
console.log(getLocalStorageWithExpiry("promoBannerClosed"));

// Listen for localStorage changes from other tabs/windows of the same origin.
// Important: the "storage" event is fired in other documents, not usually the same tab that wrote it.
window.addEventListener("storage", (event) => {
  console.log("Storage changed:", {
    key: event.key,
    oldValue: event.oldValue,
    newValue: event.newValue,
    url: event.url,
  });
});

/**********************************************************************************************
 * 31.2 sessionStorage
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * sessionStorage is also Web Storage, but its lifetime is limited to one page session.
 *
 * WHY IT EXISTS:
 * Some state should survive reloads but should not be shared across tabs or persist forever.
 *
 * LIFETIME:
 * - Survives page reload in the same tab.
 * - Usually cleared when the tab/window is closed.
 *
 * SCOPE:
 * - Same-origin AND same top-level browsing context/tab.
 * - Two tabs on the same origin usually have separate sessionStorage.
 *
 * USE CASES:
 * - Multi-step form state.
 * - Search filter state for a single tab.
 * - Temporary UI state after refresh.
 * - Prevent duplicate action within a session.
 *
 * LIMITATIONS:
 * - Same synchronous/string-only limitations as localStorage.
 * - Not for sensitive data.
 * - Not shared across tabs.
 *
 * SOLUTIONS:
 * - If cross-tab persistence is needed, use localStorage or BroadcastChannel + IndexedDB.
 * - If big structured data is needed, use IndexedDB.
 **********************************************************************************************/

sessionStorage.setItem("checkoutStep", "shipping");
console.log("Current checkout step:", sessionStorage.getItem("checkoutStep"));

const formDraft = { name: "Dinesh", city: "Coimbatore" };
sessionStorage.setItem("formDraft", JSON.stringify(formDraft));
console.log(readJSONFromSessionStorage("formDraft", {}));

function readJSONFromSessionStorage(key, fallbackValue) {
  try {
    const rawValue = sessionStorage.getItem(key);
    return rawValue === null ? fallbackValue : JSON.parse(rawValue);
  } catch (error) {
    console.error("Invalid JSON in sessionStorage for key:", key, error);
    return fallbackValue;
  }
}

/**********************************************************************************************
 * 31.3 Cookies
 * --------------------------------------------------------------------------------------------
 * WHAT THEY ARE:
 * Cookies are small key-value records stored by the browser and associated with domains/paths.
 * Unlike localStorage/sessionStorage, cookies can be automatically sent with HTTP requests to
 * matching servers.
 *
 * WHY THEY EXIST:
 * HTTP is stateless. Cookies give servers a way to recognize a browser across requests, commonly
 * for sessions, login state, personalization, analytics, and security flows.
 *
 * COOKIE ATTRIBUTES:
 * - Name=Value: actual cookie pair.
 * - Expires / Max-Age: expiry time.
 * - Domain: which domain receives cookie.
 * - Path: URL path scope.
 * - Secure: cookie sent only over HTTPS.
 * - HttpOnly: JavaScript cannot read it; server-set only. Helps protect auth cookies from XSS theft.
 * - SameSite: controls cross-site sending.
 *   - Strict: sent only in same-site requests.
 *   - Lax: sent in same-site and some top-level navigations; common default behavior.
 *   - None: sent cross-site, but must also use Secure.
 *
 * USE CASES:
 * - Server-managed session ID.
 * - CSRF protection token patterns.
 * - Remember locale on server-rendered apps.
 * - Short-lived server-readable state.
 *
 * LIMITATIONS:
 * 1. Small size; avoid storing large data.
 * 2. Sent with requests, increasing network overhead.
 * 3. JavaScript-created cookies cannot set HttpOnly.
 * 4. Privacy restrictions and third-party cookie blocking can affect behavior.
 * 5. If not configured correctly, can create CSRF/security issues.
 *
 * SOLUTIONS / BEST PRACTICES:
 * - For authentication cookies: server should set Secure; HttpOnly; SameSite=Lax/Strict depending
 *   on app needs.
 * - Store only identifiers, not full user data.
 * - Prefer short expiration for sensitive cookies.
 * - Use CSRF tokens for state-changing requests when cookies authenticate requests.
 **********************************************************************************************/

// JavaScript can create a normal cookie, but cannot create HttpOnly cookies.
document.cookie = "preferredLanguage=en; Max-Age=86400; Path=/; SameSite=Lax; Secure";

// Parse document.cookie into an object.
function getCookiesAsObject() {
  return document.cookie.split("; ").reduce((cookies, pair) => {
    const [rawKey, rawValue] = pair.split("=");
    if (!rawKey) return cookies;
    cookies[decodeURIComponent(rawKey)] = decodeURIComponent(rawValue || "");
    return cookies;
  }, {});
}

console.log("Cookies:", getCookiesAsObject());

// Delete a cookie by setting Max-Age=0 with same path/domain scope.
document.cookie = "preferredLanguage=; Max-Age=0; Path=/";

/**********************************************************************************************
 * 31.4 IndexedDB
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * IndexedDB is a low-level, asynchronous, transactional browser database for significant amounts
 * of structured client-side data, including objects and blobs/files. It supports indexes for fast
 * lookup and follows same-origin rules. MDN describes it as useful when Web Storage is too small
 * or unsuitable for larger structured data.
 *
 * WHY IT EXISTS:
 * Modern web apps need offline-first behavior, local caching, rich querying, and storage of more
 * complex data than string key-value pairs.
 *
 * CORE TERMS:
 * - Database: container for object stores.
 * - Object store: similar to a table, but stores JS objects.
 * - Key path: property used as primary key, for example "id".
 * - Index: secondary lookup path, for example "email" or "createdAt".
 * - Transaction: read/write unit. Ensures operations happen safely.
 * - Version: schema version. Object stores and indexes are created/changed in onupgradeneeded.
 *
 * USE CASES:
 * - Offline todo/task apps.
 * - Cache API response data.
 * - Store large form drafts.
 * - Store images/blobs for offline usage.
 * - Progressive Web App data storage.
 *
 * LIMITATIONS:
 * 1. Native API is verbose and event-based.
 * 2. Schema changes require version upgrades.
 * 3. Browser quota/eviction rules vary.
 * 4. No SQL joins.
 * 5. Data can still be cleared by user/browser.
 *
 * SOLUTIONS:
 * - Use wrappers like idb or Dexie for production ergonomics.
 * - Keep schema migrations carefully versioned.
 * - Use navigator.storage.persist() to request persistent storage where supported.
 * - Sync local data to server when online.
 * - Use indexes for frequent query fields.
 **********************************************************************************************/

function openAppDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("AppDatabase", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("tasks")) {
        const taskStore = db.createObjectStore("tasks", { keyPath: "id" });
        taskStore.createIndex("status", "status", { unique: false });
        taskStore.createIndex("createdAt", "createdAt", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function addTask(task) {
  const db = await openAppDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");

    store.add({
      id: crypto.randomUUID(),
      title: task.title,
      status: "open",
      createdAt: Date.now(),
    });

    transaction.oncomplete = () => resolve(true);
    transaction.onerror = () => reject(transaction.error);
  });
}

async function getTasksByStatus(status) {
  const db = await openAppDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("tasks", "readonly");
    const store = transaction.objectStore("tasks");
    const index = store.index("status");
    const request = index.getAll(status);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Example usage:
// addTask({ title: "Learn IndexedDB deeply" }).then(() => getTasksByStatus("open")).then(console.log);

/**********************************************************************************************
 * 32. BROWSER NETWORKING APIs
 * --------------------------------------------------------------------------------------------
 * Browser networking APIs exist so JavaScript can communicate with servers without requiring a
 * full page reload. They are the foundation of modern SPAs, dynamic UI, chat apps, dashboards,
 * upload flows, and real-time notifications.
 **********************************************************************************************/

/**********************************************************************************************
 * 32.1 Fetch API
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * fetch() is the modern Promise-based API for making HTTP requests from the browser.
 *
 * WHY IT EXISTS:
 * It provides a cleaner replacement for many XMLHttpRequest use cases with promises, streaming
 * support, Request/Response objects, and better integration with Service Workers.
 *
 * IMPORTANT BEHAVIOR:
 * - fetch resolves the promise for HTTP error statuses like 404/500. It rejects mainly for network
 *   failures, CORS blocking, or aborts. So always check response.ok.
 * - Body can be read only once unless cloned.
 * - Default request method is GET.
 *
 * USE CASES:
 * - GET REST API data.
 * - POST JSON forms.
 * - File uploads with FormData.
 * - Abort slow requests.
 * - Stream responses.
 *
 * LIMITATIONS:
 * - Upload progress is not directly supported like XHR upload progress.
 * - CORS restrictions apply in browser.
 * - Need AbortController for timeout/cancel.
 *
 * SOLUTIONS:
 * - Use XMLHttpRequest when upload progress is required.
 * - Configure server CORS correctly.
 * - Wrap fetch with consistent error handling and timeout.
 **********************************************************************************************/

async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json();
}

async function postJSON(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include", // include cookies for same/cross origin if server allows it
  });

  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**********************************************************************************************
 * 32.2 XMLHttpRequest (XHR)
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * XMLHttpRequest is the older browser API for HTTP requests. Despite its name, it can handle more
 * than XML, including JSON, text, blobs, and form data.
 *
 * WHY IT STILL EXISTS:
 * - Legacy browser/application support.
 * - Upload/download progress events are straightforward.
 * - Some old codebases/libraries use it internally.
 *
 * LIMITATIONS:
 * - Callback/event-based and more verbose.
 * - Less elegant than promise-based fetch.
 *
 * WHEN TO USE:
 * - File upload progress bar.
 * - Maintaining legacy apps.
 **********************************************************************************************/

function uploadWithProgress(file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);

    xhr.open("POST", "/api/upload");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded / event.total) * 100);
        onProgress(percentage);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.responseText);
      else reject(new Error(`Upload failed: ${xhr.status}`));
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(formData);
  });
}

/**********************************************************************************************
 * 32.3 AJAX Concept
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * AJAX means Asynchronous JavaScript and XML. Today it usually means "browser JavaScript talks to
 * server in the background and updates part of the page without full reload". The data is commonly
 * JSON, not XML.
 *
 * WHY IT EXISTS:
 * Traditional websites reloaded the full page for every action. AJAX enabled smoother dynamic UIs.
 *
 * FLOW:
 * 1. User clicks/searches/types.
 * 2. JS sends HTTP request using fetch/XHR.
 * 3. Server returns data.
 * 4. JS updates DOM/state.
 * 5. Page does not fully reload.
 *
 * LIMITATIONS:
 * - More client-side complexity.
 * - Must handle loading/error states.
 * - SEO/accessibility need good design.
 *
 * SOLUTIONS:
 * - Use progressive enhancement or SSR/SSG where needed.
 * - Always show loading, empty, and error states.
 **********************************************************************************************/

async function ajaxSearchUsers(query) {
  const resultsContainer = document.querySelector("#results");
  resultsContainer.textContent = "Loading...";

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Search failed");
    const users = await response.json();

    resultsContainer.innerHTML = users
      .map((user) => `<li>${escapeHTML(user.name)}</li>`)
      .join("");
  } catch (error) {
    resultsContainer.textContent = "Something went wrong.";
  }
}

function escapeHTML(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

/**********************************************************************************************
 * 32.4 CORS
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * CORS means Cross-Origin Resource Sharing. It is a browser security mechanism that controls which
 * cross-origin HTTP responses frontend JavaScript is allowed to read.
 *
 * WHY IT EXISTS:
 * Browsers enforce the Same-Origin Policy to prevent a malicious website from reading private data
 * from another site where the user may be logged in. CORS lets servers explicitly allow trusted
 * origins.
 *
 * SAME-ORIGIN:
 * Same origin means same scheme + host + port.
 * - https://example.com and https://example.com are same-origin.
 * - https://example.com and http://example.com differ by scheme.
 * - https://app.example.com and https://api.example.com differ by host.
 * - https://example.com:443 and https://example.com:3000 differ by port.
 *
 * SIMPLE REQUESTS AND PREFLIGHT:
 * - Some requests are "simple" and do not need preflight.
 * - Requests with custom headers, non-simple methods like PUT/DELETE, or certain content types
 *   often trigger a preflight OPTIONS request.
 * - Server must respond with correct Access-Control-Allow-* headers.
 *
 * COMMON HEADERS:
 * - Access-Control-Allow-Origin: https://your-app.com OR *
 * - Access-Control-Allow-Methods: GET, POST, PUT, DELETE
 * - Access-Control-Allow-Headers: Content-Type, Authorization
 * - Access-Control-Allow-Credentials: true
 *
 * IMPORTANT:
 * You cannot fix CORS only from frontend code. The target server must allow your origin.
 * mode: "no-cors" does not solve normal API reading; it gives an opaque response that JS cannot
 * inspect.
 *
 * LIMITATIONS:
 * - Browser-only restriction; server-to-server calls do not have browser CORS enforcement.
 * - Misconfigured wide-open CORS with credentials can be dangerous.
 *
 * SOLUTIONS:
 * - Configure backend CORS correctly.
 * - Use a backend-for-frontend/proxy controlled by your app.
 * - Avoid sending credentials unless necessary.
 **********************************************************************************************/

// Frontend request with credentials. Server must allow exact origin and credentials.
fetch("https://api.example.com/profile", {
  credentials: "include",
});

// Example Express.js backend CORS idea:
// app.use(cors({ origin: "https://your-frontend.com", credentials: true }));

/**********************************************************************************************
 * 32.5 WebSockets
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * WebSocket is a persistent, full-duplex communication channel between browser and server.
 * Full-duplex means both client and server can send messages anytime after connection opens.
 *
 * WHY IT EXISTS:
 * HTTP request/response is not ideal for low-latency real-time communication. WebSockets avoid
 * repeated polling overhead.
 *
 * USE CASES:
 * - Chat apps.
 * - Live dashboards.
 * - Multiplayer games.
 * - Collaborative editing.
 * - Trading/stock tickers.
 *
 * LIMITATIONS:
 * - More server complexity.
 * - Need reconnect strategy.
 * - Need heartbeat/ping logic.
 * - HTTP caching does not apply.
 * - Some corporate proxies may interfere.
 *
 * SOLUTIONS:
 * - Reconnect with exponential backoff.
 * - Queue messages while disconnected.
 * - Send heartbeat messages.
 * - Authenticate during handshake or initial message.
 **********************************************************************************************/

function createReliableWebSocket(url) {
  let socket;
  let retryCount = 0;

  function connect() {
    socket = new WebSocket(url);

    socket.onopen = () => {
      retryCount = 0;
      console.log("WebSocket connected");
      socket.send(JSON.stringify({ type: "hello" }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("WebSocket message:", message);
    };

    socket.onclose = () => {
      const delay = Math.min(1000 * 2 ** retryCount, 30000);
      retryCount += 1;
      console.log(`WebSocket closed. Reconnecting in ${delay}ms`);
      setTimeout(connect, delay);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      socket.close();
    };
  }

  connect();

  return {
    send(data) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data));
      }
    },
    close() {
      socket.close();
    },
  };
}

/**********************************************************************************************
 * 32.6 Server-Sent Events (SSE)
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * SSE is a browser API where the server pushes text/event-stream updates to the client over HTTP.
 * In the browser, it is used through EventSource.
 *
 * WHY IT EXISTS:
 * Many real-time features only need server -> client updates. SSE is simpler than WebSockets for
 * one-way streams.
 *
 * USE CASES:
 * - Notifications feed.
 * - Live logs.
 * - Build/deployment progress.
 * - News/sports updates.
 * - AI token streaming style responses when supported by backend format.
 *
 * LIMITATIONS:
 * - Mostly one-way: client to server still uses normal HTTP requests.
 * - Browser connection limits can matter.
 * - EventSource supports GET, not custom POST body directly.
 * - Some environments buffer responses unless configured.
 *
 * SOLUTIONS:
 * - Use WebSocket if you need bidirectional low-latency communication.
 * - Use fetch POST to start job, then SSE GET to listen for progress.
 * - Configure server/proxy to disable buffering for event streams.
 **********************************************************************************************/

function listenToServerEvents() {
  const events = new EventSource("/api/events");

  events.onmessage = (event) => {
    console.log("Default SSE message:", event.data);
  };

  events.addEventListener("progress", (event) => {
    const progress = JSON.parse(event.data);
    console.log("Progress:", progress.percent);
  });

  events.onerror = (error) => {
    console.error("SSE error:", error);
    // Browser automatically retries by default.
  };

  return events;
}

/**********************************************************************************************
 * 33. BROWSER ADVANCED APIs
 **********************************************************************************************/

/**********************************************************************************************
 * 33.1 Geolocation API
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * Geolocation lets a website request the user's physical location, usually latitude/longitude.
 *
 * WHY IT EXISTS:
 * Location-aware features: maps, nearby stores, delivery address help, weather, geofencing.
 *
 * PRIVACY/SECURITY:
 * - Requires user permission.
 * - Usually requires secure context HTTPS.
 * - User can deny, revoke, or provide approximate location depending on device/browser.
 *
 * LIMITATIONS:
 * - Accuracy varies: GPS, Wi-Fi, cell towers, IP estimation.
 * - Permission can be denied.
 * - watchPosition can drain battery.
 *
 * SOLUTIONS:
 * - Provide manual location search fallback.
 * - Use enableHighAccuracy only when truly needed.
 * - Clear watchPosition when not required.
 **********************************************************************************************/

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracyMeters: position.coords.accuracy,
        });
      },
      (error) => reject(error),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  });
}

/**********************************************************************************************
 * 33.2 Canvas API
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * Canvas provides a pixel-based drawing surface through <canvas>. JavaScript can draw shapes,
 * images, charts, games, animations, and process pixels.
 *
 * WHY IT EXISTS:
 * DOM elements are not efficient for intensive pixel-level graphics. Canvas gives direct drawing.
 *
 * 2D CONTEXT USE CASES:
 * - Charts.
 * - Image editing.
 * - Drawing/signature pad.
 * - Simple games.
 * - Pixel manipulation.
 *
 * LIMITATIONS:
 * - Not DOM-accessible per drawn object; accessibility must be handled separately.
 * - Canvas is bitmap; scaling can blur unless devicePixelRatio is handled.
 * - Complex scenes need manual redraw and state management.
 *
 * SOLUTIONS:
 * - Use SVG for accessible scalable object-based graphics.
 * - Use WebGL for high-performance 3D/advanced rendering.
 * - Scale canvas for devicePixelRatio.
 **********************************************************************************************/

function drawCanvasExample() {
  const canvas = document.querySelector("#myCanvas");
  if (!canvas) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  ctx.fillStyle = "#22c55e";
  ctx.beginPath();
  ctx.arc(80, 80, 40, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Canvas API", 140, 88);
}

/**********************************************************************************************
 * 33.3 Web Workers
 * --------------------------------------------------------------------------------------------
 * WHAT THEY ARE:
 * Web Workers run JavaScript in a background thread separate from the main UI thread.
 *
 * WHY THEY EXIST:
 * JavaScript on the main thread can block rendering and user interactions. Workers allow CPU-heavy
 * tasks without freezing the UI.
 *
 * USE CASES:
 * - Large JSON processing.
 * - Image processing.
 * - Data parsing.
 * - Search/indexing.
 * - Compression/encryption computations.
 *
 * LIMITATIONS:
 * - Workers cannot directly access DOM.
 * - Communication uses postMessage and structured clone.
 * - Separate file/module setup is needed.
 *
 * SOLUTIONS:
 * - Keep DOM updates on main thread.
 * - Send only needed data, use Transferable objects for large ArrayBuffers.
 * - Use worker pools for parallel tasks.
 **********************************************************************************************/

// Main thread example:
// const worker = new Worker("worker.js");
// worker.postMessage({ numbers: [1, 2, 3, 4, 5] });
// worker.onmessage = (event) => console.log("Worker result:", event.data);

// worker.js example content:
// self.onmessage = (event) => {
//   const sum = event.data.numbers.reduce((total, number) => total + number, 0);
//   self.postMessage({ sum });
// };

/**********************************************************************************************
 * 33.4 Service Workers
 * --------------------------------------------------------------------------------------------
 * WHAT THEY ARE:
 * A Service Worker is a special background script that can intercept network requests, cache
 * assets, enable offline experiences, and handle push notifications/background sync.
 *
 * WHY THEY EXIST:
 * They are the core technology behind many Progressive Web Apps (PWAs), allowing apps to work
 * reliably even on poor or no network.
 *
 * LIFECYCLE:
 * 1. Register from page.
 * 2. Install event: usually pre-cache app shell.
 * 3. Activate event: clean old caches.
 * 4. Fetch event: intercept requests and apply caching strategy.
 *
 * USE CASES:
 * - Offline page/app shell.
 * - Cache static assets.
 * - Runtime API caching.
 * - Push notifications.
 * - Background sync.
 *
 * LIMITATIONS:
 * - Requires HTTPS except localhost.
 * - Lifecycle can be confusing.
 * - Cannot access DOM.
 * - Cache invalidation needs strategy.
 *
 * SOLUTIONS:
 * - Version cache names.
 * - Use Workbox in production.
 * - Design clear caching strategies: cache-first, network-first, stale-while-revalidate.
 **********************************************************************************************/

// Page registration:
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

// service-worker.js example content:
// const CACHE_NAME = "app-cache-v1";
// const PRECACHE_URLS = ["/", "/styles.css", "/app.js"];
//
// self.addEventListener("install", (event) => {
//   event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)));
// });
//
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((names) =>
//       Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)))
//     )
//   );
// });
//
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((cached) => cached || fetch(event.request))
//   );
// });

/**********************************************************************************************
 * 33.5 Notifications API
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * Notifications API displays system-level notifications after user permission.
 *
 * WHY IT EXISTS:
 * Apps need to notify users about important events even when the tab is not focused.
 *
 * USE CASES:
 * - Chat message alert.
 * - Task reminder.
 * - Build completed.
 * - Calendar reminder.
 *
 * LIMITATIONS:
 * - Requires permission.
 * - Browsers/users may block abusive prompts.
 * - Push notifications require Service Worker + Push API + server setup.
 *
 * SOLUTIONS:
 * - Ask permission only after user intent, not immediately on page load.
 * - Provide in-app notifications fallback.
 **********************************************************************************************/

async function showNotification() {
  if (!("Notification" in window)) return;

  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    new Notification("Task completed", {
      body: "Your export is ready.",
      icon: "/icon.png",
    });
  }
}

/**********************************************************************************************
 * 33.6 Clipboard API
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * Clipboard API reads/writes clipboard content using navigator.clipboard.
 *
 * WHY IT EXISTS:
 * Copy/paste interactions are common: share links, copy code, paste images/text.
 *
 * SECURITY:
 * - Usually requires HTTPS.
 * - Reading clipboard often requires permission and user gesture.
 *
 * LIMITATIONS:
 * - Browser support differs for advanced formats.
 * - Clipboard read can be restricted.
 *
 * SOLUTIONS:
 * - Use writeText for common copy buttons.
 * - Provide manual fallback message if not available.
 **********************************************************************************************/

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied!");
  } catch (error) {
    console.error("Copy failed. Let user copy manually.", error);
  }
}

async function readClipboardText() {
  try {
    return await navigator.clipboard.readText();
  } catch (error) {
    console.error("Clipboard read failed", error);
    return "";
  }
}

/**********************************************************************************************
 * 33.7 Intersection Observer
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * IntersectionObserver observes when an element enters/exits another element or viewport.
 *
 * WHY IT EXISTS:
 * Older scroll event checks caused performance problems. IntersectionObserver lets the browser
 * optimize visibility detection.
 *
 * USE CASES:
 * - Lazy load images.
 * - Infinite scrolling.
 * - Trigger animation when visible.
 * - Ad visibility tracking.
 *
 * LIMITATIONS:
 * - Not for exact pixel-perfect scroll tracking.
 * - Callback timing is async and browser-optimized.
 *
 * SOLUTIONS:
 * - Use scroll events only for truly continuous scroll-linked effects, throttled/debounced.
 **********************************************************************************************/

const imageObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    });
  },
  { root: null, rootMargin: "200px", threshold: 0.1 }
);

// document.querySelectorAll("img[data-src]").forEach((img) => imageObserver.observe(img));

/**********************************************************************************************
 * 33.8 Mutation Observer
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * MutationObserver watches DOM changes: added/removed nodes, attribute changes, text changes.
 *
 * WHY IT EXISTS:
 * It replaces older mutation events and provides efficient async DOM change observation.
 *
 * USE CASES:
 * - Detect third-party widget DOM changes.
 * - Watch dynamically inserted elements.
 * - Build devtools/debug helpers.
 * - React to CMS-rendered dynamic content.
 *
 * LIMITATIONS:
 * - Can be expensive if watching large subtree with many changes.
 * - Does not observe layout size changes; use ResizeObserver for size.
 *
 * SOLUTIONS:
 * - Observe the smallest possible container.
 * - Disconnect when no longer needed.
 * - Filter mutation records carefully.
 **********************************************************************************************/

function observeDOMChanges(targetElement) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      console.log("Mutation type:", mutation.type);
      console.log("Added nodes:", mutation.addedNodes);
      console.log("Removed nodes:", mutation.removedNodes);
    }
  });

  observer.observe(targetElement, {
    childList: true,
    subtree: true,
    attributes: true,
  });

  return observer;
}

/**********************************************************************************************
 * 33.9 Resize Observer
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * ResizeObserver watches changes to an element's size.
 *
 * WHY IT EXISTS:
 * Window resize only tells viewport changes, not individual component/container resizing.
 * Modern component UIs need element-aware layout behavior.
 *
 * USE CASES:
 * - Responsive charts.
 * - Component-level responsive layout.
 * - Recalculate canvas size.
 * - Detect sidebar/container changes.
 *
 * LIMITATIONS:
 * - Avoid causing resize loops by changing observed element size inside callback repeatedly.
 *
 * SOLUTIONS:
 * - Debounce heavy work.
 * - Use CSS container queries when styling alone is enough.
 **********************************************************************************************/

function observeElementSize(element) {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      console.log("Element size:", width, height);
    }
  });

  observer.observe(element);
  return observer;
}

/**********************************************************************************************
 * 33.10 History API
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * History API lets JavaScript interact with browser session history using pushState, replaceState,
 * back, forward, and popstate.
 *
 * WHY IT EXISTS:
 * Single Page Applications need URL changes and browser back/forward support without full reloads.
 *
 * USE CASES:
 * - SPA routing.
 * - Update URL after filters/search.
 * - Modal routes.
 * - Preserve navigation state.
 *
 * LIMITATIONS:
 * - pushState does not automatically render UI; your router must render.
 * - Direct visit to SPA route requires server fallback to index.html.
 * - Too much state in history can be heavy.
 *
 * SOLUTIONS:
 * - Keep URL meaningful.
 * - Store only small serializable state.
 * - Configure server rewrite rules.
 **********************************************************************************************/

function navigateTo(path, state = {}) {
  history.pushState(state, "", path);
  renderRoute(path);
}

window.addEventListener("popstate", (event) => {
  console.log("Back/forward state:", event.state);
  renderRoute(location.pathname);
});

function renderRoute(path) {
  console.log("Render route:", path);
  // In real app, call React Router / Next router / custom rendering logic.
}

/**********************************************************************************************
 * 33.11 Location API
 * --------------------------------------------------------------------------------------------
 * WHAT IT IS:
 * window.location represents the current URL and allows navigation/reload.
 *
 * WHY IT EXISTS:
 * Web pages need to inspect and change URLs: redirect, reload, read query params, change hash.
 *
 * IMPORTANT PROPERTIES:
 * - location.href: full URL.
 * - location.origin: scheme + host + port.
 * - location.pathname: path.
 * - location.search: query string.
 * - location.hash: fragment.
 *
 * COMMON METHODS:
 * - location.assign(url): navigate and keep current page in history.
 * - location.replace(url): navigate without keeping current page in history.
 * - location.reload(): reload current page.
 *
 * LIMITATIONS:
 * - Changing location usually causes full page navigation, unlike History API pushState.
 * - Open redirects can be security risks if redirect URL is user-controlled.
 *
 * SOLUTIONS:
 * - Validate redirect targets.
 * - Use History API for SPA internal navigation.
 **********************************************************************************************/

const currentURL = new URL(window.location.href);
console.log("Path:", currentURL.pathname);
console.log("Query param page:", currentURL.searchParams.get("page"));

function safeRedirectToInternalPath(path) {
  if (!path.startsWith("/")) {
    throw new Error("Only internal paths are allowed");
  }
  window.location.assign(path);
}

/**********************************************************************************************
 * EASY RECALL SUMMARY
 * --------------------------------------------------------------------------------------------
 * localStorage      -> Persistent small strings, sync, no expiry by default.
 * sessionStorage    -> Per-tab temporary strings, survives reload but not tab close.
 * cookies           -> Small server-readable data, sent with matching HTTP requests.
 * IndexedDB         -> Large async structured database with indexes and transactions.
 * Fetch             -> Modern promise HTTP API.
 * XHR               -> Older HTTP API, useful for upload progress.
 * AJAX              -> Concept of background requests + partial UI update.
 * CORS              -> Server permission system for browser cross-origin reads.
 * WebSocket         -> Two-way persistent real-time connection.
 * SSE               -> Server-to-client event stream over HTTP.
 * Geolocation       -> User location with permission.
 * Canvas            -> Pixel drawing surface.
 * Web Worker        -> Background JS thread for heavy CPU work.
 * Service Worker    -> Network proxy/cache/offline/PWA background worker.
 * Notifications     -> System notifications with permission.
 * Clipboard         -> Copy/paste integration with permissions/user gesture.
 * IntersectionObs   -> Element visibility detection.
 * MutationObs       -> DOM change detection.
 * ResizeObs         -> Element size change detection.
 * History API       -> SPA URL/history navigation without reload.
 * Location API      -> Current URL inspection and full-page navigation.
 **********************************************************************************************/
