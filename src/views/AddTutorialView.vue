<template>
    <div class="submit-form">
        <div>
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
                <button @click="saveTutorial" class="btn btn-success " :disabled="loading">
                    <div v-if="loading" class="spinner-border spinner-border-sm"></div>
                    <span v-if="loading" class="px-1">Saving</span>
                    <span v-else>Submit</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import TutorialDataService from "@/services/TutorialDataService"
import Swal from 'sweetalert2'
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
            loading: false
        };
    },
    methods: {
        saveTutorial() {

            this.loading = !false;
            var data = {
                title: this.tutorial.title,
                description: this.tutorial.description
            }
            TutorialDataService.create(data)
                .then((res) => {
                    Swal.fire({
                        position: 'bottom-center',
                        icon: 'success',
                        title: 'Your tutorial has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.tutorial.id = res.data.data._id
                    this.loading = !true;
                    this.$router.push({ name: "tutorials" });
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
