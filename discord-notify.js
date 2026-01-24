<script>
(async function() {
  // Add both webhook URLs here
  const WEBHOOKS = ['https://discord.com/api/webhooks/1464428947008917636/OJtifCAHZyld6_F_rGJ8Ah_F7-BhnZYGNiGsJ85K_VGhztvkUWvK4S-K7GynzTPfG6XI'];
  
  // Get visitor location (approximate from timezone)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = navigator.language;
  
  // Fetch IP address and location data
  let ipData = { ip: 'Unknown', city: 'Unknown', country: 'Unknown' };
  try {
    const ipResponse = await fetch('https://ipapi.co/json/');
    ipData = await ipResponse.json();
  } catch (err) {
    console.log('Could not fetch IP');
  }
  
  // Build notification message
  const message = {
    embeds: [{
      title: "🌐 New Visitor - Vertex Global",
      color: 12889177, // Gold color
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
          value: ipData.ip || 'Unknown',
          inline: true
        },
        {
          name: "🌍 Location",
          value: `${ipData.city || 'Unknown'}, ${ipData.country_name || 'Unknown'}`,
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
          value: document.referrer || 'Direct visit (no referrer)',
          inline: true
        },
        {
          name: "📱 Device",
          value: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
          inline: true
        }
      ],
      timestamp: new Date().toISOString()
    }]
  };
  
  // Send to all webhooks
  WEBHOOKS.forEach(webhook => {
    fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    }).catch(err => console.log('Notification sent'));
  });
})();
</script>
