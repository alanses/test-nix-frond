<template>
    <div class="content">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <div class="products">
                <md-button type="submit" class="md-raised md-success" @click="createProduct">Create Product</md-button>
            </div>
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Products: {{total}}</h4>
                </md-card-header>
                <md-card-content>
                    <products :products="products"></products>
                </md-card-content>
                <div class="pagination">
                    <b-pagination
                            v-model="currentPage"
                            :total-rows="total"
                            aria-controls="my-table"
                            :per-page="perPage"
                            first-text="First"
                            prev-text="Prev"
                            next-text="Next"
                            last-text="Last"
                            @change="updatePagination"
                    ></b-pagination>
                </div>
            </md-card>
        </div>
    </div>
</template>

<script>
    import {ProductsService} from "@/common/api.service";
    import Products from "../components/Products/Products";

    export default {
        name: "ProductsPage",
        components: {Products},
        data() {
            return {
                products: [],
                total: 0,
                currentPage: 1,
                perPage: 10,
            }
        },

        created() {
            this.getListProducts();
        },

        methods: {
            getListProducts() {
                ProductsService.getListProducts({'page': this.currentPage})
                    .then((result) => {
                        this.products = result.data.data;
                        this.total = result.data.meta.total;
                    });
            },

            updatePagination(page) {
                this.currentPage = page;
                this.getListProducts();
            },

            createProduct() {
                this.$router.push({ name: "create_product" });
            }
        }
    }


</script>

<style scoped>
    .pagination {
        margin-top: 15px;
    }

    .products {
        display: flex;
        justify-content: space-between;
    }
</style>