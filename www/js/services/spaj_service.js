function spajService ($rootScope, $http, $location, $ionicLoading, $cordovaProgress) {
  var dataSpaj = {}

  return {
    getData: getData,
    setData: setData
  }

  function getData (key) {
    return dataSpaj[key]
  }

  function setData (key, value) {
    dataSpaj[key] = value
  }
}
