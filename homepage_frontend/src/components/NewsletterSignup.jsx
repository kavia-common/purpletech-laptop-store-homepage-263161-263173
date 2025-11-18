import React, { useMemo, useState } from 'react';
import env from '../utils/env';

/**
 * PUBLIC_INTERFACE
 * Newsletter signup form with local validation and basic async submission.
 * If REACT_APP_API_BASE exists, POSTs to `${API_BASE}/newsletter`, else no-op with console.info.
 * Can be gated by feature flag: FEATURE_FLAGS.newsletter === true.
 */
export default function NewsletterSignup() {
  const enabled = useMemo(() => {
    const flags = env.FEATURE_FLAGS || {};
    if (Object.prototype.hasOwnProperty.call(flags, 'newsletter')) {
      return !!flags.newsletter;
    }
    // default visible if no explicit flag
    return true;
  }, []);

  const [email, setEmail] = useState('');
  const [state, setState] = useState({ status: 'idle', message: '' }); // idle | loading | success | error

  if (!enabled) {
    return (
      <div className="card newsletter" aria-live="polite">
        <p className="quote">Newsletter is currently unavailable.</p>
      </div>
    );
  }

  const validate = (val) => /\S+@\S+\.\S+/.test(val);

  const submit = async (e) => {
    e.preventDefault();
    if (!validate(email)) {
      setState({ status: 'error', message: 'Please enter a valid email.' });
      return;
    }
    setState({ status: 'loading', message: '' });

    const url = env.API_BASE ? `${env.API_BASE.replace(/\/+$/, '')}/newsletter` : null;
    try {
      if (!url) {
        // eslint-disable-next-line no-console
        console.info('[newsletter] No API configured. Simulating success.');
        await new Promise((r) => setTimeout(r, 600));
        setState({ status: 'success', message: 'Thanks! You are on the list.' });
        setEmail('');
        return;
      }
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      setState({ status: 'success', message: 'Thanks! You are on the list.' });
      setEmail('');
    } catch (err) {
      setState({ status: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="card newsletter">
      <form className="news-form" onSubmit={submit} noValidate>
        <label htmlFor="email" className="sr-only" style={{ position: 'absolute', left: -10000, top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
          Email address
        </label>
        <input
          id="email"
          className="input"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={state.status === 'error' ? 'true' : 'false'}
          aria-describedby="email-help"
        />
        <button disabled={state.status === 'loading'} className="btn btn-primary" type="submit" aria-label="Subscribe to newsletter">
          {state.status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      <div id="email-help" role="status" aria-live="polite" style={{ minHeight: 20, marginTop: 4 }}>
        {state.message && (
          <span style={{ color: state.status === 'error' ? 'var(--color-error)' : 'var(--color-primary)' }}>
            {state.message}
          </span>
        )}
      </div>
    </div>
  );
}
