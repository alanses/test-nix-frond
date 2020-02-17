<template>
    <div class="category">
        <div class="category-info">
            <form @submit.prevent="createOrder">
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Order Info</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Category</label>
                                <md-select v-model="order.category_id">
                                    <md-option
                                            v-for="category in list_categories"
                                            :value="category.id"
                                    >{{category.name}}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Product</label>
                                <md-select v-model="order.product_id">
                                    <md-option v-for="product in list_products" :value="product.id">
                                        {{product.name}}
                                    </md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-100">
                            <md-field>
                                <label>Product quantity</label>
                                <md-input v-model="order.quantity" type="text"></md-input>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>
            </md-card>

            <div class="md-layout-item md-size-100 text-left">
                <md-button type="submit" class="md-raised md-success">Create Order</md-button>
            </div>

        </form>
        </div>
    </div>
</template>

<script>
    import {ProductsService, CategoriesService, OrdersService} from "@/common/api.service";
    import Swal from 'sweetalert2'
    import {ValidationService} from "@/common/validation.service";

    export default {
        name: "CreateProduct",
        data() {
            return {
                order: {
                    'product_id': null,
                    'quantity': null,
                    'category_id': null,
                },
                list_categories: [],
                list_products: []
            };
        },

        watch: {
            'order.category_id': function(id){
                this.getListProducts(id);
            }
        },

        created() {
            this.getListCategories();
        },

        methods: {
            createOrder() {
                OrdersService.createOrder(this.getDataForCreateOrder()).then((result) => {
                    this.order = result.data.data;
                    this.showMessageWithSuccess();
                }).catch((error) => {
                    if(error.response) {
                        let listMessages = ValidationService.getListErrors(error.response.data.errors);
                        this.showMessageWithError(listMessages);
                    }
                });
            },

            getDataForCreateOrder() {
                return {
                    'category_id': this.order.category_id,
                    'product_id': this.order.product_id,
                    'quantity': this.order.quantity,
                };
            },

            showMessageWithError(message) {
                Swal.fire(
                    'Error!',
                    message,
                    'error'
                );
            },

            showMessageWithSuccess() {
                Swal.fire(
                    'Created!',
                    'This product been created',
                    'success'
                );
            },

            getListCategories() {
                CategoriesService.getListCategoriesForSelect().then((result) => {
                    this.list_categories = result.data.data;
                });
            },

            getListProducts(id) {
                ProductsService.searchProductsByCategoryId({'category_id': id}).then((result) => {
                    this.list_products = result.data.data;
                });
            }
        }
    }
</script>

<style scoped>
    .category {
        display: flex;
    }

    .category .category-info {
        flex: 1 1 85%;
    }

</style>