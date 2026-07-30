import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

// This endpoint is for debugging purposes only and should be protected in production
export async function GET() {
  // In production, you'd want to add authentication here
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const recentLogs = logger.getRecentLogs(50);
  return NextResponse.json({ logs: recentLogs });
}

export async function DELETE() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  logger.clearBuffer();
  return NextResponse.json({ success: true });
}