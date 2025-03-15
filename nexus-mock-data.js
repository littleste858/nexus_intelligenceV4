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
    // Warwickshire People
    {
      id: "P101",
      name: "James Thornfield",
      fullName: "James Robert Thornfield",
      dateOfBirth: "17-04-1983",
      gender: "Male",
      address: "15 Shakespeare Avenue, Stratford-upon-Avon, Warwickshire",
      identifiers: [
        { type: "Passport", value: "WK1234567" },
        { type: "Driver's License", value: "THORN834JR2CV" }
      ],
      warningMarkers: ["Known Associate"],
      caseInvolvement: [
        { caseReference: "WP20250472", role: "Person of Interest", date: "10-02-2025" },
        { caseReference: "WP20241854", role: "Suspect", date: "15-12-2024" }
      ],
      intelligence: [
        { source: "Warwickshire Police", date: "05-01-2025", information: "Regular at The Castle Inn, Warwick" },
        { source: "Informant C", date: "28-02-2025", information: "Possible connection to organized theft in South Warwickshire" }
      ]
    },
    {
      id: "P102",
      name: "Sarah Coventry",
      fullName: "Sarah Elizabeth Coventry",
      dateOfBirth: "23-09-1996",
      gender: "Female",
      address: "8 Priory Road, Kenilworth, Warwickshire",
      identifiers: [
        { type: "Passport", value: "CV9876543" },
        { type: "Driver's License", value: "COVEN964SE5WK" }
      ],
      warningMarkers: [],
      caseInvolvement: [
        { caseReference: "WP20250231", role: "Witness", date: "15-02-2025" }
      ],
      intelligence: [
        { source: "Warwickshire Police", date: "01-03-2025", information: "Provided key witness statement for Kenilworth burglary case" }
      ]
    },
    {
      id: "P103",
      name: "Robert Leamington",
      fullName: "Robert James Leamington",
      dateOfBirth: "05-06-1990",
      gender: "Male",
      address: "42 Rugby Road, Leamington Spa, Warwickshire",
      identifiers: [
        { type: "Passport", value: "LS7654321" },
        { type: "Driver's License", value: "LEAMI903RJ8WK" }
      ],
      warningMarkers: ["Flight Risk", "Drug Offenses"],
      caseInvolvement: [
        { caseReference: "WP20250127", role: "Suspect", date: "28-02-2025" },
        { caseReference: "WP20243562", role: "Suspect", date: "10-11-2024" }
      ],
      intelligence: [
        { source: "Warwickshire Police", date: "02-03-2025", information: "Known to frequent Jephson Gardens area" },
        { source: "Informant D", date: "25-02-2025", information: "Suspected supplier for Leamington area" }
      ]
    },
    {
      id: "P104",
      name: "Emma Nuneaton",
      fullName: "Emma Louise Nuneaton",
      dateOfBirth: "12-11-1992",
      gender: "Female",
      address: "17 Church Street, Nuneaton, Warwickshire",
      identifiers: [
        { type: "Driver's License", value: "NUNEA921EL3WK" }
      ],
      warningMarkers: [],
      caseInvolvement: [
        { caseReference: "WP20250402", role: "Witness", date: "01-03-2025" }
      ]
    }
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
    // Warwickshire Vehicles
    {
      id: "V101",
      registration: "WK22XYZ",
      make: "Audi",
      model: "A4",
      color: "Black",
      year: 2022,
      ownerName: "James Thornfield",
      ownerId: "P101",
      status: "Flagged",
      anprHistory: [
        { location: "M40 Junction 15 (Warwick)", datetime: "05-03-2025 08:42", direction: "Southbound" },
        { location: "A46 Kenilworth Bypass", datetime: "05-03-2025 09:15", direction: "Northbound" },
        { location: "A439 Stratford", datetime: "02-03-2025 18:22", direction: "Eastbound" }
      ],
      policeInvolvement: [
        { incident: "ASB", date: "10-02-2025", details: "Vehicle associated with ASB incident outside The Swan pub" }
      ]
    },
    {
      id: "V102",
      registration: "BN19KLM",
      make: "Ford",
      model: "Transit",
      color: "White",
      year: 2019,
      ownerName: "Midlands Electrical Ltd",
      status: "Stolen",
      anprHistory: [
        { location: "A444 Nuneaton", datetime: "25-02-2025 23:17", direction: "Southbound" },
        { location: "M6 Junction 3", datetime: "26-02-2025 00:05", direction: "Northbound" }
      ],
      policeInvolvement: [
        { incident: "Theft of Vehicle", date: "25-02-2025", details: "Reported stolen from Attleborough Industrial Estate, Nuneaton" }
      ]
    },
    {
      id: "V103",
      registration: "LC20PQR",
      make: "Vauxhall",
      model: "Corsa",
      color: "Red",
      year: 2020,
      ownerName: "Robert Leamington",
      ownerId: "P103",
      status: "Of Interest",
      anprHistory: [
        { location: "A452 Leamington Spa", datetime: "02-03-2025 19:32", direction: "Northbound" },
        { location: "B4099 Warwick", datetime: "02-03-2025 20:15", direction: "Westbound" },
        { location: "A425 Southam Road", datetime: "28-02-2025 17:45", direction: "Eastbound" }
      ],
      policeInvolvement: [
        { incident: "Suspicious Activity", date: "28-02-2025", details: "Vehicle observed at known drug dealing location" }
      ]
    }
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
    // Warwickshire Locations
    {
      id: "L101",
      name: "The Castle Inn",
      address: "34 Market Street, Warwick, Warwickshire",
      postcode: "CV34 4SB",
      type: "Commercial",
      status: "Monitored Location",
      riskLevel: "Medium",
      riskFactors: [
        { type: "Anti-Social Behavior", level: "Medium" },
        { type: "Violence", level: "Low" }
      ],
      incidents: [
        { type: "ASB", date: "20-02-2025", reference: "WP20250341" },
        { type: "Assault", date: "15-01-2025", reference: "WP20250162" }
      ]
    },
    {
      id: "L102",
      name: "Nuneaton Train Station",
      address: "Bond Street, Nuneaton, Warwickshire",
      postcode: "CV11 4BX",
      type: "Transport Hub",
      status: "Of Interest",
      riskLevel: "Medium",
      riskFactors: [
        { type: "Theft", level: "High" },
        { type: "Drug Activity", level: "Low" }
      ],
      incidents: [
        { type: "Theft", date: "01-03-2025", reference: "WP20250402" },
        { type: "Drugs", date: "15-02-2025", reference: "WP20250189" }
      ]
    },
    {
      id: "L103",
      name: "Riverside Court",
      address: "15 River Way, Rugby, Warwickshire",
      postcode: "CV21 3HT",
      type: "Residential",
      status: "Under Surveillance",
      riskLevel: "High",
      riskFactors: [
        { type: "Drug Activity", level: "High" }
      ],
      incidents: [
        { type: "Drugs", date: "28-02-2025", reference: "WP20250215" }
      ]
    },
    {
      id: "L104",
      name: "Jephson Gardens",
      address: "Newbold Terrace, Leamington Spa, Warwickshire",
      postcode: "CV32 4AA",
      type: "Public Space",
      status: "Monitored Location",
      riskLevel: "Medium",
      riskFactors: [
        { type: "Drug Activity", level: "Medium" },
        { type: "Anti-Social Behavior", level: "Medium" }
      ],
      incidents: [
        { type: "Drugs", date: "28-02-2025", reference: "WP20250127" },
        { type: "ASB", date: "15-02-2025", reference: "WP20250183" }
      ]
    }
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
    // Warwickshire Events
    {
      id: "E101",
      title: "ASB Outside The Swan",
      reference: "WP20250472",
      incidentType: "Anti-Social Behavior",
      date: "10-02-2025",
      time: "23:15",
      location: "The Swan, Stratford-upon-Avon, Warwickshire",
      status: "Closed",
      involvedPersons: [
        { name: "James Thornfield", id: "P101", role: "Person of Interest" }
      ],
      involvedVehicles: [
        { registration: "WK22XYZ", id: "V101", role: "Associated Vehicle" }
      ],
      incidentLog: [
        { time: "23:20", officer: "PC5432", entry: "Reports of loud group outside pub" },
        { time: "23:35", officer: "PC5432", entry: "Group dispersed, details taken" },
        { time: "23:50", officer: "PC5432", entry: "Pub management spoken to about customer control" }
      ]
    },
    {
      id: "E102",
      title: "Kenilworth Residential Burglary",
      reference: "WP20250231",
      incidentType: "Burglary",
      date: "15-02-2025",
      time: "14:30",
      location: "12 Castle Road, Kenilworth, Warwickshire",
      status: "Under Investigation",
      involvedPersons: [
        { name: "Sarah Coventry", id: "P102", role: "Witness" }
      ],
      incidentLog: [
        { time: "14:45", officer: "PC2785", entry: "Report received from neighbor" },
        { time: "15:10", officer: "PC2785", entry: "Officers attended scene" },
        { time: "16:30", officer: "DC487", entry: "Witness statement taken from Sarah Coventry" }
      ]
    },
    {
      id: "E103",
      title: "Drug Activity in Jephson Gardens",
      reference: "WP20250127",
      incidentType: "Drugs",
      date: "28-02-2025",
      time: "19:45",
      location: "Jephson Gardens, Leamington Spa, Warwickshire",
      status: "Active",
      involvedPersons: [
        { name: "Robert Leamington", id: "P103", role: "Suspect" }
      ],
      involvedVehicles: [
        { registration: "LC20PQR", id: "V103", role: "Suspect Vehicle" }
      ],
      incidentLog: [
        { time: "19:50", officer: "PC8762", entry: "Plain clothes officers observed suspicious exchange" },
        { time: "20:15", officer: "PC8762", entry: "Subject left location in red Vauxhall Corsa" },
        { time: "20:30", officer: "PC8762", entry: "Vehicle tracked to Rugby Road area" }
      ]
    },
    {
      id: "E104",
      title: "Vehicle Theft - Ford Transit",
      reference: "WP20250392",
      incidentType: "Theft",
      date: "25-02-2025",
      time: "17:30",
      location: "Attleborough Industrial Estate, Nuneaton, Warwickshire",
      status: "Active",
      involvedVehicles: [
        { registration: "BN19KLM", id: "V102", role: "Stolen Vehicle" }
      ],
      incidentLog: [
        { time: "17:45", officer: "PC3421", entry: "Report received from Midlands Electrical Ltd" },
        { time: "18:20", officer: "PC3421", entry: "Vehicle details circulated to all units" },
        { time: "23:17", officer: "Automatic", entry: "ANPR activation on A444 Nuneaton" }
      ]
    }
  ]
};

// Make the mock data globally available
window.mockData = mockData;
