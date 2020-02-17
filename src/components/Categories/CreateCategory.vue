<template>
    <div class="category">
        <div class="category-info">
            <form @submit.prevent="createCategory">
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Category Info</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-small-size-100 md-size-100">
                            <md-field>
                                <label>Category name</label>
                                <md-input v-model="category.name" type="text" required></md-input>
                            </md-field>
                        </div>
                    </div>

                </md-card-content>
            </md-card>

            <div class="md-layout-item md-size-100 text-left">
                <md-button type="submit" class="md-raised md-success">Create</md-button>
            </div>

        </form>
        </div>
    </div>
</template>

<script>
    import {CategoriesService} from "@/common/api.service";
    import Swal from 'sweetalert2'
    import {ValidationService} from "@/common/validation.service";

    export default {
        name: "CreateActivity",
        data() {
            return {
                category: {
                    'name': null,
                },
            };
        },
        methods: {
            createCategory() {
                CategoriesService.createCategory(this.getDataForCreateCategory()).then((result) => {
                    this.category = result.data.data;
                    this.showMessageWithSuccess();
                }).catch((error) => {
                    if(error.response) {
                        let listMessages = ValidationService.getListErrors(error.response.data.errors);
                        this.showMessageWithError(listMessages);
                    }
                });
            },

            getDataForCreateCategory() {
                return {
                    'name': this.category.name
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
                    'This category been created',
                    'success'
                );
            },

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