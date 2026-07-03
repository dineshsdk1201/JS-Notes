/**
 * JavaScript / Node.js Deep Notes
 * Topics:
 * 34. Node.js Concepts
 * 35. Memory and Performance
 * 36. Functional Programming in JavaScript
 *
 * How to use this file:
 * - Read it as a structured commented guide.
 * - Run selected examples with Node.js: node node_memory_fp_deep_notes.js
 * - Some examples are commented out because they require files, browser DOM, or long-running processes.
 */

/* =====================================================================================
   34. NODE.JS CONCEPTS
===================================================================================== */

/* -------------------------------------------------------------------------------------
   34.1 Node.js Runtime
------------------------------------------------------------------------------------- */

/**
 * WHAT IS NODE.JS?
 * Node.js is a JavaScript runtime environment that allows JavaScript to run outside the
 * browser, mainly on servers, command-line tools, build systems, automation scripts, APIs,
 * microservices, real-time apps, and backend services.
 *
 * WHY DOES NODE.JS EXIST?
 * Originally, JavaScript mainly ran inside browsers. Developers needed a way to use JS for:
 * - server-side programming
 * - file system operations
 * - network programming
 * - command-line tooling
 * - scalable I/O-heavy applications
 *
 * Node.js solved this by combining:
 * 1. V8 JavaScript engine: compiles and executes JS.
 * 2. libuv: provides event loop, thread pool, async I/O support.
 * 3. Node core APIs: fs, http, path, crypto, stream, child_process, etc.
 *
 * IMPORTANT THEORY:
 * Node.js is single-threaded for JavaScript execution, but not purely single-threaded
 * internally. It uses:
 * - one main JavaScript thread
 * - event loop for async callbacks
 * - libuv thread pool for certain expensive operations such as fs, crypto, dns, zlib
 * - OS-level async networking where available
 *
 * BEST USE CASES:
 * - REST APIs
 * - GraphQL APIs
 * - real-time chat/socket apps
 * - streaming apps
 * - dashboards
 * - CLI tools
 * - server-side rendering frameworks like Next.js
 * - backend-for-frontend services
 *
 * LIMITATIONS:
 * - CPU-heavy work blocks the event loop if done on the main thread.
 * - Callback-heavy or async-heavy code can become hard to reason about if poorly designed.
 * - Not ideal for heavy numerical computation unless using worker_threads/native addons.
 *
 * ADVANCED SOLUTIONS:
 * - Use worker_threads for CPU-bound JS tasks.
 * - Use child_process for isolated external work.
 * - Use queues/background jobs for heavy work.
 * - Use clustering/load balancing for multi-core utilization.
 * - Use streaming instead of loading huge data into memory.
 */

console.log("Node runtime example: running JavaScript outside browser");

/* -------------------------------------------------------------------------------------
   34.2 Global Objects in Node.js
------------------------------------------------------------------------------------- */

/**
 * GLOBAL OBJECTS:
 * Global objects are available without importing.
 *
 * Common Node globals:
 * - global: Node's global namespace object, similar to window in browsers.
 * - __dirname: absolute path of current module directory. CommonJS only.
 * - __filename: absolute path of current module file. CommonJS only.
 * - process: information/control of current Node process.
 * - Buffer: binary data handling.
 * - console: logging.
 * - setTimeout, setInterval, setImmediate: timers.
 * - clearTimeout, clearInterval, clearImmediate.
 * - module, exports, require: CommonJS module system.
 *
 * WHY GLOBALS EXIST:
 * They provide essential runtime utilities without repeated imports.
 *
 * LIMITATION:
 * Overusing globals makes code harder to test and reason about.
 *
 * BEST PRACTICE:
 * - Prefer explicit imports for modules.
 * - Avoid attaching custom data to global unless truly necessary.
 */

console.log("Global object exists:", typeof global !== "undefined");
console.log("Current file:", __filename);
console.log("Current directory:", __dirname);

/* -------------------------------------------------------------------------------------
   34.3 process
------------------------------------------------------------------------------------- */

/**
 * process represents the current Node.js process.
 *
 * Useful properties/methods:
 * - process.argv: command-line arguments.
 * - process.env: environment variables.
 * - process.cwd(): current working directory.
 * - process.exit(code): exits process.
 * - process.pid: process ID.
 * - process.platform: OS platform.
 * - process.version: Node version.
 * - process.memoryUsage(): memory statistics.
 * - process.nextTick(callback): schedules callback before Promise microtasks in Node.
 * - process.on('uncaughtException'): catch uncaught sync errors.
 * - process.on('unhandledRejection'): catch unhandled promise rejections.
 *
 * WHY IT EXISTS:
 * Backend/CLI programs need process-level control and OS interaction.
 *
 * USE CASES:
 * - Read config from env variables.
 * - Build CLI tools.
 * - Graceful shutdown.
 * - Debug memory usage.
 *
 * LIMITATIONS:
 * - process.exit() can terminate before pending async work completes.
 * - Using uncaughtException to continue normal execution is unsafe.
 *
 * ADVANCED PRACTICE:
 * Use graceful shutdown:
 * - stop receiving new requests
 * - finish existing requests
 * - close DB connections
 * - exit with proper code
 */

console.log("Node version:", process.version);
console.log("Platform:", process.platform);
console.log("CLI args:", process.argv.slice(2));
console.log("Memory usage sample:", process.memoryUsage());

/* -------------------------------------------------------------------------------------
   34.4 Buffer
------------------------------------------------------------------------------------- */

