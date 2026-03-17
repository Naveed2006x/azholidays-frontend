import React, { useEffect, useMemo, useState } from 'react';

const DESTINATION_DATA = [
  {
    name: 'Japan',
    region: 'Asia',
    externalGuide: 'https://www.japan.travel/en/',
    bestMonths: 'March to May, October to November',
    whyGood: 'Spring cherry blossoms and crisp autumn colors offer comfortable sightseeing weather and beautiful scenery.',
    weatherOverview: 'Four distinct seasons with mild spring/autumn, humid summer, and cold winter in many regions.',
    peakSeason: 'Late March to April, October to November',
    lowSeason: 'January to February, June',
    monthsToAvoid: 'Late June to September (rainy, humid, and typhoon risk)'
  },
  {
    name: 'South Korea',
    region: 'Asia',
    externalGuide: 'https://english.visitkorea.or.kr',
    bestMonths: 'April to June, September to October',
    whyGood: 'Pleasant temperatures make city walks, cherry blossoms, and fall foliage trips very comfortable.',
    weatherOverview: 'Cold winters, hot humid summers, and mild spring/autumn shoulder seasons.',
    peakSeason: 'April, May, October',
    lowSeason: 'January to February',
    monthsToAvoid: 'July to August (heat, humidity, and monsoon rain)'
  },
  {
    name: 'Thailand',
    region: 'Asia',
    externalGuide: 'https://www.tourismthailand.org',
    bestMonths: 'November to February',
    whyGood: 'Cooler dry-season weather is ideal for beaches, temples, and island hopping.',
    weatherOverview: 'Tropical climate with dry, hot, and rainy monsoon periods varying by region.',
    peakSeason: 'December to January',
    lowSeason: 'May to October',
    monthsToAvoid: 'September to October (heavy rain in many areas)'
  },
  {
    name: 'Vietnam',
    region: 'Asia',
    externalGuide: 'https://vietnam.travel',
    bestMonths: 'February to April, August to October',
    whyGood: 'Balanced weather windows with lower humidity and better conditions across multiple regions.',
    weatherOverview: 'North, central, and south zones have different rainfall and temperature patterns.',
    peakSeason: 'December to April',
    lowSeason: 'May to September',
    monthsToAvoid: 'July to September in typhoon-prone coastal zones'
  },
  {
    name: 'Indonesia (Bali)',
    region: 'Asia',
    externalGuide: 'https://www.indonesia.travel/gb/en/home',
    bestMonths: 'April to October',
    whyGood: 'Dry season brings sunny beach days, outdoor tours, and clearer visibility for activities.',
    weatherOverview: 'Warm tropical weather year-round with wet and dry seasons.',
    peakSeason: 'July to August, December',
    lowSeason: 'January to March',
    monthsToAvoid: 'January to February (heavier rain and humidity)'
  },
  {
    name: 'Malaysia',
    region: 'Asia',
    externalGuide: 'https://www.malaysia.travel',
    bestMonths: 'December to February (west coast), March to October (east coast)',
    whyGood: 'Selecting by coast helps you enjoy beaches and islands with less rain.',
    weatherOverview: 'Equatorial weather with year-round warmth and two monsoon patterns by coast.',
    peakSeason: 'School holidays and festive months',
    lowSeason: 'Inter-monsoon periods',
    monthsToAvoid: 'November to January for east coast beach trips'
  },
  {
    name: 'Singapore',
    region: 'Asia',
    externalGuide: 'https://www.visitsingapore.com',
    bestMonths: 'February to April',
    whyGood: 'Slightly lower rainfall supports city tours, attractions, and food exploration comfortably.',
    weatherOverview: 'Warm and humid all year with brief tropical showers.',
    peakSeason: 'June, November to December',
    lowSeason: 'Late January to March',
    monthsToAvoid: 'November to January if you want fewer rain interruptions'
  },
  {
    name: 'China',
    region: 'Asia',
    externalGuide: 'https://www.travelchinaguide.com',
    bestMonths: 'April to May, September to October',
    whyGood: 'Moderate weather is ideal for major cities, cultural sites, and scenic regions.',
    weatherOverview: 'Large country with wide climate variation from cold north to subtropical south.',
    peakSeason: 'Golden Week periods, spring/autumn holidays',
    lowSeason: 'Winter months outside ski regions',
    monthsToAvoid: 'Late June to August in very hot or wet regions'
  },
  {
    name: 'Taiwan',
    region: 'Asia',
    externalGuide: 'https://eng.taiwan.net.tw',
    bestMonths: 'October to April',
    whyGood: 'Cooler weather supports night markets, hiking, and city breaks with less discomfort.',
    weatherOverview: 'Humid subtropical climate with hot summers and typhoon season.',
    peakSeason: 'October to December, Lunar New Year',
    lowSeason: 'June to August',
    monthsToAvoid: 'July to September (heat and typhoon risk)'
  },
  {
    name: 'Hong Kong',
    region: 'Asia',
    externalGuide: 'https://www.discoverhongkong.com',
    bestMonths: 'October to December, March to April',
    whyGood: 'Comfortable temperatures and lower humidity are excellent for urban sightseeing.',
    weatherOverview: 'Subtropical climate with humid summers and mild winters.',
    peakSeason: 'October to December',
    lowSeason: 'May to September',
    monthsToAvoid: 'July to September (typhoons and high humidity)'
  },
  {
    name: 'Maldives',
    region: 'Indian Ocean',
    externalGuide: 'https://visitmaldives.com',
    bestMonths: 'November to April',
    whyGood: 'Dry season gives calm seas, sunshine, and strong visibility for snorkeling and diving.',
    weatherOverview: 'Tropical island weather with clear wet and dry monsoon influences.',
    peakSeason: 'December to March',
    lowSeason: 'May to October',
    monthsToAvoid: 'June to August (rain and rougher seas)'
  },
  {
    name: 'Australia',
    region: 'Oceania',
    externalGuide: 'https://www.australia.com',
    bestMonths: 'September to November, March to May',
    whyGood: 'Spring and autumn provide comfortable weather across multiple states and cities.',
    weatherOverview: 'Reverse seasons from Singapore; climate differs by region and latitude.',
    peakSeason: 'December to January',
    lowSeason: 'May to August (varies by destination)',
    monthsToAvoid: 'High summer in some inland regions due to extreme heat'
  },
  {
    name: 'New Zealand',
    region: 'Oceania',
    externalGuide: 'https://www.newzealand.com',
    bestMonths: 'November to April',
    whyGood: 'Long daylight and milder weather are ideal for road trips and outdoor adventure.',
    weatherOverview: 'Temperate climate with cool winters and changeable weather patterns.',
    peakSeason: 'December to February',
    lowSeason: 'June to August',
    monthsToAvoid: 'June to August unless planning winter sports'
  },
  {
    name: 'France',
    region: 'Europe',
    externalGuide: 'https://www.france.fr/en',
    bestMonths: 'April to June, September to October',
    whyGood: 'Pleasant weather with fewer crowds than high summer in many regions.',
    weatherOverview: 'Temperate climate with warm summers and cold winters in inland regions.',
    peakSeason: 'July to August',
    lowSeason: 'November to March',
    monthsToAvoid: 'Late July to August if you prefer lighter crowds and lower prices'
  },
  {
    name: 'Italy',
    region: 'Europe',
    externalGuide: 'https://www.italia.it/en',
    bestMonths: 'April to June, September to October',
    whyGood: 'Shoulder months provide excellent sightseeing weather and manageable crowd levels.',
    weatherOverview: 'Mediterranean climate with hot summers and mild to cool winters.',
    peakSeason: 'June to August',
    lowSeason: 'November to March',
    monthsToAvoid: 'July to August (heat and crowds in major cities)'
  },
  {
    name: 'Switzerland',
    region: 'Europe',
    externalGuide: 'https://www.myswitzerland.com/en-sg/',
    bestMonths: 'May to October, December to February',
    whyGood: 'Summer suits scenic rail trips while winter is ideal for snow sports.',
    weatherOverview: 'Alpine climate varies strongly by altitude and region.',
    peakSeason: 'July to August, late December to February',
    lowSeason: 'April and November',
    monthsToAvoid: 'November for mixed weather and many shoulder closures'
  },
  {
    name: 'United Kingdom',
    region: 'Europe',
    externalGuide: 'https://www.visitbritain.com',
    bestMonths: 'May to September',
    whyGood: 'Longer daylight and milder temperatures improve city touring and countryside trips.',
    weatherOverview: 'Temperate maritime climate with frequent rain possible year-round.',
    peakSeason: 'June to August',
    lowSeason: 'January to March',
    monthsToAvoid: 'December to February for colder and shorter days'
  },
  {
    name: 'Turkey',
    region: 'Europe / Middle East',
    externalGuide: 'https://goturkiye.com',
    bestMonths: 'April to June, September to October',
    whyGood: 'Comfortable weather for Istanbul, Cappadocia, and coastal regions without peak heat.',
    weatherOverview: 'Mixed Mediterranean and continental climates depending on region.',
    peakSeason: 'July to August',
    lowSeason: 'November to March',
    monthsToAvoid: 'July to August in inland areas due to heat'
  },
  {
    name: 'Dubai (UAE)',
    region: 'Middle East',
    externalGuide: 'https://www.visitdubai.com',
    bestMonths: 'November to March',
    whyGood: 'Cooler desert temperatures are perfect for city tours, beaches, and desert safaris.',
    weatherOverview: 'Desert climate with very hot summers and mild winters.',
    peakSeason: 'December to February',
    lowSeason: 'June to August',
    monthsToAvoid: 'June to September (extreme heat)'
  },
  {
    name: 'India',
    region: 'Asia',
    externalGuide: 'https://www.incredibleindia.gov.in',
    bestMonths: 'October to March',
    whyGood: 'Dry and cooler weather supports sightseeing across many popular regions.',
    weatherOverview: 'Large regional variation with monsoon, tropical, and mountain climates.',
    peakSeason: 'December to January',
    lowSeason: 'June to September in many regions',
    monthsToAvoid: 'July to September for monsoon-sensitive itineraries'
  },
  {
    name: 'Sri Lanka',
    region: 'Asia',
    externalGuide: 'https://www.srilanka.travel',
    bestMonths: 'December to April (south/west), May to September (east coast)',
    whyGood: 'Choosing coast by monsoon cycle helps maximize beach weather and activities.',
    weatherOverview: 'Tropical island climate with opposite seasonal patterns by coast.',
    peakSeason: 'December to March',
    lowSeason: 'Shoulder monsoon months',
    monthsToAvoid: 'May to July for south/west beach holidays'
  }
];

