import restaurantsData from '../restaurants.json';

// Keep drinksMenu for backward compatibility and recommended pairings
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

// Transform restaurant items once at module load (cached)
interface MenuItem {
  id: string;
  title: string;
  description: string;
  priceMdl: number;
  priceLei: string;
  priceEur: string;
  image: string;
  category: string;
  tags: string[];
  weight: number;
}

const transformedItems: MenuItem[] = restaurantsData.map(item => ({
  id: item.id.toString(),
  title: item.name,
  description: item.description,
  priceMdl: item.price_mdl,
  priceLei: `${item.price_mdl} MDL`,
  priceEur: `≈${Math.round(item.price_mdl / 20)}€`,
  image: item.photo,
  category: item.category,
  tags: item.tags || [],
  weight: item.weight_g
}));

// Pre-computed lookup map for O(1) getItemById
const itemMap = new Map<string, MenuItem>();
transformedItems.forEach(item => itemMap.set(item.id, item));

// Group by category (computed once)
export const fullMenu: Record<string, MenuItem[]> = {};
transformedItems.forEach(item => {
  if (!fullMenu[item.category]) {
    fullMenu[item.category] = [];
  }
  fullMenu[item.category].push(item);
});

export const categories = Object.keys(fullMenu).map(cat => ({
  id: cat,
  label: cat,
  count: fullMenu[cat].length
}));

// Featured items: pick highest-priced from each category for variety
export function getFeaturedItems(count = 6): MenuItem[] {
  const featured: MenuItem[] = [];
  const cats = Object.keys(fullMenu);
  for (const cat of cats) {
    const sorted = [...fullMenu[cat]].sort((a, b) => b.priceMdl - a.priceMdl);
    featured.push(sorted[0]);
    if (featured.length >= count) break;
  }
  // Fill remaining with top priced overall
  if (featured.length < count) {
    const remaining = transformedItems
      .filter(i => !featured.find(f => f.id === i.id))
      .sort((a, b) => b.priceMdl - a.priceMdl);
    featured.push(...remaining.slice(0, count - featured.length));
  }
  return featured.slice(0, count);
}

export function getItemById(id: string) {
  // O(1) lookup from pre-built map
  const item = itemMap.get(id);
  if (item) {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.priceLei,
      priceEur: item.priceEur,
      image: item.image,
      category: item.category,
      tag: item.tags[0] || '',
      tags: item.tags,
      weight: item.weight
    };
  }

  const allDrinks: any[] = [
    ...drinksMenu.craftBeers.map(b => ({ ...b, name: b.title, desc: b.description })),
    ...drinksMenu.draftSelection,
    ...drinksMenu.bottleCollection
  ];

  const foundDrink = allDrinks.find(d => d.id === id);
  if (foundDrink) {
    return {
      id: foundDrink.id,
      title: foundDrink.name || foundDrink.title || '',
      description: foundDrink.desc || foundDrink.description || '',
      price: `$${foundDrink.price}`,
      priceEur: '',
      image: foundDrink.image || '',
      tag: foundDrink.tag,
      tags: [],
      weight: 0,
      category: 'Drinks'
    };
  }

  return null;
}
