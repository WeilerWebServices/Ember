function getUrlParameter(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var a=new RegExp("[\\?&]"+e+"=([^&#]*)"),t=a.exec(location.search);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))}$(function(){var e,a=getUrlParameter("filter")||"all";$("#tomster-filter a").removeClass("active"),"all"===a?$('#tomster-filter a[href="/mascots"]').addClass("active"):$('#tomster-filter a[href$="'+a+'"]').addClass("active"),$(".tomster-wrapper").each(function(){e=$(this),-1===e.attr("data-tags").indexOf(a)&&e.hide()})});