!function(){function e(){var e=new google.maps.LatLng(3,-13);i.buildMap(n,function(){i.map.centerOn(e),i.getMap().setZoom(2)})}function t(e){3!=e?i.getMap().setZoom(8):i.getMap().setZoom(2)}function a(e){var a=e.coords,o=new google.maps.LatLng(a.latitude,a.longitude);i.map.centerOn(o),t(i.getMap().getCenter().k)}function o(e){_.each(e,function(e){var t=e.location.toLowerCase().replace(/\W/g,""),a=$("#"+t);a.on("click",function(t){c.removeClass("active"),$(this).addClass("active"),t.preventDefault(),i.getMap().setZoom(14),e.marker.setMap(i.getMap()),e.marker.panTo(),google.maps.event.trigger(e.marker.getServiceObject(),"click"),$("html, body").animate({scrollTop:0},"slow")}),google.maps.event.addListener(e.marker.getServiceObject(),"click",function(){c.removeClass("active"),a.addClass("active"),i.getMap().setZoom(14)})})}function r(){var e=i.addMarkers(g);_.each(g,function(t,a){t.marker=e[a]}),o(g),i.bounds.extendWith(e),t(i.getMap().getCenter().k)}var i=Gmaps.build("Google",{markers:{clusterer:{minimumClusterSize:4,enableRetinaIcons:!0,styles:[{textSize:12,textColor:"#FFF",url:"/images/meetups/map-cluster-1-4edc5141.png",height:28,width:28},{textSize:15,textColor:"#FFF",url:"/images/meetups/map-cluster-2-3fd96080.png",height:36,width:36}]}}}),n=$("meta[name=mapOptions]").attr("content"),s=$("meta[name=locations]").attr("content");n=JSON.parse(n),s=JSON.parse(s),n.provider.zoomControlOptions=google.maps.ZoomControlStyle.SMALL;var g=[],c=$(".meetups.list a"),p=function(e){var t=e.groups;t.forEach(function(e){var t={url:"/images/meetups/map-pin-6cc9141d.png",width:20,height:28},a="";e.organizers&&_.each(e.organizers,function(e){"undefined"==typeof e.profileImage&&(e.profileImage="http://photos3.meetupstatic.com/photos/member/d/c/7/0/highres_179096432.jpeg"),a+="<div class='organizer'><div class='profile-img-wrapper'><img src='"+e.profileImage+"' class='profile-img'></div><strong>"+e.organizer+"</strong><br>Organizer</div>"}),e.infowindow="<div class='map-marker'><h2>"+e.location+"</h2>"+a+"<div class='view'><a href='"+e.url+"' target='_blank'>Go to meetup page</a></div></div>",e.picture=t,e.lat&&e.lng&&g.push(e)})};e(),navigator.geolocation.getCurrentPosition(a),s.forEach(p),i.buildMap(n,function(){r()})}();