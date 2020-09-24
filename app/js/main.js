const key = 'AJBS1oP1v8qsx_MOmBf9dxMy5Dm7xqVRBOmXE_jFtgc';
const url = 'https://api.unsplash.com/photos';

new Vue({
    el: '#app',
    data: {
        photos: [],
        totalPhotos: 0,
        perPage: 10,
        currentPage: 5,
        views: []
    },
    methods: {
        fetchPhotos: function (page) {
            const options = {
                params: {
                    page,
                    per_page: this.perPage,
                    client_id: key,

                }
            };
            axios.get(url, options)
                .then(response => {
                    if (!response) {
                        console.log('got no response from the server!!')
                    }
                    console.log(response)
                    this.photos = response.data;
                    console.log(this.photos)
                    this.totalPhotos = Number(response.headers['x-total']);
                    if (!this.totalPhotos) {
                        alert('No photos arrived!!!!')
                        this.currentPage ++;
                        this.fetchPhotos(this.currentPage)
                    }
                    this.currentPage = page;
                })
                .then(() => {
                    this.views = [];
                    for (let i = 0; i < this.photos.length; i ++) {
                        const statUrl = 'https://api.unsplash.com/photos/' + this.photos[i].id + '/statistics'
                        const statOptions = {
                            params: {
                                client_id: key
                            }
                        }
                        axios.get(statUrl, statOptions).then(response => {
                            response.data && response.data.views && this.views.push(response.data.views.total);
                        })
                    }
                }  )
        },
    },
    mounted: function () {
        this.fetchPhotos(this.currentPage)
    }
});