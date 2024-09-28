<template>
  <div class="app font-monospace">
    <div class="content">
      <AppInfo :allMoviesCount="movies.length" :favouriteMoviesCount="movies.filter((c) => c.favourite).length" />
      <div class="search-panel">
        <SearchPanel :onUpdateTerm="onUpdateTerm" />
        <AppFilter :updateFilterHandler="updateFilterHandler" :filterName="filter" />

      </div>
      <MovieList :movies="onFilterHandler(onSearchHandler(movies, term), filter)" @onLike="onLikeHandler"
        @onFavourite="onFavouriteHandler" @onDelete="onMovieDelete" />
      <MovieAddForm @createMovie="createMovie" />
    </div>
  </div>
</template>

<script>
import AppInfo from '@/components/app-info/AppInfo.vue';
import SearchPanel from '@/components/search-panel/SearchPanel.vue'
import AppFilter from '@/components/app-filter/AppFilter.vue'
import MovieList from '../movie-list/MovieList.vue';
import MovieAddForm from "../movie-add-form/MovieAddForm.vue"

export default {
  components: {
    AppInfo,
    SearchPanel,
    AppFilter,
    MovieList,
    MovieAddForm,
  },

  data() {
    return {
      movies: [
        { name: "Titanik", views: 987, favourite: true, like: false, id: 1 },
        { name: "Intersstellar", views: 780, favourite: false, like: true, id: 2 },
        { name: "Ronaldo", views: 990, favourite: false, like: false, id: 3 },
        { name: "Real Madrid", views: 999, favourite: false, like: true, id: 4 },
        { name: "UEFA Champions League", views: 900, favourite: true, like: true, id: 5 },
      ],

      term: '',
      filter: 'popular',
    }
  },

  methods: {
    createMovie(item) {
      this.movies.push(item)
    },

    onLikeHandler(id) {
      this.movies = this.movies.map(e => {
        if (e.id == id) {
          e.like = !e.like
        }
        return e
      })
    },

    onFavouriteHandler(id) {
      this.movies = this.movies.map(e => {
        if (e.id == id) {
          e.favourite = !e.favourite
        }
        return e
      })
    },

    onMovieDelete(id) {
      this.movies = this.movies.filter(e => e.id != id)
    },

    onSearchHandler(arr, term) {
      if (term.length == 0) return arr

      return arr.filter(e => e.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
    },

    onUpdateTerm(term) {
      this.term = term
    },

    onFilterHandler(arr, filter) {
      switch (filter) {
        case 'popular':
          return arr.filter(e => e.like)
        case 'mostViewers':
          return arr.filter(e => e.views >= 500)
        default:
          return arr
      }
    },

    updateFilterHandler(filter) {
      this.filter = filter
    }
  }
}

</script>

<style>
.app {
  height: 100vh;
  color: black;
}

.content {
  width: 1000px;
  min-height: 700px;
  background-color: white;
  margin: 0 auto;
  padding: 5rem 0;
}

.search-panel {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #fcfaf5;
  border-radius: 4px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, .15);
}
</style>