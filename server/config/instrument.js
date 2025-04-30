
// instrument.js
import * as Sentry from "@sentry/node";

import {nodeProfilingIntegration} from"@sentry/profiling-node";

Sentry.init({
    dsn: "https://ad698ee7a775a222fca690eb3ddf29d7@o4509237314584576.ingest.us.sentry.io/4509237320089600",
    integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()

  ],
  // Tracing
//tracesSampleRate: 1.0, // Capture 100% of the transactions
});

// Manually call startProfiler and stopProfiler
// to profile the code in between
Sentry.profiler.startProfiler();


// Starts a transaction that will also be profiled
Sentry.startSpan(
  {
    name: "My First Transaction",
  },
  () => {
    // the code executing inside the transaction will be wrapped in a span and profiled
  }
);

// Calls to stopProfiler are optional — if you don’t stop the profiler,
// your application until the process exits or stopProfiling is called.
Sentry.profiler.stopProfiler();
//