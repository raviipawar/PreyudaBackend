export const isLoggedIn = () => !!localStorage.getItem('jwtToken');
export const getUserRole = () => localStorage.getItem('userRole');