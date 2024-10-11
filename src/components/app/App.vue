<template>
  <div class="app font-monospace">
    <div class="content">
      <AppInfo :allMoviesCount="movies.length" :favouriteMoviesCount="movies.filter((c) => c.favourite).length" />
      <div class="search-panel">
        <SearchPanel :onUpdateTerm="onUpdateTerm" />
        <AppFilter :updateFilterHandler="updateFilterHandler" :filterName="filter" />

      </div>
      <div v-if="!movies.length">
        <p class="text-center fs-3 text-warning"> Kinolar mavjud emas</p>
      </div>
      <MovieList v-else :movies="onFilterHandler(onSearchHandler(movies, term), filter)" @onLike="onLikeHandler"
        @onFavourite="onFavouriteHandler" @onDelete="onMovieDelete" />
      <nav aria-label="pagination" class="d-flex justify-content-center">
        <ul class="pagination pagination-sm">
          <li v-for="pageNumber in totalPages" :class="{ 'active': pageNumber == page }" :key="pageNumber"
            @click="changePageHandler(pageNumber)">
            <span class="page-link"> {{ pageNumber }} </span>
          </li>
        </ul>
      </nav>
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
import axios from 'axios'

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
      movies: [],
      limit: 10,
      page: 1,
      term: '',
      filter: 'popular',
      totalPages: 0,
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
    },

    async onFetchMovies() {
      try {
        console.log('started')
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _limit: this.limit,
              _page: this.page
            },
          }

        )
        const data = response.data
        console.log(data)

        const newArr = data.map(e => ({
          id: e['id'],
          name: e['title'],
          like: false,
          favourite: false,
          views: e['id'] * 77
        }))

        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.movies = newArr
        console.log('ended')

      } catch (error) {
        alert(error.message)
      }
    },

    changePageHandler(page) {
      this.page = page
    },


  },
  mounted() {
    console.log("mounted")
    this.onFetchMovies()
  },

  watch: {
    page() {
      this.onFetchMovies()
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