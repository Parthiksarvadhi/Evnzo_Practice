import axios from 'axios';

/**
 * Extract error message from API error response
 */
export function getApiErrorMessage(error: unknown, defaultMessage = 'An error occurred'): string {
  if (axios.isAxiosError(error)) {
    // Check for response data message
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    
    // Check for response data error
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    
    // Check for status text
    if (error.response?.statusText) {
      return error.response.statusText;
    }
    
    // Check for request error
    if (error.request) {
      return 'No response from server. Please check your connection.';
    }
  }
  
  // Check if error is an Error object
  if (error instanceof Error) {
    return error.message;
  }
  
  // Return default message
  return defaultMessage;
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'long') {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate random ID
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if value is empty
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}
