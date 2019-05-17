var app = new Vue({
  el: '#app',
  data: {
    currentPage: 0,
    imagesPerPage: 3,
    pageTitle: "VueJS Simple Gallery",
    // Future: the following data would all come from a remote API call 
    photos: [
      { imageurl: 'https://images.unsplash.com/photo-1557652646-c4efca50f2de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        caption: 'This is photo of mountain. Id nostrud non esse est ea irure nulla ad.'      
      },
      { imageurl: 'https://images.unsplash.com/photo-1557600280-9ceddf1a3cc3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        caption: 'These are snowy mountains. Nulla enim culpa et cillum ad non officia veniam ex sint fugiat commodo minim.'
      },
      {
        imageurl: 'https://images.unsplash.com/photo-1557626204-59dd03fd2d31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        caption: 'Under starry skies at night. Consectetur elit esse anim officia est aliqua consequat pariatur cupidatat irure tempor.'
      },
      { imageurl: 'https://images.unsplash.com/photo-1513390282409-ece9661014f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
        caption: 'Bridge to the setting sun. Esse reprehenderit excepteur quis tempor amet.'
      },
      {
        imageurl: 'https://images.unsplash.com/photo-1467521335787-2f0fc0f0e9a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1145&q=80',
        caption: 'Brooklyn Bridge, whaccha looking at! Nisi do eu dolore sit dolore duis ea ullamco eiusmod aliquip sunt nulla minim.'
      },
      { 
        imageurl: 'https://images.unsplash.com/photo-1555284023-249222086985?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        caption: 'Reflection Mountain. Adipisicing non voluptate culpa mollit nulla non anim.'
      },
      { 
        imageurl: 'https://images.unsplash.com/photo-1549767742-ccfdeb07b71d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        caption: 'Dragon... say Dragon! Anim ut duis officia ad quis do ut.'
      },
      { imageurl: 'https://images.unsplash.com/photo-1519055301076-a34b55a8b4e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1272&q=80',
        caption: 'Paper Lanterns. Tempor qui consequat sint veniam ad ipsum aliquip.'
      }
    ]
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

