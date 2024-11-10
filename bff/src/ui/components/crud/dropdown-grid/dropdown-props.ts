import { PropDef } from "@radix-ui/themes/dist/esm/props/prop-def.js";
import { colorPropDef } from '@radix-ui/themes/dist/esm/props/color.prop.js';
import { highContrastPropDef } from '@radix-ui/themes/dist/esm/props/high-contrast.prop.js';
import { radiusPropDef } from '@radix-ui/themes/dist/esm/props/radius.prop.js';

const sizes = ['1', '2', '3'] as const;
const selectRootPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

const triggerVariants = ['classic', 'surface', 'soft', 'ghost'] as const;

const selectTriggerPropDefs = {
  variant: { type: 'enum', className: 'rt-variant', values: triggerVariants, default: 'surface' },
  ...colorPropDef,
  ...radiusPropDef,
  placeholder: { type: 'string' },
} satisfies {
  variant: PropDef<(typeof triggerVariants)[number]>;
  placeholder: PropDef<string>;
};

const contentVariants = ['solid', 'soft'] as const;

const selectContentPropDefs = {
  variant: { type: 'enum', className: 'rt-variant', values: contentVariants, default: 'solid' },
  ...colorPropDef,
  ...highContrastPropDef,
} satisfies {
  variant: PropDef<(typeof contentVariants)[number]>;
};

export { selectRootPropDefs, selectTriggerPropDefs, selectContentPropDefs };