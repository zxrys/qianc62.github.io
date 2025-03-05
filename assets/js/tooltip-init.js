// Wrap citation icons and add tooltips when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Handle citation icons
    const icons = document.querySelectorAll('.fa-quote-left');
    icons.forEach(icon => {
        // Create container
        const container = document.createElement('span');
        container.className = 'citation-container';
        
        // Create tooltip
        const tooltip = document.createElement('span');
        tooltip.className = 'citation-tooltip';
        tooltip.innerHTML = '<i class="fa fa-mouse-pointer"></i> Copy Citation';
        
        // Get the citation from the icon's onclick attribute
        const onclickAttr = icon.getAttribute('onclick');
        const citation = onclickAttr.match(/copyBibTeX\('(.+?)'\)/)[1];
        
        // Update icon's onclick to include event
        icon.setAttribute('onclick', `copyBibTeX('${citation}', event)`);
        
        // Add hover handlers
        container.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            if (tooltip.textContent === '') {
                tooltip.innerHTML = '<i class="fa fa-mouse-pointer"></i> Copy Citation';
            }
        });
        
        container.addEventListener('mouseleave', () => {
            if (tooltip.textContent.includes('Copy Citation')) {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            }
        });
        
        // Move icon into container and add tooltip
        icon.parentNode.insertBefore(container, icon);
        container.appendChild(icon);
        container.appendChild(tooltip);
    });

    // Handle PDF and GitHub icons
    document.querySelectorAll('.Publications a').forEach(link => {
        const icon = link.querySelector('.fa');
        if (!icon) return;

        // Skip if already processed
        if (link.closest('.link-container')) return;

        // Create container
        const container = document.createElement('span');
        container.className = 'link-container';
        
        // Create tooltip
        const tooltip = document.createElement('span');
        tooltip.className = 'link-tooltip';
        
        // Set tooltip text based on icon type
        if (icon.classList.contains('fa-file-pdf-o')) {
            tooltip.textContent = 'View Paper';
        } else if (icon.classList.contains('fa-github')) {
            tooltip.textContent = 'View Code';
        }
        
        // Move link into container and add tooltip
        link.parentNode.insertBefore(container, link);
        container.appendChild(link);
        container.appendChild(tooltip);
    });
}); 