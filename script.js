// Main application script for Nexus Intelligence
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements based on your actual HTML structure
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const resultsContainer = document.getElementById('results-container');
  const tabButtons = document.querySelectorAll('.mb-6.border-b.border-gray-200 button');
  const loadingIndicator = document.getElementById('loading');
  const tabIndicators = document.querySelectorAll('.tab-indicator');
  
  // Current search state
  let currentResults = {
    allResults: [],
    peopleResults: [],
    vehicleResults: [],
    locationResults: [],
    eventResults: []
  };
  
  let activeTab = 'all';
  
  // Initialize tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      tabButtons.forEach(btn => {
        btn.classList.remove('border-blue-500', 'text-blue-600');
        btn.classList.add('text-gray-600');
      });
      
      // Add active class to clicked button
      this.classList.add('border-blue-500', 'text-blue-600');
      this.classList.remove('text-gray-600');
      
      // Update active tab
      const text = this.textContent.trim().toLowerCase();
      if (text.includes('all')) activeTab = 'all';
      else if (text.includes('people')) activeTab = 'people';
      else if (text.includes('vehicles')) activeTab = 'vehicles';
      else if (text.includes('locations')) activeTab = 'locations';
      else if (text.includes('events')) activeTab = 'events';
      
      // Refresh results display for the new active tab
      displayResults();
    });
  });
  
  // Handle search button click
  searchBtn.addEventListener('click', function() {
    const query = searchInput.value.trim();
    
    if (query === '') return;
    
    // Show loading indicator
    loadingIndicator.classList.remove('hidden');
    resultsContainer.innerHTML = '';
    
    // Perform search with a slight delay to show loading
    setTimeout(() => {
      // Use the enhanced search function from advanced-search.js
      currentResults = performSearch(query, mockData);
      
      // Update result counts
      updateResultCounts(getResultCounts(currentResults));
      
      // Display results
      displayResults();
      
      // Hide loading indicator
      loadingIndicator.classList.add('hidden');
    }, 800); // Slightly longer delay to show the loading animation
  });
  
  // Function to update tab indicators with result counts
  function updateResultCounts(counts) {
    // Update the count indicators in the tabs
    tabIndicators.forEach(indicator => {
      if (indicator.classList.contains('tab-people')) {
        indicator.textContent = counts.people;
      } else if (indicator.classList.contains('tab-vehicles')) {
        indicator.textContent = counts.vehicles;
      } else if (indicator.classList.contains('tab-locations')) {
        indicator.textContent = counts.locations;
      } else if (indicator.classList.contains('tab-events')) {
        indicator.textContent = counts.events;
      }
    });
    
    // Update the first tab (All Results)
    tabIndicators[0].textContent = counts.all;
    
    // Update the "Showing X results" text
    const resultsText = document.querySelector('.text-gray-500.text-sm');
    if (resultsText) {
      resultsText.textContent = `Showing ${counts.all} results for "${searchInput.value.trim()}"`;
    }
  }
  
  // Function to display results based on the active tab
  function displayResults() {
    // Clear results container
    resultsContainer.innerHTML = '';
    
    // Get the results to display based on active tab
    let resultsToDisplay;
    switch (activeTab) {
      case 'people':
        resultsToDisplay = currentResults.peopleResults;
        break;
      case 'vehicles':
        resultsToDisplay = currentResults.vehicleResults;
        break;
      case 'locations':
        resultsToDisplay = currentResults.locationResults;
        break;
      case 'events':
        resultsToDisplay = currentResults.eventResults;
        break;
      default:
        resultsToDisplay = currentResults.allResults;
        break;
    }
    
    // If no results, show empty state
    if (resultsToDisplay.length === 0) {
      resultsContainer.innerHTML = `
        <div class="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg">
          <div class="text-gray-400 text-5xl mb-4">
            <i class="fas fa-search"></i>
          </div>
          <h3 class="text-xl font-medium text-gray-700 mb-1">No results found</h3>
          <p class="text-gray-500">Try adjusting your search terms or filters</p>
        </div>
      `;
      return;
    }
    
    // Create result cards for each result
    resultsToDisplay.forEach(result => {
      const card = createResultCard(result);
      resultsContainer.appendChild(card);
    });
  }
  
  // Function to create a result card
  function createResultCard(item) {
    // Create the card container
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300';
    
    // Determine card elements based on item type
    const typeColor = getTypeColor(item.type);
    const typeIcon = getTypeIcon(item.type);
    const title = getItemTitle(item);
    const subtitle = getItemSubtitle(item);
    const quickDetails = getQuickDetails(item);
    
    // Generate confidence class based on confidence level
    const confidenceClass = item.confidence >= 80 ? 'bg-green-500' : 
                           item.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500';
    
    // Create card HTML
    card.innerHTML = `
      <div class="border-l-4 ${typeColor}">
        <div class="p-4">
          <div class="flex justify-between items-start">
            <div class="flex items-start">
              <div class="mr-3 text-xl ${typeColor.replace('border-', 'text-')}">
                ${typeIcon}
              </div>
              <div>
                <h3 class="font-bold text-gray-800">${title}</h3>
                <p class="text-sm text-gray-500">${subtitle}</p>
              </div>
            </div>
            <div class="flex items-center text-xs">
              <span class="text-gray-500 mr-2">Match:</span>
              <div class="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="${confidenceClass} h-full" style="width: ${item.confidence}%"></div>
              </div>
              <span class="ml-1 font-medium">${item.confidence}%</span>
            </div>
          </div>
          
          <div class="mt-3 text-sm text-gray-600 grid grid-cols-2 gap-2">
            ${quickDetails}
          </div>
          
          <div class="mt-4 flex justify-end">
            <button class="view-details-btn text-blue-600 hover:text-blue-800 text-sm font-medium">
              View Details <i class="fas fa-chevron-right ml-1"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="expanded-details hidden border-t border-gray-200 p-4 bg-gray-50">
        <!-- This will be populated when View Details is clicked -->
      </div>
    `;
    
    // Add click handler for the View Details button
    const viewDetailsBtn = card.querySelector('.view-details-btn');
    const expandedDetails = card.querySelector('.expanded-details');
    
    viewDetailsBtn.addEventListener('click', function() {
      if (expandedDetails.classList.contains('hidden')) {
        // Show details
        expandedDetails.classList.remove('hidden');
        viewDetailsBtn.innerHTML = 'Hide Details <i class="fas fa-chevron-down ml-1"></i>';
        
        // Populate details
        expandedDetails.innerHTML = generateDetailedView(item);
        
        // Add event listener for advanced view toggle
        const advancedToggle = expandedDetails.querySelector('.advanced-toggle input');
        if (advancedToggle) {
          advancedToggle.addEventListener('change', function() {
            const advancedSections = expandedDetails.querySelectorAll('.advanced-section');
            advancedSections.forEach(section => {
              if (this.checked) {
                section.classList.remove('hidden');
              } else {
                section.classList.add('hidden');
              }
            });
          });
        }
      } else {
        // Hide details
        expandedDetails.classList.add('hidden');
        viewDetailsBtn.innerHTML = 'View Details <i class="fas fa-chevron-right ml-1"></i>';
      }
    });
    
    return card;
  }
  
  // Helper functions
  function getTypeColor(type) {
    switch (type) {
      case 'person': return 'border-blue-500';
      case 'vehicle': return 'border-orange-500';
      case 'location': return 'border-green-500';
      case 'event': return 'border-purple-500';
      default: return 'border-gray-500';
    }
  }
  
  function getTypeIcon(type) {
    switch (type) {
      case 'person': return '<i class="fas fa-user"></i>';
      case 'vehicle': return '<i class="fas fa-car"></i>';
      case 'location': return '<i class="fas fa-map-marker-alt"></i>';
      case 'event': return '<i class="fas fa-calendar-alt"></i>';
      default: return '<i class="fas fa-file"></i>';
    }
  }
  
  function getItemTitle(item) {
    switch (item.type) {
      case 'person': return item.name || item.fullName;
      case 'vehicle': return `${item.make} ${item.model} (${item.registration})`;
      case 'location': return item.name || item.address;
      case 'event': return item.title || `${item.incidentType} - ${item.reference}`;
      default: return 'Unknown Item';
    }
  }
  
  function getItemSubtitle(item) {
    switch (item.type) {
      case 'person': return item.dateOfBirth ? `DOB: ${item.dateOfBirth}` : '';
      case 'vehicle': return item.ownerName ? `Owner: ${item.ownerName}` : '';
      case 'location': return item.type ? `Type: ${item.type}` : '';
      case 'event': return item.date ? `Date: ${item.date}` : '';
      default: return '';
    }
  }
  
  function getQuickDetails(item) {
    switch (item.type) {
      case 'person':
        return `
          <div><span class="font-medium">ID:</span> ${item.identifiers?.[0]?.value || 'Unknown'}</div>
          <div><span class="font-medium">Gender:</span> ${item.gender || 'Unknown'}</div>
        `;
      case 'vehicle':
        return `
          <div><span class="font-medium">Color:</span> ${item.color || 'Unknown'}</div>
          <div><span class="font-medium">Year:</span> ${item.year || 'Unknown'}</div>
        `;
      case 'location':
        return `
          <div><span class="font-medium">Status:</span> ${item.status || 'Unknown'}</div>
          <div><span class="font-medium">Risk:</span> ${item.riskLevel || 'Unknown'}</div>
        `;
      case 'event':
        return `
          <div><span class="font-medium">Status:</span> ${item.status || 'Unknown'}</div>
          <div><span class="font-medium">Ref:</span> ${item.reference || 'Unknown'}</div>
        `;
      default:
        return '';
    }
  }
  
  function generateDetailedView(item) {
    let html = `
      <div class="mb-4 flex justify-between items-center">
        <h4 class="font-bold text-gray-800">Detailed Information</h4>
        <label class="flex items-center">
          <span class="text-sm text-gray-600 mr-2">Advanced View</span>
          <span class="advanced-toggle relative inline-block w-10 h-5 bg-gray-200 rounded-full transition-colors">
            <input type="checkbox" class="sr-only">
            <span class="toggle-slider absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform"></span>
          </span>
        </label>
      </div>
    `;
    
    // Generate basic details sections
    html += `<div class="basic-details">`;
    
    // Add type-specific details
    switch (item.type) {
      case 'person':
        html += generatePersonDetailsHTML(item);
        break;
      case 'vehicle':
        html += generateVehicleDetailsHTML(item);
        break;
      case 'location':
        html += generateLocationDetailsHTML(item);
        break;
      case 'event':
        html += generateEventDetailsHTML(item);
        break;
    }
    
    html += `</div>`;
    
    return html;
  }
  
  function generatePersonDetailsHTML(person) {
    let html = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-white p-3 rounded border border-gray-200">
          <h5 class="font-medium text-gray-700 mb-2">Personal Details</h5>
          <div class="space-y-1 text-sm">
            <p><span class="font-medium">Full Name:</span> ${person.fullName || person.name}</p>
            <p><span class="font-medium">Date of Birth:</span> ${person.dateOfBirth || 'Unknown'}</p>
            <p><span class="font-medium">Gender:</span> ${person.gender || 'Unknown'}</p>
            <p><span class="font-medium">Address:</span> ${person.address || 'Unknown'}</p>
          </div>
        </div>
        
        <div class="bg-white p-3 rounded border border-gray-200">
          <h5 class="font-medium text-gray-700 mb-2">Identifiers</h5>
          <div class="space-y-1 text-sm">
            ${person.identifiers ? person.identifiers.map(id => 
              `<p><span class="font-medium">${id.type}:</span> ${id.value}</p>`
            ).join('') : '<p>No identifiers available</p>'}
          </div>
        </div>
      </div>
      
      <div class="advanced-section hidden space-y-4">
        <div class="bg-white p-3 rounded border border-gray-200">
          <h5 class="font-medium text-gray-700 mb-2">Warning Markers</h5>
          <div class="flex flex-wrap gap-2">
            ${person.warningMarkers && person.warningMarkers.length > 0 ? 
              person.warningMarkers.map(marker => 
                `<span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">${marker}</span>`
              ).join('') : 
              '<p class="text-sm text-gray-500">No warning markers</p>'}
          </div>
        </div>
        
        <div class="bg-white p-3 rounded border border-gray-200">
          <h5 class="font-medium text-gray-700 mb-2">Case Involvement</h5>
          ${person.caseInvolvement && person.caseInvolvement.length > 0 ? 
            person.caseInvolvement.map(caseItem => `
              <div class="p-2 mb-2 border border-gray-200 rounded text-sm">
                <p><span class="font-medium">Case:</span> ${caseItem.caseReference}</p>
                <p><span class="font-medium">Role:</span> ${caseItem.role}</p>
                <p><span class="font-medium">Date:</span> ${caseItem.date}</p>
              </div>
            `).join('') : 
            '<p class="text-sm text-gray-500">No case involvement</p>'}
        </div>
        
        <div class="bg-white p-3 rounded border border-gray-200">
          <h5 class="font-medium text-gray-700 mb-2">Intelligence</h5>
          ${person.intelligence && person.intelligence.length > 0 ? 
            person.intelligence.map(intel => `
              <div class="p-2 mb-2 border border-gray-200 rounded text-sm">
                <p><span class="font-medium">Source:</span> ${intel.source}</p>
                <p><span class="font-medium">Date:</span> ${intel.date}</p>
                <p><span class="font-medium">Info:</span> ${intel.information}</p>
              </div>
            `).join('') : 
            '<p class="text-sm text-gray-500">No intelligence data</p>'}
        </div>
      </div>
    `;
    
    return html;
  }
  
  function generateVehicleDetailsHTML(vehicle) {
    let html = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-white p-3 rounded border border-gray-200">
          <h5 class="font-medium text-gray-700 mb-2">Vehicle Details</h5>
          <div class="space-y-1 text-sm">
            <p><span class="font-medium">Registration:</span> ${vehicle.registration}</p>
            <p><span class="font-medium">Make/Model:</span> ${vehicle.make} ${vehicle.model}</p>
            <p><span class="font-medium">Color:</span> ${vehicle.color}</p>
            <p><span class="font-medium">Year:</span> ${vehicle.year || 'Unknown'}</p>
          </div>
        </div>
        
        <div class="bg-white p-3 rounded border border-gray-200">
          <h5 class="font-medium text-gray-700 mb-2">Owner Information</h5>
          <div class="space-y-1 text-sm">
            <p><span class="font-medium">Owner:</span> ${vehicle.ownerName || 'Unknown'}</p>
            <p><span class="font-medium">Owner ID:</span> ${vehicle.ownerId || 'Unknown'}</p>
            <p><span class="font-medium">Status:</span> ${vehicle.status || 'Unknown'}</p>
          </div>
        </div>
      </div>
      
      <div class="advanced-section hidden space-y-4">
        <div class="bg-white p-3 rounded border border-gray-200">
          <h5 class="font-medium text-gray-700 mb-2">ANPR History</h5>
          ${vehicle.anprHistory && vehicle.anprHistory.length > 0 ? 
            vehicle.anprHistory.map(anpr => `
              <div class="p-2 mb-2 border border-gray-200 rounded text-sm">
                <p><span class="font-medium">Location:</span> ${anpr.location}</p>
                <p><span class="font-medium">Date/Time:</span> ${anpr.datetime}</p>
                <p><span class="font-medium">Direction:</span> ${anpr.direction}</p>
              </div>
            `).join('') : 
            '<p class="text-sm text-gray-500">No ANPR history</p>'}
        </div>
        
        <div class="bg-white p-3 rounded border border-gray-200">
          <h5 class="font-medium text-gray-700 mb-2">Police Involvement</h5>
          ${vehicle.policeInvolvement && vehicle.policeInvolvement.length > 0 ? 
            vehicle.policeInvolvement.map(record => `
              <div class="p-2 mb-2 border border-gray-200 rounded text-sm">
                <p><span class="font-medium">Incident:</span> ${record.incident}</p>
                <p><span class="font-medium">Date:</span> ${record.date}</p>
                <p><span class="font-medium">Details:</span> ${record.details}</p>
              </div>
            `).join('') : 
            '<p class="text-sm text-gray-500">No police involvement</p>'}
        </div>
      </div>
    `;
    
    return html;
  }
  
  function generateLocationDetailsHTML(location) {
    let html = `
      <div class="bg-white p-3 rounded border border-gray-200 mb-4">
        <h5 class="font-medium text-gray-700 mb-2">Location Details</h5>
        <div class="space-y-1 text-sm">
          <p><span class="font-medium">Name:</span> ${location.name || 'Unknown'}</p>
          <p><span class="font-medium">Address:</span> ${location.address}</p>
          <p><span class="font-medium">Type:</span> ${location.type || 'Unknown'}</p>
          <p><span class="font-medium">Status:</span> ${location.status || 'Unknown'}</p>
        </div>
      </div>
      
      <div class="advanced-section hidden space-y-4">
        <div class="bg-white p-3 rounded border border-gray-200">
          <h5 class="font-medium text-gray-700 mb-2">Risk Assessment</h5>
          ${location.riskFactors && location.riskFactors.length > 0 ? 
            location.riskFactors.map(risk => `
              <div class="flex items-center space-x-2 mb-2">
                <span class="w-3 h-3 rounded-full ${
                  risk.level === 'High' ? 'bg-red-500' :
                  risk.level === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                }"></span>
                <span class="text-sm">${risk.type}: ${risk.level}</span>
              </div>
            `).join('') : 
            '<p class="text-sm text-gray-500">No risk factors</p>'}
        </div>
        
        <div class="bg-white p-3 rounded border border-gray-200">
          <h5 class="font-medium text-gray-700 mb-2">Recent Incidents</h5>
          ${location.incidents && location.incidents.length > 0 ? 
            location.incidents.map(incident => `
              <div class="p-2 mb-2 border border-gray-200 rounded text-sm">
                <p><span class="font-medium">Type:</span> ${incident.type}</p>
                <p><span class="font-medium">Date:</span> ${incident.date}</p>
                <p><span class="font-medium">Reference:</span> ${incident.reference}</p>
              </div>
            `).join('') : 
            '<p class="text-sm text-gray-500">No recent incidents</p>'}
        </div>
      </div>
    `;
    
    return html;
  }
  
  function generateEventDetailsHTML(event) {
    let html = `
      <div class="bg-white p-3 rounded border border-gray-200 mb-4">
        <h5 class="font-medium text-gray-700 mb-2">Event Details</h5>
        <div class="space-y-1 text-sm">
          <p><span class="font-medium">Title:</span> ${event.title || 'Unknown'}</p>
          <p><span class="font-medium">Type:</span> ${event.incidentType || 'Unknown'}</p>
          <p><span class="font-medium">Reference:</span> ${event.reference || 'Unknown'}</p>
          <p><span class="font-medium">Date:</span> ${event.date || 'Unknown'}</p>
          <p><span class="font-medium">Status:</span> ${event.status || 'Unknown'}</p>
        </div>
      </div>
      
      <div class="advanced-section hidden space-y-4">
        <div class="bg-white p-3 rounded border border-gray-200">
          <h5 class="font-medium text-gray-700 mb-2">Persons Involved</h5>
          ${event.involvedPersons && event.involvedPersons.length > 0 ? 
            event.involvedPersons.map(person => `
              <div class="p-2 mb-2 border border-gray-200 rounded text-sm">
                <p><span class="font-medium">Name:</span> ${person.name}</p>
                <p><span class="font-medium">Role:</span> ${person.role}</p>
                <p><span class="font-medium">ID:</span> ${person.id}</p>
              </div>
            `).join('') : 
            '<p class="text-sm text-gray-500">No persons involved</p>'}
        </div>
        
        <div class="bg-white p-3 rounded border border-gray-200">
          <h5 class="font-medium text-gray-700 mb-2">Incident Log</h5>
          ${event.incidentLog && event.incidentLog.length > 0 ? 
            event.incidentLog.map(log => `
              <div class="p-2 mb-2 border border-gray-200 rounded text-sm">
                <p><span class="font-medium">Time:</span> ${log.time}</p>
                <p><span class="font-medium">Officer:</span> ${log.officer}</p>
                <p><span class="font-medium">Entry:</span> ${log.entry}</p>
              </div>
            `).join('') : 
            '<p class="text-sm text-gray-500">No incident log entries</p>'}
        </div>
      </div>
    `;
    
    return html;
  }
  
  // Handle the advanced toggle in the main interface
  const mainAdvancedToggle = document.querySelector('.advanced-toggle input');
  if (mainAdvancedToggle) {
    mainAdvancedToggle.addEventListener('change', function() {
      const advancedSections = document.querySelectorAll('.advanced-section');
      advancedSections.forEach(section => {
        if (this.checked) {
          section.classList.remove('hidden');
        } else {
          section.classList.add('hidden');
        }
      });
    });
  }
  
  // Add CSS for the toggle
  const style = document.createElement('style');
  style.textContent = `
    .advanced-toggle input:checked + .toggle-slider {
      transform: translateX(1.25rem);
    }
    
    .advanced-toggle input:checked ~ .toggle-slider {
      background-color: #3B82F6;
    }
  `;
  document.head.appendChild(style);
});