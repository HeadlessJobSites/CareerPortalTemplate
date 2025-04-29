// Availble positions button text update on hero section

function updateAvailablePositionsButton() {
  // Fetch the jobs from the feed
  fetch('https://api.talentech.io/reachmee/feed/')
    .then(response => response.json())
    .then(jobs => {
      const positionsCount = jobs.length; // Get the count of jobs from the feed
      const btnText = positionsCount === 1 ? 'See 1 available position' : `See ${positionsCount} available positions`; // Update button text based on count
      document.querySelector('a.btn.btn-primary.btn-lg strong').textContent = positionsCount > 0 ? btnText : 'See available positions';
    })
    .catch(error => {
      console.error('Error fetching job details:', error);
      // If there is an error fetching the jobs, show default text
      document.querySelector('a.btn.btn-primary.btn-lg strong').textContent = 'See available positions';
    });
}

document.addEventListener('DOMContentLoaded', updateAvailablePositionsButton); // Call the function when the DOM is fully loaded
