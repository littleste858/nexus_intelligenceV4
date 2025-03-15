// Enhanced search implementation for Nexus Intelligence
// This code demonstrates how to implement the advanced search capabilities

// Mock database connections (in a real app, these would be API calls)
const dataSources = {
  storm: {
    name: "STORM",
    color: "red",
    description: "Incident Management System",
    entity: "incidents"
  },
  athena: {
    name: "Athena",
    color: "blue",
    description: "Crime Management System",
    entity: "crimes"
  },
  compact: {
    name: "Compact",
    color: "green",
    description: "Missing Persons Database",
    entity: "missing"
  },
  pnc: {
    name: "PNC",
    color: "orange",
    description: "Police National Computer",
    entity: "vehicles"
  },
  intel: {
    name: "Intelligence",
    color: "purple",
    description: "Intelligence Database",
    entity: "intel"
  }
};

// Enhanced search class with advanced capabilities
class NexusSearch {
  constructor() {
    this.searchHistory = [];
    this.savedSearches = {};
    this.results = {
      people: [],
      vehicles: [],
      locations: [],
      events: []
    };
    
    // Initialize UI elements
    this.searchInput = document.querySelector('#search-input');
    this.searchButton = document.querySelector('#search-button');
    this.resultsContainer = document.querySelector('#results-container');
    this.tabButtons = document.querySelectorAll('.tab-button');
    this.advancedToggle = document.querySelector('#advanced-toggle');
    
    this.bindEvents();
  }
  
