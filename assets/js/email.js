document.addEventListener('DOMContentLoaded', function() {
    const emailContainer = document.getElementById('email-container');
    const emailTooltip = emailContainer.querySelector('.email-tooltip');
    const emailText = emailContainer.querySelector('.email-text');

    emailContainer.addEventListener('click', function() {
        const email = emailText.textContent.trim();
        navigator.clipboard.writeText(email).then(() => {
            emailTooltip.innerHTML = '<i class="fa fa-clipboard"></i> Email Copied';
            emailTooltip.style.color = '#4CAF50'; // Add green color
            
            // Reset tooltip text and color after 2 seconds
            setTimeout(() => {
                if (!emailContainer.matches(':hover')) {
                    emailTooltip.innerHTML = '<i class="fa fa-mouse-pointer"></i> Click to Copy';
                    emailTooltip.style.color = 'rgba(255, 255, 255, 0.95)'; // Reset to original color
                }
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email:', err);
        });
    });

    // Reset tooltip text and color when mouse leaves
    emailContainer.addEventListener('mouseleave', () => {
        setTimeout(() => {
            emailTooltip.innerHTML = '<i class="fa fa-mouse-pointer"></i> Click to Copy';
            emailTooltip.style.color = 'rgba(255, 255, 255, 0.95)'; // Reset to original color
        }, 200);
    });
});

function handleApplication(element) {
    const emailUser = '26cnaiq'.split('').reverse().join('');
    const emailDomain = 'moc.liamg'.split('').reverse().join('');
    const email = emailUser + '@' + emailDomain;
    const tooltip = element.querySelector('.apply-tooltip');
    
    navigator.clipboard.writeText(email).then(() => {
        tooltip.classList.add('copied');
        setTimeout(() => {
            tooltip.classList.remove('copied');
        }, 2000);
    });
} 