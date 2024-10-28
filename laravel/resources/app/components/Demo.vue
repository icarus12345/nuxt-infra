<template>
  <config-provider>
    <dialog-provider />
    <slot />
  </config-provider>
  <div class="w-full flex flex-col items-center">
    <accordion></accordion>
    <div class="max-w-[128rem] w-full grid grid-cols-3 gap-4 pt-40 pb-40">
      <card size="xs">
        <card-header>AccordionTailwind</card-header>
        <card-content><AccordionTailwind /></card-content>
      </card>
      <card variant="classic">
        <card-header>AlertDialogCss</card-header>
        <card-content><AlertDialogCss /></card-content>
      </card>
      <card>
        <card-header>AspectRatioCss</card-header>
        <card-content><AspectRatioCss /></card-content>
      </card>
      <card class="col-span-2">
        <card-header>NavigationMenuCss</card-header>
        <card-content><NavigationMenuCss /></card-content>
      </card>
      <card size="sm">
        <card-header>CollapsibleCss</card-header>
        <card-content><CollapsibleCss /></card-content>
      </card>
      <card size="md">
        <card-header>AvatarCss</card-header>
        <card-content><AvatarCss /></card-content>
      </card>
      <card size="lg">
        <card-header>CheckboxCss</card-header>
        <card-content><CheckboxCss /></card-content>
      </card>
      <card size="xl">
        <card-header>ComboboxCss</card-header>
        <card-content><ComboboxCss /></card-content>
      </card>
      <card>
        <card-header>ScrollAreaCss</card-header>
        <card-content><ScrollAreaCss /></card-content>
      </card>
      <card class="col-span-2">
        <card-header>ContextMenuCss</card-header>
        <card-content><ContextMenuCss /></card-content>
      </card>
      <card class="col-span-2">
        <card-header>DialogCss</card-header>
        <card-content><DialogCss /></card-content>
      </card>
      <card>
        <card-header>DropdownMenuCss</card-header>
        <card-content><DropdownMenuCss /></card-content>
      </card>
      <card>
        <card-header>MenubarCss</card-header>
        <card-content><MenubarCss /></card-content>
      </card>
      <card>
        <card-header>HoverCardCss</card-header>
        <card-content><HoverCardCss /></card-content>
      </card>
      <card>
        <card-header>LabelCss</card-header>
        <card-content><LabelCss /></card-content>
      </card>
      <card>
        <card-header>PopoverCss</card-header>
        <card-content><PopoverCss /></card-content>
      </card>
      <card>
        <card-header>ProgressCss</card-header>
        <card-content><ProgressCss /></card-content>
      </card>
      <card>
        <card-header>RadioGroupCss</card-header>
        <card-content><RadioGroupCss /></card-content>
      </card>
      <card>
        <card-header>SelectCss</card-header>
        <card-content><SelectCss /></card-content>
      </card>
      <card>
        <card-header>SelectMultipleCss</card-header>
        <card-content><SelectMultipleCss /></card-content>
      </card>
      <card>
        <card-header>SeparatorCss</card-header>
        <card-content><SeparatorCss /></card-content>
      </card>
      <card>
        <card-header>SliderCss</card-header>
        <card-content><SliderCss /></card-content>
      </card>
      <card>
        <card-header>SwitchCss</card-header>
        <card-content><SwitchCss /></card-content>
      </card>
      <card>
        <card-header>TabsCss</card-header>
        <card-content><TabsCss /></card-content>
      </card>
      <card>
        <card-header>ToggleCss</card-header>
        <card-content><ToggleCss /></card-content>
      </card>
      <card>
        <card-header>ToggleGroupCss</card-header>
        <card-content><ToggleGroupCss /></card-content>
      </card>
      <card class="col-span-2">
        <card-header>ToolbarCss</card-header>
        <card-content><ToolbarCss /></card-content>
      </card>
      <card>
        <card-header>TooltipCss</card-header>
        <card-content><TooltipCss /></card-content>
      </card>
    </div>
  </div>
</template>