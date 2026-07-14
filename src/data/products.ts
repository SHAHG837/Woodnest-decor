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
    name: 'Classic Oak Tree Key Organiser',
    category: 'MDF Key Hanging Stands',
    price: 34.99,
    description: 'An elegant tree of life themed key hanging stand with 5 solid brass hooks. Hand-finished with premium walnut polish on high-grade MDF.',
    rating: 4.9,
    reviewCount: 48,
    image: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80&w=600', // elegant wooden hooks
    isBestSeller: true,
    specifications: {
      material: 'Premium MDF & Brass Hooks',
      thickness: '12mm',
      dimensions: '30cm x 20cm',
      finish: 'Matte Walnut Texture'
    },
    customizable: true,
    options: {
      fonts: ['Playfair Display', 'Poppins', 'Great Vibes'],
      colors: ['Walnut Brown', 'Teak Orange', 'Ebony Black', 'Natural Gold'],
      sizes: ['Standard (30x20cm)', 'Large (40x25cm)']
    }
  },
  {
    id: 'key-stand-2',
    name: 'Geometric Hexagon Key Station',
    category: 'MDF Key Hanging Stands',
    price: 29.99,
    description: 'Modern minimalist geometric hexagon structure featuring a small integrated pocket shelf for mail and 4 magnetic key slots.',
    rating: 4.7,
    reviewCount: 32,
    image: 'https://images.unsplash.com/photo-1532372320978-9b4d7a92b24d?auto=format&fit=crop&q=80&w=600',
    isNewArrival: true,
    specifications: {
      material: 'Engineered MDF & Neodymium Magnets',
      thickness: '15mm',
      dimensions: '25cm x 22cm',
      finish: 'Charcoal Black & Gold Accents'
    },
    customizable: false
  },
  {
    id: 'key-stand-3',
    name: 'Rustic Entryway Mail & Key Rack',
    category: 'MDF Key Hanging Stands',
    price: 31.99,
    description: 'A handcrafted dual-layered MDF key organizer featuring a shelf for letters, incoming mail, and sunglasses, paired with 5 antique bronze metal hooks.',
    rating: 4.8,
    reviewCount: 29,
    image: '/src/assets/images/gray_key_holder_planter_1784022221276.jpg',
    isBestSeller: false,
    specifications: {
      material: 'Premium MDF & Antique Bronze Hooks',
      thickness: '15mm base',
      dimensions: '35cm x 15cm x 8cm',
      finish: 'Satin Gray Premium Coat'
    },
    customizable: true,
    options: {
      fonts: ['Poppins', 'Montserrat', 'Playfair Display'],
      colors: ['Rustic Teak', 'Dark Walnut', 'Ebony Black'],
      sizes: ['Standard (35x15cm)']
    }
  },
  {
    id: 'key-stand-4',
    name: 'Sleek Magnetic Flush Key Strip',
    category: 'MDF Key Hanging Stands',
    price: 24.99,
    description: 'An ultra-slim magnetic key panel using strong neodymium magnets concealed beneath a premium satin finish wood veneer. Mounts completely flush to your wall.',
    rating: 4.9,
    reviewCount: 18,
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=600',
    isNewArrival: true,
    specifications: {
      material: 'Solid core MDF & Rare-Earth Magnets',
      thickness: '18mm',
      dimensions: '30cm x 5cm',
      finish: 'Satin Teak Polish'
    },
    customizable: false
  },
  {
    id: 'key-stand-5',
    name: 'White Ash Staggered Key Organizer',
    category: 'MDF Key Hanging Stands',
    price: 33.99,
    description: 'Elegant dual floating shelves in premium white ash wood grain. Features 5 heavy-duty metal hooks for keys, face masks, and keychains.',
    rating: 4.9,
    reviewCount: 24,
    image: '/src/assets/images/white_wood_key_holder_1784022384172.jpg',
    isBestSeller: true,
    specifications: {
      material: 'High-Density MDF & Silver Hooks',
      thickness: '15mm base',
      dimensions: '38cm x 22cm x 9cm',
      finish: 'White Ash Textured Finish'
    },
    customizable: true,
    options: {
      fonts: ['Poppins', 'Montserrat'],
      colors: ['White Ash', 'Ebony Black', 'Natural Oak'],
      sizes: ['Standard (38x22cm)']
    }
  },
  {
    id: 'key-stand-6',
    name: 'Ebony Black Staggered Key Organizer',
    category: 'MDF Key Hanging Stands',
    price: 33.99,
    description: 'Stately and bold staggered double-shelf unit with ebony black veneer, premium metallic details, and heavy-duty brass key hooks.',
    rating: 4.8,
    reviewCount: 19,
    image: '/src/assets/images/dark_wood_key_holder_1784022403357.jpg',
    isNewArrival: true,
    specifications: {
      material: 'Sustainably Sourced MDF',
      thickness: '15mm base',
      dimensions: '38cm x 22cm x 9cm',
      finish: 'Ebony Black Wood Grain Polish'
    },
    customizable: false
  },
  {
    id: 'key-stand-7',
    name: 'Eiffel Tower Oak Key Station',
    category: 'MDF Key Hanging Stands',
    price: 36.99,
    description: 'Exquisite entryway organizer featuring a spacious ledge for souvenir structures like Eiffel Tower figurines, sunglasses, and key hooks.',
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
    id: 'key-stand-8',
    name: 'Eiffel Tower Matte White Shelf',
    category: 'MDF Key Hanging Stands',
    price: 36.99,
    description: 'Chic white-painted minimalist wooden key station. Perfect for clean modern apartment entrances, featuring 4 sturdy metal hooks.',
    rating: 4.7,
    reviewCount: 15,
    image: '/src/assets/images/white_eiffel_tower_shelf_1784022438380.jpg',
    isNewArrival: false,
    specifications: {
      material: 'Premium Fiber MDF',
      thickness: '18mm',
      dimensions: '40cm x 20cm x 10cm',
      finish: 'Premium Matte White Lacquer'
    },
    customizable: false
  },
  {
    id: 'key-stand-9',
    name: 'Black Cavallino Figurine Key Rack',
    category: 'MDF Key Hanging Stands',
    price: 38.99,
    description: 'A premium entryway shelf styled with an elegant running horse figurine, creating an exquisite luxury piece for your foyer.',
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
  {
    id: 'key-stand-10',
    name: 'Sleek Circular Floral Key Rack',
    category: 'MDF Key Hanging Stands',
    price: 32.99,
    description: 'Beautiful round wall-mounted organizer containing a custom-fitted shelf for dried orange flower vases and 3 silver key hooks.',
    rating: 4.8,
    reviewCount: 27,
    image: '/src/assets/images/white_circle_key_holder_1784022471061.jpg',
    isNewArrival: true,
    specifications: {
      material: 'Symmetrically Curved MDF Frame',
      thickness: '12mm sturdy base',
      dimensions: '30cm Diameter x 6cm Depth',
      finish: 'Satin Ivory Enamel'
    },
    customizable: false
  },
  {
    id: 'key-stand-11',
    name: 'Minimalist Slate & Timber Key Organizer',
    category: 'MDF Key Hanging Stands',
    price: 35.99,
    description: 'Exquisite dual-toned wood backboard supporting grey-toned staggered shelves, designed to keep keys and protective masks cleanly separated.',
    rating: 4.9,
    reviewCount: 34,
    image: '/src/assets/images/wood_gray_staggered_shelf_1784022490039.jpg',
    isBestSeller: true,
    specifications: {
      material: 'Dual-Veneered Premium MDF',
      thickness: '15mm backboard',
      dimensions: '42cm x 24cm x 8cm',
      finish: 'Walnut Backing & Matte Grey Lacquered Shelves'
    },
    customizable: true,
    options: {
      fonts: ['Poppins', 'Montserrat'],
      colors: ['Walnut & Grey', 'Teak & Charcoal', 'Wenge & White'],
      sizes: ['Standard (42x24cm)', 'XL (50x28cm)']
    }
  },
  {
    id: 'key-stand-12',
    name: 'Compact Black AirPods & Key Hanger',
    category: 'MDF Key Hanging Stands',
    price: 22.99,
    description: 'Sleek ultra-compact black shelf featuring magnetic backing and four lower brass hooks. Excellent for holding earbuds and car keys.',
    rating: 4.8,
    reviewCount: 16,
    image: '/src/assets/images/black_minimal_key_shelf_1784022513824.jpg',
    isNewArrival: true,
    specifications: {
      material: 'Premium Dense Fiber MDF',
      thickness: '18mm lip shelf',
      dimensions: '25cm x 8cm x 5cm',
      finish: 'Matte Charcoal Black Duco Paint'
    },
    customizable: false
  },
  {
    id: 'key-stand-13',
    name: 'Cozy White Succulent Hanger',
    category: 'MDF Key Hanging Stands',
    price: 24.99,
    description: 'Clean Scandinavian-style key organizer showing off a bright yellow decorative home block and a succulent shelf.',
    rating: 4.9,
    reviewCount: 18,
    image: '/src/assets/images/white_minimal_shelf_succulent_1784022532372.jpg',
    isBestSeller: false,
    specifications: {
      material: 'Solid MDF core',
      thickness: '15mm framework',
      dimensions: '28cm x 10cm x 6cm',
      finish: 'Satin Milk White Lacquer'
    },
    customizable: true,
    options: {
      fonts: ['Poppins', 'Playfair Display'],
      colors: ['Satin Milk White', 'Dark Ash', 'Sunny Yellow'],
      sizes: ['Standard (28cm)']
    }
  },
  {
    id: 'key-stand-14',
    name: 'Classic Jade Entrance Shelf',
    category: 'MDF Key Hanging Stands',
    price: 26.99,
    description: 'A cozy dark-stained rustic entryway hook-rack with a solid wood veneer top shelf, perfect for small home accents.',
    rating: 4.7,
    reviewCount: 12,
    image: '/src/assets/images/simple_dark_wood_shelf_1784022548004.jpg',
    isNewArrival: false,
    specifications: {
      material: 'Eco-Friendly High-Density MDF',
      thickness: '18mm',
      dimensions: '30cm x 12cm x 7cm',
      finish: 'Deep Mahogany Stain'
    },
    customizable: false
  },

  // Name Plaques
  {
    id: 'name-plaque-1',
    name: 'The Grand Family Name Plaque',
    category: 'Name Plaques',
    price: 49.99,
    description: 'Customized family name board highlighted with stunning script typography and intricate laser-cut floral filigree borders.',
    rating: 5.0,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    specifications: {
      material: 'Dual-layered Premium MDF',
      thickness: '6mm + 8mm layered',
      dimensions: '45cm x 25cm',
      finish: 'High-Gloss Rosewood veneer & Gold leaf lettering'
    },
    customizable: true,
    options: {
      fonts: ['Playfair Display', 'Dancing Script', 'Montserrat', 'Alex Brush'],
      colors: ['Deep Mahogany', 'Golden Oak', 'Ebony & Gold', 'Classic Cream'],
      sizes: ['Medium (40x20cm)', 'Large (50x25cm)', 'Grand (60x30cm)']
    }
  },
  {
    id: 'name-plaque-2',
    name: 'Minimalist Monogram Door Sign',
    category: 'Name Plaques',
    price: 39.99,
    description: 'Sleek circular monogram letter door sign featuring your family initial in premium wood texture with custom engraving.',
    rating: 4.8,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
    specifications: {
      material: 'Circular MDF Board',
      thickness: '9mm',
      dimensions: '35cm Diameter',
      finish: 'Satin Teak Finish'
    },
    customizable: true,
    options: {
      fonts: ['Cinzel', 'Poppins', 'Montserrat'],
      colors: ['Natural Teak', 'Wenge Black', 'White Birch'],
      sizes: ['Small (30cm)', 'Medium (35cm)', 'Large (45cm)']
    }
  },

  // Wall Décor
  {
    id: 'wall-decor-1',
    name: 'Forest Silhouette Tri-Panel Art',
    category: 'Wall Décor',
    price: 79.99,
    description: 'A beautiful three-panel triptych representing a continuous pine forest skyline. Creates a spectacular floating effect with integrated back mounts.',
    rating: 4.9,
    reviewCount: 114,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    specifications: {
      material: 'Sustainably Sourced MDF',
      thickness: '8mm per panel',
      dimensions: '40cm x 80cm (x3 panels)',
      finish: 'Chalk Matte Black Finish'
    },
    customizable: false
  },
  {
    id: 'wall-decor-2',
    name: 'Mandala Harmony Geometric Star',
    category: 'Wall Décor',
    price: 54.99,
    description: 'Incredibly complex, 8-layered laser cut sacred geometry mandala wood plaque. Each layer hand-painted with high-end metallic and cream finishes.',
    rating: 4.9,
    reviewCount: 56,
    image: 'https://images.unsplash.com/photo-1544273677-c433136021d4?auto=format&fit=crop&q=80&w=600',
    specifications: {
      material: 'Multi-layer Laser Cut MDF',
      thickness: '24mm (8 layers x 3mm)',
      dimensions: '45cm x 45cm',
      finish: 'Metallic Gold, Bronze & Champagne Cream Acrylic'
    },
    customizable: false
  },

  // Islamic Wall Art
  {
    id: 'islamic-art-1',
    name: 'Ayat al-Kursi Royal Calligraphy',
    category: 'Islamic Wall Art',
    price: 89.99,
    description: 'A masterpiece of Islamic wall art. Exquisite Thuluth script of Ayat al-Kursi layered in premium golden acrylic on top of deep dark-brown mahogany MDF backing.',
    rating: 5.0,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    specifications: {
      material: 'MDF & 3D Mirrored Acrylic Overlay',
      thickness: '12mm MDF + 3mm Mirror Acrylic',
      dimensions: '60cm x 60cm',
      finish: 'Polished Rosewood & Radiant Mirror Gold'
    },
    customizable: true,
    options: {
      fonts: ['Traditional Thuluth', 'Elegant Kufic', 'Modern Diwani'],
      colors: ['Mirror Gold on Rosewood', 'Mirror Silver on Wenge', 'Classic Black on Oak'],
      sizes: ['Standard (60x60cm)', 'Large (80x80cm)', 'Royal (100x100cm)']
    }
  },
  {
    id: 'islamic-art-2',
    name: 'Surah Al-Ikhlas Calligraphy Shield',
    category: 'Islamic Wall Art',
    price: 64.99,
    description: 'Perfect teardrop shaped calligraphic design featuring Surah Al-Ikhlas, precision cut to perfection to add absolute spiritual elegance to your living room.',
    rating: 4.9,
    reviewCount: 39,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
    specifications: {
      material: 'High-density MDF',
      thickness: '10mm',
      dimensions: '40cm x 55cm',
      finish: 'Satin Champagne Gold & Charcoal'
    },
    customizable: false
  },

  // Customized Gifts
  {
    id: 'gift-1',
    name: 'Personalised Wooden Couple Portrait Ring',
    category: 'Customized Gifts',
    price: 44.99,
    description: 'A romantic double-ring circular wall hanging featuring custom laser engraved names, anniversary date, and elegant matching foliage.',
    rating: 4.8,
    reviewCount: 61,
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    specifications: {
      material: 'Selected Premium MDF Board',
      thickness: '9mm',
      dimensions: '38cm Diameter',
      finish: 'Honey Oak Gloss & Gold Accents'
    },
    customizable: true,
    options: {
      fonts: ['Great Vibes', 'Playfair Display', 'Dancing Script'],
      colors: ['Honey Oak', 'Dark Walnut', 'Soft Cream & Gold'],
      sizes: ['Standard (38cm)', 'Large (48cm)']
    }
  },

  // Wooden Shelves
  {
    id: 'shelf-1',
    name: 'Floating Cloud Multi-Tier Shelf',
    category: 'Wooden Shelves',
    price: 69.99,
    description: 'An architectural honeycomb shelf set with 3 interlocking hexagon compartments, perfect for showcasing indoor plants, succulents, and small crystals.',
    rating: 4.7,
    reviewCount: 74,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600',
    isNewArrival: true,
    specifications: {
      material: 'Double-walled Engineered MDF',
      thickness: '18mm framework',
      dimensions: '75cm Wide x 45cm High',
      finish: 'Rustic Walnut Stain & Matte Shellac'
    },
    customizable: false
  },
  {
    id: 'shelf-2',
    name: 'Honeycomb Interlocking Nesting Shelves',
    category: 'Wooden Shelves',
    price: 49.99,
    description: 'Set of 3 interlocking hexagonal wooden shelves made of durable engineered wood. Create a beautiful geometric hive on your bedroom or living room wall.',
    rating: 4.8,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    specifications: {
      material: 'Eco-Friendly High-Density MDF',
      thickness: '15mm frames',
      dimensions: '30cm x 30cm per hexagon (interlocking)',
      finish: 'Natural Beechwood & Matte Black Duco Paint'
    },
    customizable: true,
    options: {
      fonts: ['Montserrat', 'Poppins'],
      colors: ['Beechwood & Matte Black', 'Deep Walnut', 'All Satin White'],
      sizes: ['Standard Set', 'Extra Large Set']
    }
  },
  {
    id: 'shelf-3',
    name: 'Minimalist J-Frame Picture Wall Ledge',
    category: 'Wooden Shelves',
    price: 19.99,
    description: 'Sleek and sturdy wooden picture ledge shelf. Perfect for exhibiting family portrait frames, canvas prints, books, or small home decor accents.',
    rating: 4.9,
    reviewCount: 51,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600',
    isNewArrival: false,
    specifications: {
      material: 'Solid MDF core',
      thickness: '20mm lip-ledge',
      dimensions: '60cm x 10cm x 5cm',
      finish: 'Wenge Charcoal Satin Finish'
    },
    customizable: true,
    options: {
      fonts: ['Playfair Display', 'Poppins'],
      colors: ['Wenge Charcoal', 'Golden Oak', 'Ivory White'],
      sizes: ['Small (45cm)', 'Medium (60cm)', 'Large (90cm)']
    }
  },
  {
    id: 'shelf-4',
    name: 'Crescent Moon Celestial Tiered Shelf',
    category: 'Wooden Shelves',
    price: 44.99,
    description: 'A beautiful celestial circular frame containing tiered shelf slots, showcasing a crescent moon and stars cutout on high-density MDF.',
    rating: 4.9,
    reviewCount: 36,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600',
    isNewArrival: true,
    specifications: {
      material: 'Precision Laser Cut MDF',
      thickness: '12mm sturdy back',
      dimensions: '40cm Diameter x 8cm Depth',
      finish: 'Champagne Gold & Midnight Black Polish'
    },
    customizable: false
  },
  {
    id: 'shelf-5',
    name: 'Chic White Vanity Side-Shelves with Mirror',
    category: 'Wooden Shelves',
    price: 84.99,
    description: 'Wall-mounted dressing table set. Includes three storage shelves on the left side and a tall, polished rectangular glass mirror on the right.',
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
    id: 'shelf-6',
    name: 'Chic White Dressing Table Mirror with Cabinet',
    category: 'Wooden Shelves',
    price: 94.99,
    description: 'Elegant vertical white wall dressing unit featuring a high-reflection mirror and an integrated lower drawer cabinet to neatly store vanity items.',
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
  },
  {
    id: 'shelf-7',
    name: 'Rustic Triple-Tier Vertical Shelf',
    category: 'Wooden Shelves',
    price: 42.99,
    description: 'Beautiful space-saving vertical shelf organizer. Features three tiered dark oak wooden shelves on a durable, rustic timber backboard.',
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
    id: 'shelf-8',
    name: 'Geometric Stepped Teak Organizer',
    category: 'Wooden Shelves',
    price: 54.99,
    description: 'An artful interlocking stepped wall organizer containing beautiful rectangular and square compartments. Perfect for organizing books and showpieces.',
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

  // Home Accessories
  {
    id: 'accessory-1',
    name: 'Luxury Coaster Nesting Set',
    category: 'Home Accessories',
    price: 24.99,
    description: 'Set of 6 laser-etched wooden coasters representing different classical patterns, complete with a beautifully crafted matching holder.',
    rating: 4.8,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600',
    specifications: {
      material: 'High-density Water-resistant MDF',
      thickness: '4mm per coaster',
      dimensions: '10cm x 10cm',
      finish: 'Natural Teak Polish & Polyurethane Protective Seal'
    },
    customizable: false
  },

  // Office Décor
  {
    id: 'office-1',
    name: 'Executive Walnut Organiser Station',
    category: 'Office Décor',
    price: 39.99,
    description: 'A premium desk companion with a integrated slot for smartphone, tablet, cardholders, and magnetic slots for pens and paper clips.',
    rating: 4.9,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=600',
    specifications: {
      material: 'Ultra-refined MDF & Felt linings',
      thickness: '20mm solid base',
      dimensions: '28cm x 18cm',
      finish: 'Luxury Dark Walnut & Satin Sheen'
    },
    customizable: true,
    options: {
      fonts: ['Montserrat', 'Poppins', 'Cinzel'],
      colors: ['Executive Walnut', 'Matte Carbon Black'],
      sizes: ['Standard (28x18cm)']
    }
  }
];
