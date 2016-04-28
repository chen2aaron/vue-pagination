# vue-pagination

Vue pagination component for use with Bootstrap

### How to use

1. Add the `vue_pagination.js` in your project.

2. In your Template:

    ```html

    <div class="portlet-body" >
        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th> Name </th>
                <th> CodeName </th>
                <th> CreatedAt</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="g in groups">
                <td>{{ g.name }}</td>
                <td>{{ g.code_name }}</td>
                <td>{{ g.created_at }}</td>
            </tr>
            </tbody>
        </table>
        <div class="text-right">
            <pagination :params="params" :num_page="num_page" :callback="loadGroupsData"></pagination>
        </div>
    </div>

    ```

3. In Your ViewModel:

    ```javascript

    var vm = new Vue({
        el: '#id',
        data: {
            params: { page: 1 },
            num_page: 1,
            groups: [], // back-end data that you need render to template
        },
        methods: {
            // this is callback
            loadGroupsData: function () {
                var self = this;
                $.get('/api/groups/' + '?' + $.param(self.params)).done(function (resp) {
                    self.groups = resp.results;
                    self.params.page = resp.page;
                    self.num_page = resp.num_page;
                })
            },
            }
        }
    });

    ```

4. Back-end: If you use Django REST Framework, your pagination would be like this:

```python
from collections import OrderedDict

from rest_framework import pagination
from rest_framework.response import Response


class CustomPagination(pagination.PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('count', self.page.paginator.count),
            ('page', self.page.number),
            ('num_page', self.page.paginator.num_pages),
            ('results', data)
        ]))


```

### Options

| Name     | Type     | Required | Default   | Description                                                   |
|----------|----------|----------|-----------|---------------------------------------------------------------|
| params   | Object   | true     | {page: 1} | query params, params.page is required, it means current page. |
| num_page | Number   | true     | any       | total page                                                    |
| callback | Function | true     | any       | callback function used to load data                           |

### Dependency

- Vue.js
- jQuery

### License
MIT
