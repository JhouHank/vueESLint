// composables/useApi.js
import { ref } from 'vue';

export const useApi = () => {
  const loading = ref(false);
  const error = ref(null);
  const data = ref(null);

  const callApi = async (url, options = {}) => {
    loading.value = true;
    error.value = null;
    data.value = null;

    try {
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const responseData = await response.json();
      data.value = responseData;
    } catch (err) {
      error.value = err.message;
      console.error('API call failed:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    data,
    callApi,
  };
};
