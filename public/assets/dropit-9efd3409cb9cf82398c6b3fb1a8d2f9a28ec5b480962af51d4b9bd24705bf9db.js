/*
 * Dropit v1.1.0
 * http://dev7studios.com/dropit
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
!function(e){e.fn.dropit=function(t){var i={init:function(t){return this.dropit.settings=e.extend({},this.dropit.defaults,t),this.each(function(){var t=e(this),i=e.fn.dropit.settings;t.addClass("dropit").find(">"+i.triggerParentEl+":has("+i.submenuEl+")").addClass("dropit-trigger").find(i.submenuEl).addClass("dropit-submenu").hide(),t.off(i.action).on(i.action,i.triggerParentEl+":has("+i.submenuEl+") > "+i.triggerEl,function(){return"click"==i.action&&e(this).parents(i.triggerParentEl).hasClass("dropit-open")?(i.beforeHide.call(this),e(this).parents(i.triggerParentEl).removeClass("dropit-open").find(i.submenuEl).hide(),i.afterHide.call(this),!1):(i.beforeHide.call(this),e(".dropit-open").removeClass("dropit-open").find(".dropit-submenu").hide(),i.afterHide.call(this),i.beforeShow.call(this),e(this).parents(i.triggerParentEl).addClass("dropit-open").find(i.submenuEl).show(),i.afterShow.call(this),!1)}),e(document).on("click",function(){i.beforeHide.call(this),e(".dropit-open").removeClass("dropit-open").find(".dropit-submenu").hide(),i.afterHide.call(this)}),"mouseenter"==i.action&&t.on("mouseleave",".dropit-open",function(){i.beforeHide.call(this),e(this).removeClass("dropit-open").find(i.submenuEl).hide(),i.afterHide.call(this)}),i.afterLoad.call(this)})}};return i[t]?i[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error('Method "'+t+'" does not exist in dropit plugin!'):i.init.apply(this,arguments)},e.fn.dropit.defaults={action:"click",submenuEl:"ul",triggerEl:"a",triggerParentEl:"li",afterLoad:function(){},beforeShow:function(){},afterShow:function(){},beforeHide:function(){},afterHide:function(){}},e.fn.dropit.settings={}}(jQuery);