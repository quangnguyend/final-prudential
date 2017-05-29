function spajService ($rootScope, $http, $location, $ionicLoading, $cordovaProgress) {
  var dataSpaj = {}

  return {
    getData: getData,
    setData: setData
  }

  function getData (key) {
    if (key) { return dataSpaj[key] }
    return dataSpaj
  }

  function setData (key, value) {
    dataSpaj[key] = value
  }
}
