import { useAuthStore } from "@gateways";

export const hasPermission = (permission: string): boolean => {
  const $AuthStore = useAuthStore()
  return $AuthStore.hasPermission(permission)
}