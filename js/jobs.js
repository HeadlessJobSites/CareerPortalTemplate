let jobs = [];
let displayedJobs = 0;

const jobsToShowDesktop = 12;
const jobsToShowMobile = 6;
let jobsToShow = window.innerWidth > 768 ? jobsToShowDesktop : jobsToShowMobile;

export function initJobs() {
  window.addEventListener('resize', debounce(updateJobsToShow, 200));
  document.getElementById('loadMore')?.addEventListener('click', handleLoadMore);
  document.getElementById('locationFilter')?.addEventListener('change', resetAndDisplayJobs);
  document.getElementById('jobTypeFilter')?.addEventListener('change', resetAndDisplayJobs);

  fetchJobs();
}

function updateJobsToShow() {
  jobsToShow = window.innerWidth > 768 ? jobsToShowDesktop : jobsToShowMobile;
  displayedJobs = Math.min(jobsToShow, jobs.length);
  displayJobs();
  updateLoadMoreVisibility();
}

function resetAndDisplayJobs() {
  displayedJobs = jobsToShow;
  displayJobs();
  updateLoadMoreVisibility();
}

function handleLoadMore() {
  displayedJobs += jobsToShow;
  displayJobs();
  updateLoadMoreVisibility();
}

function fetchJobs() {
  fetch('https://api.talentech.io/reachmee/feed/')
    .then(response => response.json())
    .then(data => {
      jobs = data;
      displayedJobs = Math.min(jobsToShow, jobs.length);
      populateFilters();
      displayJobs();
    })
    .catch(error => {
      console.error('Error fetching jobs:', error);
    });
}

function populateFilters() {
  const locationSet = new Set();
  const jobTypeSet = new Set();

  jobs.forEach(job => {
    if (job.country) locationSet.add(job.country);
    if (job.title) jobTypeSet.add(job.title);
  });

  const locationFilter = document.getElementById('locationFilter');
  const jobTypeFilter = document.getElementById('jobTypeFilter');
  if (!locationFilter || !jobTypeFilter) return;

  locationFilter.innerHTML = '<option value="All">All locations</option>';
  jobTypeFilter.innerHTML = '<option value="All">All job types</option>';

  locationSet.forEach(country => {
    locationFilter.innerHTML += `<option value="${country}">${country}</option>`;
  });

  jobTypeSet.forEach(type => {
    jobTypeFilter.innerHTML += `<option value="${type}">${type}</option>`;
  });
}

function displayJobs() {
  const jobList = document.getElementById('jobList');
  if (!jobList) return;

  jobList.innerHTML = '';
  const selectedCountry = document.getElementById('locationFilter')?.value || 'All';
  const selectedJobType = document.getElementById('jobTypeFilter')?.value || 'All';

  const filteredJobs = jobs
    .slice(0, displayedJobs)
    .filter(job =>
      (selectedCountry === 'All' || job.country === selectedCountry) &&
      (selectedJobType === 'All' || job.title === selectedJobType)
    );

  filteredJobs.forEach(job => jobList.appendChild(createJobCard(job)));
}

function createJobCard(job) {
  const jobDetailUrl = `job-details.html?jobId=${job.ad_id}`;
  const orgName = job.organizations?.[1]?.nameorgunit || job.organizations?.[0]?.nameorgunit || 'Not specified';

  const div = document.createElement('div');
  div.className = 'col-12 col-md-4 col-lg-4 mb-4';
  div.innerHTML = `
    <a href="${jobDetailUrl}" class="" style="text-decoration: none; color: inherit;" aria-label="Job details">
        <div class="card h-100">
            <div class="card-body">
              <div class="card-category"><span>${orgName}</span></div>
              <div class="card-title">${job.title}</div>
              <p class="card-text">${job.country}</p>
              <a href="${jobDetailUrl}" class="stretched-link">
                  <img src="/files/arrow-right-thin.svg" class="stretched-link" alt="Details">
              </a>
            </div>
        </div>
    </a>
  `;
  return div;
}

function updateLoadMoreVisibility() {
  const loadMoreBtn = document.getElementById('loadMore');
  if (!loadMoreBtn) return;
  loadMoreBtn.style.display = displayedJobs >= jobs.length ? 'none' : 'block';
}

function debounce(func, wait) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}
