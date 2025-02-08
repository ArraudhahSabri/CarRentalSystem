<template>
    <div class="animated-text-container">
        <h1 class="animated-text">
            <span class="text-part">{{ part1 }}</span>
            <span class="text-part highlight">{{ part2 }}</span>
            <span class="text-part">{{ part3 }}</span>
        </h1>
    </div>
</template>

<script>
export default {
    props: {
        part1: {
            type: String,
            default: 'Welcome to'
        },
        part2: {
            type: String,
            default: 'Car Rental'
        },
        part3: {
            type: String,
            default: 'System'
        }
    }
}
</script>

<style scoped>
.animated-text-container {
    text-align: center;
}

.animated-text {
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
}

.text-part {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px);
    margin: 0 0.5rem;
}

.text-part:nth-child(1) {
    animation: fadeInUp 0.8s ease forwards 0.5s;
}

.text-part:nth-child(2) {
    animation: fadeInUp 0.8s ease forwards 1s;
}

.text-part:nth-child(3) {
    animation: fadeInUp 0.8s ease forwards 1.5s;
}

.highlight {
    color: #3b82f6; /* Tailwind's blue-500 */
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style> 