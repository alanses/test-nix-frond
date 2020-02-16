<template>
    <div class="content">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <div class="cities">
                <md-button type="submit" class="md-raised md-success" @click="createCategory">Create Category</md-button>
            </div>
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Categories: {{total}}</h4>
                </md-card-header>
                <md-card-content>
                    <categories :categories="categories"></categories>
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
    import {CategoriesService} from "@/common/api.service";
    import Categories from "../components/Categories/Categories";

    export default {
        name: "CategoriesPage",
        components: {Categories},
        data() {
            return {
                categories: [],
                total: 0,
                currentPage: 1,
                perPage: 10,
            }
        },

        created() {
            this.getListCategories();
        },

        methods: {
            getListCategories() {
                CategoriesService.getListCategories({'page': this.currentPage})
                    .then((result) => {
                        this.categories = result.data.data;
                        this.total = result.data.meta.total;
                    });
            },

            updatePagination(page) {
                this.currentPage = page;
                this.getListCategories();
            },

            createCategory() {
                this.$router.push({ name: "create_category" });
            }
        }
    }


</script>

<style scoped>
    .pagination {
        margin-top: 15px;
    }

    .search-user {
        width: 300px;
    }

    .cities {
        display: flex;
        justify-content: space-between;
    }
</style>