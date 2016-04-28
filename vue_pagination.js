Vue.component('pagination', {
    template:
        '<ul class="pagination">' +
            '<li v-if="showFirst"><a @click="params.page--"><i class="fa fa-angle-left"></i></a></li>' +
            '<li v-for="num in page_range" v-bind:class="{ \'active\': params.page == num }">' +
                '<a @click="pageClick(num)">${ num }</a>' +
            '</li>' +
            '<li v-if="showLast"><a @click="params.page++"><i class="fa fa-angle-right"></i></a></li>' +
        '</ul>',
    props: {
        params: {
            type: Object,
            require: true
        },
        num_page: {
            type: Number,
            require: true
        },
        callback: {
            type: Function,
            require: true
        }
    },
    computed: {
        page_range: function () {
            var left = 1,
                right = this.num_page,
                ar = [];
            if (this.num_page >= 11) {
                if (this.params.page > 5 && this.params.page < this.num_page - 4) {
                    left = this.params.page - 5;
                    right = this.params.page + 4;
                } else {
                    if (this.params.page <= 5) {
                        left = 1;
                        right = 10;
                    } else {
                        right = this.num_page;
                        left = this.num_page - 9;
                    }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++
            }
            return ar
        },
        showLast: function () {
            return this.params.page != this.num_page;
        },
        showFirst: function () {
            return this.params.page != 1;
        }
    },
    methods: {
        pageClick: function (cur_page) {
            if (cur_page != this.params.page) {
                this.params.page = cur_page;
                var params = this.params;
                params.page = this.params.page;
                this.params = params;
            }
        }
    },
    watch: {
        params: {
            handler: function () {
                this.callback();
            },
            deep: true
        }
    },
    ready: function () {
        this.callback();
    }
});
