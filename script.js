// Display browser information
document.getElementById('userAgent').innerText = navigator.userAgent;
document.getElementById('screenInfo').innerText = `${screen.width} x ${screen.height}`;

// Clipboard copy utility
function copyText(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert("Copied to clipboard!"))
    .catch(() => alert("Copy failed."));
}

// Copy UA button
document.getElementById('copyUA').addEventListener('click', () => {
  const ua = document.getElementById('userAgent').innerText;
  copyText(ua);
});

// Get browser timezone safely
function getBrowserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unavailable';
  } catch {
    return 'Unavailable';
  }
}

// Fetch IP info
async function fetchIPInfo() {
  const ipDiv = document.getElementById('ipSection');
  ipDiv.setAttribute('aria-busy', 'true');
  ipDiv.innerHTML = `<div class="spinner" role="status" aria-label="Loading"></div><p>Loading IP address, location, and timezone...</p>`;

  try {
    const res = await fetch('https://api.db-ip.com/v2/free/self');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();

    const city = data.city || 'Unknown city';
    const state = data.stateProv || 'Unknown state';
    const country = data.countryName || 'Unknown country';
    const org = data.organization || 'ISP information not provided';
    const timezone = getBrowserTimezone();

    ipDiv.innerHTML = `
      <p><strong>IP Address:</strong> ${data.ipAddress}</p>
      <button onclick="copyText('${data.ipAddress}')">Copy IP</button>
      <p><strong>Location:</strong> ${city}, ${state}, ${country}</p>
      <p><strong>Timezone:</strong> ${timezone}</p>
      <p><strong>ISP:</strong> ${org}</p>
      <button id="refreshBtn" aria-label="Refresh IP information">Refresh</button>
    `;

    document.getElementById('refreshBtn').addEventListener('click', fetchIPInfo);
  } catch (err) {
    ipDiv.innerHTML = "<p style='color:red;'>Could not fetch IP or location information.</p>";
    console.error("Error fetching IP info:", err);
  } finally {
    ipDiv.setAttribute('aria-busy', 'false');
  }
}

// Initial fetch
fetchIPInfo();