/**
 * Buffer handles raw binary data.
 * JavaScript strings are Unicode text, but files/network packets/images need bytes.
 * Buffer exists to represent byte sequences efficiently.
 *
 * COMMON USE CASES:
 * - reading files
 * - TCP/HTTP streams
 * - image processing
 * - cryptography
 * - binary protocols
 *
 * IMPORTANT:
 * Buffer is a subclass-like object based on Uint8Array.
 *
 * LIMITATIONS:
 * - Binary/text encoding mistakes can corrupt data.
 * - Large buffers consume heap/external memory.
 *
 * BEST PRACTICES:
 * - Use Buffer.from() instead of unsafe constructors.
 * - Specify encoding when converting to/from strings.
 * - Stream large files instead of loading whole buffer.
 */

const textBuffer = Buffer.from("Hello Node", "utf8");
console.log("Buffer:", textBuffer);
console.log("Buffer to string:", textBuffer.toString("utf8"));
console.log("First byte:", textBuffer[0]);

/* -------------------------------------------------------------------------------------
   34.5 fs Module
------------------------------------------------------------------------------------- */

/**
 * fs means file system. It allows Node to interact with files/directories.
 *
 * Variants:
 * 1. callback API: fs.readFile('a.txt', cb)
 * 2. promise API: fs.promises.readFile('a.txt')
 * 3. sync API: fs.readFileSync('a.txt')
 * 4. stream API: fs.createReadStream('large.txt')
 *
 * WHY IT EXISTS:
 * Server-side JS needs to read configs, write logs, upload files, process assets, etc.
 *
 * LIMITATIONS:
 * - Sync fs blocks event loop.
 * - readFile loads whole file into memory.
 * - Path differences across OS can cause bugs.
 *
 * ADVANCED SOLUTIONS:
 * - Use fs.promises for readable async code.
 * - Use streams for large files.
 * - Use path module for cross-platform paths.
 * - Handle errors carefully: ENOENT, EACCES, EISDIR.
 */

const fs = require("fs");
const fsp = require("fs/promises");

async function fsExample() {
  const file = "example-note.txt";
  await fsp.writeFile(file, "Node fs example\n", "utf8");
  const data = await fsp.readFile(file, "utf8");
  console.log("File content:", data.trim());
  await fsp.unlink(file);
}

fsExample().catch(console.error);

/* -------------------------------------------------------------------------------------
   34.6 path Module
------------------------------------------------------------------------------------- */

/**
 * path provides utilities for working with file/directory paths safely.
 *
 * WHY IT EXISTS:
 * Windows uses backslashes, Linux/macOS use forward slashes. Manual string concatenation
 * causes bugs.
 *
 * MAIN METHODS:
 * - path.join(...parts): joins path segments.
 * - path.resolve(...parts): returns absolute path.
 * - path.basename(file): file name.
 * - path.dirname(file): directory name.
 * - path.extname(file): extension.
 * - path.parse(file): object with root, dir, base, ext, name.
 * - path.normalize(file): removes redundant separators.
 *
 * LIMITATION:
 * path only manipulates strings; it does not check whether the path exists.
 */

const path = require("path");
const fullPath = path.join(__dirname, "folder", "file.txt");
console.log("Joined path:", fullPath);
console.log("Extension:", path.extname(fullPath));
console.log("Parsed path:", path.parse(fullPath));

/* -------------------------------------------------------------------------------------
   34.7 http Module
------------------------------------------------------------------------------------- */

/**
 * http allows Node to create HTTP servers and clients without external frameworks.
 *
 * WHY IT EXISTS:
 * Node was designed for network applications. HTTP is the core protocol of web APIs.
 *
 * USE CASES:
 * - simple web server
 * - REST API
 * - health check endpoint
 * - reverse proxy
 *
 * LIMITATIONS:
 * - Low-level compared to Express/Fastify/NestJS.
 * - Manual routing/body parsing is verbose.
 *
 * ADVANCED SOLUTIONS:
 * - Use Express/Fastify for routing/middleware.
 * - Use streams for request/response bodies.
 * - Add security headers, validation, rate limiting.
 * - Use HTTPS in production.
 */

const http = require("http");

// Uncomment to run a minimal server.
// const server = http.createServer((req, res) => {
//   if (req.url === "/" && req.method === "GET") {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Hello from Node http" }));
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Not Found");
//   }
// });
// server.listen(3000, () => console.log("Server running at http://localhost:3000"));

/* -------------------------------------------------------------------------------------
   34.8 Streams
------------------------------------------------------------------------------------- */

/**
 * Streams process data piece-by-piece instead of loading everything into memory.
 *
 * WHY STREAMS EXIST:
 * Large files/videos/network responses may be too big for memory. Streams enable efficient
 * processing with backpressure.
 *
 * TYPES:
 * - Readable: source of data. Example: fs.createReadStream.
 * - Writable: destination. Example: fs.createWriteStream.
 * - Duplex: both readable and writable. Example: TCP socket.
 * - Transform: modifies data while passing through. Example: compression.
 *
 * KEY CONCEPT: BACKPRESSURE
 * If producer is faster than consumer, memory grows. Backpressure tells producer to slow down.
 * pipe() handles backpressure automatically.
 *
 * LIMITATIONS:
 * - More complex error handling.
 * - Data chunk boundaries may not align with logical lines/messages.
 *
 * ADVANCED SOLUTIONS:
 * - Use pipeline() from stream/promises to safely handle errors.
 * - Use transform streams for compression, parsing, encryption.
 */

const { pipeline } = require("stream/promises");

async function streamExample() {
  const input = "stream-input.txt";
  const output = "stream-output.txt";
  await fsp.writeFile(input, "line1\nline2\nline3\n", "utf8");
  await pipeline(fs.createReadStream(input), fs.createWriteStream(output));
  console.log("Stream copied file");
  await fsp.unlink(input);
  await fsp.unlink(output);
}

