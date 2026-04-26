export const foodMenu = {
  starters: [
    {
      id: "s1",
      title: "Truffle Beef Tartare",
      description: "Hand-cut prime tenderloin, infused with white truffle oil, capers, and a perfectly cured quail egg yolk. Served with toasted brioche.",
      priceLei: "85 Lei",
      priceEur: "17 EUR",
      image: "https://picsum.photos/seed/tartare/600/400"
    },
    {
      id: "s2",
      title: "Charred Octopus",
      description: "Smoked potato puree, paprika oil, pickled shallots, and a hint of lemon zest.",
      priceLei: "95 Lei",
      priceEur: "19 EUR",
      image: "https://picsum.photos/seed/octopus/600/400"
    },
    {
      id: "s3",
      title: "Foie Gras Torchon",
      description: "Silky foie gras, fig marmalade, and toasted hazelnuts on house-made artisanal bread.",
      priceLei: "110 Lei",
      priceEur: "22 EUR",
      image: "https://picsum.photos/seed/foiegras/600/400"
    }
  ],
  mainCourses: [
    {
      id: "m1",
      title: "Pan-Seared Scallops",
      description: "Hokkaido scallops, cauliflower silk, caviar blanc, and champagne beurre blanc.",
      priceLei: "145 Lei",
      priceEur: "29 EUR",
      image: "https://picsum.photos/seed/scallops/600/400"
    },
    {
      id: "m2",
      title: "Wagyu A5 Striploin",
      description: "Exquisite Japanese Wagyu, blistered shishito peppers, black garlic reduction, and smoked sea salt.",
      priceLei: "320 Lei",
      priceEur: "64 EUR",
      image: "https://picsum.photos/seed/wagyu/600/400"
    },
    {
      id: "m3",
      title: "Wild Mushroom Risotto",
      description: "Arborio rice, seasonal foraged mushrooms, aged Parmigiano-Reggiano, and fresh white truffle shavings.",
      priceLei: "90 Lei",
      priceEur: "18 EUR",
      image: "https://picsum.photos/seed/risotto/600/400"
    }
  ],
  pizzas: [
    {
      id: "p1",
      title: "Regina Margherita",
      description: "San Marzano DOP tomato sauce, fresh buffalo mozzarella, hand-torn basil, and extra virgin olive oil on our signature 72-hour fermented sourdough crust.",
      priceLei: "65 Lei",
      priceEur: "13 EUR",
      image: "https://picsum.photos/seed/margherita/800/600"
    },
    {
      id: "p2",
      title: "Prosciutto & Tartufo",
      description: "Truffle cream base, fior di latte, aged Prosciutto di Parma, fresh wild arugula, and shaved Parmigiano-Reggiano.",
      priceLei: "85 Lei",
      priceEur: "17 EUR",
      image: "https://picsum.photos/seed/prosciutto/800/600"
    }
  ],
  desserts: [
    {
      id: "d1",
      title: "Valrhona Chocolate Sphere",
      description: "Dark chocolate dome, hazelnut praline, and warm caramel sauce poured tableside.",
      priceLei: "55 Lei",
      priceEur: "11 EUR",
      image: "https://picsum.photos/seed/chocolate/600/400"
    },
    {
      id: "d2",
      title: "Madagascar Vanilla Bean Panna Cotta",
      description: "Silky panna cotta, mixed berry compote, and delicate edible gold leaf.",
      priceLei: "45 Lei",
      priceEur: "9 EUR",
      image: "https://picsum.photos/seed/pannacotta/600/400"
    }
  ]
};

export const drinksMenu = {
  craftBeers: [
    {
      id: "b1",
      tag: "DRAFT",
      title: "Obsidian Stout",
      description: "Rich, creamy, with notes of dark chocolate, espresso, and a hint of smoked vanilla. Poured with a nitrogen head.",
      price: "12",
      image: "https://picsum.photos/seed/stout/500/700"
    },
    {
      id: "b2",
      tag: "BOTTLE",
      title: "Citrus Horizon IPA",
      description: "West Coast style, intensely hopped with grapefruit and pine aromatics.",
      price: "9",
      image: "https://picsum.photos/seed/ipa/500/700"
    }
  ],
  draftSelection: [
    { id: "ds1", name: "Golden Pilsner", desc: "Crisp, clean, floral noble hops", price: "8", image: "https://picsum.photos/seed/pilsner/600/600" },
    { id: "ds2", name: "Amber Ale", desc: "Toasted caramel, balanced bitterness", price: "8", image: "https://picsum.photos/seed/amber/600/600" },
    { id: "ds3", name: "Seasonal Sour", desc: "Tart cherry, oak aged", price: "10", image: "https://picsum.photos/seed/sour/600/600" }
  ],
  bottleCollection: [
    { id: "bc1", name: "Belgian Tripel", desc: "Complex spice, fruity esters, 9% ABV", price: "14", image: "https://picsum.photos/seed/tripel/600/600" },
    { id: "bc2", name: "Hazy Pale Ale", desc: "Juicy tropical fruit, soft mouthfeel", price: "9", image: "https://picsum.photos/seed/hazy/600/600" },
    { id: "bc3", name: "Imperial Stout", desc: "Barrel aged, notes of bourbon and vanilla", price: "18", image: "https://picsum.photos/seed/imperial/600/600" }
  ]
};

export function getItemById(id: string) {
  const allFood = [
    ...foodMenu.starters, 
    ...foodMenu.mainCourses, 
    ...foodMenu.pizzas, 
    ...foodMenu.desserts
  ];
  
  const foundFood = allFood.find(item => item.id === id);
  if (foundFood) {
    return {
      id: foundFood.id,
      title: foundFood.title,
      description: foundFood.description,
      price: foundFood.priceLei,
      image: foundFood.image,
      category: 'Food'
    };
  }

  const allDrinks: any[] = [
    ...drinksMenu.craftBeers.map(b => ({ ...b, name: b.title, desc: b.description })), 
    ...drinksMenu.draftSelection, 
    ...drinksMenu.bottleCollection
  ];

  const foundDrink = allDrinks.find(item => item.id === id);
  if (foundDrink) {
    return {
      id: foundDrink.id,
      title: foundDrink.name || foundDrink.title || '',
      description: foundDrink.desc || foundDrink.description || '',
      price: `$${foundDrink.price}`,
      image: foundDrink.image || '',
      tag: foundDrink.tag,
      category: 'Drinks'
    };
  }

  return null;
}
