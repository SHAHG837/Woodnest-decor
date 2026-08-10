export interface Product {
  id: string;
  name: string;
  category: 'MDF Key Hanging Stands' | 'Name Plaques' | 'Wall Décor' | 'Islamic Wall Art' | 'Customized Gifts' | 'Wooden Shelves' | 'Home Accessories' | 'Office Décor';
  price: number;
  description: string;
  rating: number;
  reviewCount: number;
  image: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  specifications: {
    material: string;
    thickness: string;
    dimensions: string;
    finish: string;
  };
  customizable: boolean;
  options?: {
    fonts?: string[];
    colors?: string[];
    sizes?: string[];
  };
}

export const PRODUCTS: Product[] = [
  // MDF Key Hanging Stands
  {
    id: 'key-stand-1',
    name: 'Rustic Walnut Key Holder with Succulent Shelf',
    category: 'MDF Key Hanging Stands',
    price: 2499,
    description: 'Handcrafted dark walnut wooden key organizer with an integrated side shelf holding a potted succulent plant and 4 sturdy metallic hooks.',
    rating: 4.9,
    reviewCount: 48,
    image: '/src/assets/images/dark_wood_key_holder_1784022403357.jpg',
    isBestSeller: true,
    specifications: {
      material: 'Premium Dense Fiber MDF & Metal Hooks',
      thickness: '15mm solid base',
      dimensions: '30cm x 18cm x 8cm',
      finish: 'Dark Walnut Satin Polish'
    },
    customizable: true,
    options: {
      fonts: ['Playfair Display', 'Poppins', 'Great Vibes'],
      colors: ['Dark Walnut', 'Natural Teak', 'Ebony Black'],
      sizes: ['Standard (30x18cm)', 'Large (40x22cm)']
    }
  },
  {
    id: 'key-stand-2',
    name: 'Black Minimalist AirPods & Key Shelf',
    category: 'MDF Key Hanging Stands',
    price: 2250,
    description: 'Sleek matte black entryway ledge shelf designed for earbuds, keychains, and daily pocket accessories with 4 brass hanging hooks.',
    rating: 4.8,
    reviewCount: 32,
    image: '/src/assets/images/black_minimal_key_shelf_1784022513824.jpg',
    isNewArrival: true,
    specifications: {
      material: 'Engineered MDF & Brass Hooks',
      thickness: '18mm ledge frame',
      dimensions: '25cm x 10cm x 6cm',
      finish: 'Matte Charcoal Black Finish'
    },
    customizable: false
  },
  {
    id: 'key-stand-3',
    name: 'Cozy White Succulent & House Key Shelf',
    category: 'MDF Key Hanging Stands',
    price: 2350,
    description: 'Clean Scandinavian-style white floating shelf featuring a decorative yellow house accent block, succulent planter ledge, and 4 heart-shaped key hooks.',
    rating: 4.9,
    reviewCount: 29,
    image: '/src/assets/images/white_minimal_shelf_succulent_1784022532372.jpg',
    isBestSeller: false,
    specifications: {
      material: 'High-Density MDF & Heart Brass Hooks',
      thickness: '15mm framework',
      dimensions: '28cm x 12cm x 7cm',
      finish: 'Satin Milk White Lacquer'
    },
    customizable: true,
    options: {
      fonts: ['Poppins', 'Montserrat', 'Playfair Display'],
      colors: ['Milk White', 'Soft Cream', 'Charcoal Black'],
      sizes: ['Standard (28x12cm)']
    }
  },
  {
    id: 'key-stand-4',
    name: 'Triple Succulent Pot White Key Rack',
    category: 'MDF Key Hanging Stands',
    price: 2850,
    description: 'Elegant white MDF wall-mounted key station with a top ledge for 3 white succulent planters and 4 lower heavy-duty metal hooks.',
    rating: 4.9,
    reviewCount: 42,
    image: '/src/assets/images/white_wood_key_holder_1784022384172.jpg',
    isBestSeller: true,
    specifications: {
      material: 'Solid MDF core & Silver Metal Hooks',
      thickness: '18mm ledge frame',
      dimensions: '35cm x 18cm x 10cm',
      finish: 'Satin White Enamel'
    },
    customizable: false
  },
  {
    id: 'key-stand-5',
    name: 'Classic Dark Teak Entryway Key Rack',
    category: 'MDF Key Hanging Stands',
    price: 2150,
    description: 'Solid dark teak stained wooden wall hanger featuring a mini planter ledge and 4 metallic key hooks for entryways and foyers.',
    rating: 4.7,
    reviewCount: 18,
    image: '/src/assets/images/simple_dark_wood_shelf_1784022548004.jpg',
    isNewArrival: false,
    specifications: {
      material: 'Sustainably Sourced High-Density MDF',
      thickness: '15mm backplate',
      dimensions: '30cm x 15cm x 8cm',
      finish: 'Deep Mahogany Teak Stain'
    },
    customizable: true,
    options: {
      fonts: ['Poppins', 'Playfair Display'],
      colors: ['Deep Mahogany', 'Walnut Brown', 'Teak Orange'],
      sizes: ['Standard (30x15cm)']
    }
  },
  {
    id: 'key-stand-6',
    name: 'Dual-Tone Staggered Floating Shelf Key Board',
    category: 'MDF Key Hanging Stands',
    price: 3450,
    description: 'Modern charcoal dark wood backplate with dual staggered light grey shelves for sunglasses and 6 wooden peg hooks for key rings and masks.',
    rating: 4.9,
    reviewCount: 38,
    image: '/src/assets/images/wood_gray_staggered_shelf_1784022490039.jpg',
    isBestSeller: true,
    specifications: {
      material: 'Dual-Veneered Premium MDF',
      thickness: '15mm backboard',
      dimensions: '42cm x 24cm x 8cm',
      finish: 'Dark Charcoal & Matte Light Grey'
    },
    customizable: true,
    options: {
      fonts: ['Montserrat', 'Poppins'],
      colors: ['Charcoal & Grey', 'Walnut & Cream'],
      sizes: ['Standard (42x24cm)']
    }
  },
  {
    id: 'key-stand-7',
    name: 'Walnut & Slate Double-Ledge Key Organizer',
    category: 'MDF Key Hanging Stands',
    price: 3250,
    description: 'Rich walnut textured backboard supporting dual staggered shelves with 6 natural wooden peg hooks for face masks, lanyard, and key rings.',
    rating: 4.8,
    reviewCount: 24,
    image: '/src/assets/images/gray_key_holder_planter_1784022221276.jpg',
    isNewArrival: true,
    specifications: {
      material: 'High-Density MDF & Wooden Pegs',
      thickness: '15mm backboard',
      dimensions: '40cm x 22cm x 8cm',
      finish: 'Walnut Stain & Natural Wood Pegs'
    },
    customizable: false
  },
  {
    id: 'key-stand-8',
    name: 'Sleek Circular Floral Wall Key Organizer',
    category: 'MDF Key Hanging Stands',
    price: 3100,
    description: 'Unique circular white MDF wall organizer featuring a bird motif figurine, flower vase shelf, and 3 metallic key hooks.',
    rating: 4.8,
    reviewCount: 27,
    image: '/src/assets/images/white_circle_key_holder_1784022471061.jpg',
    isNewArrival: false,
    specifications: {
      material: 'Symmetrically Curved MDF Frame',
      thickness: '12mm sturdy base',
      dimensions: '30cm Diameter x 6cm Depth',
      finish: 'Satin Ivory Enamel'
    },
    customizable: true,
    options: {
      fonts: ['Playfair Display', 'Great Vibes'],
      colors: ['Ivory White', 'Pastel Pink', 'Cream Gold'],
      sizes: ['Standard (30cm)']
    }
  },
  {
    id: 'key-stand-9',
    name: 'Oak Eiffel Tower Souvenir Key Ledge',
    category: 'MDF Key Hanging Stands',
    price: 3650,
    description: 'Exquisite natural oak finish key station with double shelves holding Eiffel Tower souvenirs, sunglasses, keychains, and 6 hooks.',
    rating: 4.9,
    reviewCount: 31,
    image: '/src/assets/images/wood_eiffel_tower_shelf_1784022424692.jpg',
    isBestSeller: true,
    specifications: {
      material: 'Selected Premium MDF Base',
      thickness: '18mm solid frame',
      dimensions: '40cm x 20cm x 10cm',
      finish: 'Natural Honey Oak Polish'
    },
    customizable: true,
    options: {
      fonts: ['Playfair Display', 'Poppins'],
      colors: ['Honey Oak', 'Dark Walnut', 'Ivory White'],
      sizes: ['Standard (40x20cm)']
    }
  },
  {
    id: 'key-stand-10',
    name: 'White Eiffel Tower Paris Key Station',
    category: 'MDF Key Hanging Stands',
    price: 3650,
    description: 'Chic white duco painted entryway shelf set holding Paris Eiffel Tower figurines and metallic key organizers.',
    rating: 4.7,
    reviewCount: 15,
    image: '/src/assets/images/white_eiffel_tower_shelf_1784022438380.jpg',
    isNewArrival: false,
    specifications: {
      material: 'Premium Fiber MDF',
      thickness: '18mm frame',
      dimensions: '40cm x 20cm x 10cm',
      finish: 'Premium Matte White Lacquer'
    },
    customizable: false
  },
  {
    id: 'key-stand-11',
    name: 'Cavallino White Horse Figurine Key Hanger',
    category: 'MDF Key Hanging Stands',
    price: 3850,
    description: 'Premium dark charcoal key shelf adorned with a graceful white winged horse figurine and multiple key ring hooks.',
    rating: 4.9,
    reviewCount: 22,
    image: '/src/assets/images/black_horse_key_shelf_1784022454580.jpg',
    isBestSeller: false,
    specifications: {
      material: 'Ultra-Refined MDF Board',
      thickness: '15mm backplate',
      dimensions: '35cm x 18cm x 8cm',
      finish: 'Deep Charcoal Satin Polish'
    },
    customizable: true,
    options: {
      fonts: ['Cinzel', 'Montserrat'],
      colors: ['Deep Charcoal', 'Golden Teak', 'Pure White'],
      sizes: ['Standard (35x18cm)']
    }
  },

  // Wooden Shelves
  {
    id: 'shelf-1',
    name: 'Geometric Interlocking Stepped Teak Shelf',
    category: 'Wooden Shelves',
    price: 4850,
    description: 'An artful interlocking stepped wall organizer crafted from high-density teak MDF with hollow compartments for decor, books, and showpieces.',
    rating: 4.9,
    reviewCount: 33,
    image: '/src/assets/images/interlocking_stepped_wood_shelf_1784022614368.jpg',
    isNewArrival: true,
    specifications: {
      material: 'High-Density Structural MDF',
      thickness: '15mm frames',
      dimensions: '70cm Wide x 45cm High x 12cm Depth',
      finish: 'Satin Teak Polish'
    },
    customizable: false
  },
  {
    id: 'shelf-2',
    name: 'Triple Tier Vertical Space-Saving Wall Shelf',
    category: 'Wooden Shelves',
    price: 4200,
    description: 'Tall 3-tier vertical wooden wall display shelf in deep dark walnut grain, ideal for books, trophies, plants, and home decor items.',
    rating: 4.9,
    reviewCount: 26,
    image: '/src/assets/images/tall_vertical_wooden_shelf_1784022596462.jpg',
    isBestSeller: false,
    specifications: {
      material: 'Dual-Layered Timber MDF Board',
      thickness: '15mm backer',
      dimensions: '25cm Wide x 90cm High x 12cm Depth',
      finish: 'Dark Antique Charcoal Stain'
    },
    customizable: true,
    options: {
      fonts: ['Montserrat', 'Poppins'],
      colors: ['Antique Charcoal', 'Golden Oak', 'Ivory White'],
      sizes: ['Standard (90cm High)', 'Tall (120cm High)']
    }
  },
  {
    id: 'shelf-3',
    name: 'White Wall Vanity Mirror with Side Display Shelves',
    category: 'Wooden Shelves',
    price: 7850,
    description: 'Wall-mounted dressing mirror setup featuring 3 tiered side shelves and a large HD glass mirror on a pristine white MDF frame.',
    rating: 4.9,
    reviewCount: 21,
    image: '/src/assets/images/white_vanity_mirror_shelves_1784022563777.jpg',
    isBestSeller: true,
    specifications: {
      material: 'Premium Water-Resistant MDF & High-Reflection Mirror',
      thickness: '18mm backplate',
      dimensions: '65cm Wide x 80cm High x 15cm Depth',
      finish: 'High-Gloss White Satin Enamel'
    },
    customizable: false
  },
  {
    id: 'shelf-4',
    name: 'White Dressing Table Unit with Mirror & Drawer Cabinet',
    category: 'Wooden Shelves',
    price: 8950,
    description: 'Complete wall dressing unit with rectangular mirror, 3 tiered side shelves, and a built-in bottom storage drawer cabinet for vanity items.',
    rating: 4.8,
    reviewCount: 17,
    image: '/src/assets/images/white_vanity_mirror_drawer_1784022581473.jpg',
    isNewArrival: true,
    specifications: {
      material: 'Durable Solid-Core MDF & Silver Glass',
      thickness: '18mm bases',
      dimensions: '50cm Wide x 90cm High x 18cm Depth',
      finish: 'High-Gloss White Satin Enamel'
    },
    customizable: false
  }
];
