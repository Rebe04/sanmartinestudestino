<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ $page['props']['seo']['title'] ?? config('app.name', 'Laravel') }}</title>

        {{-- --- INICIO DE LAS METAETIQUETAS DINÁMICAS --- --}}

        {{-- Si la prop 'seo' existe, renderizamos las etiquetas para el post --}}
        @if(isset($page['props']['seo']))
            <meta property="og:title" content="{{ $page['props']['seo']['title'] }}">
            <meta property="og:description" content="{{ $page['props']['seo']['description'] }}">
            <meta property="og:image" content="{{ $page['props']['seo']['image'] }}">
            <meta property="og:url" content="{{ url()->current() }}">
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="{{ $page['props']['seo']['title'] }}" />
            <meta name="twitter:description" content="{{ $page['props']['seo']['description'] }}" />
            <meta name="twitter:image" content="{{ $page['props']['seo']['image'] }}" />
        @else
            {{-- Si no, renderizamos etiquetas por defecto para el resto del sitio --}}
            <meta property="og:title" content="San Martin es Tu Destino">
            <meta property="og:description" content="Descubre la magia, cultura y belleza de San Martín de los Llanos, Meta. Tu próxima aventura te espera.">
            {{-- Asegúrate de tener esta imagen en tu carpeta /public --}}
            <meta property="og:image" content="{{ asset('default-social-image.jpg') }}">
            <meta property="og:url" content="{{ url()->current() }}">
        @endif
        <meta property="og:type" content="website" />
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="{{ asset('favicon.png') }}">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