streamExample().catch(console.error);

/* -------------------------------------------------------------------------------------
   34.9 EventEmitter
------------------------------------------------------------------------------------- */

/**
 * EventEmitter implements event-driven programming.
 * Objects emit named events, listeners react.
 *
 * WHY IT EXISTS:
 * Node's architecture is event-driven. Servers, streams, sockets, processes, and many
 * libraries communicate through events.
 *
 * METHODS:
 * - emitter.on(event, listener): attach listener.
 * - emitter.once(event, listener): run one time.
 * - emitter.emit(event, ...args): trigger event.
 * - emitter.off/removeListener: remove listener.
 *
 * LIMITATIONS:
 * - Too many listeners may indicate memory leak.
 * - Errors emitted without an 'error' listener can crash process.
 * - Event flow can become hard to trace.
 *
 * ADVANCED PRACTICE:
 * - Always handle 'error'.
 * - Remove listeners when no longer needed.
 * - Prefer typed event wrappers in TypeScript for large apps.
 */

const EventEmitter = require("events");
const bus = new EventEmitter();
bus.on("user-created", (user) => console.log("User created:", user.name));
bus.emit("user-created", { id: 1, name: "Dinesh" });

/* -------------------------------------------------------------------------------------
   34.10 Timers in Node
------------------------------------------------------------------------------------- */

/**
 * Timers schedule code execution.
 *
 * COMMON TIMERS:
 * - setTimeout(fn, delay): runs once after delay.
 * - setInterval(fn, delay): repeats.
 * - setImmediate(fn): runs after current poll phase.
 * - process.nextTick(fn): runs immediately after current operation, before event loop continues.
 * - Promise.resolve().then(fn): microtask.
 *
 * WHY THEY EXIST:
 * Scheduling, retries, polling, timeouts, delayed tasks.
 *
 * LIMITATIONS:
 * - Timers are not exact; event loop blocking delays them.
 * - setInterval can overlap with slow async work.
 * - Recursive nextTick can starve event loop.
 *
 * ADVANCED SOLUTIONS:
 * - Use recursive setTimeout for safer repeated async polling.
 * - Use AbortController to cancel timers/fetches.
 * - Avoid CPU-heavy blocking.
 */

setTimeout(() => console.log("setTimeout example"), 0);
setImmediate(() => console.log("setImmediate example"));
Promise.resolve().then(() => console.log("Promise microtask example"));
process.nextTick(() => console.log("nextTick example"));

/* -------------------------------------------------------------------------------------
   34.11 Node Module System
------------------------------------------------------------------------------------- */

/**
 * Modules split code into reusable files.
 *
 * WHY MODULES EXIST:
 * Without modules, large apps become one huge file with naming conflicts and no clear
 * boundaries.
 *
 * NODE HAS TWO MAIN MODULE SYSTEMS:
 * 1. CommonJS: require/module.exports
 * 2. ESM: import/export
 *
 * MODULE RESOLUTION:
 * When you require('x'), Node checks:
 * - core module
 * - relative/absolute file path
 * - node_modules packages
 * - package.json fields
 *
 * BEST PRACTICES:
 * - Keep modules focused.
 * - Avoid circular dependencies.
 * - Export stable APIs.
 */

// CommonJS example:
function add(a, b) {
  return a + b;
}
module.exports.add = add;

/* -------------------------------------------------------------------------------------
   34.12 package.json
------------------------------------------------------------------------------------- */

/**
 * package.json is the project manifest.
 *
 * WHY IT EXISTS:
 * It tells Node/package managers how the project is named, versioned, started, tested,
 * built, and what dependencies it needs.
 *
 * COMMON FIELDS:
 * - name: package/project name.
 * - version: semantic version.
 * - type: "commonjs" or "module".
 * - scripts: command shortcuts.
 * - dependencies: needed at runtime.
 * - devDependencies: needed during development/build/test.
 * - peerDependencies: expected to be provided by consumer.
 * - main: CommonJS entry point.
 * - exports: modern controlled package exports.
 * - engines: supported Node/npm versions.
 *
 * EXAMPLE package.json:
 * {
 *   "name": "my-app",
 *   "version": "1.0.0",
 *   "type": "module",
 *   "scripts": {
 *     "start": "node index.js",
 *     "dev": "nodemon index.js",
 *     "test": "node --test"
 *   },
 *   "dependencies": {
 *     "express": "^4.18.0"
 *   },
 *   "devDependencies": {
 *     "nodemon": "^3.0.0"
 *   }
 * }
 *
 * LIMITATIONS:
 * - dependency version ranges can install newer versions and cause unexpected changes.
 *
 * SOLUTION:
 * - Commit lock files.
 * - Use npm ci in CI.
 * - Pin critical versions if necessary.
 */

/* -------------------------------------------------------------------------------------
   34.13 npm
------------------------------------------------------------------------------------- */

/**
 * npm is Node's default package manager and registry client.
 *
 * USE CASES:
 * - npm init
 * - npm install express
 * - npm install -D typescript
 * - npm run build
 * - npm publish
 *
 * FILES:
 * - package.json: project manifest.
 * - package-lock.json: exact dependency tree for reproducible installs.
 * - node_modules: installed packages.
 *
 * LIMITATIONS:
 * - node_modules can be large.
 * - dependency tree can contain vulnerabilities.
 * - package supply-chain risks.
 *
 * SOLUTIONS:
 * - npm audit
 * - lock files
 * - private registries
 * - dependency review
 * - minimal dependencies
 */

/* -------------------------------------------------------------------------------------
   34.14 Yarn
------------------------------------------------------------------------------------- */

