'use strict'

function otherHealthCtrl ($scope, $rootScope, $ionicPopup, UserService, DataService, $ionicScrollDelegate, $location) {
  $rootScope.showBar = true;
  $rootScope.showBack = true;
  $rootScope.showMenu = true;

  var vm = this;

  vm.tabs = [
    {title: 'Tertanggung Utama', value: 'major_insured'},
    {title: 'Tertanggung Tambahan 1', value: 'additional_insured_1'},
    {title: 'Tertanggung Tambahan 2', value: 'additional_insured_2'}
  ];
  vm.currentTab = 'major_insured';

  vm.switchTab = function (tab) {
    vm.currentTab = tab;
  };

  vm.questions = {
    question_1: {
      active: true,
      title: 'Pemeriksaan kesehatan, tes diagnostik medis yang pernah Anda lakukan?',
      heath_check: '',
      other_answer: ''
    },
    question_2: {
      active: false,
      title: 'Kapan dilakukan pemeriksaan tersebut?',
      date_inspection : ''
    },
    question_3: {
      active: false,
      title: 'Apa alasan dilakukan pemeriksaan tersebut?',
      examination_reason : ''
    },
    question_4: {
      active: false,
      title: 'Bagaimana hasilnya?',
      results : [
        {result: ''}
      ]
    },
    question_5: {
      active: false,
      title: 'Apakah Calon Tertanggung meminum minuman beralkohol lebih dari 750 cc per minggu?',
      result : null
    },
    question_6: {
      active: false,
      title: 'Apakah Calon Tertanggung pernah atau sedang menggunakan obat-obatan terlarang/narkoba atau bahan adiktif lainnya* dalam 5 (lima) tahun terakhir?',
      result : null
    }
  };

  vm.nextQuestion = function (question) {
    vm.questions[question].active = true;
  };

  vm.addQuestion4 = function () {
    vm.questions.question_4.results.push({result: ''});
  };

  vm.setValueQuestion5 = function (value) {
    vm.questions.question_5.result = value;
    vm.nextQuestion('question_6');
  };

  vm.setValueQuestion6 = function (value) {
    vm.questions.question_6.result = value;
  };

  // save and redirect to another page
  vm.save = function () {
    // var data = vm.questions;
    // console.log(data);
    $location.path('/app/step3/family_history')
  };
}
