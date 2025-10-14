// About page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    
    // Initialize team member interactions
    initTeamInteractions();
    
    // Add smooth loading effect
    addLoadingAnimations();
});

// Scroll animations for about page
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add delay for team members
                if (entry.target.classList.contains('team-member')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 200;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.about-text, .vision-mission, .team-section, .about-image, .team-member');
    elementsToAnimate.forEach(el => {
        // Add appropriate animation class based on element type
        if (el.classList.contains('about-text') || el.classList.contains('vision-mission')) {
            el.classList.add('slide-in-left');
        } else if (el.classList.contains('about-image')) {
            el.classList.add('slide-in-right');
        } else if (el.classList.contains('team-member')) {
            el.classList.add('fade-in');
        } else {
            el.classList.add('fade-in');
        }
        
        observer.observe(el);
    });
}

// Team member interactions
function initTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        // Add click event to show more info
        member.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');
            
            // You can add more interactive features here
            // For example, show a modal with detailed information
            if (this.classList.contains('active')) {
                showTeamMemberDetail(this);
            }
        });
        
        // Add hover effect delay
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        member.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Show team member detail (placeholder function)
function showTeamMemberDetail(member) {
    const memberName = member.querySelector('h4').textContent;
    const memberRole = member.querySelector('p').textContent;
    
    console.log(`Selected team member: ${memberName} - ${memberRole}`);
    // In a real implementation, you might show a modal or expand the card
}

// Loading animations
function addLoadingAnimations() {
    // Add loading class to body
    document.body.classList.add('page-loading');
    
    // Remove loading class after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.body.classList.remove('page-loading');
            document.body.classList.add('page-loaded');
        }, 500);
    });
}

// Additional utility functions for about page
function toggleVisionMission() {
    const visionMission = document.querySelector('.vision-mission');
    visionMission.classList.toggle('expanded');
}

// Export functions for global use (if needed)
window.aboutPage = {
    toggleVisionMission,
    initScrollAnimations,
    initTeamInteractions
};

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add coffee brewing animation to images on hover
    const cafeImages = document.querySelectorAll('.about-image img, .team-member img');
    
    cafeImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'sepia(0.3) brightness(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    });
});