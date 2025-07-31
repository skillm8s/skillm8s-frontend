// Mock Prisma client for development when client generation fails
export const prisma = {
  waitlistEntry: {
    create: async (data: { data: Record<string, unknown> }) => {
      // Mock implementation
      console.log('Mock Prisma create:', data);
      return { id: 'mock-id', ...data.data };
    }
  }
}; 