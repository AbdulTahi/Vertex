<script>
(async function() {
  try {
    // Your webhook URL
    const WEBHOOK = 'https://discord.com/api/webhooks/1464428947008917636/OJtifCAHZyld6_F_rGJ8Ah_F7-BhnZYGNiGsJ85K_VGhztvkUWvK4S-K7GynzTPfG6XI';
    
    // Get visitor location
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = navigator.language;
    
    // Fetch IP address
    let ipInfo = 'Fetching...';
    let location = 'Fetching...';
    
    try {
      const ipResponse = await fetch('https://ipapi.co/json/');
      const ipData = await ipResponse.json();
      ipInfo = ipData.ip || 'Unknown';
      location = `${ipData.city || 'Unknown'}, ${ipData.country_name || 'Unknown'}`;
    } catch (err) {
      ipInfo = 'Unable to fetch';
      location = 'Unknown';
    }
    
    // Build notification message
    const message = {
      embeds: [{
        title: "🌐 New Visitor - Vertex Global",
        color: 12889177,
        fields: [
          {
            name: "📍 Page",
            value: window.location.href,
            inline: false
          },
          {
            name: "🕐 Date & Time",
            value: new Date().toLocaleString('en-US', { 
              dateStyle: 'full', 
              timeStyle: 'long' 
            }),
            inline: false
          },
          {
            name: "🌐 IP Address",
            value: ipInfo,
            inline: true
          },
          {
            name: "🌍 Location",
            value: location,
            inline: true
          },
          {
            name: "⏰ Timezone",
            value: timezone,
            inline: true
          },
          {
            name: "🗣️ Language",
            value: locale,
            inline: true
          },
          {
            name: "🔗 Referrer",
            value: document.referrer || 'Direct visit',
            inline: true
          },
          {
            name: "📱 Device",
            value: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile 📱' : 'Desktop 💻',
            inline: true
          }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Vertex Global Analytics"
        }
      }]
    };
    
    // Send to Discord
    const response = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    
    if (response.ok) {
      console.log('✅ Notification sent successfully');
    } else {
      console.error('❌ Notification failed:', response.status);
    }
    
  } catch (error) {
    console.error('❌ Error sending notification:', error);
  }
})();
</script>
