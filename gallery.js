var app = new Vue({
  el: '#app',
  data: {
    currentPage: 0,
    imagesPerPage: 3,
    pageTitle: "VueJS Simple Gallery",
    photos: []  // photos will be populated via a remote API call to retrieve a JSON data 
  },
  
  // ------------------------------------------------------------------------------------

  computed: {
    // total number of objects in our photos array
    totalImages: function(){
      return this.photos.length;
    }
  },

  // ------------------------------------------------------------------------------------

  beforeMount(){ 
    this.getRemoteData('/sampledata.json');  // get remote .json data during page load
  },

  // ------------------------------------------------------------------------------------

  methods: {

    getRemoteData: function(uri) {
      // retrieve remote json data via http GET
      this.$http.get(uri)
        .then( (response) => {
          // .data is an array[] so we can assign it directly to photos
          this.photos = JSON.parse(response.bodyText).data; 
        })
    },

    maxPage: function(){
      // max. number of page results based on total images and images per page
      return Math.ceil(this.totalImages / this.imagesPerPage);
    },

    pagePrev: function(){
      // decrement page counter
      this.currentPage -= 1;
      // lower bounds checking
      if (this.currentPage < 0){
        this.currentPage = 0;
      } 
    },

    pageNext: function(){
      // increment page counter
      this.currentPage += 1;
      // upper bounds checking
      if (this.currentPage > this.maxPage()-1){
        this.currentPage = this.maxPage()-1;
      }
    },

    showImage: function(index){
      // test to check if we need to show this image
      // by checking lower and upper bounds, based on currentPage number
      // example: imagesPerPage = 3, total images = 5
      // if on page 0, display image 0, 1, 2  .... (currentPage * imagesPerPage),  <=(currentPage * imagesPerPage) + imagesPerPage - 1
      // if on page 1, display image 3, 4     .... (currentPage * imagesPerPage),  <=(currentPage * imagesPerPage) + imagesPerPage - 1 or <= totalImages (whichever smaller)
      var lowerBound = this.currentPage * this.imagesPerPage;
      var upperBound = lowerBound + (this.imagesPerPage - 1);
      return ((index >= lowerBound) && (index <= upperBound)) ? true : false;
    }
  }

})

