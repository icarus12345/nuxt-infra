import { useAuthStore } from "@gateways";
export default defineNuxtPlugin(nuxtApp => {
  const vPermission = {
    created(el, binding, vnode) {
      const $AuthStore = useAuthStore()
      if (!$AuthStore.hasPermission(binding.value)) {
        el.style.display = 'none';
        el.remove()
        console.log(el)
      }
    },
    beforeMount(el, binding, vnode) {
    },
    // mounted(el, binding, vnode) {},
    // beforeUpdate(el, binding, vnode, prevVnode) {},
    // updated(el, binding, vnode, prevVnode) {},
    // beforeUnmount(el, binding, vnode) {},
    // unmounted(el, binding, vnode) {}
  }
  nuxtApp.vueApp.directive('permission', vPermission)
  nuxtApp.vueApp.directive('role', (el, binding, vnode) => {
    const $AuthStore = useAuthStore()
    if (!$AuthStore.hasRole(binding.value)) {
      el.style.display = 'none';
    }
  })
})