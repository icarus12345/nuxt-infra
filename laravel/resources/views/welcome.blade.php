<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
         @vite([
            'resources/app/main.js',
            'resources/css/tailwind.css',
         ])
    </head>
    <body id="app" class="font-sans antialiased theme-zinc radix-themes " data-accent-color="green" data-gray-color="gray" data-has-background="true" data-panel-background="translucent" data-radius="medium" data-scaling="100%">
        <app-provider>
            <background></background>
            <avatar></avatar>
            <Btn>Btn Submit</Btn>
            <tooltip-provider>
                <tooltip-root>
                <tooltip-trigger
                    class="text-grass11 shadow-blackA7 hover:bg-green3 inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                >
                    <Icon icon="radix-icons:plus" />
                </tooltip-trigger>
                <tooltip-portal>
                    <tooltip-content
                    class="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-grass11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                    :side-offset="5"
                    >
                    Add to library
                    <tooltip-arrow
                        class="fill-white"
                        :width="8"
                    />
                    </tooltip-content>
                </tooltip-portal>
                </tooltip-root>
            </tooltip-provider>
            <Accordion></Accordion>
            <Btn>Btn Submit</Btn>
            <u-button>UButton Submit</u-button>
            <badge>Submit</badge>
            <counter></counter>
            <demo></demo>
            <my-form />
        </app-provider>
    </body>
</html>
