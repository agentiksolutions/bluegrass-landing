// Pictures of real things only (Phil, 2026-10-07). The store and hiring-fair photos were left out
// of V2: they need the franchise owner's OK and the team members' written OK first.

export const photos = {
  // Phil's studio headshot, supplied for V2 on 2026-10-20.
  headshot: {
    src: "/photos/phil-headshot.webp",
    width: 1000,
    height: 1500,
    alt: "Phil Fifield",
  },
  // Screenshot of the public PFSA site (www.thepfsa.org), taken 2026-09-23. No people or donor data on it.
  pfsaSite: {
    src: "/photos/pfsa-website.jpg",
    width: 1440,
    height: 900,
    alt: "The home page of thepfsa.org, the public website built for The PFSA",
  },
} as const;