  bindEvents() {
    // Search button event
    this.searchButton.addEventListener('click', () => {
      this.performSearch(this.searchInput.value);
    });
    
    // Enter key press
    this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.performSearch(this.searchInput.value);
      }
    });
    
    // Tab switching
    this.tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });
    
    // Advanced toggle
    this.advancedToggle.addEventListener('change', () => {
      this.toggleAdvancedView();
    });
  }
  
  /**
   * Enhanced search that processes natural language queries
   * @param {string} query - The search query
   */
  async performSearch(query) {
    // Record in search history
    this.searchHistory.unshift({
      query,
      timestamp: new Date(),
      id: Date.now()
    });
    
    // Show loading state
    this.setLoadingState(true);
    
    // Analyze the query for entity types and search parameters
    const queryAnalysis = this.analyzeQuery(query);
    
    // Perform search across all relevant systems
    const results = await this.federatedSearch(queryAnalysis);
    
    // Process and categorize results
    this.processResults(results, queryAnalysis);
    
    // Update the UI with results
    this.updateResultsUI();
    
    // Hide loading state
    this.setLoadingState(false);
    
    return results;
  }
  
  /**
   * Analyze the search query to extract entities and parameters
   * @param {string} query - The raw search query
   * @returns {Object} - The analyzed query parameters
   */
  analyzeQuery(query) {
    // Create a base analysis object
    const analysis = {
      rawQuery: query,
      entityTypes: [],
      parameters: {},
      filters: [],
      timeframe: null,
      location: null
    };
    
    // Person search patterns
    if (/born|dob|age|person|people|male|female|name/i.test(query)) {
      analysis.entityTypes.push('people');
      
      // Extract name
      const nameMatch = query.match(/([A-Z][a-z]+\s+[A-Z][a-z]+)/);
      if (nameMatch) {
        analysis.parameters.name = nameMatch[1];
      }
      
      // Extract DOB
      const dobMatch = query.match(/born\s+(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i) || 
                       query.match(/dob[:\s]+(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i);
      if (dobMatch) {
        analysis.parameters.dob = dobMatch[1];
      }
    }
    
    // Vehicle search patterns
    if (/vehicle|car|van|motorcycle|registration|reg|plate|license/i.test(query)) {
      analysis.entityTypes.push('vehicles');
      
      // Extract registration
      const regMatch = query.match(/([A-Z]{2}\d{2}\s*[A-Z]{3})/i) || 
                       query.match(/([A-Z][A-Z0-9]{1,3}\s*[0-9]{1,3}[A-Z]{1,3})/i);
      if (regMatch) {
        analysis.parameters.registration = regMatch[1];
      }
      
      // Extract vehicle make/model
      const makeModelMatch = query.match(/(ford|bmw|audi|toyota|honda|mercedes|volkswagen|nissan)\s+([a-z0-9]+)/i);
      if (makeModelMatch) {
        analysis.parameters.make = makeModelMatch[1];
        analysis.parameters.model = makeModelMatch[2];
      }
      
      // Extract color
      const colorMatch = query.match(/(red|blue|green|black|white|silver|grey|yellow|purple|brown)\s+(car|vehicle|van)/i);
      if (colorMatch) {
        analysis.parameters.color = colorMatch[1];
      }
    }
    
    // Location search patterns
    if (/location|address|street|road|avenue|place|postcode|zip|area|city|town/i.test(query)) {
      analysis.entityTypes.push('locations');
      
      // Extract location
      const locationMatch = query.match(/(in|at|near|around)\s+([A-Za-z\s]+(?:Road|Street|Avenue|Lane|Drive|Place|Rd|St|Ave|Ln|Dr|Pl))/i) ||
                            query.match(/([A-Za-z\s]+(?:Road|Street|Avenue|Lane|Drive|Place|Rd|St|Ave|Ln|Dr|Pl))/i);
      if (locationMatch) {
        analysis.location = locationMatch[2] || locationMatch[1];
        analysis.parameters.location = analysis.location;
      }
      
      // Extract city/area
      const areaMatch = query.match(/(Manchester|London|Birmingham|Leeds|Liverpool|Bristol|Sheffield|Newcastle|Nottingham|Southampton)/i);
      if (areaMatch) {
        analysis.parameters.area = areaMatch[1];
        if (!analysis.location) {
          analysis.location = areaMatch[1];
        }
      }
    }
    
    // Event search patterns
    if (/incident|crime|event|report|case|reported|happened|occurred|call/i.test(query)) {
      analysis.entityTypes.push('events');
      
      // Extract crime type
      const crimeTypeMatch = query.match(/(assault|theft|burglary|robbery|criminal damage|public order|drugs|fraud|violence)/i);
      if (crimeTypeMatch) {
        analysis.parameters.crimeType = crimeTypeMatch[1];
      }
    }
    
    // Extract time frame
    const timeMatch = query.match(/(today|yesterday|last week|last month|past (\d+) days)/i);
    if (timeMatch) {
      analysis.timeframe = timeMatch[1];
      
      let days = 0;
      if (timeMatch[1] === 'today') {
        days = 1;
      } else if (timeMatch[1] === 'yesterday') {
        days = 2;
      } else if (timeMatch[1] === 'last week') {
        days = 7;
      } else if (timeMatch[1] === 'last month') {
        days = 30;
      } else if (timeMatch[2]) {
        days = parseInt(timeMatch[2]);
      }
      
      analysis.parameters.daysBack = days;
    }
    
    // If no specific entity types detected, search all
    if (analysis.entityTypes.length === 0) {
      analysis.entityTypes = ['people', 'vehicles', 'locations', 'events'];
    }
    
    return analysis;
  }
  
  /**
   * Perform a federated search across multiple police systems
   * @param {Object} queryAnalysis - The analyzed query
   * @returns {Promise<Array>} - The search results
   */
  async federatedSearch(queryAnalysis) {
    // In a real implementation, this would make parallel API calls to different systems
    // For the demo, we'll simulate the API calls with mock data
    
    const allResults = [];
    const searchPromises = [];
    
    // Determine which systems to search based on entity types
    if (queryAnalysis.entityTypes.includes('people')) {
      searchPromises.push(this.searchSystem('athena', 'people', queryAnalysis));
      searchPromises.push(this.searchSystem('pnc', 'people', queryAnalysis));
    }
    
    if (queryAnalysis.entityTypes.includes('vehicles')) {
      searchPromises.push(this.searchSystem('pnc', 'vehicles', queryAnalysis));
    }
    
    if (queryAnalysis.entityTypes.includes('locations')) {
      searchPromises.push(this.searchSystem('storm', 'locations', queryAnalysis));
      searchPromises.push(this.searchSystem('athena', 'locations', queryAnalysis));
    }
    
    if (queryAnalysis.entityTypes.includes('events')) {
      searchPromises.push(this.searchSystem('storm', 'events', queryAnalysis));
      searchPromises.push(this.searchSystem('athena', 'events', queryAnalysis));
    }
    
    // Wait for all search promises to resolve
    const results = await Promise.all(searchPromises);
    
    // Flatten the results array
    results.forEach(systemResults => {
      allResults.push(...systemResults);
    });
    
    // Sort by confidence score
    allResults.sort((a, b) => b.confidenceScore - a.confidenceScore);
    
    return allResults;
  }
  
  /**
   * Search an individual system for the specified entity type
   * @param {string} system - The system to search (e.g., 'athena', 'storm')
   * @param {string} entityType - The type of entity to search for
   * @param {Object} queryAnalysis - The analyzed query
   * @returns {Promise<Array>} - The search results
   */
  async searchSystem(system, entityType, queryAnalysis) {
    // This would be an API call in a real implementation
    // For the demo, we'll return mock data
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
    
    // Get mock data based on the system and entity type
    const mockData = this.getMockData(system, entityType, queryAnalysis);
    
    // Apply the fuzzy matching algorithm to calculate confidence scores
    mockData.forEach(item => {
      item.confidenceScore = this.calculateConfidenceScore(item, queryAnalysis);
      item.system = system;
      item.entityType = entityType;
      item.dataSource = dataSources[system];
    });
    
    // Filter out low confidence matches
    return mockData.filter(item => item.confidenceScore > 30);
  }
  
  /**
   * Calculate a confidence score for a result based on how well it matches the query
   * @param {Object} item - The result item
   * @param {Object} queryAnalysis - The analyzed query
   * @returns {number} - The confidence score (0-100)
   */
  calculateConfidenceScore(item, queryAnalysis) {
    // Base score starts at 50
    let score = 50;
    
    // Add points for each matching parameter
    Object.keys(queryAnalysis.parameters).forEach(param => {
      if (item[param] && typeof item[param] === 'string' && 
          typeof queryAnalysis.parameters[param] === 'string') {
        
        const paramValue = item[param].toLowerCase();
        const queryValue = queryAnalysis.parameters[param].toLowerCase();
        
        // Exact match
        if (paramValue === queryValue) {
          score += 25;
        } 
        // Partial match
        else if (paramValue.includes(queryValue) || queryValue.includes(paramValue)) {
          score += 15;
        }
        // Fuzzy match (would use a proper fuzzy match algorithm in real implementation)
        else if (this.levenshteinDistance(paramValue, queryValue) < 3) {
          score += 10;
        }
      }
    });
    
    // Cap the score at 100
    return Math.min(100, score);
  }
  
  /**
   * Simple Levenshtein distance calculation for fuzzy matching
   * @param {string} a - First string
   * @param {string} b - Second string
   * @returns {number} - Edit distance between strings
   */
  levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    
    const matrix = [];
    
    // Initialize matrix
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    
    for (let i = 0; i <= a.length; i++) {
      matrix[0][i] = i;
    }
    
    // Fill matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i-1) === a.charAt(j-1)) {
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i-1][j-1] + 1, // substitution
            matrix[i][j-1] + 1,   // insertion
            matrix[i-1][j] + 1    // deletion
          );
        }
      }
    }
    
    return matrix[b.length][a.length];
  }
  
  /**
   * Process and categorize search results
   * @param {Array} results - The raw search results
   * @param {Object} queryAnalysis - The analyzed query
   */
  processResults(results, queryAnalysis) {
    // Reset results
    this.results = {
      people: [],
      vehicles: [],
      locations: [],
      events: []
    };
    
    // Categorize results by entity type
    results.forEach(result => {
      if (this.results[result.entityType]) {
        this.results[result.entityType].push(result);
      }
    });
  }
  
  /**
   * Update the UI with the search results
   */
  updateResultsUI() {
    // Clear existing results
    this.resultsContainer.innerHTML = '';
    
    // Get total count
    const totalCount = Object.values(this.results).reduce(
      (sum, arr) => sum + arr.length, 0
    );
    
    // Update tab counts
    this.updateTabCounts();
    
    // If no results, show a message
    if (totalCount === 0) {
      this.resultsContainer.innerHTML = `
        <div class="text-center py-8">
          <div class="text-gray-400 text-5xl mb-4">
            <i class="fas fa-search"></i>
          </div>
          <h3 class="text-xl font-medium text-gray-700 mb-2">No results found</h3>
          <p class="text-gray-500">Try adjusting your search terms or filters</p>
        </div>
      `;
      return;
    }
    
    // Create a results grid
    const resultsGrid = document.createElement('div');
    resultsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    
    // Get the active tab
    const activeTab = document.querySelector('.tab-button.active').dataset.tab;
    
    // Determine which results to show based on active tab
    let resultsToShow = [];
    if (activeTab === 'all') {
      // Combine all results
      Object.values(this.results).forEach(categoryResults => {
        resultsToShow = resultsToShow.concat(categoryResults);
      });
      
      // Sort by confidence score
      resultsToShow.sort((a, b) => b.confidenceScore - a.confidenceScore);
    } else {
      resultsToShow = this.results[activeTab] || [];
    }
    
    // Create result cards
    resultsToShow.forEach(result => {
      const card = this.createResultCard(result);
      resultsGrid.appendChild(card);
    });
    
    // Add the grid to the container
    this.resultsContainer.appendChild(resultsGrid);
    
    // Initialize card animations
    this.animateCards();
  }
  
  /**
   * Create a result card element for a search result
   * @param {Object} result - The search result
   * @returns {HTMLElement} - The card element
   */
  createResultCard(result) {
    const card = document.createElement('div');
    card.className = 'nexus-card slide-in';
    
    // Determine icon and color based on entity type
    let icon, bgColor, textColor;
    switch (result.entityType) {
      case 'people':
        icon = 'fa-user';
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-500';
        break;
      case 'vehicles':
        icon = 'fa-car';
        bgColor = 'bg-orange-100';
        textColor = 'text-orange-500';
        break;
      case 'locations':
        icon = 'fa-map-marker-alt';
        bgColor = 'bg-green-100';
        textColor = 'text-green-500';
        break;
      case 'events':
        icon = 'fa-exclamation-triangle';
        bgColor = 'bg-purple-100';
        textColor = 'text-purple-500';
        break;
    }
    
    // Confidence color
    let confidenceColor;
    if (result.confidenceScore >= 80) {
      confidenceColor = '#2ecc71'; // Green
    } else if (result.confidenceScore >= 60) {
      confidenceColor = '#f39c12'; // Orange
    } else {
      confidenceColor = '#e74c3c'; // Red
    }
    
    // Source indicator
    card.innerHTML = `
      <div class="data-source-indicator source-${result.system}"></div>
      <div class="p-4">
        <div class="flex justify-between items-start mb-3">
          <div>
            <div class="flex items-center">
              <span class="inline-block w-8 h-8 rounded-full ${bgColor} ${textColor} flex items-center justify-center mr-2">
                <i class="fas ${icon}"></i>
              </span>
              <span class="font-semibold text-gray-800">${result.title || result.name || 'Unnamed'}</span>
            </div>
            <div class="text-gray-500 text-sm mt-1">${result.subtitle || ''}</div>
          </div>
          <div class="bg-${result.dataSource.color}-100 text-${result.dataSource.color}-800 px-2 py-1 rounded-md text-xs font-semibold">
            ${result.dataSource.name}
          </div>
        </div>
        
        <div class="mb-3">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-600">Match Confidence</span>
            <span class="font-medium">${result.confidenceScore}%</span>
          </div>
          <div class="confidence-meter">
            <div class="confidence-level" style="width: ${result.confidenceScore}%; background-color: ${confidenceColor};"></div>
          </div>
        </div>
        
        <div class="text-sm text-gray-600 mb-4">
          ${this.generateCardDetails(result)}
        </div>
        
        <div class="text-xs text-gray-500 mb-3">
          ${result.lastActivity || ''}
        </div>
        
        <button class="w-full text-blue-600 hover:text-blue-800 text-sm font-medium text-center py-2 border border-blue-200 rounded-md hover:bg-blue-50 transition duration-300">
          View Complete ${this.getEntityName(result.entityType)}
        </button>
      </div>
      
      <!-- Advanced Info Section (Hidden by Default) -->
      <div class="border-t border-gray-200 p-4 bg-gray-50 hidden">
        ${this.generateAdvancedDetails(result)}
      </div>
    `;
    
    // Add event listener to the button
    const button = card.querySelector('button');
    button.addEventListener('click', () => {
      const advancedSection = card.querySelector('.border-t');
      advancedSection.classList.toggle('hidden');
    });
    
    return card;
  }
  
  /**
   * Generate the basic details HTML for a card based on result type
   * @param {Object} result - The search result
   * @returns {string} - HTML string
   */
  generateCardDetails(result) {
    switch (result.entityType) {
      case 'people':
        return `
          <div><i class="fas fa-map-marker-alt text-gray-400 mr-1"></i> ${result.address || 'No address'}</div>
          <div><i class="fas fa-id-card text-gray-400 mr-1"></i> ${result.identifier || 'No ID'}</div>
        `;
      case 'vehicles':
        return `
          <div><i class="fas fa-user text-gray-400 mr-1"></i> ${result.owner || 'Unknown owner'}</div>
          <div><i class="fas fa-calendar text-gray-400 mr-1"></i> ${result.registration_date || 'Unknown registration'}</div>
        `;
      case 'locations':
        return `
          <div><i class="fas fa-tag text-gray-400 mr-1"></i> ${result.locationType || 'Location'}</div>
          <div><i class="fas fa-history text-gray-400 mr-1"></i> ${result.incidentCount || '0'} recent incidents</div>
        `;
      case 'events':
        return `
          <div><i class="fas fa-tag text-gray-400 mr-1"></i> ${result.type || 'Unknown type'}</div>
          <div><i class="fas fa-map-marker-alt text-gray-400 mr-1"></i> ${result.location || 'Unknown location'}</div>
        `;
      default:
        return '';
    }
  }
  
  /**
   * Generate the advanced details HTML for a card based on result type
   * @param {Object} result - The search result
   * @returns {string} - HTML string
   */
  generateAdvancedDetails(result) {
    switch (result.entityType) {
      case 'people':
        return `
          <h4 class="font-medium text-gray-800 mb-2">Case Involvement</h4>
          <div class="space-y-2">
            ${this.generateCaseInvolvementHTML(result.cases || [])}
          </div>
          
          <h4 class="font-medium text-gray-800 mt-4 mb-2">Known Associates</h4>
          <div class="flex flex-wrap gap-2">
            ${this.generateAssociatesHTML(result.associates || [])}
          </div>
          
          <h4 class="font-medium text-gray-800 mt-4 mb-2">Intelligence Notes</h4>
          <div class="text-sm text-gray-600 italic">
            ${result.intel || 'No intelligence notes available.'}
          </div>
        `;
      case 'vehicles':
        return `
          <h4 class="font-medium text-gray-800 mb-2">Vehicle History</h4>
          <div class="space-y-2">
            <div class="text-sm text-gray-600">
              <span class="font-medium">MOT Status:</span> ${result.mot || 'Unknown'}
            </div>
            <div class="text-sm text-gray-600">
              <span class="font-medium">Insurance:</span> ${result.insurance || 'Unknown'}
            </div>
            <div class="text-sm text-gray-600">
              <span class="font-medium">Reported stolen:</span> ${result.stolen ? 'Yes' : 'No'}
            </div>
          </div>
          
          <h4 class="font-medium text-gray-800 mt-4 mb-2">ANPR Sightings ${result.anprSightings ? `(Last ${result.anprSightings.length})` : ''}</h4>
          <div class="text-sm text-gray-600">
            ${this.generateAnprSightingsHTML(result.anprSightings || [])}
          </div>
        `;
      case 'locations':
        return `
          <h4 class="font-medium text-gray-800 mb-2">Recent Incidents</h4>
          <div class="space-y-2">
            ${this.generateIncidentsHTML(result.incidents || [])}
          </div>
          
          <h4 class="font-medium text-gray-800 mt-4 mb-2">Crime Statistics</h4>
          <div class="text-sm text-gray-600">
            ${this.generateCrimeStatsHTML(result.crimeStats || {})}
          </div>
        `;
      case 'events':
        return `
          <h4 class="font-medium text-gray-800 mb-2">Incident Log</h4>
          <div class="space-y-2 text-sm">
            ${this.generateIncidentLogHTML(result.log || [])}
          </div>
          
          <h4 class="font-medium text-gray-800 mt-4 mb-2">Persons Present</h4>
          <div class="space-y-1 text-sm">
            ${this.generatePersonsHTML(result.persons || [])}
          </div>
          
          <h4 class="font-medium text-gray-800 mt-4 mb-2">Officer Notes</h4>
          <div class="text-sm text-gray-600 italic">
            ${result.notes || 'No notes available.'}
          </div>
        `;
      default:
        return '';
    }
  }
  
  /**
   * Update the tab count indicators
   */
  updateTabCounts() {
    // Update each tab count
    Object.keys(this.results).forEach(entityType => {
      const count = this.results[entityType].length;
      const tabIndicator = document.querySelector(`.tab-indicator.tab-${entityType}`);
      if (tabIndicator) {
        tabIndicator.textContent = count;
      }
    });
    
    // Update the "All" tab count
    const totalCount = Object.values(this.results).reduce(
      (sum, arr) => sum + arr.length, 0
    );
    const allTabIndicator = document.querySelector('.tab-indicator.tab-all');
    if (allTabIndicator) {
      allTabIndicator.textContent = totalCount;
    }
  }
  
  /**
   * Switch the active tab
   * @param {string} tabName - The tab to switch to
   */
  switchTab(tabName) {
    // Update active tab button
    this.tabButtons.forEach(button => {
      if (button.dataset.tab === tabName) {
        button.classList.add('active', 'border-blue-500', 'text-blue-600');
        button.classList.remove('text-gray-600');
      } else {
        button.classList.remove('active', 'border-blue-500', 'text-blue-600');
        button.classList.add('text-gray-600');
      }
    });
    
    // Update results
    this.updateResultsUI();
  }
  
  /**
   * Toggle advanced view for all cards
   */
  toggleAdvancedView() {
    const advancedSections = document.querySelectorAll('.nexus-card .border-t');
    advancedSections.forEach(section => {
      if (this.advancedToggle.checked) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
  }
  
  /**
   * Set the loading state
   * @param {boolean} isLoading - Whether the app is loading
   */
  setLoadingState(isLoading) {
    const loadingIndicator = document.querySelector('#loading-indicator');
    if (loadingIndicator) {
      if (isLoading) {
        loadingIndicator.classList.remove('hidden');
      } else {
        loadingIndicator.classList.add('hidden');
      }
    }
  }
  
  /**
   * Animate cards for a smooth entrance
   */
  animateCards() {
    const cards = document.querySelectorAll('.nexus-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }
  
  // Helper methods for generating HTML sections
  generateCaseInvolvementHTML(cases) {
    if (cases.length === 0) {
      return '<div class="text-sm text-gray-600">No case involvement found.</div>';
    }
    
    return cases.map(caseItem => `
      <div class="text-sm text-gray-600">
        <span class="font-medium">${caseItem.reference || 'Unknown'}</span> - ${caseItem.role || 'Unknown role'} in ${caseItem.type || 'Unknown case type'} (${caseItem.date || 'Unknown date'})
      </div>
    `).join('');
  }
  
  generateAssociatesHTML(associates) {
    if (associates.length === 0) {
      return '<div class="text-sm text-gray-600">No known associates.</div>';
    }
    
    return associates.map(associate => `
      <div class="bg-white text-xs px-2 py-1 rounded border border-gray-200">
        ${associate.name || 'Unknown'}
      </div>
    `).join('');
  }
  
  generateAnprSightingsHTML(sightings) {
    if (sightings.length === 0) {
      return '<div class="text-sm text-gray-600">No ANPR sightings recorded.</div>';
    }
    
    return sightings.map(sighting => `
      <div class="flex justify-between">
        <span>${sighting.location || 'Unknown location'}</span>
        <span>${sighting.date || 'Unknown date'}</span>
      </div>
    `).join('');
  }
  
  generateIncidentsHTML(incidents) {
    if (incidents.length === 0) {
      return '<div class="text-sm text-gray-600">No recent incidents recorded.</div>';
    }
    
    return incidents.map(incident => `
      <div class="text-sm text-gray-600">
        <span class="font-medium">${incident.reference || 'Unknown'}</span> - ${incident.type || 'Unknown'} (${incident.date || 'Unknown date'})
      </div>
    `).join('');
  }
  
  generateCrimeStatsHTML(stats) {
    if (!stats || Object.keys(stats).length === 0) {
      return '<div class="text-sm text-gray-600">No crime statistics available.</div>';
    }
    
    let html = '<div class="space-y-2">';
    
    // Add total count
    if (stats.total) {
      html += `<div class="font-medium">Total Incidents: ${stats.total}</div>`;
    }
    
    // Add breakdown by type if available
    if (stats.byType && Object.keys(stats.byType).length > 0) {
      html += '<div class="space-y-1 mt-2">';
      
      Object.entries(stats.byType).forEach(([type, count]) => {
        // Calculate percentage
        const percentage = stats.total ? Math.round((count / stats.total) * 100) : 0;
        
        html += `
          <div>
            <div class="flex justify-between text-sm">
              <span>${type}</span>
              <span>${count} (${percentage}%)</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" style="width: ${percentage}%"></div>
            </div>
          </div>
        `;
      });
      
      html += '</div>';
    }
    
    html += '</div>';
    
    return html;
  }
  
  generateIncidentLogHTML(log) {
    if (log.length === 0) {
      return '<div class="text-sm text-gray-600">No incident log available.</div>';
    }
    
    return log.map(entry => `
      <div class="flex">
        <span class="text-gray-500 w-16">${entry.time || ''}</span>
        <span class="text-gray-700">${entry.action || ''}</span>
      </div>
    `).join('');
  }
  
  generatePersonsHTML(persons) {
    if (persons.length === 0) {
      return '<div class="text-sm text-gray-600">No persons recorded.</div>';
    }
    
    return persons.map(person => `
      <div class="text-gray-600">${person.name || 'Unknown'} - ${person.role || 'Unknown role'}</div>
    `).join('');
  }
  
  /**
   * Get a friendly entity name for display
   * @param {string} entityType - The entity type
   * @returns {string} - The friendly name
   */
  getEntityName(entityType) {
    switch (entityType) {
      case 'people': return 'Profile';
      case 'vehicles': return 'Vehicle History';
      case 'locations': return 'Location Details';
      case 'events': return 'Incident Details';
      default: return 'Details';
    }
  }
  
  /**
   * Generate mock data for testing
   * @param {string} system - The system name
   * @param {string} entityType - The entity type
   * @param {Object} queryAnalysis - The query analysis
   * @returns {Array} - Mock data
   */
  getMockData(system, entityType, queryAnalysis) {
    // This would be replaced with actual API calls in a real implementation
    
    // Generate different mock data based on the system and entity type
    switch (`${system}-${entityType}`) {
      case 'athena-people':
        return [
          {
            name: 'John Smith',
            title: 'John Smith',
            subtitle: 'DOB: 12/05/1985 (38 yrs)',
            dob: '12/05/1985',
            address: '34 Oxford Road, Manchester',
            identifier: 'PNC: 2008/123456A',
            lastActivity: 'Last interaction: 03/02/2025 - Witness Statement',
            cases: [
              { reference: 'CRN: CR82451', role: 'Witness', type: 'Assault', date: '14/01/2025' },
              { reference: 'CRN: CR63281', role: 'Arrested', type: 'Criminal Damage', date: '22/11/2024' }
            ],
            associates: [
              { name: 'Michael Richards' },
              { name: 'Daniel Thompson' }
            ],
            intel: 'Subject has known connections to Manchester area drug supply. Flagged for officer safety due to previous possession of weapons.'
          },
          {
            name: 'Jonathan Smithson',
            title: 'Jonathan Smithson',
            subtitle: 'DOB: 23/09/1983 (41 yrs)',
            dob: '23/09/1983',
            address: '12 Wilmslow Road, Manchester',
            identifier: 'PNC: 2015/789123B',
            lastActivity: 'Last interaction: 15/01/2025 - Victim Statement',
            cases: [
              { reference: 'CRN: CR79123', role: 'Victim', type: 'Burglary', date: '15/01/2025' }
            ],
            associates: [],
            intel: 'No intelligence notes available.'
          }
        ];
        
      case 'pnc-people':
        return [
          {
            name: 'John A. Smith',
            title: 'John A. Smith',
            subtitle: 'DOB: 12/05/1985 (38 yrs)',
            dob: '12/05/1985',
            address: '34 Oxford Road, Manchester',
            identifier: 'PNC: 2008/123456A',
            lastActivity: 'Last detention: 22/11/2024 - Manchester Custody',
            cases: [
              { reference: 'ARR: 24/11253', role: 'Detained', type: 'Criminal Damage', date: '22/11/2024' },
              { reference: 'ARR: 23/09871', role: 'Detained', type: 'Public Order', date: '14/08/2023' }
            ],
            associates: [
              { name: 'Michael Richards' },
              { name: 'Daniel Thompson' },
              { name: 'Sarah Williams' }
            ],
            intel: 'Subject has previous convictions for possession of Class B drugs and public order offenses.'
          }
        ];
        
      case 'pnc-vehicles':
        return [
          {
            title: 'Ford Focus (Red)',
            subtitle: 'Reg: DL62 WRX',
            registration: 'DL62 WRX',
            make: 'Ford',
            model: 'Focus',
            color: 'Red',
            owner: 'Registered Owner: John Smith',
            registration_date: 'First registered: 08/2018',
            lastActivity: 'Last sighting: ANPR Camera #142 - 10/03/2025 08:23',
            mot: 'Valid until 07/2025',
            insurance: 'Insured with DirectLine',
            stolen: false,
            anprSightings: [
              { location: 'Camera #142 - Manchester', date: '10/03/2025 08:23' },
              { location: 'Camera #087 - Salford', date: '08/03/2025 17:42' },
              { location: 'Camera #142 - Manchester', date: '07/03/2025 09:12' }
            ]
          },
          {
            title: 'Toyota Prius (Blue)',
            subtitle: 'Reg: MA19 KLN',
            registration: 'MA19 KLN',
            make: 'Toyota',
            model: 'Prius',
            color: 'Blue',
            owner: 'Registered Owner: John Smith',
            registration_date: 'First registered: 03/2019',
            lastActivity: 'Last sighting: ANPR Camera #056 - 09/03/2025 14:37',
            mot: 'Valid until 03/2026',
            insurance: 'Insured with Aviva',
            stolen: false,
            anprSightings: [
              { location: 'Camera #056 - Stockport', date: '09/03/2025 14:37' },
              { location: 'Camera #142 - Manchester', date: '09/03/2025 09:08' },
              { location: 'Camera #056 - Stockport', date: '08/03/2025 15:21' }
            ]
          }
        ];
        
      case 'storm-events':
        return [
          {
            title: 'Incident Report',
            subtitle: 'Ref: INC-20250302-421',
            reference: 'INC-20250302-421',
            type: 'Disturbance - Residential',
            location: '34 Oxford Road, Manchester',
            date: '02/03/2025',
            time: '22:47',
            lastActivity: 'Reported: 02/03/2025 22:47 - Caller: Anonymous',
            log: [
              { time: '22:47', action: 'Call received - Reports of loud argument at location' },
              { time: '22:53', action: 'Units dispatched - ETA 10 mins' },
              { time: '23:05', action: 'Officers on scene - Speaking with occupants' },
              { time: '23:27', action: 'Incident resolved - Verbal argument only, no offenses' }
            ],
            persons: [
              { name: 'John Smith', role: 'Occupant' },
              { name: 'Sarah Williams', role: 'Occupant' }
            ],
            notes: 'Verbal argument between cohabitants over financial matters. No signs of physical altercation or criminal offenses. Both parties calmed and advised.'
          },
          {
            title: 'Incident Report',
            subtitle: 'Ref: INC-20250225-189',
            reference: 'INC-20250225-189',
            type: 'Suspicious Circumstances',
            location: 'Near 56 Oxford Road, Manchester',
            date: '25/02/2025',
            time: '19:32',
            lastActivity: 'Reported: 25/02/2025 19:32 - Caller: Member of Public',
            log: [
              { time: '19:32', action: 'Call received - Reports of suspicious male loitering' },
              { time: '19:40', action: 'Units dispatched - ETA 12 mins' },
              { time: '19:52', action: 'Officers on scene - Area search conducted' },
              { time: '20:15', action: 'No trace of described male - Log closed' }
            ],
            persons: [
              { name: 'Unknown Male', role: 'Subject of Call' }
            ],
            notes: 'Area search conducted but no trace of described male. Description was vague - male, 30-40 years, dark clothing. Insufficient grounds for further action.'
          }
        ];
        
      case 'athena-events':
        return [
          {
            title: 'Crime Report',
            subtitle: 'Ref: CR-20250214-103',
            reference: 'CR-20250214-103',
            type: 'Criminal Damage',
            location: '12 Station Road, Manchester',
            date: '14/02/2025',
            time: '14:22',
            lastActivity: 'Status: Under Investigation',
            log: [
              { time: '14:22', action: 'Crime reported - Damage to shop front' },
              { time: '15:45', action: 'Officer assigned - PC 4532 JONES' },
              { time: '16:30', action: 'Scene attendance - Photography completed' },
              { time: '17:15', action: 'Statement taken from IP - SMITH, John' }
            ],
            persons: [
              { name: 'John Smith', role: 'Victim' },
              { name: 'Unknown Suspect', role: 'Offender' }
            ],
            notes: 'Shop front window damaged. CCTV collected from location and surrounding businesses. IP believes it may be related to recent argument with customer.'
          }
        ];
        
      case 'storm-locations':
        return [
          {
            title: 'Oxford Road Area',
            subtitle: 'Manchester City Centre',
            address: 'Oxford Road, Manchester',
            locationType: 'Mixed Commercial/Residential',
            incidentCount: '23',
            lastActivity: 'Last incident: 02/03/2025 - Disturbance',
            incidents: [
              { reference: 'INC-20250302-421', type: 'Disturbance - Residential', date: '02/03/2025' },
              { reference: 'INC-20250225-189', type: 'Suspicious Circumstances', date: '25/02/2025' },
              { reference: 'INC-20250217-092', type: 'Theft from Person', date: '17/02/2025' }
            ],
            crimeStats: {
              total: 23,
              byType: {
                'Anti-Social Behavior': 7,
                'Theft': 5,
                'Criminal Damage': 4,
                'Public Order': 3,
                'Assault': 2,
                'Other': 2
              }
            }
          },
          {
            title: 'Manchester City Centre',
            subtitle: 'Central Business District',
            address: 'Manchester City Centre',
            locationType: 'Commercial/Entertainment',
            incidentCount: '156',
            lastActivity: 'Multiple daily incidents',
            incidents: [
              { reference: 'INC-20250311-203', type: 'Theft from Person', date: '11/03/2025' },
              { reference: 'INC-20250311-187', type: 'Public Order', date: '11/03/2025' },
              { reference: 'INC-20250310-342', type: 'Anti-Social Behavior', date: '10/03/2025' }
            ],
            crimeStats: {
              total: 156,
              byType: {
                'Anti-Social Behavior': 42,
                'Theft': 38,
                'Public Order': 29,
                'Assault': 22,
                'Criminal Damage': 15,
                'Drugs': 6,
                'Other': 4
              }
            }
          }
        ];
        
      case 'athena-locations':
        return [
          {
            title: '34 Oxford Road',
            subtitle: 'Manchester, M13',
            address: '34 Oxford Road, Manchester, M13 4PL',
            locationType: 'Residential',
            incidentCount: '2',
            lastActivity: 'Last report: 02/03/2025 - Disturbance',
            incidents: [
              { reference: 'INC-20250302-421', type: 'Disturbance - Residential', date: '02/03/2025' },
              { reference: 'INC-20241128-503', type: 'Criminal Damage', date: '28/11/2024' }
            ],
            crimeStats: {
              total: 2,
              byType: {
                'Disturbance': 1,
                'Criminal Damage': 1
              }
            }
          }
        ];
        
      default:
        return [];
    }
  }
}

// Initialize the search functionality when the page loads
document.addEventListener('DOMContentLoaded', function() {
  const nexusSearch = new NexusSearch();
  
  // For demo purposes, simulate a search
  setTimeout(() => {
    nexusSearch.performSearch('John Smith');
  }, 1000);
});

    
