const filters = {
  category: [
    { key: "40", name: "Spas & Wellness" },
    { key: "47", name: "Sights & Landmarks" },
    { key: "20", name: "Nightlife" },
    { key: "49", name: "Museums" },
    { key: "55", name: "Boat Tours & Water Sports" },
    { key: "56", name: "Fun & Games" },
    { key: "53", name: "Casinos & Gambling" },
    { key: "57", name: "Nature & Parks" },
  ],
  rating: [
    { key: "40", name: "min rate is 4" },
    { key: "50", name: "min rate is 5" },
  ] as const,
  type: [
    { key: "127", name: "Spas" },
    { key: "129", name: "Health/Fitness Clubs & Gyms" },
    { key: "255", name: "Thermal Spas" },
  ] as const,
  suggestedDuration: [
    { key: "UNDER_1_HOUR", name: "<1 hour" },
    { key: "ONE_TO_2_HOURS", name: "1-2 hours" },
    { key: "TWO_TO_3_HOURS", name: "2-3 hours" },
    { key: "OVER_3_HOURS", name: "More than 3 hours" },
  ],
  anyTag: [
    { key: "11295", name: "Good for a Rainy Day" },
    { key: "11309", name: "Budget-friendly" },
    { key: "12169", name: "Good for Couples" },
    { key: "12159", name: "Honeymoon spot" },
    { key: "11306", name: "Good for Kids" },
    { key: "12170", name: "Good for Big Groups" },
    { key: "11292", name: "Free Entry" },
    { key: "12163", name: "Adventurous" },
    { key: "12156", name: "Hidden Gems" },
    { key: "11312", name: "Good for Adrenaline Seekers" },
  ],
  navbar: [
    { key: "ATTRACTIONOVERVIEW:-true", name: "Attractions" },
    { key: "ATTRACTIONOVERVIEW:42-true", name: "Tours" },
    { key: "ATTRACTIONOVERVIEW:63-true", name: "Day Trips" },
    { key: "ATTRACTIONOVERVIEW:61-true", name: "Outdoor Activities" },
    { key: "ATTRACTIONOVERVIEW:58-true", name: "Concerts & Shows" },
    { key: "ATTRACTIONOVERVIEW:36-true", name: "Food & Drink" },
    { key: "ATTRACTIONOVERVIEW:26-true", name: "Shopping" },
    { key: "ATTRACTIONOVERVIEW:59-true", name: "Transportation" },
  ],
  openNow: [{ key: "true", name: "Open now" }] as const,
} as const;

export type TKeyFilter = keyof typeof filters;

export type TFilter = {
  [K in TKeyFilter]: { id: K; value: (typeof filters)[K][number]["key"][] };
}[TKeyFilter];
