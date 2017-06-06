function spajService ($rootScope, $http, $location, $ionicLoading, $cordovaProgress) {
  var dataSpaj = {}
  var stepList = ['start', 'health_data', 'payor_premium', 'topup', 'beneficiaries', 'document_upload', 'amendment']

  return {
    getData: getData,
    setData: setData,
    stepComplete: stepComplete,
    getStepStatus: getStepStatus
  }

  function getData (key) {
    if (key) { return dataSpaj[key] }
    return dataSpaj
  }

  function setData (key, value) {
    var data = _.assign(dataSpaj[key], value)
    dataSpaj[key] = _.assign({}, data)
  }

  function stepComplete (step, status) {
    if (stepList.indexOf(step) < 0) throw new Error(`${step} is not a valid step`)
    dataSpaj[step] = dataSpaj[step] || {}
    dataSpaj[step].isComplete = status
  }

  function getStepStatus (callback) {
    setTimeout(function () {
      var rs = stepList.map(function (step) {
        return {step, isComplete: dataSpaj[step] ? dataSpaj[step].isComplete : false}
      })
      callback(rs)
    }, 1500)
  }
}
