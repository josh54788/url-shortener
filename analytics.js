// analytics.js

// 1. The Mock Data
const mockData = [
    { 
        short_code: 'abc123', 
        original_url: 'https://alxafrica.com/cloud-computing', 
        clicks: 42, 
        created_at: '2026-03-10T12:00:00Z' 
    },
    { 
        short_code: 'port77', 
        original_url: 'https://github.com/your-github-profile', 
        clicks: 156, 
        created_at: '2026-03-11T09:30:00Z' 
    }
];

// 2. The Main Function
async function fetchAnalytics() {
    console.log("1. fetchAnalytics function started!"); 
    
    const tableBody = document.getElementById('analyticsBody');
    
    // Safety check: Does the HTML table exist?
    if (!tableBody) {
        console.error("CRITICAL ERROR: Could not find the HTML element with id='analyticsBody'!");
        return; 
    }

    try {
        console.log("2. Inside the try block. Bypassing fetch..."); 
        
        const data = mockData;
        tableBody.innerHTML = ''; 

        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;"><i class="fa-solid fa-folder-open"></i> No links found yet.</td></tr>';
            return;
        }

        console.log("3. Looping through the data..."); 

        data.forEach(item => {
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
        
        console.log("4. Table successfully populated!"); 

    } catch (error) {
        // This prints the EXACT reason it failed to your browser console
        console.error("5. An error occurred inside the try block:", error); 
        
        tableBody.innerHTML = '<tr><td colspan="4" style="color:red; text-align:center;"><i class="fa-solid fa-triangle-exclamation"></i> Error loading analytics data. Check your developer console.</td></tr>';
    }
}

// 3. Trigger the function
window.onload = fetchAnalytics;