<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100">
                <product />
            </div>
        </div>
    </div>
</template>

<script>
    import Product from "../components/Products/Product";

    export default {
        name: "CategoryPage",
        components: {Product}
    }
</script>

<style scoped>

</style>