// app.js

const API_URL = 'https://your-api-gateway-url.amazonaws.com/prod/shorten';

async function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value;
    const resultDiv = document.getElementById('result');

    // Display the result box
    resultDiv.style.display = 'block';

    // Validation check
    if (!longUrl) {
        resultDiv.innerHTML = '<span style="color:red;"><i class="fa-solid fa-triangle-exclamation"></i> Please enter a valid URL.</span>';
        return;
    }

    // Show loading state
    resultDiv.innerHTML = '<span style="color:#555;"><i class="fa-solid fa-spinner fa-spin"></i> Shortening your link...</span>';

    try {
        // Send data to the backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ original_url: longUrl })
        });
        
        // Parse the response and display success
        const data = await response.json();
        resultDiv.innerHTML = `<span style="color:green;"><i class="fa-solid fa-circle-check"></i> Success!</span><br><br>Shortened: <a href="${data.short_url}" target="_blank">${data.short_url}</a>`;
        
    } catch (error) {
        // Handle failure
        resultDiv.innerHTML = '<span style="color:red;"><i class="fa-solid fa-circle-xmark"></i> Error shortening URL. Please try again.</span>';
    }
}