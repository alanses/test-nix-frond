<template>
    <div>
        <form @submit.prevent="updateCategory">
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Category Info</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Category name</label>
                                <md-input v-model="category.name" type="text"></md-input>
                            </md-field>
                        </div>
                    </div>

                </md-card-content>
            </md-card>

            <div class="md-layout-item md-size-100 text-left">
                <md-button type="submit" class="md-raised1 md-success">Update Category</md-button>
            </div>

        </form>

    </div>
</template>

<script>
    import {CategoriesService} from "@/common/api.service";
    import Swal from 'sweetalert2'
    import {ValidationService} from "@/common/validation.service";

    export default {
        name: "Category",
        data() {
            return {
                category: {
                    'id': null,
                    'name': null,
                },
            };
        },
        created() {
            const id = this.$route.params.id;
            this.getCategoryById(id).then((response) => {
                this.category = response.data.data;
            })
        },

        methods: {
            getCategoryById(id) {
                return CategoriesService.getCategory(id);
            },
            updateCategory() {
                let id = this.category.id;

                CategoriesService.updateCategory(id, this.getDateForUpdate()).then((result) => {
                    this.updateCategoryData(result);
                    this.showMessageWithSuccessCity();
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

            showMessageWithSuccessCity() {
                Swal.fire(
                    'Updated!',
                    'This city been updated',
                    'success'
                );
            },

            updateCategoryData(result) {
                this.category = result.data.data;
            },

            getDateForUpdate() {
                return {
                    'name': this.category.name,
                };
            },
        }
    }
</script>

<style scoped>

</style>