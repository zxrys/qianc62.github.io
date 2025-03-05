function copyBibTeX(citation, event) {
    // Prevent the event from bubbling up
    event.stopPropagation();
    
    navigator.clipboard.writeText(citation).then(() => {
        // Find the container and tooltip
        const container = event.target.closest('.citation-container');
        const tooltip = container.querySelector('.citation-tooltip');
        
        if (tooltip) {
            // Clear any existing timeout
            if (tooltip.resetTimeout) {
                clearTimeout(tooltip.resetTimeout);
            }
            
            tooltip.innerHTML = '<i class="fa fa-clipboard"></i> Citation Copied';
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            
            // Reset the tooltip after 2 seconds
            tooltip.resetTimeout = setTimeout(() => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
                // Reset tooltip text after fade out
                setTimeout(() => {
                    tooltip.innerHTML = '<i class="fa fa-mouse-pointer"></i> Copy Citation';
                }, 300);
            }, 2000);
        }
    });
} 