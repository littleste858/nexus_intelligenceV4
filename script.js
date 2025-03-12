document.addEventListener('DOMContentLoaded', function() {
    // Initialize the advanced search functionality if the class exists
    if (typeof NexusSearch !== 'undefined') {
        const nexusSearch = new NexusSearch();
    }
    
    // Initialize the detailed view if the class exists
    if (typeof DetailedView !== 'undefined') {
        const detailedView = new DetailedView();
        
        // Add event listeners to view buttons
        document.addEventListener('click', function(e) {
            if (e.target.closest('.nexus-card button')) {
                const card = e.target.closest('.nexus-card');
                const entityType = card.dataset.entityType;
                const entityId = card.dataset.id;
                
                // Find the record in the mock data
                const record = findRecordById(entityType, entityId);
                if (record) {
                    detailedView.showDetailedView(record);
                }
            }
        });
    }
    
    // Keep your existing code below
});

// Helper function to find records
function findRecordById(entityType, id) {
    if (typeof nexusData !== 'undefined') {
        return nexusData[entityType]?.find(item => item.id === id);
    }
    return null;
}

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const examples = document.getElementById('examples');
const results = document.getElementById('results');
const loading = document.getElementById('loading');
const resultsContainer = document.getElementById('results-container');
const clearBtn = document.getElementById('clear-btn');
const exampleItems = document.querySelectorAll('.example-item');

