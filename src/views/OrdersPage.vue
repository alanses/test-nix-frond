<template>
    <div class="content">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <div class="products">
                <md-button type="submit" class="md-raised md-success" @click="createOrder">Create Order</md-button>
            </div>
            <div>
                <filter-orders @searchByFilters="searchByFilters"></filter-orders>
            </div>
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Orders</h4>
                </md-card-header>
                <md-card-content>
                    <orders :orders="orders"></orders>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>

<script>
    import {OrdersService} from "@/common/api.service";
    import Orders from "../components/Orders/Orders";
    import FilterOrders from "../components/Orders/FilterOrders";

    export default {
        name: "OrdersPage",
        components: {FilterOrders, Orders},

        data() {
            return {
                orders: []
            };
        },

        created() {
            this.getListOrders();
        },

        methods: {
            createOrder() {
                this.$router.push({ name: "create_order" });
            },

            getListOrders() {
                OrdersService.getListOrders().then((result) => {
                    this.orders = result.data.data;
                });
            },

            searchByFilters(filter) {
                let date = this.getDateForFilters(filter);

                OrdersService.getListOrders(date).then((result) => {
                    this.orders = result.data.data;
                });
            },

            getDateForFilters(filter) {
                return {
                    'category_id': filter.category_id,
                    'from': filter.date_from ? this.$moment(filter.date_from).format('YYYY-MM-DD') : null,
                    'to': filter.date_to ? this.$moment(filter.date_to).format('YYYY-MM-DD') : null
                };
            }
        }
    }
</script>

<style scoped>
    .orders {
        display: flex;
        justify-content: space-between;
    }
</style>