/**
 * Yarn is an alternative package manager.
 *
 * WHY IT EXISTS:
 * It was created to improve dependency installation speed, consistency, and workspace
 * management.
 *
 * FEATURES:
 * - yarn.lock
 * - workspaces
 * - Plug'n'Play in newer Yarn versions
 * - offline cache options
 *
 * LIMITATIONS:
 * - Different Yarn versions behave differently.
 * - Plug'n'Play may break tools expecting node_modules.
 *
 * SOLUTION:
 * - Use Corepack to pin package manager version.
 * - Configure project tooling properly.
 */

/* -------------------------------------------------------------------------------------
   34.15 pnpm
------------------------------------------------------------------------------------- */

/**
 * pnpm is a fast, disk-efficient package manager.
 *
 * WHY IT EXISTS:
 * Classic node_modules duplicates packages across projects. pnpm stores packages globally
 * and links them into projects.
 *
 * FEATURES:
 * - content-addressable store
 * - strict node_modules structure
 * - fast installs
 * - strong monorepo support
 *
 * LIMITATIONS:
 * - Some badly written packages assume flatter dependency access and may break.
 *
 * SOLUTION:
 * - Fix package dependency declarations.
 * - Use pnpm overrides/packageExtensions if needed.
 */

/* -------------------------------------------------------------------------------------
   34.16 Environment Variables
------------------------------------------------------------------------------------- */

/**
 * Environment variables store configuration outside source code.
 *
 * WHY THEY EXIST:
 * Apps need different config in dev/stage/prod without changing code.
 *
 * EXAMPLES:
 * - PORT=3000
 * - NODE_ENV=production
 * - DATABASE_URL=...
 * - API_KEY=...
 *
 * SECURITY:
 * Never commit secrets to Git.
 *
 * LIMITATIONS:
 * - process.env values are strings.
 * - Missing env values can cause runtime crashes.
 * - Secrets can leak through logs.
 *
 * ADVANCED SOLUTIONS:
 * - Validate env at startup.
 * - Use secret managers.
 * - Use .env only locally.
 */

const port = Number(process.env.PORT || 3000);
console.log("Configured port:", port);

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

/* -------------------------------------------------------------------------------------
   34.17 REPL
------------------------------------------------------------------------------------- */

/**
 * REPL means Read-Eval-Print Loop.
 * Run `node` in terminal to enter interactive mode.
 *
 * WHY IT EXISTS:
 * Quickly test expressions, APIs, functions, and concepts.
 *
 * USE CASES:
 * - test JS syntax
 * - inspect objects
 * - quick calculations
 * - verify Node APIs
 *
 * LIMITATIONS:
 * - Not suitable for complex app logic.
 * - REPL state can hide mistakes.
 */

/* -------------------------------------------------------------------------------------
   34.18 child_process
------------------------------------------------------------------------------------- */

/**
 * child_process runs external commands or separate Node processes.
 *
 * WHY IT EXISTS:
 * Node apps sometimes need to invoke shell commands, scripts, compilers, git, ffmpeg, etc.
 *
 * MAIN METHODS:
 * - exec(command): runs shell command, buffers output.
 * - execFile(file, args): runs executable directly, safer than shell.
 * - spawn(command, args): streams output, good for long-running/large output.
 * - fork(module): starts another Node process with IPC channel.
 *
 * LIMITATIONS:
 * - exec buffers output and can hit maxBuffer.
 * - shell injection risk if user input is concatenated.
 * - child processes are heavier than worker threads.
 *
 * SOLUTIONS:
 * - Prefer execFile/spawn with args array.
 * - Validate/sanitize inputs.
 * - Use worker_threads for CPU JS tasks needing shared memory.
 */

const { execFile } = require("child_process");
execFile(process.execPath, ["-v"], (err, stdout) => {
  if (err) return console.error(err);
  console.log("Node version from child_process:", stdout.trim());
});

/* -------------------------------------------------------------------------------------
   34.19 worker_threads
------------------------------------------------------------------------------------- */

/**
 * worker_threads allow running JavaScript in parallel threads.
 *
 * WHY THEY EXIST:
 * The main event loop should stay responsive. CPU-heavy JS blocks requests. Workers move
 * CPU-heavy tasks to another thread.
 *
 * USE CASES:
 * - image processing
 * - large JSON parsing/transformation
 * - compression
 * - cryptographic computation
 * - CPU-heavy algorithms
 *
 * LIMITATIONS:
 * - Workers have startup/messaging overhead.
 * - Memory is mostly isolated unless using SharedArrayBuffer.
 * - More complex debugging.
 *
 * BEST PRACTICE:
 * - Use worker pool instead of creating worker per tiny task.
 * - Transfer ArrayBuffer for large binary data to avoid copying.
 */

// Worker example is usually placed in separate files. Kept commented for clarity.
// const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");
// if (isMainThread) {
//   const worker = new Worker(__filename, { workerData: 10 });
//   worker.on("message", (result) => console.log("Worker result:", result));
// } else {
//   parentPort.postMessage(workerData * 2);
// }

/* -------------------------------------------------------------------------------------
   34.20 CommonJS vs ESM in Node
------------------------------------------------------------------------------------- */

