import React, { useEffect, useMemo, useState } from 'react';
import { currencyAPI } from '../api/currency';

const POPULAR_PAIRS = [
  { from: 'SGD', to: 'USD' },
  { from: 'SGD', to: 'INR' },
  { from: 'SGD', to: 'MYR' },
  { from: 'SGD', to: 'EUR' },
  { from: 'SGD', to: 'GBP' }
];

const FAQ_ITEMS = [
  {
    question: 'How do I convert Singapore dollars to USD?',
    answer:
      'Enter your amount, select SGD as the from currency and USD as the to currency, then click Convert. The tool uses live exchange rate data to show your estimated value instantly.'
  },
  {
    question: 'Is this currency converter free?',
    answer:
      'Yes. The AZ Holidays currency converter is free to use for travelers, planners, and anyone checking Singapore dollar exchange rates.'
  },
  {
    question: 'Are the exchange rates live?',
    answer:
      'Rates are pulled from API and refreshed when the page loads. They are live market references and may vary slightly from final bank or money changer rates.'
  }
];

const formatCurrency = (value, currency) => {
  try {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency,
      maximumFractionDigits: 4
    }).format(value);
  } catch (error) {
    return `${value.toFixed(4)} ${currency}`;
  }
};

const getOrCreateMeta = (name) => {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  return tag;
};

