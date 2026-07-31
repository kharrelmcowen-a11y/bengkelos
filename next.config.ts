import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  experimental: {
    // Attachments travel base64-encoded through a Server Action, which inflates
    // them ~33%. The 1MB default silently rejected anything over ~750KB, while
    // the form advertised a 10MB cap.
    serverActions: { bodySizeLimit: "15mb" },
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: process.env.SENTRY_ORG || "",
  project: process.env.SENTRY_PROJECT || "",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,
});
