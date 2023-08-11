<script>
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="navbar mt-2">
        <div class="container">
            <div>
                <RouterLink class="navbar-brand d-flex justify-content-center align-item-center" to="/">
                    <img src="../assets/isAvailable.svg" alt="" height="20">
                </RouterLink>
            </div>


            <div class="d-flex justify-content-center align-item-center">
                <RouterLink to="/signup" class="nav-link fw-semibold text-white me-5">Create a Page Like This</RouterLink>
                <RouterLink to="/signin" class="nav-link fw-semibold text-white">Sign In</RouterLink>
            </div>

            
        </div>
    </nav>
</template>
