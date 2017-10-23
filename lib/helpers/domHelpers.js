var _ = require('underscore');

var helpers = {
  getClass : function(elInfo){
    return elInfo.attributes["class"].split(' ');
  },
  getAllAttributes : function (elInfo, attributeName){
    return elInfo.attributes[attributeName];
  },
  getAttribute : function (elInfo, attributeName){
    try{
      return elInfo.attributes[attributeName];
    } catch(e){
      console.log("---------------------");
      console.log(JSON.stringify(elInfo));
      console.log("---------------------");
    }
    
  },
  getElementsInfo : function(selector){
    return casper.getElementsInfo(selector);
  },
  dump: function(obj){
    return JSON.stringify(obj);
  }
}

module.exports = helpers;