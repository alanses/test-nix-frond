<template>
    <div>
        <md-table v-model="categories" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Actions">
                    <md-button class="btn-view" @click="viewCategory(item.id)">View</md-button>
                    <md-button @click="deleteCategory(item.id)" class="btn-delete">Delete</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    import Swal from 'sweetalert2'
    import {CategoriesService} from "@/common/api.service";

    export default {
        name: "Categories",
        data() {
            return {
                tableHeaderColor: "",
            };
        },
        props: {
            categories: Array,
            default: []
        },
        methods: {
            viewCategory(id) {
                this.$router.push({
                    path: `/category/${id}`
                });
            },
            deleteCategory(id) {
                this.showMessageAboutConfirmDeleting().then((result) => {
                    let confirmDeleting = result.value;

                    if(confirmDeleting) {
                        this.deleteCategoryFromDatabase(id)
                            .then(() => this.deleteCategoryFromPage(id))
                            .then(() => this.showMessageAboutDeleted())
                            .catch(() => this.showMessageAboutDeleted())
                    }
                });
            },

            showMessageAboutConfirmDeleting() {
                return Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                });
            },

            deleteCategoryFromDatabase(id) {
                return CategoriesService.deleteCategory(id);
            },

            deleteCategoryFromPage(id) {
                const index = this.activities.findIndex(activity => activity.id === id);
                this.activities.splice(index, 1);
            },

            showMessageAboutDeleted() {
                return Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            },

            showMessageAboutError() {
                return Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            },
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

    .table-image {
        min-width: 50px;
        min-height: 50px;
        border-radius: 25%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
        background-color: #ebebeb;
        width: 50px;
        height: 50px;
    }
</style>