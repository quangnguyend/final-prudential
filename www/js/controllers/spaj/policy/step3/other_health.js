'use strict'

function otherHealthCtrl ($scope, $rootScope, $state, $ionicScrollDelegate, $location, $ionicSideMenuDelegate, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  $ionicSideMenuDelegate.canDragContent(false)
  var vm = this

  vm.tabs = [
    { title: 'Tertanggung Utama', value: 'major_insured' },
    { title: 'Tertanggung Tambahan 1', value: 'additional_insured_1' },
    { title: 'Tertanggung Tambahan 2', value: 'additional_insured_2' }
  ]
  vm.currentTab = 'major_insured'
  vm.currentTabIndex = 0

  vm.switchTab = function (tab, index) {
    vm.currentTab = tab
    vm.currentTabIndex = index
  }
  vm.pattern={
    textOnly: new RegExp(/^[a-zA-Z\s]*$/),
    nonDesimal: new RegExp(/^\d+\.\d{0,3}$/),
    alphanumeric: new RegExp(/^[a-z0-9 ]+$/)
  }
  vm.part1_option=[
          {'value': 'value1', 'type': 'Pemeriksaan Jantung'},
          {'value': 'value2', 'type': 'Pemeriksaan Darah'},
          {'value': 'value2', 'type': 'Pemeriksaan Air Seni'},
          {'value': 'value3', 'type': 'Rontgen'},
          {'value': 'value4', 'type': 'Ultrasonography / USG'},
          {'value': 'value5', 'type': 'CT scan'},
          {'value': 'value6', 'type': 'Biopsi'},
          {'value': 'value7', 'type': 'Lainnya'},
        ];
  vm.questions = {
    question_1: [
      {
        part_1:{
        heath_check: null,
        other_answer: null
        },
        part_2: {
          date_inspection: null
        },
        part_3: {
          examination_reason: null
        },
        part_4: {
           result: null 
        }
      }
    ],
    question_5: {
      active: false,
      title: 'Apakah Calon Tertanggung meminum minuman beralkohol lebih dari 750 cc per minggu?',
      result: null
    },
    question_6: {
      active: false,
      title: 'Apakah Calon Tertanggung pernah atau sedang menggunakan obat-obatan terlarang/narkoba atau bahan adiktif lainnya* dalam 5 (lima) tahun terakhir?',
      result: null
    }
  }

  vm.scrollTo = function (id) {
    var STEP_HEIGHT = $('.multi-step').height() + 140
    var distance = $('#' + id) && $('#' + id).position().top + STEP_HEIGHT;
    console.log('distance la',distance)
    $ionicScrollDelegate.scrollTo(0, distance, true)
  }

  vm.nextQuestion = function (question) {
    vm.scrollTo(question)
  }

  vm.addQuestion1 = function () {
    var newQ1={
        part_1:{
        heath_check: null,
        other_answer: null
        },
        part_2: {
          date_inspection: null
        },
        part_3: {
          examination_reason: null
        },
        part_4: {
           result: null 
        }
      }
    vm.questions.question_1.push(newQ1)
  }
   vm.removeQuestion1 = function () {
    vm.questions.question_1.pop()
  }

  vm.setValueQuestion5 = function (value) {
    vm.questions.question_5.result = value
    vm.nextQuestion('question_6')
  }

  vm.setValueQuestion6 = function (value) {
    vm.questions.question_6.result = value
  }

  vm.handleSwipe = function (e) {
    var direct = e.gesture.direction
    // if swipeleft and current tab index smaller than tabs length
    if (direct === 'left' && (vm.currentTabIndex < vm.tabs.length - 1)) {
      var nextTab = vm.tabs[vm.currentTabIndex + 1]['value']
      vm.switchTab(nextTab, vm.currentTabIndex + 1)
    }
    // if swiperight and current tab index bigger than 0
    if (direct === 'right' && vm.currentTabIndex > 0) {
      var prevTab = vm.tabs[vm.currentTabIndex - 1]['value']
      vm.switchTab(prevTab, vm.currentTabIndex - 1)
    }
  }

  // save and redirect to another page
  vm.save = function () {
    $state.go('app.family_history')
  }
}
