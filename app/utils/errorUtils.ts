/**
 * Utility function to extract user-friendly error messages from various error sources
 * @param error - The error object from API calls or other sources
 * @returns A user-friendly error message string
 */
export const getErrorMessage = (error: any): string => {
  // If it's already a string, return it
  if (typeof error === 'string') {
    return error;
  }

  // If it has a message property (from our enhanced API interceptor)
  if (error?.message) {
    return error.message;
  }

  // If it's an Axios error with response
  if (error?.response?.data) {
    const { data } = error.response;

    // Handle different backend error formats
    if (data.errors && Array.isArray(data.errors)) {
      return data.errors.join(', ');
    }

    if (data.message) {
      return data.message;
    }

    if (data.error) {
      return data.error;
    }

    if (typeof data === 'string') {
      return data;
    }
  }

  // Network errors
  if (error?.request) {
    return 'Network error - please check your connection and try again';
  }

  // Default fallback
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Type guard to check if error has status information
 */
export const hasErrorStatus = (error: any): error is { status: number; statusText?: string } => {
  return error && typeof error.status === 'number';
};