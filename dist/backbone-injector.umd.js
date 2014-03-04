/*! backbone-injector - v0.1.1 - 2014-03-04
 * 
 * Copyright (c) 2014 Stéphane Bachelier
 * Distributed under MIT LICENSE 
 * 
 * https://github.com/stephanebachelier/backbone-injector
 */
(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require('backbone'), require('backbone.wreqr'));
    }
    else if(typeof define === 'function' && define.amd) {
        define('backbone-injector', ['backbone', 'backbone.wreqr'], factory);
    }
    else {
        root['Backbone.Injector'] = factory(root.backbone, root.backbone.wreqr);
    }
}(this, function(Backbone, Wreqr) {

    /* global Backbone*/
    
    // Dependency injector
    // ===================
    // This module enable more decoupling by permitting to request or set a
    // resource.
    // It is built on top of `Wreqr.RequestResponse`.
    
    (function (Backbone, Wreqr) {
      'use strict';
    
      Backbone.Injector = Wreqr.RequestResponse.extend({
        // get
        // ---
        // Enable any component to get a resource value by passing a name
        //
        //     // di is the injector
        //     di.get('user'); // it will return the user
        get: function (name) {
          return this.getHandler(name)();
        },
    
        // set
        // ---
        // Enable any component to register a resource value by passing a name
        //
        //     // di is the injector
        //     // it will set the value user based with the name user
        //     di.set('user', user);
        set: function (name, value) {
          this.setHandler(name, function () {
            return value;
          });
          return this;
        },
    
        // req
        // ---
        // Enable any component to request a resource
        // it returns a wrapper function around `Wreqr.RequestResponse.request`,
        // that can be called at runtime.
        //
        //     // di is the injector
        //     // it return a function
        //     var func = di.req('a', 'b');
        //
        //     another example with Backbone.Model.url
        //     var model = Backbone.Model.extend({
        //       url: di.req('services', 'login');
        //     });
        req: function () {
          var args = arguments;
          var self = this;
          return function () {
            return self.request.apply(self, args);
          };
        }
      });
    
      return Backbone.Injector;
    
    }).call(null, Backbone, Backbone.Wreqr);
    

    return Backbone.Injector;

}));