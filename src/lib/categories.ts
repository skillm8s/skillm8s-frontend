// Service Category Types and Data

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  accent?: string;
  sortOrder: number;
  isActive: boolean;
  subcategories: ServiceSubcategory[];
}

export interface ServiceSubcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  categoryId: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  duration?: number;
  isActive: boolean;
  sortOrder: number;
  categoryId: string;
  subcategoryId?: string;
}

// Default category data (can be used as seed data or fallback)
export const defaultCategories: ServiceCategory[] = [
  {
    id: "outdoor-services",
    name: "Outdoor & Yard Services",
    slug: "outdoor-services",
    description: "Complete outdoor maintenance and landscaping solutions",
    icon: "🌿",
    accent: "from-green-500 to-emerald-500",
    sortOrder: 1,
    isActive: true,
    subcategories: [
      {
        id: "lawn-care",
        name: "Lawn Care",
        slug: "lawn-care",
        description: "Professional lawn maintenance services",
        sortOrder: 1,
        isActive: true,
        categoryId: "outdoor-services",
        services: [
          {
            id: "lawn-mowing",
            name: "Lawn Mowing & Edging",
            slug: "lawn-mowing",
            description: "Regular lawn mowing and edging services",
            sortOrder: 1,
            isActive: true,
            categoryId: "outdoor-services",
            subcategoryId: "lawn-care"
          },
          {
            id: "lawn-aeration",
            name: "Lawn Aeration & Seeding",
            slug: "lawn-aeration",
            description: "Improve lawn health with aeration and seeding",
            sortOrder: 2,
            isActive: true,
            categoryId: "outdoor-services",
            subcategoryId: "lawn-care"
          },
          {
            id: "lawn-fertilization",
            name: "Lawn Fertilization & Weed Control",
            slug: "lawn-fertilization",
            description: "Keep your lawn healthy and weed-free",
            sortOrder: 3,
            isActive: true,
            categoryId: "outdoor-services",
            subcategoryId: "lawn-care"
          },
          {
            id: "yard-cleanup",
            name: "Yard Clean-Up",
            slug: "yard-cleanup",
            description: "Seasonal yard cleanup and maintenance",
            sortOrder: 4,
            isActive: true,
            categoryId: "outdoor-services",
            subcategoryId: "lawn-care"
          }
        ]
      },
      {
        id: "landscaping",
        name: "Landscaping",
        slug: "landscaping",
        description: "Professional landscaping and garden design",
        sortOrder: 2,
        isActive: true,
        categoryId: "outdoor-services",
        services: [
          {
            id: "garden-maintenance",
            name: "Garden Maintenance",
            slug: "garden-maintenance",
            description: "Regular garden care and maintenance",
            sortOrder: 1,
            isActive: true,
            categoryId: "outdoor-services",
            subcategoryId: "landscaping"
          },
          {
            id: "landscaping-design",
            name: "Landscaping Design",
            slug: "landscaping-design",
            description: "Custom landscape design and installation",
            sortOrder: 2,
            isActive: true,
            categoryId: "outdoor-services",
            subcategoryId: "landscaping"
          },
          {
            id: "hedge-trimming",
            name: "Hedge & Shrub Trimming",
            slug: "hedge-trimming",
            description: "Professional hedge and shrub maintenance",
            sortOrder: 3,
            isActive: true,
            categoryId: "outdoor-services",
            subcategoryId: "landscaping"
          },
          {
            id: "mulching",
            name: "Mulching & Fertilizing",
            slug: "mulching",
            description: "Garden mulching and fertilization services",
            sortOrder: 4,
            isActive: true,
            categoryId: "outdoor-services",
            subcategoryId: "landscaping"
          }
        ]
      },
      {
        id: "tree-services",
        name: "Tree Services",
        slug: "tree-services",
        description: "Professional tree care and maintenance",
        sortOrder: 3,
        isActive: true,
        categoryId: "outdoor-services",
        services: [
          {
            id: "tree-trimming",
            name: "Tree Trimming & Pruning",
            slug: "tree-trimming",
            description: "Professional tree trimming and pruning",
            sortOrder: 1,
            isActive: true,
            categoryId: "outdoor-services",
            subcategoryId: "tree-services"
          },
          {
            id: "tree-removal",
            name: "Tree Removal",
            slug: "tree-removal",
            description: "Safe and professional tree removal",
            sortOrder: 2,
            isActive: true,
            categoryId: "outdoor-services",
            subcategoryId: "tree-services"
          },
          {
            id: "stump-grinding",
            name: "Stump Grinding",
            slug: "stump-grinding",
            description: "Complete stump removal and grinding",
            sortOrder: 3,
            isActive: true,
            categoryId: "outdoor-services",
            subcategoryId: "tree-services"
          },
          {
            id: "emergency-tree",
            name: "Emergency Tree Service",
            slug: "emergency-tree",
            description: "24/7 emergency tree services",
            sortOrder: 4,
            isActive: true,
            categoryId: "outdoor-services",
            subcategoryId: "tree-services"
          }
        ]
      }
    ]
  },
  {
    id: "exterior-maintenance",
    name: "Exterior Home Maintenance",
    slug: "exterior-maintenance",
    description: "Keep your home's exterior in perfect condition",
    icon: "🏠",
    accent: "from-blue-500 to-indigo-500",
    sortOrder: 2,
    isActive: true,
    subcategories: [
      {
        id: "power-washing",
        name: "Power Washing",
        slug: "power-washing",
        description: "Professional pressure washing services",
        sortOrder: 1,
        isActive: true,
        categoryId: "exterior-maintenance",
        services: [
          {
            id: "house-washing",
            name: "House Washing",
            slug: "house-washing",
            description: "Complete exterior house cleaning",
            sortOrder: 1,
            isActive: true,
            categoryId: "exterior-maintenance",
            subcategoryId: "power-washing"
          },
          {
            id: "deck-cleaning",
            name: "Deck Cleaning",
            slug: "deck-cleaning",
            description: "Professional deck cleaning and maintenance",
            sortOrder: 2,
            isActive: true,
            categoryId: "exterior-maintenance",
            subcategoryId: "power-washing"
          },
          {
            id: "fence-washing",
            name: "Fence Washing",
            slug: "fence-washing",
            description: "Fence cleaning and restoration",
            sortOrder: 3,
            isActive: true,
            categoryId: "exterior-maintenance",
            subcategoryId: "power-washing"
          }
        ]
      },
      {
        id: "gutter-services",
        name: "Gutter Services",
        slug: "gutter-services",
        description: "Complete gutter maintenance and repair",
        sortOrder: 2,
        isActive: true,
        categoryId: "exterior-maintenance",
        services: [
          {
            id: "gutter-cleaning",
            name: "Gutter Cleaning",
            slug: "gutter-cleaning",
            description: "Professional gutter cleaning service",
            sortOrder: 1,
            isActive: true,
            categoryId: "exterior-maintenance",
            subcategoryId: "gutter-services"
          },
          {
            id: "gutter-repair",
            name: "Gutter Repair",
            slug: "gutter-repair",
            description: "Gutter repair and maintenance",
            sortOrder: 2,
            isActive: true,
            categoryId: "exterior-maintenance",
            subcategoryId: "gutter-services"
          },
          {
            id: "gutter-installation",
            name: "Gutter Installation",
            slug: "gutter-installation",
            description: "New gutter installation services",
            sortOrder: 3,
            isActive: true,
            categoryId: "exterior-maintenance",
            subcategoryId: "gutter-services"
          }
        ]
      }
    ]
  },
  {
    id: "core-systems",
    name: "Core Home Systems",
    slug: "core-systems",
    description: "Expert HVAC, plumbing, and electrical services",
    icon: "🔧",
    accent: "from-purple-500 to-pink-500",
    sortOrder: 3,
    isActive: true,
    subcategories: [
      {
        id: "plumbing",
        name: "Plumbing",
        slug: "plumbing",
        description: "Professional plumbing services",
        sortOrder: 1,
        isActive: true,
        categoryId: "core-systems",
        services: [
          {
            id: "drain-cleaning",
            name: "Drain Cleaning",
            slug: "drain-cleaning",
            description: "Professional drain cleaning and unclogging",
            sortOrder: 1,
            isActive: true,
            categoryId: "core-systems",
            subcategoryId: "plumbing"
          },
          {
            id: "pipe-repair",
            name: "Pipe Repair",
            slug: "pipe-repair",
            description: "Pipe repair and replacement services",
            sortOrder: 2,
            isActive: true,
            categoryId: "core-systems",
            subcategoryId: "plumbing"
          },
          {
            id: "fixture-installation",
            name: "Fixture Installation",
            slug: "fixture-installation",
            description: "Plumbing fixture installation and repair",
            sortOrder: 3,
            isActive: true,
            categoryId: "core-systems",
            subcategoryId: "plumbing"
          }
        ]
      },
      {
        id: "hvac",
        name: "HVAC",
        slug: "hvac",
        description: "Heating, ventilation, and air conditioning",
        sortOrder: 2,
        isActive: true,
        categoryId: "core-systems",
        services: [
          {
            id: "ac-maintenance",
            name: "AC Maintenance",
            slug: "ac-maintenance",
            description: "Air conditioning maintenance and repair",
            sortOrder: 1,
            isActive: true,
            categoryId: "core-systems",
            subcategoryId: "hvac"
          },
          {
            id: "heating-repair",
            name: "Heating Repair",
            slug: "heating-repair",
            description: "Heating system repair and maintenance",
            sortOrder: 2,
            isActive: true,
            categoryId: "core-systems",
            subcategoryId: "hvac"
          },
          {
            id: "duct-cleaning",
            name: "Duct Cleaning",
            slug: "duct-cleaning",
            description: "Professional duct cleaning services",
            sortOrder: 3,
            isActive: true,
            categoryId: "core-systems",
            subcategoryId: "hvac"
          }
        ]
      },
      {
        id: "electrical",
        name: "Electrical",
        slug: "electrical",
        description: "Professional electrical services",
        sortOrder: 3,
        isActive: true,
        categoryId: "core-systems",
        services: [
          {
            id: "outlet-installation",
            name: "Outlet Installation",
            slug: "outlet-installation",
            description: "Electrical outlet installation and repair",
            sortOrder: 1,
            isActive: true,
            categoryId: "core-systems",
            subcategoryId: "electrical"
          },
          {
            id: "lighting-installation",
            name: "Lighting Installation",
            slug: "lighting-installation",
            description: "Indoor and outdoor lighting installation",
            sortOrder: 2,
            isActive: true,
            categoryId: "core-systems",
            subcategoryId: "electrical"
          },
          {
            id: "electrical-repair",
            name: "Electrical Repair",
            slug: "electrical-repair",
            description: "General electrical repair services",
            sortOrder: 3,
            isActive: true,
            categoryId: "core-systems",
            subcategoryId: "electrical"
          }
        ]
      }
    ]
  }
];

// Helper functions
export const getCategoryBySlug = (slug: string): ServiceCategory | undefined => {
  return defaultCategories.find(category => category.slug === slug);
};

export const getSubcategoryBySlug = (categorySlug: string, subcategorySlug: string): ServiceSubcategory | undefined => {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find(sub => sub.slug === subcategorySlug);
};

export const getServiceBySlug = (categorySlug: string, subcategorySlug: string, serviceSlug: string): Service | undefined => {
  const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug);
  return subcategory?.services.find(service => service.slug === serviceSlug);
};