;(function (global, doc) {

  function Map(pageInfo) {
    this.id = pageInfo.id;
    this.widget = [];
    this.core = [];
    this.isAlreadyDispatch = false;
  }

  Map.prototype.common = function (path) {
    var setting = parse(path) || {}
      , core = setting.core || []
      , widget = setting.widget || []
      ;

    this.core = core.concat(this.core);
    this.widget = widget.concat(this.widget);
  }

  Map.prototype.go = function (config) {
    var that = this
      , mapping
      ;

    config = config || {};

    if (this.isAlreadyDispatch || config.id !== this.id) {
      return;
    }

    mapping = parse(config.to);
    this.core.concat(mapping.core || []);
    this.widget.concat(mapping.widget || []);

    doc.addEventListener('DOMContentLoaded', function () {
      dispatch(that.core, that.widget);
    }, false);
  };

  function dispatch(widgets, cores) {
    var i
      , iz
      , modules = []
      , Module
      ;

    modules = module.concat(widgets, cores);

    for (i = 0, iz = modules.length; i < iz; i++) {
      Module = parse(modules[i]);
      (new Module).build();
    }
  }

  function parse(path) {
    var chain = path.split('.')
      , parent = global
      , i
      , iz
      ;

    for (i = 0, iz = chain.length; i < iz; i++) {
      parent = parent[chain[i]];
      if (!parent) {
      throw new Error('can not parse: ' + path);
      }
    }

    return parent;
  }

  global.require_router = function () {
    return function route(fn, getId) {
      var id = getId()
        , map = new Map({id: id})
        ;

      fn(map);
    };
  };
}(window, document));