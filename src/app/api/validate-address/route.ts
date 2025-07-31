import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address } = body;

    if (!address || !address.trim()) {
      return NextResponse.json(
        { error: 'Address is required', isValid: false },
        { status: 400 }
      );
    }

    // Simple address validation - in a real app, you'd use a geocoding service
    // For now, we'll do basic validation
    const addressTrimmed = address.trim();
    
    // Basic validation rules
    const hasNumbers = /\d/.test(addressTrimmed);
    const hasComma = addressTrimmed.includes(',');
    const minLength = addressTrimmed.length >= 10;
    
    // Check for common address components
    const hasStreetIndicators = /\b(street|st|avenue|ave|road|rd|drive|dr|lane|ln|boulevard|blvd|circle|cir|court|ct|place|pl)\b/i.test(addressTrimmed);
    
    if (!hasNumbers || !minLength) {
      return NextResponse.json({
        error: 'Please enter a complete address with street number and name',
        isValid: false,
      });
    }

    // Mock geocoding response - in reality, you'd call Google Maps or another service
    const isValid = hasNumbers && (hasComma || hasStreetIndicators) && minLength;
    
    if (isValid) {
      // Mock coordinates for demonstration
      const mockLat = 40.7128 + (Math.random() - 0.5) * 0.1; // Around NYC
      const mockLng = -74.0060 + (Math.random() - 0.5) * 0.1;
      
      return NextResponse.json({
        isValid: true,
        formattedAddress: addressTrimmed,
        lat: mockLat,
        lng: mockLng,
      });
    } else {
      return NextResponse.json({
        error: 'Please enter a valid street address with city and state/province',
        isValid: false,
      });
    }
    
  } catch (error) {
    console.error('Address validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate address', isValid: false },
      { status: 500 }
    );
  }
}