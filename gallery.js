var app = new Vue({
  el: '#app',
  data: {
    currentPage: 0,
    imagesPerPage: 2,
    pageTitle: "VueJS Simple Gallery",
    // Future: the following data would all come from a remote API call 
    // mockup: sampledata.json
    photos: []
  },
  
  // ------------------------------------------------------------------------------------

  computed: {
    // total number of objects in our photos array
    totalImages: function(){
      return this.photos.length;
    }
  },

  // ------------------------------------------------------------------------------------
  
  methods: {

    getData: function() {
      // retrieve data from a .json file
      this.$http.get('/sampledata.json')
        .then( (response) => {
          var jsonData = JSON.parse(response.bodyText);
          this.photos = jsonData.data;  // .data is an array[] so we can assign it directly to photos
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
  }, 

  beforeMount(){ 
    this.getData();  // get .json data upon program startup
  }

})

