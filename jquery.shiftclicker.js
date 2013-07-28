// Enables shift clicks to select range of cells in table of checkboxes
// Also handles a select all checkbox, which should have a class of '.check-all' by default
// Triggers a 'change' event on each checkbox, excluding the select all checkbox
// This plugin will probably not work if there are multiple 'columns' of checkboxes
//
// Usage: $("table").shiftClicker();


;(function($) {
  $.fn.shiftClicker = function() {
    var selectAllSelector = ".check-all";
    var checkboxQuery = "input:checkbox:not(" + selectAllSelector + ")";
    
    return this.each(function() {
      var $this = $(this);
      var lastChecked = null;
      
      var $selectAll = $this.find(selectAllSelector);
      
      // Handle a select all click
      $selectAll.click(function(e) {
        $(checkboxQuery).attr('checked', this.checked).trigger('change');
      });
      
      // Handle shift clicks
      $this.on("click", checkboxQuery, function(e) {
        if (!lastChecked) {
          lastChecked = this;
          return;
        }
        if (e.shiftKey) {
          var $checkBoxes = $this.find(checkboxQuery);
          var start = $checkBoxes.index(lastChecked);
          var end = $checkBoxes.index(this);
          $checkBoxes.slice(Math.min(start, end), Math.max(start,end) + 1).attr('checked', lastChecked.checked).trigger('change');
        }
        lastChecked = this
      });    
    });
  }
})(jQuery);