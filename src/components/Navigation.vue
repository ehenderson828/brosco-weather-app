<template>
    <header class="sticky top-0 bg-weather-primary shadow-lg">
        <nav 
            class="container flex flex-col sm:flex-row items-left gap-4 text-white py-6"
        >
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-7 flex-1">
                    <img src="@/assets/broscologo.jpg" alt="">
                    <i class="fa-solid fa-wind text-4xl" style="color: #ffffff;"></i>
                    <p class="text-2xl">Local Weather</p>
                </div>
            </RouterLink>
        </nav>
    </header>
</template>

<script setup>
    // Imports
    import { RouterLink } from 'vue-router'; 
</script>