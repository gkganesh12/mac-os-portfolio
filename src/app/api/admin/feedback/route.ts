import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const FEEDBACK_FILE = path.join(process.cwd(), 'data', 'feedback.csv');

export async function GET(request: Request) {
  try {
    const adminSecret = process.env.ADMIN_SECRET;
    const requestSecret = request.headers.get('x-admin-secret');

    if (!adminSecret) {
      console.error('ADMIN_SECRET environment variable is not defined.');
      return NextResponse.json({ error: 'Admin service not configured.' }, { status: 500 });
    }

    if (requestSecret !== adminSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!fs.existsSync(FEEDBACK_FILE)) {
      return NextResponse.json({ error: 'No feedback data found yet.' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(FEEDBACK_FILE);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="feedback.csv"',
      },
    });
  } catch (error) {
    console.error('Admin feedback retrieval error:', error);
    return NextResponse.json(
      { error: 'Internal server error while retrieving feedback.' },
      { status: 500 },
    );
  }
}
