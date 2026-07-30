// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "", // Empty by default, can be set later
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  
  // Filter out development environment errors
  environment: process.env.NODE_ENV,
  
  beforeSend(event) {
    // Filter out certain errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Sentry would send:', event);
      return null; // Don't send in development
    }
    return event;
  },
});