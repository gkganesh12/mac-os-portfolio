import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.csv');

/**
 * Escapes values for CSV format.
 * Wraps in quotes and escapes double quotes.
 */
const escapeCSV = (val: string) => {
  if (!val) return '""';
  const escaped = val.replace(/"/g, '""');
  return `"${escaped}"`;
};

/**
 * Returns local server time in YYYY-MM-DD HH:mm:ss format.
 */
const getFormattedDate = () => {
  const date = new Date();
  const Y = date.getFullYear();
  const M = String(date.getMonth() + 1).padStart(2, '0');
  const D = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
};

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      );
    }

    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Check if we need to initialize or reset headers
    const headers = ['submitted_at', 'name', 'email', 'message'].join(',') + '\n';
    const fileExists = fs.existsSync(FEEDBACK_FILE);

    // If file exists, check if it has the old 'timestamp' header
    if (fileExists) {
      const firstLine = fs.readFileSync(FEEDBACK_FILE, 'utf8').split('\n')[0];
      if (firstLine.includes('timestamp')) {
        // Old header found, we reset the file to follow new requirements
        fs.writeFileSync(FEEDBACK_FILE, headers);
      }
    } else {
      fs.writeFileSync(FEEDBACK_FILE, headers);
    }

    const submitted_at = getFormattedDate();
    const row = [submitted_at, name, email, message].map(escapeCSV).join(',') + '\n';

    // Append safely
    fs.appendFileSync(FEEDBACK_FILE, row);

    return NextResponse.json({ success: true, message: 'Your message has been sent.' });
  } catch (error) {
    console.error('Feedback storage error:', error);
    return NextResponse.json(
      { error: 'Internal server error while saving feedback.' },
      { status: 500 },
    );
  }
}
