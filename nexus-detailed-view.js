// nexus-detailed-view.js - simplified version

// Helper functions to render different entity types
window.generatePersonDetails = function(person) {
  return `
    <div class="details-section">
      <h5>Personal Details</h5>
      <div class="details-grid">
        <div class="details-item">
          <span class="details-label">Full Name:</span>
          <span class="details-value">${person.fullName || person.name}</span>
        </div>
        <div class="details-item">
          <span class="details-label">DOB:</span>
          <span class="details-value">${person.dateOfBirth || 'Unknown'}</span>
        </div>
        <div class="details-item">
          <span class="details-label">Gender:</span>
          <span class="details-value">${person.gender || 'Unknown'}</span>
        </div>
        ${person.address ? `
        <div class="details-item">
          <span class="details-label">Address:</span>
          <span class="details-value">${person.address}</span>
        </div>
        ` : ''}
      </div>
    </div>
  `;
};

window.generateVehicleDetails = function(vehicle) {
  return `
    <div class="details-section">
      <h5>Vehicle Details</h5>
      <div class="details-grid">
        <div class="details-item">
          <span class="details-label">Registration:</span>
          <span class="details-value">${vehicle.registration}</span>
        </div>
        <div class="details-item">
          <span class="details-label">Make/Model:</span>
          <span class="details-value">${vehicle.make} ${vehicle.model}</span>
        </div>
        <div class="details-item">
          <span class="details-label">Color:</span>
          <span class="details-value">${vehicle.color}</span>
        </div>
        <div class="details-item">
          <span class="details-label">Year:</span>
          <span class="details-value">${vehicle.year}</span>
        </div>
      </div>
    </div>
  `;
};

window.generateLocationDetails = function(location) {
  return `
    <div class="details-section">
      <h5>Location Details</h5>
      <div class="details-grid">
        <div class="details-item">
          <span class="details-label">Address:</span>
          <span class="details-value">${location.address}</span>
        </div>
        <div class="details-item">
          <span class="details-label">Type:</span>
          <span class="details-value">${location.type}</span>
        </div>
        <div class="details-item">
          <span class="details-label">Status:</span>
          <span class="details-value">${location.status}</span>
        </div>
      </div>
    </div>
  `;
};

window.generateEventDetails = function(event) {
  return `
    <div class="details-section">
      <h5>Event Details</h5>
      <div class="details-grid">
        <div class="details-item">
          <span class="details-label">Reference:</span>
          <span class="details-value">${event.reference}</span>
        </div>
        <div class="details-item">
          <span class="details-label">Type:</span>
          <span class="details-value">${event.incidentType}</span>
        </div>
        <div class="details-item">
          <span class="details-label">Date:</span>
          <span class="details-value">${event.date}</span>
        </div>
        <div class="details-item">
          <span class="details-label">Status:</span>
          <span class="details-value">${event.status}</span>
        </div>
      </div>
    </div>
  `;
};