const setCanonical = (href) => {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

const CurrencyConverter = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('SGD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [convertedValue, setConvertedValue] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const seoTitle = 'Currency Converter | SGD to USD, INR, MYR | AZ Holidays Singapore';
  const seoDescription =
    'Free currency converter for Singapore Dollar (SGD). Convert SGD to USD, INR, MYR, EUR and more using live exchange rates. Powered by AZ Holidays Singapore.';
  const canonicalUrl = 'https://azholidays.com.sg/currency-converter';

  const fontStyle = {
    fontFamily: "'Poppins', sans-serif"
  };

  const styles = {
    page: {
      background: 'linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #ffffff 100%)',
      minHeight: '100vh',
      color: '#1a1a1a',
      overflowX: 'hidden',
      ...fontStyle
    },
    heroSection: {
      padding: isMobile ? '96px 16px 34px' : '120px 20px 50px'
    },
    container: {
      maxWidth: '1180px',
      marginInline: 'auto'
    },
    heroCard: {
      background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)',
      borderRadius: isMobile ? '20px' : '28px',
      padding: isMobile ? '24px 16px' : '40px',
      boxShadow: '0 18px 48px rgba(30, 61, 111, 0.3)',
      color: 'white',
      textAlign: 'center'
    },
    h1: {
      fontSize: isMobile ? '1.85rem' : 'clamp(2.2rem, 4.5vw, 3.1rem)',
      lineHeight: 1.2,
      marginBottom: '12px',
      fontWeight: 800,
      ...fontStyle
    },
    heroText: {
      maxWidth: '820px',
      margin: '0 auto',
      opacity: 0.95,
      lineHeight: 1.7,
      fontSize: isMobile ? '0.95rem' : '1.05rem',
      ...fontStyle
    },
    converterSection: {
      marginTop: isMobile ? '-6px' : '-18px',
      padding: isMobile ? '0 16px 4px' : '0 20px 8px'
    },
    converterCard: {
      maxWidth: '960px',
      marginInline: 'auto',
      background: 'white',
      border: '1px solid #e5edf8',
      borderRadius: isMobile ? '16px' : '22px',
      padding: isMobile ? '18px' : '28px',
      boxShadow: '0 12px 34px rgba(30, 61, 111, 0.12)'
    },
    h2: {
      fontSize: isMobile ? '1.32rem' : '1.75rem',
      fontWeight: 700,
      marginBottom: '16px',
      color: '#1a1a1a',
      ...fontStyle
    },
    fieldGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))',
      gap: isMobile ? '12px' : '14px',
      alignItems: 'end'
    },
    fieldWrap: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '0.92rem',
      fontWeight: 600,
      color: '#2c5aa0',
      ...fontStyle
    },
    input: {
      minHeight: '48px',
      borderRadius: '10px',
      border: '1.5px solid #d4e2f5',
      padding: '0 12px',
      fontSize: '1rem',
      outline: 'none',
      background: '#f8fbff',
      ...fontStyle
    },
    convertButton: {
      minHeight: '48px',
      border: 'none',
      borderRadius: '10px',
      padding: '0 18px',
      background: 'linear-gradient(135deg, #2c5aa0 0%, #174a9a 100%)',
      color: 'white',
      fontWeight: 700,
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      boxShadow: '0 8px 18px rgba(44, 90, 160, 0.26)',
      ...fontStyle
    },
    resultBox: {
      marginTop: '18px',
      border: '1px solid #d9ecff',
      background: 'linear-gradient(135deg, #eff8ff 0%, #f9fcff 100%)',
      borderRadius: '14px',
      padding: isMobile ? '14px' : '18px'
    },
    h3: {
      fontSize: '1.08rem',
      color: '#1e3d6f',
      fontWeight: 700,
      marginBottom: '8px',
      ...fontStyle
    },
    resultText: {
      fontSize: isMobile ? '1.02rem' : '1.12rem',
      lineHeight: 1.5,
      marginBottom: '8px',
      ...fontStyle
    },
    statusText: {
      marginTop: '12px',
      color: '#475569',
      ...fontStyle
    },
    errorText: {
      marginTop: '12px',
      color: '#b42318',
      ...fontStyle
    },
    section: {
      maxWidth: '1180px',
      marginInline: 'auto',
      padding: isMobile ? '24px 16px 0' : '34px 20px 0'
    },
    popularGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(190px, 1fr))',
      gap: '14px'
    },
    popularCard: {
      border: '1px solid #e2eaf7',
      background: 'white',
      borderRadius: '14px',
      padding: '16px',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 5px 16px rgba(15, 23, 42, 0.06)',
      ...fontStyle
    },
    cardTitle: {
      marginBottom: '8px',
      fontWeight: 700,
      fontSize: '1rem',
      color: '#1a1a1a',
      ...fontStyle
    },
    cardValue: {
      color: '#475569',
      lineHeight: 1.55,
      ...fontStyle
    },
    contentBox: {
      background: 'white',
      border: '1px solid #e5edf8',
      borderRadius: '18px',
      padding: isMobile ? '18px' : '24px',
      boxShadow: '0 8px 22px rgba(44, 90, 160, 0.08)'
    },
    paragraph: {
      color: '#475569',
      lineHeight: 1.78,
      marginBottom: '12px',
      ...fontStyle
    },
    link: {
      color: '#2c5aa0',
      fontWeight: 700,
      textDecoration: 'none',
      ...fontStyle
    },
    faqItem: {
      background: 'white',
      border: '1px solid #e2eaf7',
      borderRadius: '14px',
      padding: isMobile ? '14px' : '16px',
      marginBottom: '12px',
      boxShadow: '0 4px 14px rgba(15, 23, 42, 0.05)'
    },
    footerSpace: {
      height: '42px'
    }
  };

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 760);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = getOrCreateMeta('description');
    const previousDescription = metaDescription.getAttribute('content') || '';

    document.title = seoTitle;
    metaDescription.setAttribute('content', seoDescription);
    setCanonical(canonicalUrl);

    const webPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Currency Converter - Singapore Dollar (SGD)',
      description: seoDescription,
      url: canonicalUrl,
      inLanguage: 'en-SG',
      publisher: {
        '@type': 'Organization',
        name: 'AZ Holidays Singapore',
        url: 'https://azholidays.com.sg'
      }
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    };

    const webPageScript = document.createElement('script');
    webPageScript.type = 'application/ld+json';
    webPageScript.text = JSON.stringify(webPageSchema);
    document.head.appendChild(webPageScript);

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    return () => {
      document.title = previousTitle;
      metaDescription.setAttribute('content', previousDescription);
      webPageScript.remove();
      faqScript.remove();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadRates = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await currencyAPI.getLatestRates('SGD');
        if (!isMounted) {
          return;
        }

        const nextCurrencies = Object.keys(data.rates).sort();
        setRates(data.rates);
        setCurrencies(nextCurrencies);
        setLastUpdated(data.lastUpdated || '');
      } catch (fetchError) {
        if (!isMounted) {
          return;
        }

        setError(fetchError.message || 'Something went wrong while loading rates.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadRates();

    return () => {
      isMounted = false;
    };
  }, []);

  const parsedAmount = useMemo(() => {
    const numericAmount = Number(amount);
    return Number.isFinite(numericAmount) && numericAmount >= 0 ? numericAmount : 0;
  }, [amount]);

  const calculateConversion = () => {
    if (!rates[fromCurrency] || !rates[toCurrency]) {
      return;
    }

    const amountInSgd = parsedAmount / rates[fromCurrency];
    const finalValue = amountInSgd * rates[toCurrency];
    setConvertedValue(finalValue);
  };

  useEffect(() => {
    if (!loading && !error && currencies.length > 0) {
      calculateConversion();
    }
  }, [amount, fromCurrency, toCurrency, rates, loading, error, currencies.length]);

  return (
    <main style={styles.page}>
      <style>
        {`
          .currency-hover-card:hover {
            transform: translateY(-4px);
            border-color: #2c5aa0;
          }
          .currency-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(44, 90, 160, 0.34);
          }
          .currency-link:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <section style={styles.heroSection}>
        <div style={styles.container}>
          <div style={styles.heroCard}>
            <h1 style={styles.h1}>Currency Converter - Singapore Dollar (SGD)</h1>
            <p style={styles.heroText}>
            Check SGD to USD, SGD to INR, SGD to MYR and more with live market references from
            ExchangeRate API.
            </p>
          </div>
        </div>
      </section>

      <section style={styles.converterSection}>
        <article style={styles.converterCard} aria-label="Currency converter tool">
          <h2 style={styles.h2}>Convert SGD to USD, INR, MYR and more</h2>

          <div style={styles.fieldGrid}>
            <div style={styles.fieldWrap}>
              <label htmlFor="amount" style={styles.label}>
                Amount
              </label>
              <input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Enter amount"
                style={styles.input}
              />
            </div>

            <div style={styles.fieldWrap}>
              <label htmlFor="from-currency" style={styles.label}>
                From
              </label>
              <select
                id="from-currency"
                value={fromCurrency}
                onChange={(event) => setFromCurrency(event.target.value)}
                style={styles.input}
              >
                {currencies.map((currency) => (
                  <option key={`from-${currency}`} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.fieldWrap}>
              <label htmlFor="to-currency" style={styles.label}>
                To
              </label>
              <select
                id="to-currency"
                value={toCurrency}
                onChange={(event) => setToCurrency(event.target.value)}
                style={styles.input}
              >
                {currencies.map((currency) => (
                  <option key={`to-${currency}`} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={calculateConversion}
            disabled={loading || Boolean(error)}
            className="currency-btn"
            style={{
              ...styles.convertButton,
              marginTop: '14px',
              opacity: loading || Boolean(error) ? 0.7 : 1,
              cursor: loading || Boolean(error) ? 'not-allowed' : 'pointer'
            }}
          >
            Convert
          </button>

          {loading && <p style={styles.statusText}>Loading live exchange rates...</p>}
          {error && <p style={styles.errorText}>{error}</p>}

          {!loading && !error && convertedValue !== null && (
            <div style={styles.resultBox} role="status" aria-live="polite">
              <h3 style={styles.h3}>Real-time conversion result</h3>
              <p style={styles.resultText}>
                {formatCurrency(parsedAmount, fromCurrency)} ={' '}
                <strong>{formatCurrency(convertedValue, toCurrency)}</strong>
              </p>
              {lastUpdated && <span style={{ color: '#475569', ...fontStyle }}>Rates updated: {lastUpdated}</span>}
            </div>
          )}
        </article>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>Popular Singapore Dollar conversions</h2>
        <div style={styles.popularGrid}>
          {POPULAR_PAIRS.map((pair) => {
            const pairRate = rates[pair.to];
            const hasRate = typeof pairRate === 'number';

            return (
              <button
                type="button"
                className="currency-hover-card"
                key={`${pair.from}-${pair.to}`}
                onClick={() => {
                  setFromCurrency(pair.from);
                  setToCurrency(pair.to);
                }}
                style={styles.popularCard}
              >
                <h3 style={styles.cardTitle}>
                  {pair.from} to {pair.to}
                </h3>
                <p style={styles.cardValue}>
                  {hasRate ? `1 ${pair.from} = ${pairRate.toFixed(4)} ${pair.to}` : 'Rate unavailable'}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.contentBox}>
          <h2 style={styles.h2}>Why use our currency converter?</h2>
          <p style={styles.paragraph}>
          Currency conversion helps travelers make smarter decisions before and during a trip. When
          you know how much your Singapore dollars are worth in another destination, it becomes
          easier to compare hotel prices, transport costs, and daily expenses. A quick check from
          SGD to USD, SGD to INR, or SGD to MYR gives you a better picture of your real budget
          before you confirm flights or activities.
          </p>
          <p style={styles.paragraph}>
          At AZ Holidays Singapore, we built this converter to be simple, fast, and practical.
          Instead of opening multiple tabs, you can calculate values in seconds and adjust your
          plans immediately. Travelers often use this page while reviewing itineraries on
          <a href="https://azholidays.com.sg" target="_blank" rel="noreferrer" className="currency-link" style={styles.link}>
            {' '}
            azholidays.com.sg
          </a>
          , checking destination deals, or estimating shopping budgets for family trips.
          </p>

          <h2 style={styles.h2}>Travel tips when converting currency in Singapore</h2>
          <h3 style={styles.h3}>Plan your daily spend before departure</h3>
          <p style={styles.paragraph}>
          Start with core categories such as accommodation, food, transport, and attractions.
          Convert each category from the destination currency back to SGD to understand your total
          outlay. This approach keeps your travel plan realistic and helps avoid overspending.
          </p>
          <h3 style={styles.h3}>Compare market rates with final payment rates</h3>
          <p style={styles.paragraph}>
          Live exchange rates are a strong reference, but banks, card issuers, and money changers
          may apply spreads or service fees. Use this converter as your benchmark, then compare that
          figure with your actual payment channel to get the best value.
          </p>
          <h3 style={styles.h3}>Track rates for high-value bookings</h3>
          <p style={styles.paragraph}>
          If you are paying for flights or hotel stays in foreign currency, monitor rates over a few
          days before booking. Small changes in exchange rates can make a noticeable difference on
          larger transactions, especially for long holidays.
          </p>
          <p style={{ ...styles.paragraph, marginBottom: 0 }}>
          Explore more travel planning resources and package ideas at
          <a
            href="https://azholidays.com.sg/destinations"
            target="_blank"
            rel="noreferrer"
            className="currency-link"
            style={styles.link}
          >
            {' '}
            AZ Holidays destinations
          </a>
          , and contact our team at
          <a
            href="https://azholidays.com.sg/contact"
            target="_blank"
            rel="noreferrer"
            className="currency-link"
            style={styles.link}
          >
            {' '}
            AZ Holidays contact
          </a>
          {' '}
          for trip advice from Singapore.
          </p>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>Frequently asked questions</h2>
        {FAQ_ITEMS.map((item) => (
          <article key={item.question} style={styles.faqItem}>
            <h3 style={styles.h3}>{item.question}</h3>
            <p style={{ ...styles.paragraph, marginBottom: 0 }}>{item.answer}</p>
          </article>
        ))}
      </section>

      <div style={styles.footerSpace} />
    </main>
  );
};

export default CurrencyConverter;