/**
 * COMMONJS:
 * - Uses require() and module.exports.
 * - Historically Node's default.
 * - Loads mostly synchronously.
 * - __dirname and __filename available.
 *
 * ESM:
 * - Uses import/export.
 * - JavaScript standard module system.
 * - Supports top-level await.
 * - Better static analysis/tree-shaking.
 * - __dirname/__filename not directly available; use import.meta.url.
 *
 * WHY TWO SYSTEMS EXIST:
 * Node had CommonJS before JavaScript standardized ESM. Modern Node supports both for
 * compatibility.
 *
 * COMMONJS EXAMPLE:
 * const fs = require('fs');
 * module.exports = { add };
 *
 * ESM EXAMPLE:
 * import fs from 'node:fs';
 * export function add(a, b) { return a + b; }
 *
 * LIMITATIONS:
 * - Mixing CJS and ESM can be confusing.
 * - Some packages are ESM-only.
 * - require() cannot directly load certain ESM modules without dynamic import.
 *
 * SOLUTIONS:
 * - For new projects, consider ESM with "type": "module".
 * - For existing Node projects, keep CommonJS if ecosystem compatibility matters.
 * - Use dynamic import() when needed.
 */

/* =====================================================================================
   35. MEMORY AND PERFORMANCE
===================================================================================== */

/* -------------------------------------------------------------------------------------
   35.1 Stack vs Heap
------------------------------------------------------------------------------------- */

/**
 * STACK:
 * - Stores function call frames, local execution context, primitive values/references.
 * - Fast allocation/deallocation.
 * - Follows LIFO: Last In, First Out.
 *
 * HEAP:
 * - Stores objects, arrays, functions, closures, complex data.
 * - Managed by garbage collector.
 * - Flexible but slower than stack.
 *
 * WHY BOTH EXIST:
 * Stack is efficient for predictable function execution. Heap is needed for dynamic objects
 * that can outlive a function call.
 *
 * EXAMPLE:
 * let x = 10;           // primitive value conceptually stored directly in stack/context
 * let obj = { a: 1 };   // reference in stack/context, object in heap
 *
 * LIMITATIONS:
 * - Deep recursion can cause stack overflow.
 * - Large object graphs can consume heap.
 *
 * SOLUTIONS:
 * - Replace deep recursion with iteration or controlled recursion.
 * - Release references to large objects.
 * - Use streaming/pagination/chunking.
 */

function stackExample(n) {
  if (n === 0) return "done";
  return stackExample(n - 1);
}
console.log("Small recursion:", stackExample(3));

/* -------------------------------------------------------------------------------------
   35.2 Primitive vs Reference Storage
------------------------------------------------------------------------------------- */

/**
 * PRIMITIVES:
 * string, number, bigint, boolean, undefined, symbol, null.
 * They are immutable values.
 * Assignment copies the value.
 *
 * REFERENCES:
 * objects, arrays, functions, dates, maps, sets.
 * Assignment copies the reference, not the object.
 *
 * WHY THIS MATTERS:
 * Mutating a reference through one variable affects all variables pointing to same object.
 */

let a = 10;
let b = a;
b = 20;
console.log("Primitive copy:", a, b); // 10, 20

const userA = { name: "Dinesh" };
const userB = userA;
userB.name = "Kumar";
console.log("Reference copy:", userA.name); // Kumar

const safeCopy = { ...userA, name: "Dinesh" };
console.log("Shallow copied object:", safeCopy);

/* -------------------------------------------------------------------------------------
   35.3 Garbage Collection
------------------------------------------------------------------------------------- */

/**
 * Garbage collection automatically frees memory for objects no longer reachable.
 *
 * CORE IDEA:
 * If an object cannot be reached from roots, it can be collected.
 * Roots include global variables, current call stack, closures, active timers, native handles.
 *
 * COMMON ALGORITHM CONCEPTS:
 * - Mark-and-sweep: mark reachable objects, sweep unreachable.
 * - Generational GC: young objects often die quickly; old objects are scanned differently.
 * - Incremental/concurrent GC: reduces pause times.
 *
 * WHY GC EXISTS:
 * Manual memory management is error-prone. GC improves developer productivity and safety.
 *
 * LIMITATIONS:
 * - GC pauses can affect performance.
 * - GC cannot free reachable but unused objects.
 * - Memory leaks still happen if references remain.
 *
 * SOLUTIONS:
 * - Avoid unnecessary long-lived references.
 * - Clear timers/listeners.
 * - Use WeakMap/WeakSet for metadata that should not prevent GC.
 * - Profile heap snapshots.
 */

/* -------------------------------------------------------------------------------------
   35.4 Memory Leaks
------------------------------------------------------------------------------------- */

/**
 * A memory leak occurs when memory is no longer needed but remains reachable.
 *
 * COMMON JS/NODE LEAK SOURCES:
 * 1. Global variables accidentally storing data forever.
 * 2. Unbounded caches/maps.
 * 3. Event listeners not removed.
 * 4. setInterval not cleared.
 * 5. Closures retaining large objects.
 * 6. Detached DOM nodes in browser apps.
 * 7. Pending promises/subscriptions retaining state.
 *
 * EXAMPLE BAD CACHE:
 * const cache = new Map();
 * function remember(key, value) { cache.set(key, value); }
 * If keys grow forever, memory grows forever.
 *
 * SOLUTIONS:
 * - Limit cache size using LRU.
 * - Use TTL expiry.
 * - Clear listeners/timers.
 * - Use WeakMap when keys are objects.
 * - Monitor memoryUsage and heap snapshots.
 */

class SimpleLRUCache {
  constructor(limit = 3) {
    this.limit = limit;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return undefined;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
  set(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.limit) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
  }
}

const lru = new SimpleLRUCache(2);
lru.set("a", 1);
lru.set("b", 2);
lru.set("c", 3);
console.log("LRU keys after limit:", [...lru.map.keys()]); // b, c

/* -------------------------------------------------------------------------------------
   35.5 Closures and Memory Retention
------------------------------------------------------------------------------------- */

