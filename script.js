// This code runs immediately when the script loads
console.log("Script loading...");

// Wait for DOM to be fully loaded
window.onload = function() {
  console.log("Window loaded");
  
  // Get elements by their tags if IDs aren't working
  var searchBtn = document.querySelector('button.bg-blue-600');
  var searchInput = document.querySelector('input[placeholder*="Search"]');
  var resultsContainer = document.getElementById('results-container');
  
  console.log("Search button found:", searchBtn !== null);
  console.log("Search input found:", searchInput !== null);
  console.log("Results container found:", resultsContainer !== null);
  
  // Add click event listener to search button
  if (searchBtn) {
    console.log("Adding click listener to search button");
    searchBtn.onclick = function() {
      console.log("Search button clicked");
      displayResults();
    };
  }
  
  // Function to display results
  function displayResults() {
    console.log("Displaying results");
    
    if (resultsContainer) {
      resultsContainer.innerHTML = `
        <!-- Person Card Example -->
        <div class="nexus-card slide-in">
          <div class="data-source-indicator source-athena"></div>
          <div class="p-4">
            <div class="flex justify-between items-start mb-3">
              <div>
                <div class="flex items-center">
                  <span class="inline-block w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-2">
                    <i class="fas fa-user"></i>
                  </span>
                  <span class="font-semibold text-gray-800">John Smith</span>
                </div>
                <div class="text-gray-500 text-sm mt-1">DOB: 12/05/1985 (38 yrs)</div>
              </div>
              <div class="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-semibold">
                Athena
              </div>
            </div>
            
            <div class="mb-3">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600">Match Confidence</span>
                <span class="font-medium">87%</span>
              </div>
              <div class="confidence-meter">
                <div class="confidence-level" style="width: 87%; background-color: #2ecc71;"></div>
              </div>
            </div>
            
            <div class="text-sm text-gray-600 mb-4">
              <div><i class="fas fa-map-marker-alt text-gray-400 mr-1"></i> 34 Oxford Road, Manchester</div>
              <div><i class="fas fa-id-card text-gray-400 mr-1"></i> PNC: 2008/123456A</div>
            </div>
            
            <div class="text-xs text-gray-500 mb-3">
              Last interaction: 03/02/2025 - Witness Statement
            </div>
            
            <button class="w-full text-blue-600 hover:text-blue-800 text-sm font-medium text-center py-2 border border-blue-200 rounded-md hover:bg-blue-50 transition duration-300">
              View Complete Profile
            </button>
          </div>
        </div>
      `;
    } else {
      console.error("Results container not found");
    }
  }
  
  // Add a simpler test button at the top of the page for debugging
  var body = document.body;
  var testButton = document.createElement('button');
  testButton.textContent = "TEST SEARCH";
  testButton.style.position = "fixed";
  testButton.style.top = "10px";
  testButton.style.right = "10px";
  testButton.style.zIndex = "9999";
  testButton.style.padding = "10px";
  testButton.style.background = "red";
  testButton.style.color = "white";
  testButton.onclick = displayResults;
  body.appendChild(testButton);
  
  console.log("Setup complete");
};
