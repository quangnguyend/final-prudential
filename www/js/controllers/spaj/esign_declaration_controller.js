function eSignDeclarationCtrl (
  $scope,
  $state,
  $rootScope,
  $ionicPopup,
  UserService,
  DataService,
  SpajService,
  $ionicScrollDelegate
) {
  var vm = this
  vm.data = {
    name_of_marketer: '',
    marketing_unit: '',
    marketing_unit_code: '',
    policyholder: {
      duration: '',
      known_as: '',
      explain: ''
    },
    main_insured: {
      duration: '',
      known_as: '',
      explain: ''
    },
    additional_Insured_1: {
      duration: '',
      known_as: '',
      explain: ''
    },
    additional_Insured_2: {
      duration: '',
      known_as: '',
      explain: ''
    },
    confirm_all_declaration: null,
    explained_all_questions: null,
    witness_latest_conditions: null,
    receive_sanctions : null,
    gave_explaination : null,
    signature: [],
    accepted_agency: null,
    complete_spaj: null
  };
  /*$scope.data = {
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    radioChanged (model) {
      $scope[model] = -$scope[model]
    }
  }*/

  $scope.numberOfAdditional = getNumberOfAdditional()

  // list id of canvas DOM for esignature, default will have 2 ids
  var listEsignature = [
    'agent-signature-canvas',
    'policyholder-signature-canvas'
  ]

  function getNumberOfAdditional () {
    var spajData = SpajService.getData('start') || {}
    var list = []
    if (spajData['ADDITIONAL_0']) { list.push({id:'ADDITIONAL_0', age: getAge()}) }
    if (spajData['ADDITIONAL_1']) { list.push({id:'ADDITIONAL_1', age: getAge()}) }
    return list
  }

  function getAge(){
    //TODO: Calculate insured age
    return 19
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

    vm.data.signature = esignature;
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

  vm.handleSubmit= function () {
   $state.go('app.payment_topup')
  }
}
