(function($) {
    function adjustPopupSize(popup) {
      if ($(window).width() >= 1200) {
        popup.options.maxWidth = 500;
      }
      else {
        popup.options.maxWidth = 300;
      }
      popup.update();
    }

    $(document).on('leaflet.map', function(e, settings, lMap, mapid) {
      lMap.on('popupopen', function (e) {
        if (e.popup) {
          adjustPopupSize(e.popup);
        }
      });
    });
})(jQuery);