/**
 * A closure allows a function to remember variables from its lexical scope even after the
 * outer function has returned.
 *
 * WHY CLOSURES EXIST:
 * They enable private state, callbacks, factories, memoization, functional programming.
 *
 * MEMORY RISK:
 * If a closure captures a large object, that object stays alive as long as the closure exists.
 *
 * SOLUTION:
 * - Capture only what is needed.
 * - Null out large references when done.
 * - Avoid storing closures forever in global arrays/listeners.
 */

function createCounter() {
  let count = 0; // retained by returned closure
  return function increment() {
    count += 1;
    return count;
  };
}
const counter = createCounter();
console.log(counter(), counter());

function closureMemoryRisk() {
  const largeArray = new Array(100000).fill("data");
  return function onlyNeedsLength() {
    return largeArray.length; // largeArray retained
  };
}

/* -------------------------------------------------------------------------------------
   35.6 Detached DOM Nodes
------------------------------------------------------------------------------------- */

/**
 * Browser-only concept.
 * A detached DOM node is removed from the document but still referenced by JavaScript.
 *
 * WHY IT MATTERS:
 * The browser cannot free the node if JS still references it.
 *
 * EXAMPLE:
 * const button = document.querySelector('#btn');
 * document.body.removeChild(button);
 * // If variable button or listener references remain, node may stay in memory.
 *
 * SOLUTIONS:
 * - Remove event listeners.
 * - Clear references: button = null, if variable is let.
 * - Use framework cleanup hooks: React useEffect cleanup, Vue unmounted.
 */

/* -------------------------------------------------------------------------------------
   35.7 Performance Bottlenecks
------------------------------------------------------------------------------------- */

/**
 * A bottleneck is the slowest part limiting overall performance.
 *
 * COMMON BOTTLENECKS:
 * - CPU-heavy loops
 * - blocking synchronous I/O
 * - too many DB queries
 * - large JSON parsing/stringifying
 * - unnecessary re-renders
 * - large bundle size
 * - memory leaks causing GC pressure
 * - network latency
 * - inefficient algorithms
 *
 * HOW TO SOLVE:
 * 1. Measure first.
 * 2. Identify bottleneck using profiling.
 * 3. Optimize the highest-impact cause.
 * 4. Re-measure.
 *
 * TOOLS:
 * - browser DevTools Performance tab
 * - Lighthouse
 * - Node --inspect
 * - clinic.js
 * - console.time/timeEnd for quick local checks
 */

console.time("loop");
let total = 0;
for (let i = 0; i < 100000; i++) total += i;
console.timeEnd("loop");

/* -------------------------------------------------------------------------------------
   35.8 Big-O Basics
------------------------------------------------------------------------------------- */

/**
 * Big-O describes how algorithm cost grows as input size grows.
 *
 * COMMON COMPLEXITIES:
 * O(1): constant time. Example: array[index].
 * O(log n): logarithmic. Example: binary search.
 * O(n): linear. Example: loop through array.
 * O(n log n): efficient sorting.
 * O(n^2): nested loops over same input.
 * O(2^n): exponential. Example: naive recursive Fibonacci.
 *
 * WHY IT EXISTS:
 * It helps predict scalability independent of machine speed.
 *
 * LIMITATION:
 * Big-O ignores constants and real-world factors like caching, I/O, memory, engine optimizations.
 */

function linearSearch(arr, target) { // O(n)
  for (const item of arr) {
    if (item === target) return true;
  }
  return false;
}
console.log("Linear search:", linearSearch([1, 2, 3], 2));

function binarySearch(sorted, target) { // O(log n)
  let left = 0;
  let right = sorted.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sorted[mid] === target) return true;
    if (sorted[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}
console.log("Binary search:", binarySearch([1, 2, 3, 4, 5], 4));

/* -------------------------------------------------------------------------------------
   35.9 Lazy Loading
------------------------------------------------------------------------------------- */

/**
 * Lazy loading delays loading/creating something until actually needed.
 *
 * WHY IT EXISTS:
 * Improves startup time, reduces initial memory/network cost.
 *
 * USE CASES:
 * - load images when visible
 * - import heavy modules only when feature is used
 * - initialize expensive service on demand
 *
 * LIMITATIONS:
 * - First use may be slower.
 * - More async paths.
 *
 * SOLUTIONS:
 * - Preload likely-needed resources.
 * - Show skeleton/loading states.
 * - Cache loaded modules/results.
 */

async function lazyLoadFsPromises() {
  const fsPromises = await import("fs/promises"); // dynamic import
  return fsPromises;
}

/* -------------------------------------------------------------------------------------
   35.10 Code Splitting
------------------------------------------------------------------------------------- */

/**
 * Code splitting breaks a bundle into smaller chunks loaded when needed.
 *
 * WHY IT EXISTS:
 * Large frontend bundles slow page load. Splitting allows route/component-level loading.
 *
 * EXAMPLES:
 * - React.lazy(() => import('./AdminPage'))
 * - Next.js dynamic imports
 * - Webpack/Vite/Rollup dynamic import chunks
 *
 * LIMITATIONS:
 * - Too many chunks create network overhead.
 * - Poor splitting can delay important UI.
 *
 * SOLUTIONS:
 * - Split by routes/features.
 * - Preload important chunks.
 * - Analyze bundle.
 */

/* -------------------------------------------------------------------------------------
   35.11 Memoization
------------------------------------------------------------------------------------- */

/**
 * Memoization caches function results for repeated inputs.
 *
 * WHY IT EXISTS:
 * Avoid expensive recomputation.
 *
 * BEST FOR:
 * - pure functions
 * - repeated calls with same inputs
 * - expensive calculations
 *
 * LIMITATIONS:
 * - Cache uses memory.
 * - Not helpful if inputs rarely repeat.
 * - Object keys need careful handling.
 *
 * SOLUTIONS:
 * - Limit cache size.
 * - Use WeakMap for object keys.
 * - Clear cache when invalidated.
 */

function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const slowSquare = memoize((n) => {
  console.log("Computing square...");
  return n * n;
});
console.log(slowSquare(5));
console.log(slowSquare(5)); // cached

/* -------------------------------------------------------------------------------------
   35.12 Debounce
------------------------------------------------------------------------------------- */

/**
 * Debounce delays execution until events stop for a specified time.
 *
 * WHY IT EXISTS:
 * Some events fire very frequently: search typing, resize, scroll. Debounce prevents
 * unnecessary repeated work.
 *
 * USE CASES:
 * - search API after user stops typing
 * - save draft after user pauses
 * - resize calculations
 *
 * LIMITATION:
 * - Action waits until quiet period; can feel delayed.
 *
 * SOLUTION:
 * - Use leading option for immediate first call if needed.
 */

function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const debouncedLog = debounce((value) => console.log("Debounced:", value), 300);
debouncedLog("a");
debouncedLog("ab");
debouncedLog("abc"); // only this likely runs after 300ms

/* -------------------------------------------------------------------------------------
   35.13 Throttle
------------------------------------------------------------------------------------- */

/**
 * Throttle ensures a function runs at most once per time interval.
 *
 * WHY IT EXISTS:
 * Useful when you need regular updates but not too frequently.
 *
 * USE CASES:
 * - scroll position updates
 * - drag events
 * - window resize tracking
 * - rate-limited analytics
 *
 * LIMITATION:
 * - Some intermediate events are ignored.
 *
 * SOLUTION:
 * - Add trailing execution if latest value must be processed.
 */

function throttle(fn, interval) {
  let lastRun = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastRun >= interval) {
      lastRun = now;
      fn.apply(this, args);
    }
  };
}

