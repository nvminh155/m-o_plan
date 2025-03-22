const filters = {
  establishment: [
    {
      key: "10591",
      name: "Restaurants",
    },
    {
      key: "9900",
      name: "Coffee & Tea",
    },
  ],
  option: [
    {
      key: "10870",
      name: "Free Wifi",
    },
    {
      key: "10602",
      name: "Reservations",
    },
    {
      key: "16547",
      name: "Table Service",
    },
    {
      key: "10852",
      name: "Seating",
    },
    {
      key: "10862",
      name: "Serves Alcohol",
    },
    {
      key: "10601",
      name: "Takeout",
    },
    {
      key: "10864",
      name: "Wine and Beer",
    },
    {
      key: "10603",
      name: "Outdoor Seating",
    },
    {
      key: "10854",
      name: "Parking Available",
    },
    {
      key: "10859",
      name: "Television",
    },
    {
      key: "10861",
      name: "Wheelchair Accessible",
    },
    {
      key: "10600",
      name: "Delivery",
    },
    {
      key: "10855",
      name: "Street Parking",
    },
    {
      key: "10860",
      name: "Highchairs Available",
    },
    {
      key: "10866",
      name: "Mastercard",
    },
    {
      key: "10867",
      name: "Visa",
    },
    {
      key: "11780",
      name: "Accepts Credit Cards",
    },
    {
      key: "10863",
      name: "Full Bar",
    },
    {
      key: "21271",
      name: "Family style",
    },
    {
      key: "10858",
      name: "Free off-street parking",
    },
    {
      key: "10612",
      name: "Buffet",
    },
    {
      key: "10702",
      name: "Private Dining",
    },
    {
      key: "10857",
      name: "Valet Parking",
    },
    {
      key: "10868",
      name: "Digital Payments",
    },
    {
      key: "10871",
      name: "Discover",
    },
    {
      key: "20993",
      name: "Beach",
    },
    {
      key: "21379",
      name: "Non-smoking restaurants",
    },
    {
      key: "10865",
      name: "American Express",
    },
    {
      key: "10869",
      name: "Cash Only",
    },
    {
      key: "20989",
      name: "Live Music",
    },
    {
      key: "20990",
      name: "Waterfront",
    },
    {
      key: "20995",
      name: "Playgrounds",
    },
  ],
  meal: [
    {
      key: "10597",
      name: "Breakfast",
    },
    {
      key: "10606",
      name: "Brunch",
    },
    {
      key: "10598",
      name: "Lunch",
    },
    {
      key: "10599",
      name: "Dinner",
    },
  ],
  price: [
    {
      key: "10953",
      name: "$",
    },
    {
      key: "10955",
      name: "$$ - $$$",
    },
    {
      key: "10954",
      name: "$$$$",
    },
  ],
  openNow: [
    {
      key: "true",
      name: "Open now",
    },
  ],
  cuisine: [
    {
      key: "10643",
      name: "Seafood",
    },
    {
      key: "10648",
      name: "International",
    },
    {
      key: "10659",
      name: "Asian",
    },
    {
      key: "10675",
      name: "Vietnamese",
    },
    {
      key: "10642",
      name: "Cafe",
    },
    {
      key: "10640",
      name: "Bar",
    },
    {
      key: "10670",
      name: "Pub",
    },
    {
      key: "10345",
      name: "Steakhouse",
    },
    {
      key: "10346",
      name: "Indian",
    },
    {
      key: "10651",
      name: "Barbecue",
    },
    {
      key: "10654",
      name: "European",
    },
    {
      key: "10662",
      name: "British",
    },
    {
      key: "10666",
      name: "Deli",
    },
    {
      key: "10668",
      name: "Grill",
    },
    {
      key: "10669",
      name: "Contemporary",
    },
    {
      key: "10676",
      name: "Diner",
    },
    {
      key: "10682",
      name: "Wine Bar",
    },
    {
      key: "4617",
      name: "Italian",
    },
    {
      key: "5086",
      name: "French",
    },
    {
      key: "9908",
      name: "American",
    },
  ],
  dish: [
    {
      key: "10907",
      name: "Burger",
    },
    {
      key: "22390",
      name: "Burger and Fries",
    },
    {
      key: "21354",
      name: "Chicken dishes",
    },
    {
      key: "21324",
      name: "Fish",
    },
    {
      key: "22328",
      name: "Smoked Bacon",
    },
    {
      key: "10647",
      name: "Sandwiches",
    },
    {
      key: "16554",
      name: "Salad",
    },
    {
      key: "20730",
      name: "Toasts",
    },
    {
      key: "22890",
      name: "Toasties",
    },
    {
      key: "23203",
      name: "Fried",
    },
    {
      key: "20148",
      name: "Hoagie",
    },
    {
      key: "20752",
      name: "Beef",
    },
    {
      key: "21174",
      name: "Lamb",
    },
    {
      key: "22568",
      name: "Soup",
    },
    {
      key: "22852",
      name: "Sausage",
    },
    {
      key: "23216",
      name: "Ribeye Steak",
    },
    {
      key: "23357",
      name: "Potato Wedges",
    },
    {
      key: "10645",
      name: "Noodle",
    },
    {
      key: "10678",
      name: "Pasta",
    },
    {
      key: "10872",
      name: "Baguette",
    },
    {
      key: "10878",
      name: "Burrito",
    },
    {
      key: "10914",
      name: "Lasagne",
    },
    {
      key: "10921",
      name: "Omelette",
    },
    {
      key: "10932",
      name: "Ribs",
    },
    {
      key: "10939",
      name: "Steak Tartare",
    },
    {
      key: "16555",
      name: "Pancakes",
    },
    {
      key: "19959",
      name: "Eggs Benedict",
    },
    {
      key: "20174",
      name: "Breakfast Burrito",
    },
    {
      key: "20175",
      name: "Veggie Burrito",
    },
    {
      key: "20346",
      name: "Eclairs",
    },
    {
      key: "20532",
      name: "Hummus",
    },
    {
      key: "20547",
      name: "Salmon",
    },
    {
      key: "20548",
      name: "Smoked Salmon",
    },
    {
      key: "20552",
      name: "Tuna",
    },
    {
      key: "21019",
      name: "Dauphiné raviolis",
    },
    {
      key: "21022",
      name: "Duck",
    },
    {
      key: "21038",
      name: "Chocolate mousse",
    },
    {
      key: "21209",
      name: "Paninis",
    },
    {
      key: "21215",
      name: "Bruschette",
    },
    {
      key: "21239",
      name: "Pesto",
    },
    {
      key: "21275",
      name: "Cakes",
    },
    {
      key: "21278",
      name: "Chocolates",
    },
    {
      key: "21326",
      name: "Pork",
    },
    {
      key: "22388",
      name: "Breads and Pastries",
    },
    {
      key: "22431",
      name: "Tartare",
    },
    {
      key: "22440",
      name: "Fresh Baked Bread",
    },
    {
      key: "22455",
      name: "Homemade Pies",
    },
    {
      key: "22620",
      name: "Mixed Seafood",
    },
    {
      key: "22744",
      name: "Hash Browns",
    },
    {
      key: "22810",
      name: "Homemade Bread",
    },
    {
      key: "22870",
      name: "Fresh Pasta",
    },
    {
      key: "22950",
      name: "Desserts",
    },
    {
      key: "22954",
      name: "Big Breakfast",
    },
    {
      key: "22960",
      name: "Ham Sandwich",
    },
    {
      key: "23008",
      name: "Duck Dish",
    },
    {
      key: "23032",
      name: "Black and White Pudding",
    },
    {
      key: "23101",
      name: "Bread Rolls",
    },
    {
      key: "23109",
      name: "Cake",
    },
    {
      key: "23311",
      name: "Pastries",
    },
    {
      key: "23331",
      name: "Beef Ribs",
    },
    {
      key: "23353",
      name: "Greek Salad",
    },
    {
      key: "23378",
      name: "Mashed Potatoes",
    },
    {
      key: "23385",
      name: "Sunday Roast",
    },
    {
      key: "9911",
      name: "Juice & Smoothies",
    },
  ],
  minRating: [
    {
      key: "50",
      name: "null",
    },
    {
      key: "40",
      name: "null",
    },
    {
      key: "30",
      name: "null",
    },
  ],
  diet: [
    {
      key: "10665",
      name: "Vegetarian friendly",
    },
    {
      key: "10697",
      name: "Vegan options",
    },
    {
      key: "10992",
      name: "Gluten free options",
    },
  ],
  style: [
    {
      key: "10604",
      name: "Families with children",
    },
    {
      key: "11777",
      name: "Kids",
    },
    {
      key: "10609",
      name: "Large groups",
    },
    {
      key: "10607",
      name: "Special occasions",
    },
    {
      key: "10610",
      name: "Scenic view",
    },
    {
      key: "10605",
      name: "Business meetings",
    },
    {
      key: "10608",
      name: "Bar scene",
    },
    {
      key: "10613",
      name: "Local cuisine",
    },
    {
      key: "10614",
      name: "Romantic",
    },
    {
      key: "12504",
      name: "Hot New Restaurants",
    },
  ],
} as const;

export type TKeyFilter = keyof typeof filters;

export type TFilter = {
  [K in TKeyFilter]: { id: K; value: (typeof filters)[K][number]["key"][] };
}[TKeyFilter];
