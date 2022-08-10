<template>
    <div v-if="currentTutorial" class="edit-form">
        <div class="d-flex justify-content-between">
            <h4>Tutorial</h4>
            <router-link :to="{ path: '/' }">
                <button class="btn  btn-outline-success">
                    Back
                </button>
            </router-link>


        </div>
        <form>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" v-model="currentTutorial.title" />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="description" v-model="currentTutorial.description" />
            </div>
            <div class="form-group  mt-2">
                <label><strong>Status:</strong></label>
                {{ currentTutorial.published ? "Published" : "Pending" }}
            </div>
        </form>
        <div class="d-flex justify-content-around mt-3">
            <button class="btn btn-info" v-if="currentTutorial.published" @click="updataPublished(false)">
                UnPublish
            </button>
            <button v-else class="btn btn-info" @click="updataPublished(true)">
                Publish
            </button>

            <button type="button" class="btn btn-danger" @click="deleteTutorial">Delete</button>
            <button type="button" class="btn btn-dark" @click="updateTutorial">
                <div v-if="loading" class="spinner-border spinner-border-sm"></div>
                <span v-if="loading" class="px-1">Updating</span>
                <span v-else>Update</span>
            </button>
        </div>

    </div>
    <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
    </div>
</template>

<script>
import TutorialDataService from '@/services/TutorialDataService';
import Swal from 'sweetalert2'

export default {
    name: 'tutorial',
    data() {
        return {
            currentTutorial: null,
            message: '',
            loading: false
        };
    },
    methods: {
        getTutorial(id) {
            console.log(`get Tutorial by id ${id}`);
            TutorialDataService.get(id)
                .then((res) => {
                    this.currentTutorial = res.data.data
                }).catch((error) => {
                    console.log(error);
                })
        },
        updataPublished(status) {
            var data = {
                _id: this.currentTutorial._id,
                title: this.currentTutorial.title,
                description: this.currentTutorial.description,
                published: status
            };
            console.log(data)

            TutorialDataService.update(this.currentTutorial._id, data)
                .then((res) => {
                    this.currentTutorial.published = status;
                }).catch((error) => {
                    console.log(error)
                })
        },
        updateTutorial() {
            this.loading = !false
            TutorialDataService.update(this.currentTutorial._id, this.currentTutorial)
                .then((res) => {
                    this.message = 'The tutorial was updata successfully';
                    this.$router.push({ name: "tutorials" });
                    this.loading = !true
                }).catch((error) => {
                    console.log(error)
                })
        },
        deleteTutorial() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    TutorialDataService.delete(this.currentTutorial._id)
                        .then((res) => {
                            this.$router.push({ name: "tutorials" });
                        }).catch((error) => {
                            console.log(error)
                        })
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })

        }
    },
    mounted() {
        this.message = "";
        this.getTutorial(this.$route.params.id)
    }
}
</script>

<style>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>