const throttledLog = throttle((msg) => console.log("Throttled:", msg), 1000);
throttledLog("first");
throttledLog("second ignored if within 1 sec");

/* -------------------------------------------------------------------------------------
   35.14 Reflow
------------------------------------------------------------------------------------- */

/**
 * Browser-only concept.
 * Reflow, also called layout, recalculates positions/sizes of elements.
 *
 * TRIGGERS:
 * - changing width/height/margin/padding/font
 * - adding/removing DOM nodes
 * - reading layout values after writes: offsetHeight, getBoundingClientRect
 *
 * WHY IT MATTERS:
 * Layout calculations can be expensive, especially on large DOM trees.
 *
 * SOLUTIONS:
 * - Batch DOM reads and writes separately.
 * - Use transform instead of top/left for animations.
 * - Avoid layout thrashing.
 * - Use requestAnimationFrame for UI updates.
 */

/* -------------------------------------------------------------------------------------
   35.15 Repaint
------------------------------------------------------------------------------------- */

/**
 * Browser-only concept.
 * Repaint redraws pixels without necessarily recalculating layout.
 *
 * TRIGGERS:
 * - color change
 * - background change
 * - visibility change
 * - box-shadow
 *
 * REFLOW VS REPAINT:
 * - Reflow recalculates layout and usually causes repaint.
 * - Repaint redraws visual appearance without changing layout.
 *
 * SOLUTIONS:
 * - Animate opacity/transform where possible.
 * - Avoid expensive paint properties on many elements.
 * - Use DevTools rendering/performance tools.
 */

/* =====================================================================================
   36. FUNCTIONAL PROGRAMMING IN JAVASCRIPT
===================================================================================== */

/* -------------------------------------------------------------------------------------
   36.1 First-Class Functions
------------------------------------------------------------------------------------- */

/**
 * Functions are first-class citizens in JavaScript.
 * This means functions can be:
 * - assigned to variables
 * - passed as arguments
 * - returned from other functions
 * - stored in arrays/objects
 *
 * WHY IT EXISTS:
 * It enables callbacks, event handlers, higher-order functions, closures, and functional
 * programming patterns.
 */

const greet = function (name) {
  return `Hello, ${name}`;
};
console.log(greet("Dinesh"));

const actions = [
  (x) => x + 1,
  (x) => x * 2,
];
console.log(actions[1](5));

/* -------------------------------------------------------------------------------------
   36.2 Higher-Order Functions
------------------------------------------------------------------------------------- */

/**
 * A higher-order function either:
 * - accepts a function as an argument, or
 * - returns a function
 *
 * WHY IT EXISTS:
 * It allows abstraction of behavior.
 *
 * EXAMPLES:
 * - array.map(fn)
 * - array.filter(fn)
 * - array.reduce(fn)
 * - debounce(fn)
 * - middleware functions
 */

