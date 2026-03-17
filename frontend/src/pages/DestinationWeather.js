import React, { useEffect, useMemo, useState } from 'react';
import { weatherAPI } from '../api/weather';

const CITY_OPTIONS = [
  // Asia Pacific
  { label: 'Singapore', query: 'Singapore,SG' },
  { label: 'Tokyo, Japan', query: 'Tokyo,JP' },
  { label: 'Osaka, Japan', query: 'Osaka,JP' },
  { label: 'Seoul, South Korea', query: 'Seoul,KR' },
  { label: 'Bangkok, Thailand', query: 'Bangkok,TH' },
  { label: 'Phuket, Thailand', query: 'Phuket,TH' },
  { label: 'Bali, Indonesia', query: 'Denpasar,ID' },
  { label: 'Jakarta, Indonesia', query: 'Jakarta,ID' },
  { label: 'Kuala Lumpur, Malaysia', query: 'Kuala Lumpur,MY' },
  { label: 'Penang, Malaysia', query: 'George Town,MY' },
  { label: 'Taipei, Taiwan', query: 'Taipei,TW' },
  { label: 'Hong Kong', query: 'Hong Kong,HK' },
  { label: 'Ho Chi Minh City, Vietnam', query: 'Ho Chi Minh City,VN' },
  { label: 'Hanoi, Vietnam', query: 'Hanoi,VN' },
  { label: 'Manila, Philippines', query: 'Manila,PH' },
  { label: 'Colombo, Sri Lanka', query: 'Colombo,LK' },
  { label: 'Maldives', query: 'Male,MV' },
  { label: 'Mumbai, India', query: 'Mumbai,IN' },
  { label: 'New Delhi, India', query: 'New Delhi,IN' },
  { label: 'Sydney, Australia', query: 'Sydney,AU' },
  { label: 'Melbourne, Australia', query: 'Melbourne,AU' },
  // Middle East
  { label: 'Dubai, UAE', query: 'Dubai,AE' },
  { label: 'Abu Dhabi, UAE', query: 'Abu Dhabi,AE' },
  { label: 'Doha, Qatar', query: 'Doha,QA' },
  { label: 'Istanbul, Turkey', query: 'Istanbul,TR' },
  // Europe
  { label: 'London, United Kingdom', query: 'London,GB' },
  { label: 'Paris, France', query: 'Paris,FR' },
  { label: 'Rome, Italy', query: 'Rome,IT' },
  { label: 'Barcelona, Spain', query: 'Barcelona,ES' },
  { label: 'Amsterdam, Netherlands', query: 'Amsterdam,NL' },
  { label: 'Zurich, Switzerland', query: 'Zurich,CH' },
  { label: 'Vienna, Austria', query: 'Vienna,AT' },
  { label: 'Prague, Czech Republic', query: 'Prague,CZ' },
  { label: 'Athens, Greece', query: 'Athens,GR' },
  // Americas & Africa
  { label: 'New York, USA', query: 'New York,US' },
  { label: 'Cancun, Mexico', query: 'Cancun,MX' },
  { label: 'Cape Town, South Africa', query: 'Cape Town,ZA' }
];

const FAQ_ITEMS = [
  {
    question: 'Can I check weather before booking a trip?',
    answer:
      'Yes. Comparing destination weather before booking flights or hotels helps you choose better months, avoid heavy rain periods, and prepare for peak travel demand.'
  },
  {
    question: 'Why should travelers check a 5 day forecast?',
    answer:
      'A short forecast gives a practical view of temperature, rain chances, and overall conditions for arrivals, tours, airport transfers, and day trips.'
  }
];

const formatForecastDay = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' });
};

const formatClockTime = (timestamp, timezoneOffsetSeconds = 0) => {
  if (!timestamp) return 'Unavailable';
  return new Date((timestamp + timezoneOffsetSeconds) * 1000).toLocaleTimeString('en-SG', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  });
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

