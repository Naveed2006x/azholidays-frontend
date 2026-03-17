import { api } from './index';

const CURRENCY_RATES_PATH = process.env.REACT_APP_BACKEND_CURRENCY_RATES_PATH || '/currency/latest';

const normalizeRatesPayload = (payload, requestedBase = 'SGD') => {
  const rates = payload?.conversion_rates || payload?.rates || payload?.data?.conversion_rates || payload?.data?.rates;

  if (!rates || typeof rates !== 'object') {
    throw new Error('Exchange rate data is unavailable. Please try again.');
  }

  const baseCode = payload?.base_code || payload?.base || payload?.data?.base_code || payload?.data?.base || requestedBase;

  let normalizedRates = { ...rates };

  if (baseCode !== requestedBase && normalizedRates[requestedBase] && normalizedRates[baseCode]) {
    const baseToRequested = normalizedRates[requestedBase];
    const requestedRates = {};

    Object.keys(normalizedRates).forEach((currency) => {
      requestedRates[currency] = normalizedRates[currency] / baseToRequested;
    });

    requestedRates[requestedBase] = 1;
    normalizedRates = requestedRates;
  } else if (!normalizedRates[requestedBase]) {
    normalizedRates[requestedBase] = 1;
  }

  return {
    rates: normalizedRates,
    lastUpdated:
      payload?.time_last_update_utc ||
      payload?.updatedAt ||
      payload?.lastUpdated ||
      payload?.data?.time_last_update_utc ||
      payload?.data?.updatedAt ||
      ''
  };
};

export const currencyAPI = {
  getLatestRates: async (base = 'SGD') => {
    const payload = await api.get(CURRENCY_RATES_PATH, {
      params: { base }
    });

    return normalizeRatesPayload(payload, base);
  }
};

export default currencyAPI;
