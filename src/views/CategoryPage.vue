<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100">
                <category />
            </div>
        </div>
    </div>
</template>

<script>
    import Category from "../components/Categories/Category";

    export default {
        name: "CategoryPage",
        components: {Category}
    }
</script>

<style scoped>

</style>