<script>
(function() {
  // Add both webhook URLs here
  const WEBHOOKS = 'https://discord.com/api/webhooks/1464428947008917636/OJtifCAHZyld6_F_rGJ8Ah_F7-BhnZYGNiGsJ85K_VGhztvkUWvK4S-K7GynzTPfG6XI' ;
  
  // Get visitor location (approximate from timezone)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = navigator.language;
  
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
          name: "🌍 Location Info",
          value: `Timezone: ${timezone}\nLocale: ${locale}`,
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
  
  // Send to both webhooks
  WEBHOOKS.forEach(webhook => {
    fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    }).catch(err => console.log('Notification sent'));
  });
})();
</script>
