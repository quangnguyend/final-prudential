function datePickerConfig($mdDateLocaleProvider) {
  $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('DD-MM-YYYY')
    }
}