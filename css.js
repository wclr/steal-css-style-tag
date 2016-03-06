exports.instantiate = function(load) {
  load.metadata.deps = [];
  load.metadata.execute = function(){
    if(load.source) {
      var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        source = load.source+"/*# sourceURL=" + load.address + " */";
      style.setAttribute('source-url', load.name)

      // make source load relative to the current page
      source = source.replace(/url\(['"]?([^'"\)]*)['"]?\)/g, function( whole, part ) {
        var result = "url(" + steal.joinURIs( load.address, part) + ")";
        return result
      });

      style.type = 'text/css';

      if (style.styleSheet){
        style.styleSheet.cssText = source;
      } else {
        style.appendChild(document.createTextNode(source));
      }
      head.appendChild(style);
    }

    return System.newModule({});
  };
  load.metadata.format = "css";
};

exports.buildType = "css";
exports.includeInBuild = true;
