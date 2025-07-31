'use client';

import { useState, useEffect } from 'react';
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface Order {
  id: string;
  serviceType: string;
  description?: string;
  status: string;
  amount?: number;
  scheduledAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderHistoryProps {
  userId: string;
}

export default function OrderHistory({ userId }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration
    setTimeout(() => {
      setOrders([
        {
          id: '1',
          serviceType: 'Plumbing',
          description: 'Fix kitchen sink leak',
          status: 'completed',
          amount: 150.00,
          scheduledAt: '2024-01-15T10:00:00Z',
          completedAt: '2024-01-15T12:30:00Z',
          createdAt: '2024-01-10T09:00:00Z',
          updatedAt: '2024-01-15T12:30:00Z'
        },
        {
          id: '2',
          serviceType: 'Electrical',
          description: 'Install ceiling fan in bedroom',
          status: 'in-progress',
          amount: 200.00,
          scheduledAt: '2024-01-20T14:00:00Z',
          createdAt: '2024-01-18T11:00:00Z',
          updatedAt: '2024-01-20T14:00:00Z'
        },
        {
          id: '3',
          serviceType: 'Lawn Mowing',
          description: 'Weekly lawn maintenance',
          status: 'pending',
          amount: 75.00,
          scheduledAt: '2024-01-25T09:00:00Z',
          createdAt: '2024-01-22T16:00:00Z',
          updatedAt: '2024-01-22T16:00:00Z'
        }
      ]);
      setLoading(false);
    }, 500);
  }, [userId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
      case 'cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order History</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Order History</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <ClockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600">Your order history will appear here once you book services.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <h3 className="text-lg font-medium text-gray-900">{order.serviceType}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                  {order.status.replace('-', ' ')}
                </span>
              </div>
              
              {order.description && (
                <p className="text-gray-700 mb-3">{order.description}</p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-500">Order Date:</span>
                  <p className="text-gray-900">{formatDate(order.createdAt)}</p>
                </div>
                
                {order.scheduledAt && (
                  <div>
                    <span className="font-medium text-gray-500">Scheduled:</span>
                    <p className="text-gray-900">{formatDate(order.scheduledAt)}</p>
                  </div>
                )}
                
                {order.completedAt && (
                  <div>
                    <span className="font-medium text-gray-500">Completed:</span>
                    <p className="text-gray-900">{formatDate(order.completedAt)}</p>
                  </div>
                )}
                
                {order.amount && (
                  <div>
                    <span className="font-medium text-gray-500">Amount:</span>
                    <p className="text-gray-900 font-semibold">${order.amount.toFixed(2)}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}