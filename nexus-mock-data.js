// This is an example of enhanced mock data structure
// You should expand this with more variations for your actual implementation

const mockData = {
  people: [
    {
      id: "P001",
      name: "John Smith",
      fullName: "John Edward Smith",
      dateOfBirth: "10-05-1985",
      gender: "Male",
      address: "123 Main Street, London",
      identifiers: [
        { type: "Passport", value: "123456789" },
        { type: "Driver's License", value: "SMITH905123JE9AB" }
      ],
      warningMarkers: ["Violent", "Escape Risk"],
      caseInvolvement: [
        { caseReference: "CR20210001", role: "Suspect", date: "15-01-2021" },
        { caseReference: "CR20200045", role: "Witness", date: "23-11-2020" }
      ],
      intelligence: [
        { source: "Source A", date: "05-12-2020", information: "Known associate of organized crime group" },
        { source: "Source B", date: "18-02-2021", information: "Frequents the Blue Lion pub" }
      ]
    },
    {
      id: "P002",
      name: "John Smyth",
      fullName: "John Thomas Smyth",
      dateOfBirth: "22-07-1982",
      gender: "Male",
      address: "45 Park Avenue, Manchester",
      identifiers: [
        { type: "Passport", value: "987654321" },
        { type: "Driver's License", value: "SMYTH8245JT7CD" }
      ]
    },
    {
      id: "P003",
      name: "John Smith",
      fullName: "John William Smith",
      dateOfBirth: "10-02-2024",
      gender: "Male",
      address: "67 Oak Road, Birmingham",
      identifiers: [
        { type: "Passport", value: "AB3456789" }
      ]
    },
    {
      id: "P004",
      name: "Jon Smith",
      fullName: "Jonathan Smith",
      dateOfBirth: "03-11-1990",
      gender: "Male",
      address: "12 Pine Lane, Edinburgh"
    },
    {
      id: "P005",
      name: "Sarah Johnson",
      fullName: "Sarah Ann Johnson",
      dateOfBirth: "15-08-1988",
      gender: "Female",
      address: "78 Maple Drive, Leeds",
      identifiers: [
        { type: "Passport", value: "JH5678901" },
        { type: "Driver's License", value: "JOHNS885SA2EF" }
      ],
      warningMarkers: ["Flight Risk"],
      caseInvolvement: [
        { caseReference: "CR20210023", role: "Victim", date: "03-03-2021" }
      ]
    },
    // Add more people with variations for fuzzy matching
  ],
  
  vehicles: [
    {
      id: "V001",
      registration: "AB12CDE",
      make: "Ford",
      model: "Focus",
      color: "Blue",
      year: 2018,
      ownerName: "John Smith",
      ownerId: "P001",
      status: "Registered",
      anprHistory: [
        { location: "M1 Junction 15", datetime: "10-03-2021 14:32", direction: "Northbound" },
        { location: "A14 Cambridge", datetime: "11-03-2021 09:15", direction: "Eastbound" }
      ],
      policeInvolvement: [
        { incident: "Speeding", date: "02-02-2021", details: "Caught at 85mph in 70mph zone" }
      ]
    },
    {
      id: "V002",
      registration: "XY19ZAB",
      make: "Volkswagen",
      model: "Golf",
      color: "Black",
      year: 2019,
      ownerName: "Sarah Johnson",
      ownerId: "P005",
      status: "Registered"
    },
    {
      id: "V003",
      registration: "FD65HGK",
      make: "BMW",
      model: "320i",
      color: "Silver",
      year: 2016,
      ownerName: "John Smith",
      ownerId: "P003",
      status: "Registered"
    },
    // Add more vehicles with variations
  ],
  
  locations: [
    {
      id: "L001",
      name: "Blue Lion Pub",
      address: "45 High Street, London",
      type: "Commercial",
      status: "Active",
      riskLevel: "Medium",
      riskFactors: [
        { type: "Drug Activity", level: "Medium" },
        { type: "Violence", level: "Low" }
      ],
      incidents: [
        { type: "Assault", date: "12-01-2021", reference: "IR20210023" },
        { type: "Drugs", date: "05-02-2021", reference: "IR20210045" }
      ]
    },
    {
      id: "L002",
      name: "123 Main Street",
      address: "123 Main Street, London",
      type: "Residential",
      status: "Monitored",
      riskLevel: "Low"
    },
    {
      id: "L003",
      name: "King's Cross Station",
      address: "Euston Road, London",
      type: "Transport Hub",
      status: "Active",
      riskLevel: "Medium"
    },
    // Add more locations with variations
  ],
  
  events: [
    {
      id: "E001",
      title: "Assault at Blue Lion",
      reference: "IR20210023",
      incidentType: "Assault",
      date: "12-01-2021",
      time: "23:15",
      status: "Closed",
      involvedPersons: [
        { name: "John Smith", id: "P001", role: "Suspect" },
        { name: "Michael Brown", id: "P006", role: "Victim" }
      ],
      incidentLog: [
        { time: "23:20", officer: "PC12345", entry: "Units dispatched to scene" },
        { time: "23:35", officer: "PC12345", entry: "Suspect detained at scene" }
      ]
    },
    {
      id: "E002",
      title: "Burglary at 78 Maple Drive",
      reference: "IR20210056",
      incidentType: "Burglary",
      date: "05-03-2021",
      time: "14:22",
      status: "Open",
      involvedPersons: [
        { name: "Sarah Johnson", id: "P005", role: "Victim" }
      ]
    },
    {
      id: "E003",
      title: "Traffic Stop - AB12CDE",
      reference: "IR20210089",
      incidentType: "Traffic",
      date: "02-02-2021",
      time: "16:45",
      status: "Closed",
      involvedPersons: [
        { name: "John Smith", id: "P001", role: "Driver" }
      ]
    },
    // Add more events with variations
  ]
};

// Make the mock data globally available
window.mockData = mockData;