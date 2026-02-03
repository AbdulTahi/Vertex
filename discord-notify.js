(async function() {
  try {
    const WEBHOOK = 'https://discord.com/api/webhooks/1464428947008917636/OJtifCAHZyld6_F_rGJ8Ah_F7-BhnZYGNiGsJ85K_VGhztvkUWvK4S-K7GynzTPfG6XI';
    
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = navigator.language;
    const userAgent = navigator.userAgent;
    
    // Detect Browser
    let browser = 'Unknown';
    if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) browser = 'Chrome';
    else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) browser = 'Safari';
    else if (userAgent.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (userAgent.indexOf('Edg') > -1) browser = 'Edge';
    else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) browser = 'Opera';
    
    // Detect Device Type
    let device = 'Desktop 💻';
    if (/iPhone/i.test(userAgent)) device = 'iPhone 📱';
    else if (/iPad/i.test(userAgent)) device = 'iPad 📱';
    else if (/Android/i.test(userAgent)) {
      if (/Mobile/i.test(userAgent)) device = 'Android Phone 📱';
      else device = 'Android Tablet 📱';
    }
    else if (/Windows Phone/i.test(userAgent)) device = 'Windows Phone 📱';
    else if (/Mobile|Android/i.test(userAgent)) device = 'Mobile Device 📱';
    
    let ipInfo = 'Unknown';
    let location = 'Unknown';
    let detailedLocation = 'Fetching...';
    let isp = 'Unknown';
    let coordinates = 'Unknown';
    
    try {
      // Using ip-api.com - more detailed and still free (45 requests/minute)
      const ipResponse = await fetch('http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query');
      const ipData = await ipResponse.json();
      
      if (ipData.status === 'success') {
        ipInfo = ipData.query;
        location = `${ipData.city}, ${ipData.regionName}, ${ipData.country}`;
        detailedLocation = `${ipData.city}, ${ipData.regionName} (${ipData.region}), ${ipData.country} ${ipData.countryCode}`;
        if (ipData.zip) detailedLocation += ` - ZIP: ${ipData.zip}`;
        isp = ipData.isp || ipData.org || 'Unknown';
        coordinates = `${ipData.lat}, ${ipData.lon}`;
      } else {
        location = 'Unable to fetch';
      }
    } catch (err) {
      console.log('IP fetch skipped');
      location = 'Unable to fetch';
    }
    
    await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: '🌐 New Visitor - Vertex Global',
          color: 12889177,
          fields: [
            { name: '📍 Page', value: window.location.href, inline: false },
            { name: '🕐 Date & Time', value: new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' }), inline: false },
            { name: '🌐 IP Address', value: ipInfo, inline: true },
            { name: '📡 ISP/Provider', value: isp, inline: true },
            { name: '🌍 Location', value: detailedLocation, inline: false },
            { name: '📍 Coordinates', value: coordinates, inline: true },
            { name: '⏰ Timezone', value: timezone, inline: true },
            { name: '🌐 Browser', value: browser, inline: true },
            { name: '📱 Device', value: device, inline: true },
            { name: '🗣️ Language', value: locale, inline: true },
            { name: '🔗 Referrer', value: document.referrer || 'Direct visit', inline: false }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'Vertex Global Analytics'
          }
        }]
      })
    });
    
    console.log('✅ Notification sent');
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
