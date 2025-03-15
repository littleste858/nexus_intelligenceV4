// Enhanced search function that supports fuzzy matching and partial matches
// Implementation using Fuse.js for fuzzy search capabilities

// Configuration for fuzzy search
const fuseOptions = {
  includeScore: true,
  threshold: 0.4, // Lower threshold means stricter matching
  keys: [
    // People search keys
    'name',
    'fullName',
    'aliases',
    'identifiers.value',
    'dateOfBirth',
    
    // Vehicle search keys
    'registration',
    'make',
    'model',
    'color',
    'ownerName',
    
    // Location search keys
    'address',
    'name',
    'description',
    
    // Event search keys
    'title',
    'description',
    'date',
    'reference',
    'involvedPersons.name',
    'incidentType'
  ]
};

// Enhanced search function - made globally available
window.performSearch = function(query, data) {
  if (!query || query.trim() === '') {
    return {
      allResults: [],
      peopleResults: [],
      vehicleResults: [],
      locationResults: [],
      eventResults: []
    };
  }

  // Create Fuse instances for each data type
  const peopleFuse = new Fuse(data.people || [], { 
    ...fuseOptions, 
    keys: fuseOptions.keys.filter(k => k === 'name' || k === 'fullName' || k === 'aliases' || k === 'dateOfBirth' || k === 'identifiers.value') 
  });
  
  const vehicleFuse = new Fuse(data.vehicles || [], { 
    ...fuseOptions, 
    keys: fuseOptions.keys.filter(k => k === 'registration' || k === 'make' || k === 'model' || k === 'color' || k === 'ownerName') 
  });
  
  const locationFuse = new Fuse(data.locations || [], { 
    ...fuseOptions, 
    keys: fuseOptions.keys.filter(k => k === 'address' || k === 'name' || k === 'description') 
  });
  
  const eventFuse = new Fuse(data.events || [], { 
    ...fuseOptions, 
    keys: fuseOptions.keys.filter(k => k === 'title' || k === 'description' || k === 'date' || k === 'reference' || k === 'involvedPersons.name' || k === 'incidentType') 
  });

  // Perform searches
  const peopleResults = peopleFuse.search(query).map(result => ({
    ...result.item,
    confidence: Math.round((1 - result.score) * 100),
    type: 'person'
  }));

  const vehicleResults = vehicleFuse.search(query).map(result => ({
    ...result.item,
    confidence: Math.round((1 - result.score) * 100),
    type: 'vehicle'
  }));

  const locationResults = locationFuse.search(query).map(result => ({
    ...result.item,
    confidence: Math.round((1 - result.score) * 100),
    type: 'location'
  }));

  const eventResults = eventFuse.search(query).map(result => ({
    ...result.item,
    confidence: Math.round((1 - result.score) * 100),
    type: 'event'
  }));

  // Combine all results
  const allResults = [
    ...peopleResults,
    ...vehicleResults,
    ...locationResults,
    ...eventResults
  ].sort((a, b) => b.confidence - a.confidence);

  return {
    allResults,
    peopleResults,
    vehicleResults,
    locationResults,
    eventResults
  };
};

// Helper function to get counts for the search results - made globally available
window.getResultCounts = function(results) {
  return {
    all: results.allResults.length,
    people: results.peopleResults.length,
    vehicles: results.vehicleResults.length,
    locations: results.locationResults.length,
    events: results.eventResults.length
  };
};