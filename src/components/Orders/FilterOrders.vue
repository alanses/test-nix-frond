<template>
    <div>
        <md-card>
            <md-card-content>
                <div class="md-layout">
                    <div class="md-layout-item md-small-size-25 md-size-25">
                        <md-field>
                            <label>Category</label>
                            <md-select v-model="filter.category_id">
                                <md-option
                                        v-for="category in list_categories"
                                        :value="category.id"
                                >{{category.name}}
                                </md-option>
                            </md-select>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-25 md-size-25">
                        <md-datepicker v-model="filter.date_from"></md-datepicker>
                    </div>

                    <div class="md-layout-item md-small-size-25 md-size-25">
                        <md-datepicker v-model="filter.date_to"></md-datepicker>
                    </div>

                    <div class="md-layout-item md-small-size-25 md-size-25">
                        <md-button type="submit" class="md-raised md-success" @click="applyFilter">Apply filter</md-button>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
    import {CategoriesService} from "@/common/api.service";

    export default {
        name: "FilterOrders",
        data() {
            return {
                filter: {
                    category_id: null,
                    date_from: null,
                    date_to: null
                },
                list_categories: [],
            };
        },

        created() {
            this.getListCategories();
        },

        methods: {
            getListCategories() {
                CategoriesService.getListCategoriesForSelect().then((result) => {
                    this.list_categories = result.data.data;
                });
            },

            applyFilter() {
                this.$emit('searchByFilters', this.filter);
            }
        }
    }
</script>

<style scoped>

</style>