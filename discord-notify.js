<script>
(async function() {
  try {
    const WEBHOOK = 'https://discord.com/api/webhooks/1464428947008917636/OJtifCAHZyld6_F_rGJ8Ah_F7-BhnZYGNiGsJ85K_VGhztvkUWvK4S-K7GynzTPfG6XI';
    
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = navigator.language;
    
    let ipInfo = 'Fetching...';
    let location = 'Unknown';
    
    try {
      const ipResponse = await fetch('https://ipapi.co/json/');
      const ipData = await ipResponse.json();
      ipInfo = ipData.ip || 'Unknown';
      location = ipData.city + ', ' + ipData.country_name;
    } catch (err) {
      ipInfo = 'Unable to fetch';
    }
    
    const message = {
      embeds: [{
        title: '🌐 New Visitor - Vertex Global',
        color: 12889177,
        fields: [
          {
            name: '📍 Page',
            value: window.location.href,
            inline: false
          },
          {
            name: '🕐 Date & Time',
            value: new Date().toLocaleString('en-US', { 
              dateStyle: 'full', 
              timeStyle: 'long' 
            }),
            inline: false
          },
          {
            name: '🌐 IP Address',
            value: ipInfo,
            inline: true
          },
          {
            name: '🌍 Location',
            value: location,
            inline: true
          },
          {
            name: '⏰ Timezone',
            value: timezone,
            inline: true
          },
          {
            name: '🔗 Referrer',
            value: document.referrer || 'Direct visit',
            inline: true
          },
          {
            name: '📱 Device',
            value: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
            inline: true
          }
        ],
        timestamp: new Date().toISOString()
      }]
    };
    
    const response = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    
    if (response.ok) {
      console.log('✅ Notification sent');
    } else {
      console.error('❌ Failed:', response.status);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
</script>
