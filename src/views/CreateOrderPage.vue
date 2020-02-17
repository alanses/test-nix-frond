<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100">
                <create-order/>
            </div>
        </div>
    </div>
</template>

<script>
    import CreateOrder from "../components/Orders/CreateOrder";

    export default {
        name: "CreateOrderPage",
        components: {CreateOrder}
    }
</script>

<style scoped>

</style>