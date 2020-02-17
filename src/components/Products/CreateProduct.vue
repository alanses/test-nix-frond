<template>
    <div class="category">
        <div class="category-info">
            <form @submit.prevent="createProduct">
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Category Info</h4>
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
                <md-button type="submit" class="md-raised md-success">Create Product</md-button>
            </div>

        </form>
        </div>
    </div>
</template>

<script>
    import {ProductsService, CategoriesService} from "@/common/api.service";
    import Swal from 'sweetalert2'
    import {ValidationService} from "@/common/validation.service";

    export default {
        name: "CreateProduct",
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
            this.getListCategories();
        },

        methods: {
            createProduct() {
                ProductsService.createProduct(this.getDataForCreateProduct()).then((result) => {
                    this.product = result.data.data;
                    this.showMessageWithSuccess();
                }).catch((error) => {
                    if(error.response) {
                        let listMessages = ValidationService.getListErrors(error.response.data.errors);
                        this.showMessageWithError(listMessages);
                    }
                });
            },

            getDataForCreateProduct() {
                return {
                    'name': this.product.name,
                    'price': this.product.price,
                    'category_id': this.product.category_id
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