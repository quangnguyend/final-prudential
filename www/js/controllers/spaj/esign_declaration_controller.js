function eSignDeclarationCtrl (
  $scope,
  $rootScope,
  $ionicPopup,
  UserService,
  DataService,
  SpajService,
  $ionicScrollDelegate
) {
  $scope.data = {
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    radioChanged (model) {
      $scope[model] = -$scope[model]
    }
  }
  $scope.numberOfAdditional = getNumberOfAdditional()

  // list id of canvas DOM for esignature, default will have 2 ids
  var listEsignature = [
    'agent-signature-canvas',
    'policyholder-signature-canvas'
  ]

  function getNumberOfAdditional () {
    var spajData = SpajService.getData()
    var list = []
    if (spajData['ADDITIONAL_0']) { list.push('ADDITIONAL_0') }
    if (spajData['ADDITIONAL_1']) { list.push('ADDITIONAL_1') }
    return list
  }

  function signatureHandler (idCanvas) {
    var canvas = document.getElementById(idCanvas)
    if (!canvas) return
    var signaturePad = new SignaturePad(canvas)
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio = Math.max(window.devicePixelRatio || 1, 1)
    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio
    canvas.getContext('2d').scale(ratio, ratio)
    return signaturePad
  }

  $scope.numberOfAdditional.forEach(function (item, index) {
    listEsignature.push('mainlife-signature-canvas-' + index)
    listEsignature.push('parent-signature-canvas-' + index)
  })

  // it's problem when signatureHandler func read getElementById value, need make sure
  // for all of DOM (these DOM were created by ng-repeat) was mounted
  angular.element(document).ready(function () {
    var esignature = []
    esignature = listEsignature.map(function (item) {
      return {
        id: item,
        esignatureObj: signatureHandler(item)
      }
    })
  })
  /* TODO: Clear signature
  agentSignature.clear()
  Save signature to base64
  agentSignature.toDataURL(); // save image as PNG
  agentSignature.toDataURL("image/jpeg"); // save image as JPEG
  agentSignature.toDataURL("image/svg+xml"); // save image as SVG
  setTimeout(function () {
      console.log(agentSignature.toDataURL())
      console.log(policyholderSignature.toDataURL())
      console.log(mainlifeSignature.toDataURL())
      console.log(parentSignature.toDataURL())
  }, 10000)
  */
}
