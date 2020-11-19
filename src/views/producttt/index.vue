<template>
    <div class="details-wrapper">
        <component :is="productComponent" :bindSalesCode="bindSalesCode" v-if="productComponent"></component>
        <div class="details-empty" v-else>
            <img src="./images/empty-image-error.png" alt="">
            <span>{{errorText}}</span>
        </div>
    </div>
</template>

<script src="./index.ts"></script>

