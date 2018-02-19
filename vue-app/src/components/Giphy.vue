<template>
  <div class="giphy">
    <div class="row">
      <div class="col-sm-12">
        <div v-if="err" class="alert alert-dismissible alert-danger">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          {{err}}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="card border-secondary mb-3">
          <div class="card-header">Search</div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <input type="text" placeholder="search for something..." class="form-control" v-model="query">
              </div>
            </div>
            <div class="row">
              <div class="mt-3 col-lg-6 col-sm-12 text-sm-center">
                <button class="btn btn-lg btn-primary" v-bind:class="{ disabled: !page }" @click="decrPage">Previous</button>
              </div>
              <div class="mt-3 col-lg-6 col-sm-12 text-lg-right text-sm-center">
                <button class="btn btn-lg btn-primary" v-bind:class="{ disabled: results < 25 }" @click="incrPage">More Gifs</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="card border-secondary mb-3">
          <div class="card-header">
            Searching for "{{query}}" <span v-if="page">- page {{page + 1}}</span>
            <div class="progress mt-2" v-if="loading">
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
            </div>
          </div>
          <div class="card-body">
            <h3 v-if="results.length == 0">No results found...</h3>
            <div class="row">
              <span class="col-lg-4 mb-3 mt-3" v-for="res in results">
                <a :href="res.url">
                  <img :src="res.images.preview_gif.url" alt="" style="width:150px !important;">
                </a>
              </span>
            </div>
            <hr>
            <div class="row">
              <div class="mt-3 col-md-6 col-sm-12 text-md-left text-sm-center">
                <button class="btn btn-lg btn-primary" v-bind:class="{ disabled: !page }" @click="decrPage">Previous</button>
              </div>
              <div class="mt-3 col-md-6 col-sm-12 text-md-right text-sm-center">
                <button class="btn btn-lg btn-primary" v-bind:class="{ disabled: results < 25 }" @click="incrPage">More Gifs</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import req from 'request'

export default {
  name: 'Giphy',
  data() {
    return {
      query: 'nyan cat',
      page: 0,
      loading: false,
      results: [],
      err: false,
    }
  },
  components: {

  },
  computed: {
    offset() {
      return this.page * 25
    }
  },
  mounted() {
    this.getResults(this.query);
  },
  watch: {
    query(newQuery,oldQuery) {
      if (this.page != 0){
        this.page = 0; // triggers page watcher for request
      } else {
        this.getResults(); // explicit request
      }
    },
    page(newPage, oldPage) {
      this.getResults();
    }
  },
  methods: {
    decrPage() {
      if (this.page > 0) {
        this.page--;
      }
    },
    incrPage() {
      if (this.results.length >= 25) {
        this.page++;
      }
    },
    getResults(query) {
      this.results = [];
      this.loading = true;
      var paramStr = 'q='+encodeURI(this.query)+'&offset='+this.offset;

      this.makeRequest(paramStr);
    },
    makeRequest(paramStr) {
      req.get(window.location.origin+'/giphy?' + paramStr, (err, res, body) => {
        this.loading = false;

        if (!err) {
          const parsedBody = JSON.parse(body);
          this.results = parsedBody.data;
          this.err = false;
          return null;
        }

        if (!body) {
          this.results= [];
        }

        if (!_.isEmpty(err)) {
          this.err = err;
        }
      });
    }
  }
}
</script>
