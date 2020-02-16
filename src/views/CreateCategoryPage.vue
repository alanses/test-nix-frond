<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100">
                <create-category />
            </div>
        </div>
    </div>
</template>

<script>
    import CreateCategory from "@/components/Categories/CreateCategory.vue";
    export default {
        name: "CreateCategoryPage",
        components: {CreateCategory}
    }
</script>

<style scoped>

</style>