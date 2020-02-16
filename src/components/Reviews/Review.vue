<template>
    <div class="gym-info">
        <form @submit.prevent="updateReview">
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Gym Info</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Who</label>
                                <md-input v-model="review.who" type="text" disabled></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>When</label>
                                <md-input v-model="review.when" type="text" disabled></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-50 md-size-50">
                            <md-field>
                                <label>Activity name</label>
                                <md-input v-model="review.activity_name" type="text" disabled></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-50 md-size-50">
                            <md-field>
                                <label>Address</label>
                                <md-input v-model="review.address" type="text" disabled></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-100">
                            <md-field>
                                <label>Comment</label>
                                <md-input v-model="review.comment" type="text"></md-input>
                            </md-field>
                        </div>
                    </div>

                </md-card-content>
            </md-card>

            <div class="md-layout-item md-size-100 text-left">
                <md-button type="submit" class="md-raised md-success">Update Review</md-button>
            </div>

        </form>
    </div>
</template>

<script>
    import {ReviewsService} from "@/common/api.service";
    import Swal from 'sweetalert2'

    export default {
        name: "Review",
        data() {
            return {
                review: {},
            };
        },
        created() {
            const id = this.$route.params.id;
            this.getReviewById(id).then((response) => {
                this.review = response.data.data;
            });
        },
        methods: {
            getReviewById (id) {
                return ReviewsService.getReview(id);
            },

            getDateForUpdate() {
                return {
                    'comment': this.review.comment
                };
            },

            updateReview() {
                let id = this.review.id;

                ReviewsService.updateReview(id, this.getDateForUpdate()).then((result) => {
                    this.updateReviewData(result);
                    this.showMessageWithSuccessReview()
                });
            },

            updateReviewData(result) {
                this.review = result.data.data;
            },

            showMessageWithSuccessReview() {
                Swal.fire(
                    'Updated!',
                    'This review been updated',
                    'success'
                );
            }
        }
    }
</script>

<style scoped>

</style>