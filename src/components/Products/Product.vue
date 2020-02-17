<template>
    <div>
        <form @submit.prevent="updateProduct">
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Product Info</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Product name</label>
                                <md-input v-model="product.name" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Category</label>
                                <md-select v-model="product.category_id">
                                    <md-option
                                            v-for="category in list_categories"
                                            :value="category.id"
                                    >{{category.name}}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-100">
                            <md-field>
                                <label>Product price</label>
                                <md-input v-model="product.price" type="text"></md-input>
                            </md-field>
                        </div>
                    </div>

                </md-card-content>
            </md-card>

            <div class="md-layout-item md-size-100 text-left">
                <md-button type="submit" class="md-raised1 md-success">Update Product</md-button>
            </div>

        </form>

    </div>
</template>

<script>
    import {ProductsService, CategoriesService} from "@/common/api.service";
    import Swal from 'sweetalert2'
    import {ValidationService} from "@/common/validation.service";

    export default {
        name: "Product",
        data() {
            return {
                product: {
                    'id': null,
                    'name': null,
                    'category_id': null,
                    'price': null
                },
                list_categories: []
            };
        },
        created() {
            const id = this.$route.params.id;

            this.getProductById(id).then((response) => {
                this.product = response.data.data;
            });

            this.getListCategories();
        },

        methods: {
            getProductById(id) {
                return ProductsService.getProduct(id);
            },

            updateProduct() {
                let id = this.product.id;

                ProductsService.updateProduct(id, this.getDateForUpdate()).then((result) => {
                    this.updateProductData(result);
                    this.showMessageWithSuccessProduct();
                }).catch((error) => {
                    if(error.response) {
                        let listMessages = ValidationService.getListErrors(error.response.data.errors);
                        this.showMessageWithError(listMessages);
                    }
                })
            },

            showMessageWithError(message) {
                Swal.fire(
                    'Error!',
                    message,
                    'error'
                );
            },

            showMessageWithSuccessProduct() {
                Swal.fire(
                    'Updated!',
                    'This product been updated',
                    'success'
                );
            },

            updateProductData(result) {
                this.product = result.data.data;
            },

            getDateForUpdate() {
                return {
                    'name': this.product.name,
                    'price': this.product.price,
                    'category_id': this.product.category_id
                };
            },

            getListCategories() {
                CategoriesService.getListCategoriesForSelect().then((result) => {
                    this.list_categories = result.data.data;
                });
            }
        }
    }
</script>

<style scoped>

</style>