const numbers = [1, 2, 3, 4];
const doubled = numbers.map((n) => n * 2);
const evens = numbers.filter((n) => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log({ doubled, evens, sum });

function withLogging(fn) {
  return function (...args) {
    console.log("Calling with args:", args);
    const result = fn(...args);
    console.log("Result:", result);
    return result;
  };
}
const loggedAdd = withLogging((x, y) => x + y);
loggedAdd(2, 3);

/* -------------------------------------------------------------------------------------
   36.3 Pure Functions
------------------------------------------------------------------------------------- */

/**
 * A pure function:
 * 1. returns the same output for the same input
 * 2. has no side effects
 *
 * SIDE EFFECTS INCLUDE:
 * - modifying external variables
 * - mutating input objects
 * - console logging
 * - network/database/file operations
 * - DOM updates
 * - reading current time/random values
 *
 * WHY PURE FUNCTIONS MATTER:
 * - easier to test
 * - easier to debug
 * - predictable
 * - memoizable
 * - safer with concurrency
 *
 * LIMITATION:
 * Real apps need side effects. The goal is to isolate side effects, not eliminate them.
 */

function pureAdd(x, y) {
  return x + y;
}

let externalTotal = 0;
function impureAddToTotal(x) {
  externalTotal += x; // side effect
  return externalTotal;
}

console.log("Pure:", pureAdd(1, 2));
console.log("Impure:", impureAddToTotal(5));

/* -------------------------------------------------------------------------------------
   36.4 Immutability
------------------------------------------------------------------------------------- */

/**
 * Immutability means not changing existing data. Instead, create new data with changes.
 *
 * WHY IT EXISTS:
 * Mutation can create hidden bugs when multiple parts of code share references.
 * Immutability makes state changes predictable.
 *
 * COMMON IN REACT/REDUX:
 * React state should be treated immutably so React can detect changes by reference.
 *
 * LIMITATIONS:
 * - Copying large objects can be expensive.
 * - Deep updates can be verbose.
 *
 * ADVANCED SOLUTIONS:
 * - Structural sharing libraries like Immer.
 * - Normalize deeply nested state.
 * - Use persistent data structures when needed.
 */

const originalUser = { id: 1, name: "Dinesh", skills: ["JS"] };
const updatedUser = {
  ...originalUser,
  skills: [...originalUser.skills, "Node.js"],
};
console.log("Original:", originalUser);
console.log("Updated:", updatedUser);

/* -------------------------------------------------------------------------------------
   36.5 Referential Transparency
------------------------------------------------------------------------------------- */

/**
 * Referential transparency means an expression can be replaced by its value without
 * changing program behavior.
 *
 * Example:
 * pureAdd(2, 3) can be replaced with 5.
 *
 * WHY IT MATTERS:
 * - reasoning becomes easier
 * - enables compiler optimizations
 * - supports memoization
 * - improves testability
 *
 * NON-REFERENTIALLY TRANSPARENT EXAMPLES:
 * Date.now(), Math.random(), reading global mutable state, network calls.
 */

function priceWithTax(price, taxRate) {
  return price + price * taxRate;
}
console.log("Transparent:", priceWithTax(100, 0.18)); // can be replaced by 118

/* -------------------------------------------------------------------------------------
   36.6 Composition
------------------------------------------------------------------------------------- */

/**
 * Composition builds complex behavior by combining small functions.
 *
 * WHY IT EXISTS:
 * Small functions are easier to test and reuse. Composition avoids large monolithic logic.
 *
 * FORM:
 * compose(f, g)(x) means f(g(x))
 * pipe(f, g)(x) means g(f(x))
 *
 * LIMITATIONS:
 * - Too much point-free style can reduce readability.
 * - Debugging long pipelines can be harder.
 *
 * SOLUTIONS:
 * - Use clear function names.
 * - Break pipelines into readable stages.
 * - Add tests for each small function.
 */

const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

const trim = (s) => s.trim();
const lower = (s) => s.toLowerCase();
const removeSpaces = (s) => s.replace(/\s+/g, "-");

const slugify = pipe(trim, lower, removeSpaces);
console.log(slugify("  Deep Node JS Concepts  "));

/* -------------------------------------------------------------------------------------
   FUNCTIONAL PROGRAMMING REAL SCENARIO
------------------------------------------------------------------------------------- */

/**
 * Scenario: Calculate final cart total.
 * Functional approach:
 * - no mutation of original cart
 * - small pure functions
 * - composition using map/filter/reduce
 */

const cart = [
  { name: "Book", price: 500, qty: 2, active: true },
  { name: "Pen", price: 20, qty: 5, active: true },
  { name: "Old item", price: 1000, qty: 1, active: false },
];

const activeItems = (items) => items.filter((item) => item.active);
const addLineTotal = (items) => items.map((item) => ({ ...item, lineTotal: item.price * item.qty }));
const calculateTotal = (items) => items.reduce((acc, item) => acc + item.lineTotal, 0);
const applyDiscount = (discountRate) => (amount) => amount - amount * discountRate;

const cartTotalPipeline = pipe(
  activeItems,
  addLineTotal,
  calculateTotal,
  applyDiscount(0.1)
);

console.log("Final cart total:", cartTotalPipeline(cart));

/* =====================================================================================
   QUICK RECALL SUMMARY
===================================================================================== */

/**
 * NODE.JS:
 * - Runtime = V8 + libuv + Node APIs.
 * - Great for I/O-heavy apps.
 * - Avoid blocking event loop.
 * - Use streams for large data.
 * - Use workers/child processes for CPU-heavy work.
 * - Use package.json + lock file for dependency control.
 * - Understand CommonJS and ESM interoperability.
 *
 * MEMORY/PERFORMANCE:
 * - Stack = calls/local context, Heap = objects/dynamic memory.
 * - GC frees unreachable objects, not reachable-but-unused objects.
 * - Leaks happen through unwanted references.
 * - Measure before optimizing.
 * - Use Big-O to reason about growth.
 * - Lazy loading/code splitting reduce initial load.
 * - Memoization trades memory for speed.
 * - Debounce waits until events stop; throttle limits execution rate.
 * - Reflow recalculates layout; repaint redraws pixels.
 *
 * FUNCTIONAL PROGRAMMING:
 * - Functions are values.
 * - Higher-order functions abstract behavior.
 * - Pure functions are predictable.
 * - Immutability prevents accidental shared-state bugs.
 * - Referential transparency improves reasoning.
 * - Composition builds complex logic from small reusable pieces.
 */