const INTERNAL_LINKS = [
  { label: 'AZ Holidays Home', href: 'https://azholidays.com.sg' },
  { label: 'Travel Packages', href: 'https://azholidays.com.sg/packages' },
  { label: 'Flights', href: 'https://azholidays.com.sg/flights' },
  { label: 'Hotels', href: 'https://azholidays.com.sg/hotels' },
  { label: 'Travel Blog', href: 'https://azholidays.com.sg/blogs' },
  { label: 'Currency Converter', href: 'https://azholidays.com.sg/currency-converter' },
  { label: 'Contact Us', href: 'https://azholidays.com.sg/contact' }
];

const FAQ_ITEMS = [
  {
    question: 'What is the best time to travel internationally?',
    answer:
      'For many destinations, shoulder seasons are best because weather is pleasant, crowds are manageable, and prices can be better than peak holiday periods.'
  },
  {
    question: 'How do I choose the best month to travel?',
    answer:
      'Start with your destination weather patterns, trip goals, school or work schedule, and budget. Then compare peak and low season trade-offs before booking.'
  },
  {
    question: 'Does weather affect travel prices?',
    answer:
      'Yes. High-demand months with better weather often have higher flight and hotel prices, while off-peak months can be significantly cheaper.'
  },
  {
    question: 'What is peak travel season?',
    answer:
      'Peak travel season is the period with highest demand, usually driven by favorable weather, school holidays, festivals, or major events.'
  }
];

