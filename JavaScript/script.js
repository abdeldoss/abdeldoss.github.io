document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Show loader
    const loader = document.getElementById('ip-loader');
    loader.style.display = 'block';
    
    // Fetch IP information
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            // Update UI with IP info
            document.getElementById('ip-address').textContent = data.ip || 'Not available';
            document.getElementById('location').textContent = 
                `${data.city || 'Unknown'}, ${data.region || 'Unknown'}, ${data.country_name || 'Unknown'}`;
            document.getElementById('isp').textContent = data.org || 'Unknown';
            document.getElementById('timezone').textContent = data.timezone || 'Unknown';
            
            // Hide loader
            loader.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching IP info:', error);
            
            // Fallback to simpler IP API if first one fails
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('ip-address').textContent = data.ip || 'Not available';
                    document.getElementById('location').textContent = 'Location data unavailable';
                    document.getElementById('isp').textContent = 'ISP data unavailable';
                    document.getElementById('timezone').textContent = 'Timezone data unavailable';
                    
                    // Hide loader
                    loader.style.display = 'none';
                })
                .catch(fallbackError => {
                    console.error('Fallback IP fetch failed:', fallbackError);
                    document.getElementById('ip-address').textContent = 'Failed to load IP information';
                    document.getElementById('location').textContent = 'Please try again later';
                    document.getElementById('isp').textContent = 'Error';
                    document.getElementById('timezone').textContent = 'Error';
                    
                    // Hide loader
                    loader.style.display = 'none';
                });
        });
});
