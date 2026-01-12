'use client';

import React, { useState, useEffect } from 'react';

export const ContactApp: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset form when the component mounts/unmounts (effectively when the window opens/closes)
  useEffect(() => {
    return () => {
      setFormState({ name: '', email: '', message: '' });
      setStatus('idle');
      setErrorMessage('');
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Reset status when user starts typing after a success or error
    if (status !== 'idle' && status !== 'loading') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setErrorMessage('Failed to connect to the server.');
    }
  };

  return (
    <div className="flex h-full flex-col items-center overflow-auto p-8 text-white">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Contact Me</h1>

        {status === 'success' ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-center text-sm text-green-400">
              Your message has been sent.
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="w-full text-center text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="name"
                required
                disabled={status === 'loading'}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:opacity-50"
                placeholder="Your name"
                value={formState.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                required
                disabled={status === 'loading'}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:opacity-50"
                placeholder="Your email"
                value={formState.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <textarea
                name="message"
                required
                rows={5}
                disabled={status === 'loading'}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:opacity-50"
                placeholder="Message"
                value={formState.message}
                onChange={handleInputChange}
              />
            </div>

            {status === 'error' && <p className="text-xs text-red-400">{errorMessage}</p>}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Send'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
