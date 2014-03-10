routingjs
=========

client side routing for modern browser

```js
var route = require_router()
  ;

route(function (map) {
  // common modules
  map.common('app.common.mapping');

  // pageId
  map.go({
  	id: 'index',
  	to: 'app.index.mapping'
  });

  map.go({
  	id: 'item-list',
  	to: 'app.item_list.mapping'
  });

  map.go({
  	id: 'item-detail',
  	to: 'app.item_detail.mapping'
  });
}, function getId() {
  var html = document.documentElement;
  return html.dataset('pageId');
});
```js


each route:

```js
app.index.mapping = {
  core: [
    'app.index.core.Hoge',
    'app.index.core.Foo',
  ],
  widget: [
    'app.index.widget.Hoge',
    'app.index.widget.Foo',
  ]
};
```

each module:

```js
app.index.widget.Hoge = Hoge;

function Hoge() {

}

Hoge.prototype.build = function () {
  // ..
}
```
