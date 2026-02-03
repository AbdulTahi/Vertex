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
    
    try {
      const ipResponse = await fetch('https://ipapi.co/json/');
      const ipData = await ipResponse.json();
      ipInfo = ipData.ip;
      location = ipData.city + ', ' + ipData.country_name;
    } catch (err) {
      console.log('IP fetch skipped');
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
            { name: '🌍 Location', value: location, inline: true },
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
