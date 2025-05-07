export const apiRequest = async (url, method, data = null, isAuthRequired = true) => {
  const token = isAuthRequired ? localStorage.getItem('token') : null;

  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(`http://localhost:3000/api${url}`, options);
    
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Something went wrong');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    return { message: error.message };
  }
};

// Fungsi untuk menyimpan token
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Fungsi untuk menghapus token (logout)
export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/frontend/login.html';  // Redirect ke halaman login setelah logout
};
