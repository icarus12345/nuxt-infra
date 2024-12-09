import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useAuthStore = defineStore('AuthStore', () => {
  const accessToken = ref(null);
  const profile = ref(null);

  function decodeJwt(token: string): Record<string, any> | null {
    if (!token) return null;
  
    try {
      // JWT có 3 phần, tách bằng dấu `.`
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT token');
      }
  
      // Phần payload là phần thứ hai
      const payload = parts[1];
  
      // Decode từ Base64 và parse JSON
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }
  }

  // Lấy giá trị từ localStorage khi component mounted
  onMounted(() => {
    accessToken.value = localStorage.getItem('access_token');
    profile.value = JSON.parse(localStorage.getItem('profile') || 'null');
  });

  const setIdentity = (identity) => {
    accessToken.value = identity.token;
    localStorage.setItem('access_token', identity.token);

    profile.value = identity.user;
    localStorage.setItem('profile', JSON.stringify(identity.user));
  };

  const clear = () => {
    accessToken.value = null;
    profile.value = null;

    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
  };

  const permissions = computed(() => {
    if (accessToken.value) {
      const clamp = decodeJwt(accessToken.value);
      return clamp?.permissions || []
    }
    return [];
  });

  const roles = computed(() => {
    if (accessToken.value) {
      const clamp = decodeJwt(accessToken.value);
      return clamp?.roles || []
    }
    return [];
  });

  const hasPermission = (v) => {
    if (v instanceof Array) {
      return !!v.find(p => hasPermission(p))
    }
    return permissions.value.includes(v);
  }

  const hasRole = (v) => {
    if (v instanceof Array) {
      return !!v.find(p => hasRole(p))
    }
    return roles.value.includes(v);
  }

  return {
    accessToken,
    profile,
    setIdentity,
    clear,
    permissions,
    hasPermission,
    roles,
    hasRole,
  };
});