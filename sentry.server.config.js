// This file configures the initialization of Sentry for server-side runtime.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "", // Empty by default, can be set later
  tracesSampleRate: 1.0,
  
  // Filter out development environment errors
  environment: process.env.NODE_ENV,
  
  beforeSend(event) {
    // Filter out certain errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Sentry would send:', event);
      return null; // Don't send in development
    }
    
    // Add shop context if available (for multi-tenant debugging)
    // This would need to be populated from session context
    return event;
  },
});