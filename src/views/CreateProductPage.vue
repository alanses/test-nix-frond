<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100">
                <create-product />
            </div>
        </div>
    </div>
</template>

<script>
    import CreateProduct from "../components/Products/CreateProduct";

    export default {
        name: "CategoryPage",
        components: {CreateProduct}
    }
</script>

<style scoped>

</style>