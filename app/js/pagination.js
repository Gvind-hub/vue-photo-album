Vue.component('pagination', {
    template: '#pagination-template',
    props: {
        current: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 1
        },
        perPage: {
            type: Number,
            default: 9
        },
        pageRange: {
            type: Number,
            default: 1
        }
    },
    computed: {
        pages: function () {
            let pages = [];
            for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
                pages.push(i)
            }
            return pages
        },
        rangeStart: function() {
            const start = this.current - this.pageRange;
            return start > 0 ? start : 1
        },
        rangeEnd: function() {
            const end = this.current + this.pageRange;
            return end < this.totalPages ? end : this.totalPages
        },
        totalPages: function() {
            return Math.ceil(this.total/this.perPage)
        }
    },
    methods: {
        hasFirst: function () {
            return this.rangeStart !== 1
        },
        hasLast: function () {
            return this.rangeEnd < this.totalPages
        },
        changePage: function (page) {
            this.$emit('page-changed', page)
        }
    }
})