import { NextResponse } from 'next/server';
import { defaultCategories, ServiceCategory } from '@/lib/categories';

// GET /api/categories - Get all categories
export async function GET() {
  try {
    // For now, return static data. Later this can be replaced with database queries
    const categories = defaultCategories.filter(category => category.isActive);
    
    return NextResponse.json({
      categories,
      total: categories.length
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create a new category
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, description, icon, accent, sortOrder } = body;

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingCategory = defaultCategories.find(cat => cat.slug === slug);
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 409 }
      );
    }

    // Create new category
    const newCategory: ServiceCategory = {
      id: `category-${Date.now()}`,
      name,
      slug,
      description: description || '',
      icon: icon || '📋',
      accent: accent || 'from-gray-500 to-gray-600',
      sortOrder: sortOrder || defaultCategories.length + 1,
      isActive: true,
      subcategories: []
    };

    // In a real implementation, this would save to database
    // For now, we'll just return the created category
    return NextResponse.json(
      { category: newCategory, message: 'Category created successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}