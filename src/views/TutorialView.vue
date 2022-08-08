<template>
    <div v-if="currentTutorial" class="edit-form">
        <h4>Tutorial</h4>
        <form>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" v-model="currentTutorial.title" />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="description" v-model="currentTutorial.description" />
            </div>
            <div class="form-group">
                <label><strong>Status:</strong></label>
                {{ currentTutorial.published ? "Published" : "Pending" }}
            </div>
        </form>
        <button class="badge badge-primary mr-2" v-if="currentTutorial.published" @click="updataPublished(false)">
            UnPublish
        </button>
        <button v-else class="badge badge-primary mr-2" @click="updataPublished(true)">
            Publish
        </button>
        <button class="badge badge-danger mr-2" @click="deleteTutorial">
            Delete
        </button>
        <button type="submit" class="badge badge-success" @click="updateTutorial">
            Update
        </button>
        <p>{{ message }}</p>
    </div>
    <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
    </div>
</template>

<script>
import TutorialDataService from '@/services/TutorialDataService';

export default {
    name: 'tutorial',
    data() {
        return {
            currentTutorial: null,
            message: ''
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
            TutorialDataService.update(this.currentTutorial._id, this.currentTutorial)
                .then((res) => {
                    this.message = 'The tutorial was updata successfully';
                }).catch((error) => {
                    console.log(error)
                })
        },
        deleteTutorial() {
            TutorialDataService.delete(this.currentTutorial._id)
                .then((res) => {
                    this.$router.push({ name: "tutorials" });
                }).catch((error) => {
                    console.log(error)
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