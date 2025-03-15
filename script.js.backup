// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
  console.log("Document loaded - setting up search handler");
  
  // Get the search button and input
  const searchButton = document.querySelector('.bg-blue-600');
  const searchInput = document.querySelector('input[placeholder*="Search"]');
  
  // Log what we found for debugging
  console.log("Search button found:", searchButton !== null);
  console.log("Search input found:", searchInput !== null);
  
  // Add click event to search button
  if (searchButton) {
    searchButton.addEventListener('click', function() {
      performSearch();
    });
  }
  
  // Add enter key press to search input
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
  
  // Search function
  function performSearch() {
    const query = searchInput ? searchInput.value : '';
    console.log("Performing search for:", query);
    
    // Add a message to show the search is working
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
      // Show a "searching" message
      resultsContainer.innerHTML = `
        <div class="p-4 text-center">
          <p class="text-lg font-medium mb-4">Searching for "${query}"...</p>
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      `;
      
      // After a short delay, display mock results
      setTimeout(function() {
        resultsContainer.innerHTML = `
          <div class="nexus-card slide-in">
            <div class="data-source-indicator source-athena"></div>
            <div class="p-4">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <div class="flex items-center">
                    <span class="inline-block w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-2">
                      <i class="fas fa-user"></i>
                    </span>
                    <span class="font-semibold text-gray-800">${query}</span>
                  </div>
                  <div class="text-gray-500 text-sm mt-1">Search Term</div>
                </div>
                <div class="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-semibold">
                  Search Result
                </div>
              </div>
              
              <div class="mb-3">
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">Match Confidence</span>
                  <span class="font-medium">100%</span>
                </div>
                <div class="confidence-meter">
                  <div class="confidence-level" style="width: 100%; background-color: #2ecc71;"></div>
                </div>
              </div>
              
              <div class="text-sm text-gray-600 mb-4">
                <div><i class="fas fa-info-circle text-gray-400 mr-1"></i> Custom search results for "${query}"</div>
                <div><i class="fas fa-clock text-gray-400 mr-1"></i> Search performed: ${new Date().toLocaleTimeString()}</div>
              </div>
              
              <button class="w-full text-blue-600 hover:text-blue-800 text-sm font-medium text-center py-2 border border-blue-200 rounded-md hover:bg-blue-50 transition duration-300">
                View Details
              </button>
            </div>
          </div>
        `;
      }, 1500);
    }
  }
});
