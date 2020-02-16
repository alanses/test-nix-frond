<template>
    <div>
        <md-table v-model="reviews" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Who">{{ item.who }}</md-table-cell>
                <md-table-cell md-label="When">{{ item.when }}</md-table-cell>
                <md-table-cell md-label="Short comment">{{ item.short_comment }}</md-table-cell>
                <md-table-cell md-label="Activity name">{{ item.activity_name }}</md-table-cell>
                <md-table-cell md-label="Address">{{ item.address }}</md-table-cell>
                <md-table-cell md-label="Actions">
                    <md-button class="btn-view" @click="viewReview(item.id)">View</md-button>
                </md-table-cell>
                <md-table-cell md-label="Available">
                    <b-form-checkbox
                            @change="makeCheck"
                            @input="makeAvailable(item.id)"
                            :checked="item.published"
                            switch
                            size="lg"
                    >
                    </b-form-checkbox>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    import {ReviewsService} from "@/common/api.service";

    export default {
        name: "Reviews",
        data() {
            return {
                tableHeaderColor: "",
                checked: null,
            };
        },
        props: {
            reviews: Array,
            default: []
        },
        methods: {
            viewReview(id) {
                this.$router.push({
                    path: `/reviews/${id}`
                });
            },

            makeCheck(checked) {
                this.checked = checked;
            },

            makeAvailable(id) {
                ReviewsService.confirmReview(id, {'available': this.checked});
            }
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