const DestinationWeather = () => {
  const [selectedCity, setSelectedCity] = useState(CITY_OPTIONS[0].query);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [locationMeta, setLocationMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const pageTitle = 'Destination Weather Forecast | Travel Weather Tool | AZ Holidays Singapore';
  const pageDescription =
    'Check destination weather before you travel. Compare temperature, humidity, weather conditions and a 5 day forecast for Tokyo, Seoul, Bangkok, Bali, Maldives, Paris and more.';
  const canonicalUrl = 'https://azholidays.com.sg/destination-weather';

  const selectedCityLabel = useMemo(() => {
    const match = CITY_OPTIONS.find((item) => item.query === selectedCity);
    return match ? match.label : selectedCity;
  }, [selectedCity]);

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = getOrCreateMeta('description');
    const previousDescription = descriptionTag.getAttribute('content') || '';

    document.title = pageTitle;
    descriptionTag.setAttribute('content', pageDescription);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

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

    const webPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Destination Weather Forecast',
      description: pageDescription,
      url: canonicalUrl,
      inLanguage: 'en-SG'
    };

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    const webPageScript = document.createElement('script');
    webPageScript.type = 'application/ld+json';
    webPageScript.text = JSON.stringify(webPageSchema);
    document.head.appendChild(webPageScript);

    return () => {
      document.title = previousTitle;
      descriptionTag.setAttribute('content', previousDescription);
      faqScript.remove();
      webPageScript.remove();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchWeather = async () => {
      setLoading(true);
      setError('');

      try {
        const { weatherData, forecastData } = await weatherAPI.getCityWeather(selectedCity, 'metric');

        if (!isMounted) {
          return;
        }

        const dailyMap = {};
        (forecastData.list || []).forEach((item) => {
          const day = new Date(item.dt * 1000).toISOString().split('T')[0];
          if (!dailyMap[day]) {
            dailyMap[day] = { temps: [], items: [] };
          }
          dailyMap[day].temps.push(item.main.temp);
          dailyMap[day].items.push(item);
        });

        const dailyForecast = Object.entries(dailyMap)
          .slice(0, 5)
          .map(([, data]) => {
            const midItem = data.items[Math.floor(data.items.length / 2)];
            return {
              id: midItem.dt,
              dateLabel: formatForecastDay(midItem.dt),
              temperature: Math.round(midItem.main.temp),
              minTemperature: Math.round(Math.min(...data.temps)),
              maxTemperature: Math.round(Math.max(...data.temps)),
              description: midItem.weather[0]?.description || 'No forecast',
              humidity: midItem.main.humidity,
              precipitationChance: Math.round((midItem.pop || 0) * 100)
            };
          });

        setCurrentWeather(weatherData);
        setForecast(dailyForecast);
        setLocationMeta({
          resolvedName: weatherData?.sys?.country
            ? `${weatherData.name}, ${weatherData.sys.country}`
            : weatherData?.name || selectedCityLabel,
          timezone: weatherData?.timezone || 0
        });
      } catch (fetchError) {
        if (!isMounted) {
          return;
        }
        setError(fetchError.message || 'Weather data is unavailable right now.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, [selectedCity]);

  const fontStyle = { fontFamily: "'Poppins', sans-serif" };

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f7fbff 0%, #eef5ff 55%, #ffffff 100%)',
      color: '#1a1a1a',
      padding: '104px 16px 40px',
      ...fontStyle
    },
    container: {
      maxWidth: '1140px',
      marginInline: 'auto'
    },
    hero: {
      background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)',
      borderRadius: '22px',
      padding: '32px 22px',
      boxShadow: '0 18px 40px rgba(30, 61, 111, 0.3)',
      color: '#fff',
      textAlign: 'center',
      marginBottom: '22px'
    },
    h1: {
      fontSize: 'clamp(1.8rem, 4vw, 2.9rem)',
      fontWeight: 800,
      lineHeight: 1.2,
      marginBottom: '10px',
      ...fontStyle
    },
    lead: {
      maxWidth: '860px',
      marginInline: 'auto',
      lineHeight: 1.75,
      fontSize: '1rem',
      opacity: 0.96,
      ...fontStyle
    },
    section: {
      background: '#fff',
      border: '1px solid #e3ecf8',
      borderRadius: '18px',
      boxShadow: '0 8px 28px rgba(15, 23, 42, 0.08)',
      padding: '20px',
      marginBottom: '20px'
    },
    h2: {
      fontSize: 'clamp(1.25rem, 2.5vw, 1.9rem)',
      fontWeight: 700,
      marginBottom: '12px',
      color: '#1a1a1a',
      ...fontStyle
    },
    h3: {
      fontSize: '1rem',
      fontWeight: 700,
      marginBottom: '8px',
      color: '#1e3d6f',
      ...fontStyle
    },
    p: {
      lineHeight: 1.8,
      color: '#4b5e73',
      marginBottom: '12px',
      ...fontStyle
    },
    plannerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '16px',
      alignItems: 'start'
    },
    plannerCard: {
      background: '#f8fbff',
      border: '1px solid #dce9fb',
      borderRadius: '14px',
      padding: '14px'
    },
    label: {
      display: 'block',
      color: '#2c5aa0',
      fontWeight: 600,
      marginBottom: '8px',
      ...fontStyle
    },
    select: {
      width: '100%',
      minHeight: '48px',
      border: '1.5px solid #d4e2f5',
      borderRadius: '10px',
      background: '#fff',
      padding: '0 12px',
      fontSize: '1rem',
      outline: 'none',
      ...fontStyle
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
      gap: '10px',
      marginTop: '14px'
    },
    infoCard: {
      border: '1px solid #deebfb',
      borderRadius: '12px',
      background: '#fff',
      padding: '12px'
    },
    infoLabel: {
      color: '#1e3d6f',
      fontSize: '0.88rem',
      fontWeight: 700,
      marginBottom: '6px',
      ...fontStyle
    },
    infoValue: {
      color: '#46576b',
      lineHeight: 1.6,
      ...fontStyle
    },
    forecastGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: '10px',
      marginTop: '14px'
    },
    forecastCard: {
      background: 'linear-gradient(135deg, #eef7ff 0%, #ffffff 100%)',
      border: '1px solid #dce8f8',
      borderRadius: '12px',
      padding: '12px'
    },
    alertCard: {
      background: '#fff6f6',
      border: '1px solid #f6d0d0',
      borderRadius: '12px',
      padding: '12px',
      marginTop: '10px'
    },
    statusText: {
      color: '#516378',
      marginTop: '12px',
      ...fontStyle
    },
    errorText: {
      color: '#b42318',
      marginTop: '12px',
      ...fontStyle
    },
    link: {
      color: '#2c5aa0',
      fontWeight: 700,
      textDecoration: 'none',
      ...fontStyle
    },
    linkGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '10px',
      marginTop: '12px'
    },
    linkCard: {
      background: '#f7fbff',
      border: '1px solid #dce8f8',
      borderRadius: '10px',
      padding: '10px 12px'
    },
    faqItem: {
      border: '1px solid #e1e9f7',
      borderRadius: '12px',
      padding: '12px 14px',
      background: '#fff',
      marginBottom: '10px'
    }
  };

  return (
    <main style={styles.page}>
      <style>
        {`
          .destination-weather-link:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div style={styles.container}>
        <section style={styles.hero}>
          <h1 style={styles.h1}>Destination Weather Forecast</h1>
          <p style={styles.lead}>
            Check live travel weather before you book. Compare temperature, humidity, sky conditions,
            and the next 5 days for popular destinations such as Tokyo, Seoul, Bangkok, Bali, Maldives,
            Paris, London, Dubai, and more.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Check Weather Before You Travel</h2>
          <p style={styles.p}>
            Travelers search destination weather before booking flights, hotels, and tours because weather shapes
            the entire trip experience. A clear week in Tokyo feels very different from a rainy week in Tokyo, even
            in the same month. This tool helps you compare current weather and short-term forecast data for popular
            destinations from Singapore.
          </p>

          <div style={{ maxWidth: '360px', marginBottom: '16px' }}>
            <label htmlFor="destination-weather-city" style={styles.label}>
              Select city
            </label>
            <select
              id="destination-weather-city"
              value={selectedCity}
              onChange={(event) => setSelectedCity(event.target.value)}
              style={styles.select}
            >
              {CITY_OPTIONS.map((city) => (
                <option key={city.query} value={city.query}>
                  {city.label}
                </option>
              ))}
            </select>
            {loading && <p style={styles.statusText}>Loading live weather data...</p>}
            {error && <p style={styles.errorText}>{error}</p>}
          </div>

          {currentWeather && !error && (
            <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(110px, 1fr))', gap: '10px', minWidth: '700px' }}>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>City</div>
                  <div style={styles.infoValue}>{locationMeta?.resolvedName || selectedCityLabel}</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Temperature</div>
                  <div style={styles.infoValue}>{Math.round(currentWeather.main.temp)}°C</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Weather</div>
                  <div style={styles.infoValue}>{currentWeather.weather[0]?.description || 'Unavailable'}</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Humidity</div>
                  <div style={styles.infoValue}>{currentWeather.main.humidity}%</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Feels like</div>
                  <div style={styles.infoValue}>{Math.round(currentWeather.main.feels_like)}°C</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Wind speed</div>
                  <div style={styles.infoValue}>{currentWeather.wind?.speed || 0} m/s</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Sunrise</div>
                  <div style={styles.infoValue}>{formatClockTime(currentWeather.sys.sunrise, currentWeather.timezone)}</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Sunset</div>
                  <div style={styles.infoValue}>{formatClockTime(currentWeather.sys.sunset, currentWeather.timezone)}</div>
                </div>
              </div>
            </div>
          )}

          <h3 style={styles.h3}>5 day travel outlook</h3>
          <p style={styles.p}>
            Use the daily forecast to judge arrival conditions, airport transfer comfort, walking weather,
            and whether you need umbrellas, light layers, or hot-weather planning.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(150px, 1fr))', gap: '10px', minWidth: '600px' }}>
              {forecast.map((item) => (
                <div key={item.id} style={styles.forecastCard}>
                  <div style={styles.infoLabel}>{item.dateLabel}</div>
                  <div style={{ ...styles.infoValue, fontWeight: 700 }}>{item.temperature}°C</div>
                  <div style={styles.infoValue}>Min {item.minTemperature}°C / Max {item.maxTemperature}°C</div>
                  <div style={styles.infoValue}>{item.description}</div>
                  <div style={{ ...styles.infoValue, marginTop: '4px' }}>Humidity: {item.humidity}%</div>
                  <div style={styles.infoValue}>Rain chance: {item.precipitationChance}%</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Why Destination Weather Matters for Travel Planning</h2>
          <p style={styles.p}>
            Weather affects nearly every travel decision, from what you pack to which neighborhood you stay in.
            It also affects sightseeing pace, transport convenience, photo quality, and even whether outdoor tours
            are worth booking. Travelers going to Japan, Korea, Thailand, Bali, Maldives, or Europe often search
            destination weather because weather is the most immediate signal of trip comfort.
          </p>
          <p style={styles.p}>
            Short-term forecasts are especially useful after you have already selected your destination and travel
            month. A best-time-to-visit guide tells you the general season. A live weather tool tells you what the
            next few days actually look like right now. Together, those two signals help travelers plan better.
            If a tropical city is currently facing storms or high humidity, you may want indoor attractions,
            flexible schedules, or alternate transport plans.
          </p>
          <p style={styles.p}>
            Weather also affects pricing indirectly. Good weather periods often overlap with peak season, which means
            more expensive hotel nights and flights. Poorer weather may mean lower prices but more disruption risk.
            Smart travelers compare live weather, seasonal best months, and budget tools together. That is why this
            page fits naturally with{' '}
            <a href="https://azholidays.com.sg/best-time-to-visit" target="_blank" rel="noreferrer" className="destination-weather-link" style={styles.link}>Best Time To Visit</a>{' '}
            and the{' '}
            <a href="https://azholidays.com.sg/currency-converter" target="_blank" rel="noreferrer" className="destination-weather-link" style={styles.link}>Currency Converter</a>{' '}
            on AZ Holidays Singapore.
          </p>
          <p style={styles.p}>
            For broader planning, explore{' '}
            <a href="https://azholidays.com.sg/packages" target="_blank" rel="noreferrer" className="destination-weather-link" style={styles.link}>Travel Packages</a>,{' '}
            compare{' '}
            <a href="https://azholidays.com.sg/flights" target="_blank" rel="noreferrer" className="destination-weather-link" style={styles.link}>Flights</a>,{' '}
            review hotel options on{' '}
            <a href="https://azholidays.com.sg/hotels" target="_blank" rel="noreferrer" className="destination-weather-link" style={styles.link}>Hotels</a>,{' '}
            and browse more planning content at{' '}
            <a href="https://azholidays.com.sg/blogs" target="_blank" rel="noreferrer" className="destination-weather-link" style={styles.link}>Travel Blog</a>{' '}
            and{' '}
            <a href="https://azholidays.com.sg" target="_blank" rel="noreferrer" className="destination-weather-link" style={styles.link}>AZ Holidays Singapore</a>.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Related Travel Tools</h2>
          <div style={styles.linkGrid}>
            <div style={styles.linkCard}>
              <a href="https://azholidays.com.sg/currency-converter" target="_blank" rel="noreferrer" className="destination-weather-link" style={styles.link}>
                Currency Converter
              </a>
            </div>
            <div style={styles.linkCard}>
              <a href="https://azholidays.com.sg/best-time-to-visit" target="_blank" rel="noreferrer" className="destination-weather-link" style={styles.link}>
                Best Time To Visit
              </a>
            </div>
            <div style={styles.linkCard}>
              <a href="https://azholidays.com.sg/contact" target="_blank" rel="noreferrer" className="destination-weather-link" style={styles.link}>
                Contact AZ Holidays
              </a>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Frequently Asked Questions</h2>
          {FAQ_ITEMS.map((item) => (
            <article key={item.question} style={styles.faqItem}>
              <h3 style={styles.h3}>{item.question}</h3>
              <p style={{ ...styles.p, marginBottom: 0 }}>{item.answer}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default DestinationWeather;