const getOrCreateMeta = (name) => {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  return tag;
};

const BestTimeToVisit = () => {
  const [selectedDestination, setSelectedDestination] = useState('Japan');

  const pageTitle = 'Best Time To Visit Popular Destinations | Travel Planning Tool | AZ Holidays';
  const pageDescription =
    'Discover the best time to visit destinations around the world including Japan, Korea, Thailand, Bali and Europe. Use our travel planning tool to find the best months for your trip.';
  const canonicalUrl = 'https://azholidays.com.sg/best-time-to-visit';

  const selectedData = useMemo(
    () => DESTINATION_DATA.find((item) => item.name === selectedDestination),
    [selectedDestination]
  );

  const destinationByRegion = useMemo(() => {
    return DESTINATION_DATA.reduce((acc, item) => {
      const key = item.region;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  }, []);

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

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    return () => {
      document.title = previousTitle;
      descriptionTag.setAttribute('content', previousDescription);
      faqScript.remove();
    };
  }, []);

  const fontStyle = { fontFamily: "'Poppins', sans-serif" };

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f6f9ff 0%, #eef5ff 50%, #ffffff 100%)',
      color: '#1a1a1a',
      padding: '105px 16px 44px',
      ...fontStyle
    },
    container: {
      maxWidth: '1120px',
      marginInline: 'auto'
    },
    hero: {
      background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)',
      borderRadius: '20px',
      padding: '32px 22px',
      textAlign: 'center',
      boxShadow: '0 16px 38px rgba(30, 61, 111, 0.28)',
      color: '#fff',
      marginBottom: '20px'
    },
    h1: {
      fontSize: 'clamp(1.7rem, 4.2vw, 2.8rem)',
      fontWeight: 800,
      lineHeight: 1.2,
      marginBottom: '10px',
      ...fontStyle
    },
    lead: {
      fontSize: 'clamp(0.98rem, 2vw, 1.1rem)',
      lineHeight: 1.7,
      opacity: 0.96,
      maxWidth: '860px',
      marginInline: 'auto',
      ...fontStyle
    },
    heroSubLead: {
      marginTop: '12px',
      fontSize: '0.96rem',
      lineHeight: 1.7,
      opacity: 0.92,
      maxWidth: '900px',
      marginInline: 'auto',
      ...fontStyle
    },
    toolSection: {
      background: '#fff',
      border: '1px solid #e1e9f7',
      borderRadius: '18px',
      boxShadow: '0 8px 28px rgba(15, 23, 42, 0.08)',
      padding: '20px',
      marginBottom: '22px'
    },
    sectionLead: {
      color: '#516378',
      lineHeight: 1.75,
      marginTop: '-2px',
      marginBottom: '14px',
      ...fontStyle
    },
    plannerLayout: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
      gap: '16px',
      alignItems: 'start'
    },
    plannerMain: {
      background: '#f8fbff',
      border: '1px solid #dbe8fb',
      borderRadius: '14px',
      padding: '14px'
    },
    plannerAside: {
      background: '#ffffff',
      border: '1px solid #e4ecf8',
      borderRadius: '14px',
      padding: '14px'
    },
    smallH3: {
      color: '#1e3d6f',
      fontWeight: 700,
      fontSize: '0.98rem',
      marginBottom: '8px',
      ...fontStyle
    },
    h2: {
      fontSize: 'clamp(1.25rem, 2.5vw, 1.9rem)',
      fontWeight: 700,
      color: '#1a1a1a',
      marginBottom: '14px',
      ...fontStyle
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
      maxWidth: '420px',
      height: '48px',
      borderRadius: '10px',
      border: '1.5px solid #d6e2f5',
      background: '#f8fbff',
      padding: '0 12px',
      fontSize: '1rem',
      outline: 'none',
      ...fontStyle
    },
    dataGrid: {
      marginTop: '14px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '12px'
    },
    statCard: {
      background: '#f8fbff',
      border: '1px solid #dfebfb',
      borderRadius: '12px',
      padding: '14px'
    },
    statTitle: {
      color: '#1e3d6f',
      fontWeight: 700,
      marginBottom: '6px',
      fontSize: '0.95rem',
      ...fontStyle
    },
    statBody: {
      color: '#445469',
      lineHeight: 1.65,
      fontSize: '0.95rem',
      ...fontStyle
    },
    contentSection: {
      background: '#fff',
      border: '1px solid #e1e9f7',
      borderRadius: '18px',
      boxShadow: '0 8px 28px rgba(15, 23, 42, 0.08)',
      padding: '20px',
      marginBottom: '22px'
    },
    tableWrap: {
      overflowX: 'auto',
      borderRadius: '14px',
      border: '1px solid #e1e9f7'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '840px'
    },
    th: {
      textAlign: 'left',
      background: '#f5f9ff',
      color: '#1e3d6f',
      fontSize: '0.92rem',
      fontWeight: 700,
      padding: '10px 12px',
      borderBottom: '1px solid #e1e9f7',
      ...fontStyle
    },
    td: {
      padding: '11px 12px',
      color: '#46576b',
      fontSize: '0.94rem',
      borderBottom: '1px solid #eef3fb',
      verticalAlign: 'top',
      ...fontStyle
    },
    p: {
      color: '#46576b',
      lineHeight: 1.82,
      marginBottom: '12px',
      fontSize: '1rem',
      ...fontStyle
    },
    link: {
      color: '#2c5aa0',
      fontWeight: 700,
      textDecoration: 'none',
      ...fontStyle
    },
    listGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
      gap: '10px'
    },
    chip: {
      background: 'linear-gradient(135deg, #eaf2ff 0%, #f5f9ff 100%)',
      border: '1px solid #dbe7fb',
      borderRadius: '10px',
      padding: '10px 12px',
      color: '#1e3d6f',
      fontWeight: 600,
      fontSize: '0.92rem',
      ...fontStyle
    },
    faqItem: {
      border: '1px solid #e1e9f7',
      background: '#fff',
      borderRadius: '12px',
      padding: '12px 14px',
      marginBottom: '10px'
    },
    h3: {
      color: '#1e3d6f',
      fontWeight: 700,
      fontSize: '1rem',
      marginBottom: '7px',
      ...fontStyle
    },
    linksGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '10px',
      marginTop: '12px'
    },
    linkCard: {
      border: '1px solid #dbe7fb',
      background: '#f7fbff',
      borderRadius: '10px',
      padding: '10px 12px'
    }
  };

  return (
    <main style={styles.page}>
      <style>
        {`
          .best-time-link:hover {
            text-decoration: underline;
          }
          @media (max-width: 760px) {
            .best-time-page {
              padding-top: 92px;
            }
          }
        `}
      </style>

      <div style={styles.container} className="best-time-page">
        <section style={styles.hero}>
          <h1 style={styles.h1}>Best Time To Visit Popular Travel Destinations</h1>
          <p style={styles.lead}>
            Plan smarter holidays with seasonal insights for Asia, Europe, Oceania, and island getaways.
            Explore the best months to visit Japan, Korea, Thailand, Bali, Maldives, and more using this
            interactive AZ Holidays travel planning tool.
          </p>
          <p style={styles.heroSubLead}>
            Quick intent match: best time to visit Japan, best time to visit Korea, best time to visit Thailand,
            best time to travel to Europe, best time to visit Bali, and best time to visit Maldives.
          </p>
        </section>

        <section style={styles.toolSection}>
          <h2 style={styles.h2}>Find the Best Travel Season for Your Destination</h2>
          <p style={styles.sectionLead}>
            Pick a destination to instantly see the best travel months, weather context, peak demand window,
            low season value period, and months to avoid for weather disruption.
          </p>

          <div style={styles.plannerLayout}>
            <div style={styles.plannerMain}>
              <label htmlFor="destination" style={styles.label}>
                Destination selector
              </label>
              <select
                id="destination"
                value={selectedDestination}
                onChange={(event) => setSelectedDestination(event.target.value)}
                style={styles.select}
              >
                {DESTINATION_DATA.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              {selectedData && (
                <div style={styles.dataGrid}>
                  <article style={styles.statCard}>
                    <h3 style={styles.statTitle}>Best months to visit</h3>
                    <p style={styles.statBody}>{selectedData.bestMonths}</p>
                  </article>
                  <article style={styles.statCard}>
                    <h3 style={styles.statTitle}>Why these months are good</h3>
                    <p style={styles.statBody}>{selectedData.whyGood}</p>
                  </article>
                  <article style={styles.statCard}>
                    <h3 style={styles.statTitle}>Weather overview</h3>
                    <p style={styles.statBody}>{selectedData.weatherOverview}</p>
                  </article>
                  <article style={styles.statCard}>
                    <h3 style={styles.statTitle}>Peak tourist season</h3>
                    <p style={styles.statBody}>{selectedData.peakSeason}</p>
                  </article>
                  <article style={styles.statCard}>
                    <h3 style={styles.statTitle}>Low season</h3>
                    <p style={styles.statBody}>{selectedData.lowSeason}</p>
                  </article>
                  <article style={styles.statCard}>
                    <h3 style={styles.statTitle}>Months to avoid</h3>
                    <p style={styles.statBody}>{selectedData.monthsToAvoid}</p>
                  </article>
                </div>
              )}
            </div>

            {selectedData && (
              <aside style={styles.plannerAside}>
                <h3 style={styles.smallH3}>Selected destination snapshot</h3>
                <p style={{ ...styles.p, marginBottom: '8px' }}>
                  <strong>{selectedData.name}</strong> is in <strong>{selectedData.region}</strong>. Use the best-month
                  window above as your first filter, then compare flight and hotel prices against the peak and low
                  season lines before booking.
                </p>
                <p style={{ ...styles.p, marginBottom: '8px' }}>
                  Official tourism source:{' '}
                  <a
                    href={selectedData.externalGuide}
                    target="_blank"
                    rel="noreferrer"
                    className="best-time-link"
                    style={styles.link}
                  >
                    {selectedData.externalGuide}
                  </a>
                </p>
                <p style={{ ...styles.p, marginBottom: 0 }}>
                  Need help packaging flights, hotels, and activities from Singapore? Visit{' '}
                  <a
                    href="https://azholidays.com.sg/packages"
                    target="_blank"
                    rel="noreferrer"
                    className="best-time-link"
                    style={styles.link}
                  >
                    AZ Holidays travel packages
                  </a>
                  .
                </p>
              </aside>
            )}
          </div>
        </section>

        <section style={styles.contentSection}>
          <h2 style={styles.h2}>Best Months to Travel Worldwide</h2>
          <p style={styles.sectionLead}>
            Clear global view by region: compare destination season windows side-by-side with a quick scan format
            for best months and months to avoid.
          </p>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Destination</th>
                  <th style={styles.th}>Region</th>
                  <th style={styles.th}>Best months</th>
                  <th style={styles.th}>Months to avoid</th>
                </tr>
              </thead>
              <tbody>
                {DESTINATION_DATA.map((item) => (
                  <tr key={`${item.name}-row`}>
                    <td style={styles.td}>{item.name}</td>
                    <td style={styles.td}>{item.region}</td>
                    <td style={styles.td}>{item.bestMonths}</td>
                    <td style={styles.td}>{item.monthsToAvoid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '14px' }}>
            <h3 style={styles.smallH3}>Browse by region</h3>
            <div style={styles.listGrid}>
              {Object.keys(destinationByRegion).map((region) => (
                <div key={region} style={styles.chip}>
                  {region}: {destinationByRegion[region].map((item) => item.name).join(', ')}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.contentSection}>
          <h2 style={styles.h2}>Travel Planning Tips</h2>
          <p style={styles.p}>
            Choosing the best time to travel is one of the biggest factors that shapes your holiday experience.
            The same destination can feel completely different depending on the month you visit. A spring trip to
            Japan gives you cherry blossoms and mild temperatures, while a summer visit may bring high humidity,
            bigger crowds, and higher costs. For travelers searching terms like best time to visit Japan, best time
            to visit Korea, or best time to visit Thailand, seasonality is the difference between an average trip
            and a memorable one.
          </p>
          <p style={styles.p}>
            Weather patterns are the first thing to evaluate when planning international travel. In tropical
            destinations like Bali, Maldives, Thailand, and Sri Lanka, dry and wet seasons directly impact outdoor
            activities, sea conditions, and visibility for beach or snorkeling trips. In temperate destinations
            such as France, Italy, Switzerland, and the United Kingdom, shoulder seasons often provide the best
            balance of comfortable weather and manageable crowds. For long-haul travel from Singapore, this balance
            is especially important because you want every travel day to count.
          </p>
          <p style={styles.p}>
            Peak season usually brings the best weather, but it also means higher flight fares, expensive hotels,
            and packed attractions. Off-peak or low season can save substantial money, but the trade-off may include
            rain, heat, or reduced opening hours in some areas. Smart travel planning means understanding both sides.
            If your priority is value, shoulder months are usually the strongest strategy. They often deliver good
            weather at lower prices compared with school holidays or festive periods.
          </p>
          <p style={styles.p}>
            Travelers can plan better trips by setting clear priorities before booking. Decide whether your main
            goal is weather comfort, budget savings, festivals, beaches, shopping, or nature experiences. Then match
            those priorities to destination season data. Families may prioritize school breaks and convenience,
            while couples may prefer quieter months for a more relaxed pace. Business travelers often combine work
            with short leisure trips, so selecting milder months helps maximize limited time.
          </p>
          <p style={styles.p}>
            Another practical approach is to book flights early for peak periods and keep accommodation flexible in
            shoulder seasons. Comparing historical weather trends also helps reduce surprises. This is particularly
            useful for destinations with monsoon or typhoon windows, including parts of Asia. When you align weather,
            demand cycles, and pricing, you can avoid stress and enjoy better overall trip quality.
          </p>
          <p style={styles.p}>
            For practical planning, compare season data with real product decisions: flight timing, hotel neighborhood,
            cancellation policy, and transport pass value. Start with your target month, then shortlist two alternate
            travel windows in case prices spike. This is especially effective for high-demand places like Japan,
            Korea, and Europe where monthly pricing can shift quickly.
          </p>
          <p style={styles.p}>
            Use reliable external references to validate climate assumptions before paying deposits. Official tourism
            boards and weather services are useful checkpoints, including
            <a href="https://www.japan.travel/en/" target="_blank" rel="noreferrer" className="best-time-link" style={styles.link}> Japan National Tourism Organization</a>,
            <a href="https://www.tourismthailand.org" target="_blank" rel="noreferrer" className="best-time-link" style={styles.link}> Tourism Thailand</a>,
            <a href="https://www.visitdubai.com" target="_blank" rel="noreferrer" className="best-time-link" style={styles.link}> Visit Dubai</a>,
            and
            <a href="https://www.metoffice.gov.uk" target="_blank" rel="noreferrer" className="best-time-link" style={styles.link}> Met Office climate guidance</a>.
          </p>
          <p style={styles.p}>
            AZ Holidays Singapore helps travelers build realistic itineraries based on the season, not guesswork.
            Explore internal planning resources at
            <a href="https://azholidays.com.sg" target="_blank" rel="noreferrer" className="best-time-link" style={styles.link}> azholidays.com.sg</a>,
            browse curated
            <a href="https://azholidays.com.sg/packages" target="_blank" rel="noreferrer" className="best-time-link" style={styles.link}> Travel Packages</a>,
            review
            <a href="https://azholidays.com.sg/blogs" target="_blank" rel="noreferrer" className="best-time-link" style={styles.link}> Travel Blog guides</a>,
            and use the
            <a href="https://azholidays.com.sg/currency-converter" target="_blank" rel="noreferrer" className="best-time-link" style={styles.link}> Currency Converter</a>
            to estimate on-ground costs in SGD before booking.
          </p>

          <h3 style={styles.smallH3}>Useful travel links</h3>
          <div style={styles.linksGrid}>
            {INTERNAL_LINKS.map((item) => (
              <div key={item.href} style={styles.linkCard}>
                <a href={item.href} target="_blank" rel="noreferrer" className="best-time-link" style={styles.link}>
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.contentSection}>
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

export default BestTimeToVisit;
