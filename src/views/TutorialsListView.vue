<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by title" v-model="title" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchTitle">
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="mb-3" align="center">
                <h6 class="text-center">Items per Page:</h6>
                <select v-model="pageSize" @change="handlePageSizeChange($event)">
                    <option v-for="size in pageSize" :key="size" :value="size">
                        {{ size }}
                    </option>
                </select>
            </div>
            <b-pagination v-model="page" :total-rows="count" :per-page="pageSize" prev-text="Prev" next-text="Next"
                @change="handlePageChange" align="center"></b-pagination>
        </div>

        <div class="col-md-6">
            <h4>Tutorials List</h4>
            <ul class="list-group">
                <li class="list-group-item" :class="{ active: index == currentIndex }"
                    v-for="(tutorial, index) in tutorials" :key="index" @click="setActiveTutorial(tutorial, index)">
                    {{ tutorial.title }}
                </li>
            </ul>
            <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
                Remove All
            </button>
        </div>
        <div class="col-md-6">
            <div v-if="currentTutorial">
                <h4>Tutorial</h4>
                <div>
                    <label><strong>Title:</strong></label> {{ currentTutorial.title }}
                </div>
                <div>
                    <label><strong>Description:</strong></label> {{ currentTutorial.description }}
                </div>
                <div>
                    <label><strong>Status:</strong></label> {{ currentTutorial.published ? "Published" : "Pending" }}
                </div>
                <router-link :to="{ path: '/tutorials/' + currentTutorial._id }">
                    <button type="button" class="btn btn-info">Edit</button>
                </router-link>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Tutorial...</p>
            </div>
        </div>
    </div>
</template>

<script>
import TutorialDataService from "@/services/TutorialDataService";
import Swal from 'sweetalert2'
export default {
    name: 'tutorial-list',
    data() {
        return {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            title: "",
            page: 1,
            count: 0,
            pageSize: 5,
            pageS: [3, 6, 9],
        }
    },
    mounted() {
        this.retriveTutorials();
    },
    methods: {
        getRequestParams(title, page, pageSize) {
            let params = {};
            if (title) {
                params['title'] = title
            }
            if (page) {
                params['page'] = page - 1;
            }

            if (pageSize) {
                params['size'] = pageSize;
            }

            return params
        },

        retriveTutorials() {
            const params = this.getRequestParams(
                this.title,
                this.page,
                this.pageSize
            )
            TutorialDataService.getAll(params)
                .then((res) => {
                    const { data, totalItems } = res.data;
                    this.tutorials = data;
                    this.count = totalItems;
                }).catch((error) => {
                    console.log(error);
                })
        },
        handlePageChange(value) {
            this.page = value;
            this.retriveTutorials()
        },
        handlePageSizeChange(event) {
            this.pageSize = event.target.value;
            this.page = 1;
            this.retriveTutorials()
        },

        refreshList() {
            this.retriveTutorials()
            this.currentTutorial = null;
            this.currentIndex = -1
        },
        setActiveTutorial(tutorial, index) {
            this.currentTutorial = tutorial;
            this.currentIndex = index
        },
        removeAllTutorials() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    TutorialDataService.deleteAll()
                        .then((res) => {
                            this.refreshList();
                        }).catch((error) => {
                            console.log(error);
                        }
                        )
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )

                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                    )
                }
            })
        },
        searchTitle() {
            TutorialDataService.findByTitle(this.title)
                .then((res) => {
                    this.tutorials = res.data.data;
                }).catch((error) => {
                    console.log(error)
                })
        }

    }
}

</script>

<style>
.list {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>