// Search function
function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    // Show loading state
    examples.style.display = 'none';
    loading.style.display = 'block';
    results.style.display = 'none';
    resultsContainer.innerHTML = '';

    // Simulate search delay
    setTimeout(() => {
        // Hide loading
        loading.style.display = 'none';
        results.style.display = 'block';

        // Generate results based on query
        if (query.toLowerCase().includes('john smith') || query.toLowerCase().includes('12/05/1985')) {
            // Person search
            resultsContainer.innerHTML = `
                <div class="result-card" data-id="p1">
                    <div class="result-header">
                        <div>
                            <div class="result-title">John Smith</div>
                            <div class="result-subtitle">DOB: 11/05/1985</div>
                            <div class="result-source">Source: STORM (Incident System)</div>
                        </div>
                        <div class="result-meta">
                            <div class="confidence high">Match: 92%</div>
                        </div>
                    </div>
                    <div class="result-details" id="details-p1">
                        <div class="detail-grid">
                            <div>
                                <div class="detail-title">Last Known Address</div>
                                <div class="detail-content">45 Maple Street, Manchester, M1 5RT</div>
                            </div>
                            <div>
                                <div class="detail-title">Last Seen</div>
                                <div class="detail-content">15/02/2025</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">System References</div>
                                <div class="detail-content">STORM: 128475<br>Athena: 58392</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">Additional Details</div>
                                <div class="detail-content">Previous convictions for theft and assault. Currently on probation.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="result-card" data-id="p2">
                    <div class="result-header">
                        <div>
                            <div class="result-title">Jonathan Smyth</div>
                            <div class="result-subtitle">DOB: 12/05/1985</div>
                            <div class="result-source">Source: Athena (Crime Management System)</div>
                        </div>
                        <div class="result-meta">
                            <div class="confidence medium">Match: 89%</div>
                        </div>
                    </div>
                    <div class="result-details" id="details-p2">
                        <div class="detail-grid">
                            <div>
                                <div class="detail-title">Last Known Address</div>
                                <div class="detail-content">28 Oak Road, Birmingham, B2 7PQ</div>
                            </div>
                            <div>
                                <div class="detail-title">Last Seen</div>
                                <div class="detail-content">20/02/2025</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">System References</div>
                                <div class="detail-content">Athena: 59273</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">Additional Details</div>
                                <div class="detail-content">Suspected involvement in local drug distribution network.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="result-card" data-id="p3">
                    <div class="result-header">
                        <div>
                            <div class="result-title">Jonathon Smith</div>
                            <div class="result-subtitle">DOB: 12/06/1985</div>
                            <div class="result-source">Source: Crimes (Historical Crime Records)</div>
                        </div>
                        <div class="result-meta">
                            <div class="confidence medium">Match: 85%</div>
                        </div>
                    </div>
                    <div class="result-details" id="details-p3">
                        <div class="detail-grid">
                            <div>
                                <div class="detail-title">Last Known Address</div>
                                <div class="detail-content">7 Pine Lane, Manchester, M4 2WE</div>
                            </div>
                            <div>
                                <div class="detail-title">Last Seen</div>
                                <div class="detail-content">05/03/2025</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">System References</div>
                                <div class="detail-content">Crimes: 73924</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">Additional Details</div>
                                <div class="detail-content">No active warrants. Past involvement in vehicle theft.</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (query.toLowerCase().includes('manchester') || query.toLowerCase().includes('city centre')) {
            // Location search
            resultsContainer.innerHTML = `
                <div class="result-card" data-id="l1">
                    <div class="result-header">
                        <div>
                            <div class="result-title">Manchester City Centre</div>
                            <div class="result-subtitle">Crime statistics for Last 30 days</div>
                            <div class="result-source">Source: Athena (Crime Management System)</div>
                        </div>
                    </div>
                    <div class="result-details" id="details-l1">
                        <table>
                            <thead>
                                <tr>
                                    <th>Crime Type</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Theft</td>
                                    <td>32</td>
                                </tr>
                                <tr>
                                    <td>Assault</td>
                                    <td>18</td>
                                </tr>
                                <tr>
                                    <td>Drug Offences</td>
                                    <td>24</td>
                                </tr>
                                <tr>
                                    <td>Criminal Damage</td>
                                    <td>15</td>
                                </tr>
                                <tr>
                                    <td>Public Order</td>
                                    <td>27</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Total</td>
                                    <td>116</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            `;
        } else if (query.toLowerCase().includes('sarah') || query.toLowerCase().includes('missing')) {
            // Missing person search
            resultsContainer.innerHTML = `
                <div class="result-card" data-id="mp1">
                    <div class="result-header">
                        <div>
                            <div class="result-title">Sarah Johnson <span class="badge">Missing</span></div>
                            <div class="result-subtitle">DOB: 23/09/1992</div>
                            <div class="result-source">Source: Compact (Missing Persons Database)</div>
                        </div>
                        <div class="result-meta">
                            <div class="confidence high">Risk: Medium</div>
                        </div>
                    </div>
                    <div class="result-details" id="details-mp1">
                        <div class="detail-grid">
                            <div>
                                <div class="detail-title">Date Reported Missing</div>
                                <div class="detail-content">28/02/2025</div>
                            </div>
                            <div>
                                <div class="detail-title">Last Seen</div>
                                <div class="detail-content">Piccadilly Gardens, Manchester</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">System Reference</div>
                                <div class="detail-content">Compact: MP-39284</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">Additional Details</div>
                                <div class="detail-content">Last seen wearing black jeans and red jacket. Reported missing by mother.</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (query.toLowerCase().includes('bmw') || query.toLowerCase().includes('stolen') || (query.toLowerCase().includes('black') && query.toLowerCase().includes('vehicle'))) {
            // Vehicle search
            resultsContainer.innerHTML = `
                <div class="result-card" data-id="v1">
                    <div class="result-header">
                        <div>
                            <div class="result-title">BMW 3 Series <span class="badge">Stolen</span></div>
                            <div class="result-subtitle">Registration: MJ71 XYZ</div>
                            <div class="result-source">Source: PNC (Police National Computer)</div>
                        </div>
                        <div class="result-meta">
                            <div class="confidence high">Match: 94%</div>
                        </div>
                    </div>
                    <div class="result-details" id="details-v1">
                        <div class="detail-grid">
                            <div>
                                <div class="detail-title">Vehicle Details</div>
                                <div class="detail-content">Make: BMW<br>Model: 320d M Sport<br>Color: Black<br>Year: 2021</div>
                            </div>
                            <div>
                                <div class="detail-title">Theft Details</div>
                                <div class="detail-content">Reported: 22/02/2025<br>Location: Deansgate, Manchester</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">System References</div>
                                <div class="detail-content">PNC: VEH-57392<br>STORM: 128742</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">Additional Details</div>
                                <div class="detail-content">Reported stolen from a secure car park. CCTV footage available. Owner: James Wilson.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="result-card" data-id="v2">
                    <div class="result-header">
                        <div>
                            <div class="result-title">BMW X5 <span class="badge">Recovered</span></div>
                            <div class="result-subtitle">Registration: KL20 ABC</div>
                            <div class="result-source">Source: STORM (Incident System)</div>
                        </div>
                        <div class="result-meta">
                            <div class="confidence medium">Match: 85%</div>
                        </div>
                    </div>
                    <div class="result-details" id="details-v2">
                        <div class="detail-grid">
                            <div>
                                <div class="detail-title">Vehicle Details</div>
                                <div class="detail-content">Make: BMW<br>Model: X5 xDrive<br>Color: Dark Blue<br>Year: 2020</div>
                            </div>
                            <div>
                                <div class="detail-title">Incident Details</div>
                                <div class="detail-content">Stolen: 15/02/2025<br>Recovered: 20/02/2025</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">Recovery Location</div>
                                <div class="detail-content">Found in Salford, 3.2 miles from theft location. Minor damage to ignition.</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (query.toLowerCase().includes('iphone') || query.toLowerCase().includes('recovered')) {
            // Property search
            resultsContainer.innerHTML = `
                <div class="result-card" data-id="pr1">
                    <div class="result-header">
                        <div>
                            <div class="result-title">iPhone 14 Pro <span class="badge">Recovered</span></div>
                            <div class="result-subtitle">Property ID: PR-67392</div>
                            <div class="result-source">Source: Niche (Property Management)</div>
                        </div>
                        <div class="result-meta">
                            <div class="confidence high">Match: 96%</div>
                        </div>
                    </div>
                    <div class="result-details" id="details-pr1">
                        <div class="detail-grid">
                            <div>
                                <div class="detail-title">Item Details</div>
                                <div class="detail-content">Type: Smartphone<br>Make: Apple<br>Model: iPhone 14 Pro<br>Color: Black</div>
                            </div>
                            <div>
                                <div class="detail-title">Recovery Details</div>
                                <div class="detail-content">Date: 24/02/2025<br>Location: Manchester City Centre<br>Condition: Good</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">System References</div>
                                <div class="detail-content">Niche: PR-67392<br>Evidence: EV-28475</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">Additional Information</div>
                                <div class="detail-content">Found during search of suspect in relation to case #28473. IMEI verified against stolen property database.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="result-card" data-id="pr2">
                    <div class="result-header">
                        <div>
                            <div class="result-title">iPhone 13 <span class="badge">Stolen</span></div>
                            <div class="result-subtitle">Property ID: PR-67215</div>
                            <div class="result-source">Source: Athena (Crime Management)</div>
                        </div>
                        <div class="result-meta">
                            <div class="confidence medium">Match: 82%</div>
                        </div>
                    </div>
                    <div class="result-details" id="details-pr2">
                        <div class="detail-grid">
                            <div>
                                <div class="detail-title">Item Details</div>
                                <div class="detail-content">Type: Smartphone<br>Make: Apple<br>Model: iPhone 13<br>Color: Red</div>
                            </div>
                            <div>
                                <div class="detail-title">Theft Details</div>
                                <div class="detail-content">Date: 19/02/2025<br>Location: Piccadilly Gardens</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">Owner Details</div>
                                <div class="detail-content">Name: Emma Taylor<br>Contact: 0700 5551234</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (query.toLowerCase().includes('burglary') || query.toLowerCase().includes('m1 5rt')) {
            // Incident search
            resultsContainer.innerHTML = `
                <div class="result-card" data-id="i1">
                    <div class="result-header">
                        <div>
                            <div class="result-title">Burglary - Residential</div>
                            <div class="result-subtitle">Reference: CR-39284-25</div>
                            <div class="result-source">Source: Athena (Crime Management)</div>
                        </div>
                        <div class="result-meta">
                            <div class="confidence high">Match: 98%</div>
                        </div>
                    </div>
                    <div class="result-details" id="details-i1">
                        <div class="detail-grid">
                            <div>
                                <div class="detail-title">Incident Details</div>
                                <div class="detail-content">Date: 20/02/2025<br>Time: 02:15-04:30<br>Location: 28 Elm Street, M1 5TY</div>
                            </div>
                            <div>
                                <div class="detail-title">Status</div>
                                <div class="detail-content">Under Investigation<br>Officer: PC 4872 Johnson</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">Property Taken</div>
                                <div class="detail-content">Laptop, Jewelry, Cash (approx. £200)</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">Additional Information</div>
                                <div class="detail-content">Entry via forced rear window. CCTV from neighboring property being reviewed.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="result-card" data-id="i2">
                    <div class="result-header">
                        <div>
                            <div class="result-title">Attempted Burglary</div>
                            <div class="result-subtitle">Reference: CR-39302-25</div>
                            <div class="result-source">Source: Athena (Crime Management)</div>
                        </div>
                        <div class="result-meta">
                            <div class="confidence medium">Match: 87%</div>
                        </div>
                    </div>
                    <div class="result-details" id="details-i2">
                        <div class="detail-grid">
                            <div>
                                <div class="detail-title">Incident Details</div>
                                <div class="detail-content">Date: 21/02/2025<br>Time: 23:40<br>Location: 45 Maple Drive, M1 5RS</div>
                            </div>
                            <div>
                                <div class="detail-title">Status</div>
                                <div class="detail-content">Pending Review<br>Officer: PC 5123 Williams</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">Incident Summary</div>
                                <div class="detail-content">Attempted forced entry at front door. Homeowner disturbed suspects who fled the scene.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="result-card" data-id="i3">
                    <div class="result-header">
                        <div>
                            <div class="result-title">Burglary - Commercial</div>
                            <div class="result-subtitle">Reference: CR-39187-25</div>
                            <div class="result-source">Source: STORM (Incident System)</div>
                        </div>
                        <div class="result-meta">
                            <div class="confidence low">Match: 76%</div>
                        </div>
                    </div>
                    <div class="result-details" id="details-i3">
                        <div class="detail-grid">
                            <div>
                                <div class="detail-title">Incident Details</div>
                                <div class="detail-content">Date: 18/02/2025<br>Time: 01:20<br>Location: Tech Store, Oak Road, M1 6RQ</div>
                            </div>
                            <div>
                                <div class="detail-title">Status</div>
                                <div class="detail-content">Closed - No Suspects<br>Officer: PS 7821 Thompson</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (query.toLowerCase().includes('drug') || query.toLowerCase().includes('victoria station')) {
            // Intelligence search
            resultsContainer.innerHTML = `
                <div class="result-card" data-id="int1">
                    <div class="result-header">
                        <div>
                            <div class="result-title">Intelligence Report</div>
                            <div class="result-subtitle">Reference: IR-67392</div>
                            <div class="result-source">Source: 5x5 Intelligence System</div>
                        </div>
                        <div class="result-meta">
                            <div class="confidence high">Match: 95%</div>
                        </div>
                    </div>
                    <div class="result-details" id="details-int1">
                        <div class="detail-grid">
                            <div>
                                <div class="detail-title">Report Details</div>
                                <div class="detail-content">Date: 25/02/2025<br>Classification: Drug Activity<br>Location: Victoria Station Area</div>
                            </div>
                            <div>
                                <div class="detail-title">Evaluation</div>
                                <div class="detail-content">Source: B - Mostly Reliable<br>Intelligence: 2 - Probably True<br>Handling: Restricted</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">Intelligence Summary</div>
                                <div class="detail-content">Reports of increased drug dealing activity near the northern entrance of Victoria Station. Believed to be connected to known OCG operating in the area.</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">Linked Nominals</div>
                                <div class="detail-content">2 identified suspects with prior drug offenses. See related case files.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="result-card" data-id="int2">
                    <div class="result-header">
                        <div>
                            <div class="result-title">Intelligence Report</div>
                            <div class="result-subtitle">Reference: IR-67415</div>
                            <div class="result-source">Source: 5x5 Intelligence System</div>
                        </div>
                        <div class="result-meta">
                            <div class="confidence medium">Match: 82%</div>
                        </div>
                    </div>
                    <div class="result-details" id="details-int2">
                        <div class="detail-grid">
                            <div>
                                <div class="detail-title">Report Details</div>
                                <div class="detail-content">Date: 26/02/2025<br>Classification: Drug Supply<br>Location: City Centre</div>
                            </div>
                            <div>
                                <div class="detail-title">Evaluation</div>
                                <div class="detail-content">Source: C - Sometimes Reliable<br>Intelligence: 3 - Possibly True<br>Handling: Restricted</div>
                            </div>
                            <div class="full-width">
                                <div class="detail-title">Intelligence Summary</div>
                                <div class="detail-content">Anonymous report of drug supply activity in several nightclubs near Piccadilly. Possible new supply route identified.</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Generic results for any other search
            resultsContainer.innerHTML = `
                <div style="background-color: white; padding: 20px; border-radius: 5px; text-align: center;">
                    <div style="margin-bottom: 10px; color: #666;">No matching records found.</div>
                    <div style="font-size: 14px; color: #999;">Try adjusting your search terms.</div>
                </div>
            `;
        }

        // Add click handlers to result cards
        document.querySelectorAll('.result-card').forEach(card => {
            // Add View Details button to each card
            const header = card.querySelector('.result-header');
            const detailsId = 'details-' + card.getAttribute('data-id');
            const details = document.getElementById(detailsId);
            
            // Create view details button
            const viewBtn = document.createElement('button');
            viewBtn.className = 'view-details-btn';
            viewBtn.textContent = 'View Details';
            viewBtn.style.marginTop = '10px';
            viewBtn.style.padding = '5px 10px';
            viewBtn.style.backgroundColor = '#333';
            viewBtn.style.color = 'white';
            viewBtn.style.border = 'none';
            viewBtn.style.borderRadius = '3px';
            viewBtn.style.cursor = 'pointer';
            header.appendChild(viewBtn);
            
            // Toggle details on button click
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click event
                
                if (details.style.display === 'block') {
                    details.style.display = 'none';
                    viewBtn.textContent = 'View Details';
                } else {
                    details.style.display = 'block';
                    viewBtn.textContent = 'Hide Details';
                }
            });
            
            // Make entire card clickable for details too
            card.addEventListener('click', () => {
                if (details.style.display === 'block') {
                    details.style.display = 'none';
                    viewBtn.textContent = 'View Details';
                } else {
                    details.style.display = 'block';
                    viewBtn.textContent = 'Hide Details';
                }
            });

            // Start with details hidden for summary view
            details.style.display = 'none';
        });
    }, 1500);
}

// Event listeners
searchBtn.addEventListener('click', performSearch);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    results.style.display = 'none';
    examples.style.display = 'block';
});

exampleItems.forEach(item => {
    item.addEventListener('click', () => {
        searchInput.value = item.getAttribute('data-query');
        performSearch();
    });
});

// Direct click handler
document.addEventListener('DOMContentLoaded', function() {
  console.log('Page loaded');
  document.getElementById('search-btn').onclick = function() {
    console.log('Button clicked');
    performSearch();
  };

  // Make example items clickable too
  document.querySelectorAll('.example-item').forEach(item => {
    item.onclick = function() {
      searchInput.value = this.getAttribute('data-query');
      performSearch();
    };
  });
});
