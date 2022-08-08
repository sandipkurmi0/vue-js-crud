<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" required v-model="tutorial.title" name="title" />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input class="form-control" id="description" required v-model="tutorial.description"
                    name="description" />
            </div>
            <div class="form-group-button">
                <button @click="saveTutorial" class="btn btn-success ">Submit</button>
            </div>
        </div>
        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="newTutorial">Add</button>
        </div>
    </div>
</template>

<script>
import TutorialDataService from "@/services/TutorialDataService"
export default {
    name: 'add-tutorial',
    data() {
        return {
            tutorial: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            submitted: false
        };
    },
    methods: {
        saveTutorial() {
            var data = {
                title: this.tutorial.title,
                description: this.tutorial.description
            }
            TutorialDataService.create(data)
                .then((res) => {
                    this.tutorial.id = res.data.data._id
                    this.submitted = true;
                }).catch((error) => {
                    console.log(error);
                })
        },

        newTutorial() {
            this.submitted = false;
            this.tutorial = {};
        }
    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}

.form-group-button {
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
