import {createApp} from 'vue'
// import { createPinia } from 'pinia'

// import router from "@/router";
// import i18n from "@/plugins/i18n";
import AppProvider from "@/AppProvider.vue";
import Demo from "@/components/Demo.vue";
import MyForm from "@/components/MyForm.vue";
import Accordion from "@/components/Accordion.vue";
import UButton from "@/components/UButton.vue";
import Badge from "@/components/Badge.vue";
import Counter from "@/components/Counter.vue";
import Avatar from "@/components/Avatar.vue";
import Background from "@/components/Background.vue";
import RadixPlugin from 'radix-vue/plugin'
import {
  // AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger,
  // AvatarRoot, AvatarImage, AvatarFallback,
  Button,
  // TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger,
  // Card, CardContent, CardFooter, CardHeader, CardTitle,
  // ConfigProvider, DialogProvider,
  // AlertDialog,
  // Sonner
} from 'radix-vue'

const app = createApp().use(RadixPlugin)
// app.component('AccordionRoot', AccordionRoot)
// app.component('AccordionTrigger', AccordionTrigger)
// app.component('AccordionItem', AccordionItem)
// app.component('AccordionHeader', AccordionHeader)
// app.component('AccordionContent', AccordionContent)
// app.component('AvatarRoot', AvatarRoot)
// app.component('AvatarImage', AvatarImage)
// app.component('AvatarFallback', AvatarFallback)




// app.component('Accordion', Accordion)
// app.component('Badge', Badge)
app.component('Btn', Button)
app.component('UButton', UButton)
app.component('Counter', Counter)
// app.component('Avatar', Avatar)
app.component('Background', Background)
app.component('Demo', Demo)
app.component('MyForm', MyForm)
app.component('AppProvider', AppProvider)
// app.use(createPinia());

// app.use(router);
// app.use(i18n);
app.mount('#app');