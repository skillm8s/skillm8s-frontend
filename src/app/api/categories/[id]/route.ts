import { NextResponse } from 'next/server';
import { defaultCategories } from '@/lib/categories';

// GET /api/categories/[id] - Get a specific category
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Find category by slug or id
    const category = defaultCategories.find(cat => cat.id === id || cat.slug === id);
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ category });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT /api/categories/[id] - Update a category
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, slug, description, icon, accent, sortOrder, isActive } = body;

    // Find category
    const categoryIndex = defaultCategories.findIndex(cat => cat.id === id || cat.slug === id);
    
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if new slug conflicts with existing categories (excluding current)
    const existingCategory = defaultCategories.find(cat => 
      cat.slug === slug && cat.id !== defaultCategories[categoryIndex].id
    );
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 409 }
      );
    }

    // Update category (in real implementation, this would update the database)
    const updatedCategory = {
      ...defaultCategories[categoryIndex],
      name,
      slug,
      description: description || defaultCategories[categoryIndex].description,
      icon: icon || defaultCategories[categoryIndex].icon,
      accent: accent || defaultCategories[categoryIndex].accent,
      sortOrder: sortOrder !== undefined ? sortOrder : defaultCategories[categoryIndex].sortOrder,
      isActive: isActive !== undefined ? isActive : defaultCategories[categoryIndex].isActive
    };

    return NextResponse.json({
      category: updatedCategory,
      message: 'Category updated successfully'
    });

  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id] - Delete a category
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Find category
    const category = defaultCategories.find(cat => cat.id === id || cat.slug === id);
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // In a real implementation, this would delete from database
    // For now, we'll just return success
    return NextResponse.json({
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}