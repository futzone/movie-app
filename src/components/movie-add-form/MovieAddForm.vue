<template>
    <div class="movie-add-form" v-on:submit.prevent>
        <h3>Yangi kino qo'shish</h3>
        <form class="add-form d-flex">
            <input type="text" class="form-control new-movie-label" placeholder="Qanday kino?" :value="name"
                v-on:input=" name = $event.target.value" />
            <input type="text" class="form-control new-movie-label" placeholder="Necha marta ko'rilgan?" :value="views"
                v-on:input=" views = $event.target.value" />
            <PrimaryButton class="btn btn-outline-dark" type="submit" @click="addMovie">Qo'shish</PrimaryButton>
        </form>
    </div>
</template>
<script>

export default {
    data() {
        return {
            name: "", views: ""
        }
    },

    methods: {
        addMovie() {
            const newMovie = { name: this.name, views: this.views, favourite: false, like: false, id: Date.now() }
            this.$emit('createMovie', newMovie)
            this.name = ""
            this.views = ""
        }
    }
}
</script>
<style>
.movie-add-form {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #fcfaf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, .15);
}
</style>