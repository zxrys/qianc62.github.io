function reverseString(str) {
    return str.split('').reverse().join('');
}

function copyEmail() {
    var email = reverseString('cnaiq') + '@' + reverseString('nc.ude.utjs');
    navigator.clipboard.writeText(email).then(function() {
        // Update all copy tooltips
        var tooltips = document.querySelectorAll('.copy-tooltip');
        var emailContainers = document.querySelectorAll('.email-container');
        
        tooltips.forEach(function(tooltip, index) {
            tooltip.innerHTML = '<i class="fa fa-clipboard"></i> Email Copied';
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '0.9';
            tooltip.style.color = '#4CAF50';
            
            // Hide tooltip after 2 seconds
            setTimeout(function() {
                // Remove hover behavior first
                emailContainers[index].onmouseenter = null;
                emailContainers[index].onmouseleave = null;
                
                // Disable transitions temporarily
                tooltip.style.transition = 'none';
                
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
                tooltip.innerHTML = '<i class="fa fa-mouse-pointer"></i> Click to Copy';
                tooltip.style.color = 'rgba(255, 255, 255, 0.95)';
                
                // Force reflow
                tooltip.offsetHeight;
                
                // Restore transitions
                tooltip.style.transition = 'all 0.3s ease';
                
                // Reset the hover behavior
                emailContainers[index].onmouseenter = function() {
                    tooltip.style.removeProperty('visibility');
                    tooltip.style.removeProperty('opacity');
                };
                emailContainers[index].onmouseleave = function() {
                    tooltip.style.removeProperty('visibility');
                    tooltip.style.removeProperty('opacity');
                };
            }, 2000);
        });
    }).catch(function(err) {
        console.error('Failed to Copy: ', err);
    });
}

// Back to top button
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    var button = document.getElementById("back-to-top");
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        button.style.display = "block";
        // Add fade in effect
        button.style.opacity = "1";
    } else {
        button.style.opacity = "0";
        setTimeout(function() {
            if (document.body.scrollTop <= 500 && document.documentElement.scrollTop <= 500) {
                button.style.display = "none";
            }
        }, 300);
    }
}

// When the user clicks on the button, scroll to the top of the document
document.getElementById("back-to-top").onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Add date formatting function
function formatDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const now = new Date();
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    
    return `${dayName}, ${monthName} ${date}, ${year}`;
}

// Update date display
function updateDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = formatDate();
    }
}

// Update the fetchWeather function
async function fetchWeather() {
    const OPENWEATHER_API_KEY = '21bef387d763aa965033bfdfa6ca621e'; 
    const city = 'Shanghai';
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`);
        const data = await response.json();
        
        if (data.cod === 200) {
            const temp = Math.round(data.main.temp);
            const weatherIcon = getWeatherIcon(data.weather[0].main);
            const weatherInfo = document.getElementById('weather-info');
            const weatherDisplay = weatherInfo.querySelector('.weather-text');
            weatherDisplay.innerHTML = `@${city},&nbsp;${temp}°C,&nbsp;<i class="fa ${weatherIcon}"></i>`;
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        const weatherInfo = document.getElementById('weather-info');
        const weatherDisplay = weatherInfo.querySelector('span:last-child');
        weatherDisplay.innerHTML = '<i class="fa fa-exclamation-circle"></i>';
    }
}

function getWeatherIcon(weatherMain) {
    const iconMap = {
        'Clear': 'fa-sun-o',
        'Clouds': 'fa-cloud',
        'Rain': 'fa-tint',
        'Snow': 'fa-snowflake-o',
        'Thunderstorm': 'fa-bolt',
        'Drizzle': 'fa-tint',
        'Mist': 'fa-cloud',
        'Smoke': 'fa-cloud',
        'Haze': 'fa-cloud',
        'Dust': 'fa-cloud',
        'Fog': 'fa-cloud',
        'Sand': 'fa-cloud',
        'Ash': 'fa-cloud',
        'Squall': 'fa-cloud',
        'Tornado': 'fa-warning'
    };
    
    return iconMap[weatherMain] || 'fa-cloud';
}

// Update both date and weather on page load and periodically
document.addEventListener('DOMContentLoaded', () => {
    // Display email
    const user = 'cnaiq';
    const domain = 'nc.ude.utjs';
    const emailElement = document.querySelector('.email-text');
    if (emailElement) {
        emailElement.textContent = ' ' + reverseString(user) + '@' + reverseString(domain);
    }

    // Update date and weather
    updateDate();
    fetchWeather();
    setInterval(() => {
        updateDate();
        fetchWeather();
    }, 600000);
}); 