<template>
    <div>
        <md-table v-model="orders" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Product name">{{ item.product }}</md-table-cell>
                <md-table-cell md-label="Price">{{ item.price }}</md-table-cell>
                <md-table-cell md-label="Category">{{ item.category }}</md-table-cell>
                <md-table-cell md-label="User name">{{ item.user }}</md-table-cell>
                <md-table-cell md-label="Quantity">{{ item.quantity }}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    export default {
        name: "Orders",
        data() {
            return {
                tableHeaderColor: "",
            };
        },
        props: {
            orders: Array,
            default: []
        }
    }
</script>

<style scoped>
    .btn-delete {
        background: #c51162 !important;
        margin-right: 10px;
    }

    .btn-view {
        background: #3d5afe !important;
        min-width: 100px;
    }
</style>