!function(e){function o(o){const c=e("#color-indicator");let t=e("#custom-admin-color-picker .color-option input[type=radio]:checked").siblings(".color-palette").html();c.children("span").addClass("old-palette-shade"),c.append(`<span class="new-palette">${t}</span>`),c.find(".new-palette .color-palette-shade"),setTimeout((function(){c.find(".new-palette").removeClass("new-palette")}),500),setTimeout((function(){c.find(".old-palette-shade").remove()}),1e3)}function c(o){let c=e("#admin-color-css");if(c.length&&c.remove(),"fresh"===o)return e("#admin-color-css").length&&e("#admin-color-css").remove(),void(e("#colors-css").length&&e("#colors-css").remove());let t=`${colorOptionsAjax.adminUrl}css/colors/${o}/colors.min.css`;e("<link>",{id:"admin-color-css",rel:"stylesheet",href:t,type:"text/css"}).appendTo("head")}function t(o){e.post(colorOptionsAjax.ajax_url,{action:"set_default_color_scheme",theme:o,nonce:colorOptionsAjax.nonce},(function(e){e.success||alert("An error occurred while setting the default theme.")}))}e(document).ready((function(){e("#custom-admin-color-picker input[type=radio]").on("mouseenter",(function(){c(e(this).val())})).on("mouseleave",(function(){c(e("#custom-admin-color-picker input[type=radio]:checked").val())})),e("#custom-admin-color-picker input[type=radio]").on("click",(function(){let t=e(this).val();e(this).closest(".color-option").addClass("selected").siblings().removeClass("selected"),e.post(colorOptionsAjax.ajax_url,{action:"set_admin_color_scheme",color:t,nonce:colorOptionsAjax.nonce},(function(n){n.success?(c(t),o(),e("#your-profile input[name=admin_color][value="+t+"]").prop("checked",!0)):alert(n.data||"An error occurred while setting the color scheme.")}))})),e("#custom-admin-color-picker input[type=radio]").on("click",(function(){var o,c,n,i,l,r=e(this).val();o=r,c=(new Date).getHours(),n=c>=6&&c<18,i=e("#day_color_scheme").val(),l=e("#night_color_scheme").val(),n&&""===i?t(o):n||""!==l?e.post(colorOptionsAjax.ajax_url,{action:"set_day_night_color_scheme",theme:o,type:n?"day":"night",nonce:colorOptionsAjax.nonce},(function(c){c.success?n&&""!==i?e("#day_color_scheme").val(o):n||""===l||e("#night_color_scheme").val(o):alert("An error occurred while setting the day/night theme.")})):t(o)})),e("#your-profile #color-picker .color-option").on("click",(function(){var o=e(this).find("input[type=radio]").val();e("#custom-admin-color-picker input[type=radio][value="+o+"]").click()}));let n=e("#custom-admin-color-picker input[type=radio]:checked").val();o(),e("#your-profile input[name=admin_color][value="+n+"]").prop("checked",!0),e("#custom-admin-color-picker input[type=radio][value="+n+"]").prop("checked",!0).closest(".color-option").addClass("selected").siblings().removeClass("selected")}))}(jQuery);
//# sourceMappingURL=admin-color-options.js.map