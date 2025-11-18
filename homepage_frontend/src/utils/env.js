 /* eslint-disable no-console */
 // PUBLIC_INTERFACE
 /**
  * Exports a frozen environment mapping from process.env with safe defaults.
  * FEATURE_FLAGS is parsed if JSON-like; defaults to {} otherwise.
  */
const raw = {
  API_BASE: process.env.REACT_APP_API_BASE || '',
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL || '',
  FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || '',
  WS_URL: process.env.REACT_APP_WS_URL || '',
  NODE_ENV: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || 'development',
  NEXT_TELEMETRY_DISABLED: process.env.REACT_APP_NEXT_TELEMETRY_DISABLED || '1',
  ENABLE_SOURCE_MAPS: process.env.REACT_APP_ENABLE_SOURCE_MAPS || '',
  PORT: process.env.REACT_APP_PORT || '',
  TRUST_PROXY: process.env.REACT_APP_TRUST_PROXY || '',
  LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL || 'info',
  HEALTHCHECK_PATH: process.env.REACT_APP_HEALTHCHECK_PATH || '/healthz',
  FEATURE_FLAGS: process.env.REACT_APP_FEATURE_FLAGS || '',
  EXPERIMENTS_ENABLED: process.env.REACT_APP_EXPERIMENTS_ENABLED || '',
};

function parseFeatureFlags(input) {
  if (!input) return {};
  try {
    // Accept JSON or key:value pairs like "newsletter:true,abtest:false"
    if (input.trim().startsWith('{')) {
      const obj = JSON.parse(input);
      return obj && typeof obj === 'object' ? obj : {};
    }
    const result = {};
    input.split(',').forEach((pair) => {
      const [k, v] = pair.split(':').map((s) => (s || '').trim());
      if (k) {
        if (v === 'true' || v === 'false') result[k] = v === 'true';
        else result[k] = v;
      }
    });
    return result;
  } catch (e) {
    console.warn('[env] Failed to parse FEATURE_FLAGS. Using {}.');
    return {};
  }
}

const env = Object.freeze({
  ...raw,
  FEATURE_FLAGS: parseFeatureFlags(raw.FEATURE_FLAGS),
});

// Helper to warn when API is missing at call sites
export function assertApiConfigured(action = 'network request') {
  if (!env.API_BASE) {
    console.warn(`[env] REACT_APP_API_BASE is not set. Skipping ${action}.`);
    return false;
  }
  return true;
}

export default env;
