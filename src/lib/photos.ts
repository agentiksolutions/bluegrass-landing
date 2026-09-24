// Real photographs, approved by Phil for the STAGING branch only (2026-09-23).
// Before these go live: Tyler's OK on store photos (franchise brand); written OK
// from the three team members in hiring-fair-team.jpg (public/photos/team-hiring-fair.jpg).
// Store files are named store-a / store-b on purpose: the franchisee's store towns stay off the site.
// Every placement keeps the whole group and the whole building in frame.

export const photos = {
  phil: {
    src: "/photos/phil-fifield.jpg",
    width: 1408,
    height: 1408,
    alt: "Phil Fifield",
  },
  team: {
    src: "/photos/team-hiring-fair.jpg",
    width: 1350,
    height: 1800,
    alt: "Phil Fifield, seated, with three members of his store team at a hiring fair",
  },
  storeA: {
    src: "/photos/store-a.jpg",
    width: 1800,
    height: 1349,
    alt: "A store run by a Five Guys franchisee in Central Kentucky, seen from above the parking lot",
  },
  storeB: {
    src: "/photos/store-b.jpg",
    width: 1800,
    height: 1142,
    alt: "The front of a store run by a Five Guys franchisee in Central Kentucky",
  },
  // Screenshot of the public PFSA site (www.thepfsa.org), taken 2026-09-23. No people or donor data on it.
  pfsaSite: {
    src: "/photos/pfsa-website.jpg",
    width: 1440,
    height: 900,
    alt: "The home page of thepfsa.org, the public website built for The PFSA",
  },
} as const;
