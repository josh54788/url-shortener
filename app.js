// 1. Interactive Mock Data
const mockData = [
    { short_code: 'abc123', original_url: 'https://alxafrica.com/cloud-computing', clicks: 42, created_at: '2026-03-10T12:00:00Z' },
    { short_code: 'port77', original_url: 'https://github.com/your-github-profile', clicks: 156, created_at: '2026-03-11T09:30:00Z' }
];

// 2. Shorten URL Function (Interactive)
function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value;
    const resultDiv = document.getElementById('result');

    resultDiv.style.display = 'block';

    if (!longUrl) {
        resultDiv.innerHTML = '<span style="color:red;"><i class="fa-solid fa-triangle-exclamation"></i> Please enter a valid URL.</span>';
        return;
    }

    // Show loading spinner
    resultDiv.innerHTML = '<span style="color:#555;"><i class="fa-solid fa-spinner fa-spin"></i> Shortening your link...</span>';
    
    // Simulate a 1-second delay like a real API call
    setTimeout(() => {
        // Generate a random 6-character short code
        const fakeShortCode = Math.random().toString(36).substring(2, 8);
        const shortUrl = `https://short.ly/${fakeShortCode}`;
        
        // Show success message
        resultDiv.innerHTML = `<span style="color:green;"><i class="fa-solid fa-circle-check"></i> Success!</span><br><br>Shortened: <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
        
        // Dynamically add the new link to our analytics table!
        mockData.unshift({
            short_code: fakeShortCode,
            original_url: longUrl,
            clicks: 0,
            created_at: new Date().toISOString()
        });
        
        // Refresh the table UI
        fetchAnalytics(); 
        
    }, 1000);
}

// 3. Fetch Analytics Function
function fetchAnalytics() {
    const tableBody = document.getElementById('analyticsBody');
    tableBody.innerHTML = ''; 

    if (mockData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;"><i class="fa-solid fa-folder-open"></i> No links found.</td></tr>';
        return;
    }

    mockData.forEach(item => {
        const row = `
            <tr>
                <td><strong>${item.short_code}</strong></td>
                <td><a href="${item.original_url}" target="_blank">${item.original_url.substring(0, 30)}...</a></td>
                <td>${item.clicks}</td>
                <td>${new Date(item.created_at).toLocaleDateString()}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// 4. Load table automatically on startup
window.onload = fetchAnalytics;