'use client';

interface ServiceCategorySelectionProps {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export default function ServiceCategorySelection({ selectedCategories, onChange }: ServiceCategorySelectionProps) {
  const serviceCategories = [
    {
      category: 'Outdoor & Yard Services',
      services: [
        'Lawn Mowing & Maintenance',
        'Landscaping & Garden Design',
        'Tree Services & Removal',
        'Pressure Washing',
        'Snow Removal',
        'Irrigation Systems'
      ]
    },
    {
      category: 'Exterior Home Maintenance',
      services: [
        'Roofing & Gutters',
        'Siding & Exterior Painting',
        'Window Cleaning & Repair',
        'Deck & Patio Services',
        'Driveway & Walkway Repair',
        'Exterior Lighting'
      ]
    },
    {
      category: 'Core Home Systems',
      services: [
        'HVAC Services',
        'Plumbing',
        'Electrical Work',
        'Water Heater Services',
        'Appliance Repair',
        'Home Security Systems'
      ]
    },
    {
      category: 'Interior Maintenance',
      services: [
        'Interior Painting',
        'Flooring Installation & Repair',
        'Tile & Grout Services',
        'Drywall Repair',
        'Cabinet Installation & Repair',
        'Door & Window Installation'
      ]
    },
    {
      category: 'Home Cleaning & Appearance',
      services: [
        'House Cleaning',
        'Carpet Cleaning',
        'Window Cleaning',
        'Organization Services',
        'Move-in/Move-out Cleaning',
        'Post-Construction Cleanup'
      ]
    },
    {
      category: 'Specialized Home Services',
      services: [
        'Pool Services & Maintenance',
        'Chimney Cleaning & Repair',
        'Pest Control',
        'Basement Waterproofing',
        'Garage Door Services',
        'Fence Installation & Repair'
      ]
    },
    {
      category: 'Home Improvement & Lifestyle',
      services: [
        'Kitchen Remodeling',
        'Bathroom Remodeling',
        'Home Theater Installation',
        'Smart Home Integration',
        'Interior Design',
        'Custom Storage Solutions'
      ]
    },
    {
      category: 'Home Assessment & Advisory',
      services: [
        'Home Inspection',
        'Energy Audits',
        'Property Management',
        'Home Staging',
        'Real Estate Photography',
        'Maintenance Planning'
      ]
    }
  ];

  const handleCategoryToggle = (service: string) => {
    const newCategories = selectedCategories.includes(service)
      ? selectedCategories.filter(s => s !== service)
      : [...selectedCategories, service];
    onChange(newCategories);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Select Your Service Categories
        </h3>
        <p className="text-gray-600 mb-6">
          Choose all the services you provide. You can always add more later.
        </p>
      </div>

      <div className="space-y-6">
        {serviceCategories.map((category) => (
          <div key={category.category} className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">{category.category}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.services.map((service) => (
                <label
                  key={service}
                  className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(service)}
                    onChange={() => handleCategoryToggle(service)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-900">{service}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedCategories.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">
            Selected Services ({selectedCategories.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((service) => (
              <span
                key={service}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {service}
                <button
                  onClick={() => handleCategoryToggle(service)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}