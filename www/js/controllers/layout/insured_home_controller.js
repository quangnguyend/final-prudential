function insuredHomeCtrl ($scope, $rootScope, $attrs, $timeout, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this

  vm.insuredData = {
    address: [{
      rumah_tel: null,
      kantor_tel: null,
      hp_gsm_tel: null
    }]
  }
  vm.addInsuredAddress = function () {
    var newAddress = {
      rumah_tel: null,
      kantor_tel: null,
      hp_gsm_tel: null
    }
    vm.insuredData.address.push(newAddress)
  }
  $scope.data = {}

  $timeout(function () {
    var insuredName = $attrs.insuredData
    $scope.insuredName = insuredName
    if (!SpajService.getData('start')) {
      SpajService.setData('start', {})
    }
    var data = SpajService.getData('start')
    data[insuredName] = $scope.data

    $scope.$on('$destroy', function () {
      data[insuredName]['isComplete'] = validator()
    })
  })

  $scope.contacts = [
    {
      tel: { home: '', office: '', gsm: ''}
    }
  ]
  $scope.addContact = function () {
    var tel = {
      tel_home: '',
      tel_office: '',
      tel_gsm: ''
    }
    $scope.contacts.push(tel)
  }

  $scope.countries = {
    'Afghanistan': '+93',
    'Albania': '+355',
    'Algeria': '+213',
    'American Samoa': '+684',
    'Andorra': '+376',
    'Angola': '+244',
    'Anguilla': '+264',
    'Antarctica': '+672',
    'Antigua and Barbuda': '+268',
    'Argentina': '+54',
    'Armenia': '+374',
    'Aruba': '+297',
    'Australia': '+61',
    'Austria': '+43',
    'Azerbaijan': '+994',
    'Bahamas': '+242',
    'Bahrain': '+973',
    'Bangladesh': '+880',
    'Barbados': '+246',
    'Belarus': '+375',
    'Belgium': '+32',
    'Belize': '+501',
    'Benin': '+229',
    'Bermuda': '+441',
    'Bhutan': '+975',
    'Bolivia, Plurinational State of': '+591',
    'Bonaire, Sint Eustatius and Saba': '+599',
    'Bosnia and Herzegovina': '+387',
    'Botswana': '+267',
    'Bouvet Island': '+47',
    'Brazil': '+55',
    'British Indian Ocean Territory': '+246',
    'Brunei Darussalam': '+673',
    'Bulgaria': '+359',
    'Burkina Faso': '+226',
    'Burundi': '+257',
    'Cambodia': '+855',
    'Cameroon': '+237',
    'Canada': '+1',
    'Cape Verde': '+238',
    'Cayman Islands': '+345',
    'Central African Republic': '+236',
    'Chad': '+235',
    'Chile': '+56',
    'China': '+86',
    'Christmas Island': '+61',
    'Cocos (Keeling) Islands': '+891',
    'Colombia': '+57',
    'Comoros': '+269',
    'Congo': '+242',
    'Congo, the Democratic Republic of the': '+243',
    'Cook Islands': '+682',
    'Costa Rica': '+506',
    'Croatia': '+385',
    'Cuba': '+53',
    'Curaçao': '+599',
    'Cyprus': '+357',
    'Czech Republic': '+420',
    'Côte d\'Ivoire': '+225',
    'Denmark': '+45',
    'Djibouti': '+253',
    'Dominica': '+767',
    'Dominican Republic': '+809',
    'Ecuador': '+593',
    'Egypt': '+20',
    'El Salvador': '+503',
    'Equatorial Guinea': '+240',
    'Eritrea': '+291',
    'Estonia': '+372',
    'Ethiopia': '+251',
    'Falkland Islands (Malvinas)': '+500',
    'Faroe Islands': '+298',
    'Fiji': '+679',
    'Finland': '+358',
    'France': '+33',
    'French Guiana': '+594',
    'French Polynesia': '+689',
    'French Southern Territories': '+689',
    'Gabon': '+241',
    'Gambia': '+220',
    'Georgia': '+995',
    'Germany': '+49',
    'Ghana': '+233',
    'Gibraltar': '+350',
    'Greece': '+30',
    'Greenland': '+299',
    'Grenada': '+473',
    'Guadeloupe': '+590',
    'Guam': '+671',
    'Guatemala': '+502',
    'Guernsey': '+1481',
    'Guinea': '+225',
    'Guinea-Bissau': '+245',
    'Guyana': '+592',
    'Haiti': '+509',
    'Heard Island and McDonald Islands': '+61',
    'Holy See (Vatican City State)': '+379',
    'Honduras': '+504',
    'Hong Kong': '+852',
    'Hungary': '+36',
    'Iceland': '+354',
    'India': '+91',
    'Indonesia': '+62',
    'Iran, Islamic Republic of': '+98',
    'Iraq': '+964',
    'Ireland': '+353',
    'Isle of Man': '+44',
    'Israel': '+972',
    'Italy': '+39',
    'Jamaica': '+876',
    'Japan': '+81',
    'Jersey': '+44',
    'Jordan': '+962',
    'Kazakhstan': '+7',
    'Kenya': '+254',
    'Kiribati': '+686',
    'Korea, Democratic People\'s Republic of': '+850',
    'Korea, Republic of': '+82',
    'Kuwait': '+965',
    'Kyrgyzstan': '+996',
    'Lao People\'s Democratic Republic': '+856',
    'Latvia': '+371',
    'Lebanon': '+961',
    'Lesotho': '+266',
    'Liberia': '+231',
    'Libya': '+218',
    'Liechtenstein': '+423',
    'Lithuania': '+370',
    'Luxembourg': '+352',
    'Macao': '+853',
    'Macedonia, The Former Yugoslav Republic of': '+389',
    'Madagascar': '+261',
    'Malawi': '+265',
    'Malaysia': '+60',
    'Maldives': '+960',
    'Mali': '+223',
    'Malta': '+356',
    'Marshall Islands': '+692',
    'Martinique': '+596',
    'Mauritania': '+222',
    'Mauritius': '+230',
    'Mayotte': '+262',
    'Mexico': '+52',
    'Micronesia, Federated States of': '+691',
    'Moldova, Republic of': '+373',
    'Monaco': '+355',
    'Mongolia': '+976',
    'Montenegro': '+382',
    'Montserrat': '+664',
    'Morocco': '+212',
    'Mozambique': '+258',
    'Myanmar': '+95',
    'Namibia': '+264',
    'Nauru': '+674',
    'Nepal': '+977',
    'Netherlands': '+31',
    'New Caledonia': '+687',
    'New Zealand': '+64',
    'Nicaragua': '+505',
    'Niger': '+277',
    'Nigeria': '+234',
    'Niue': '+683',
    'Norfolk Island': '+672',
    'Northern Mariana Islands': '+670',
    'Norway': '+47',
    'Oman': '+968',
    'Pakistan': '+92',
    'Palau': '+680',
    'Palestinian Territory, Occupied': '+970',
    'Panama': '+507',
    'Papua New Guinea': '+675',
    'Paraguay': '+595',
    'Peru': '+51',
    'Philippines': '+63',
    'Pitcairn': '+872',
    'Poland': '+48',
    'Portugal': '+351',
    'Puerto Rico': '+787',
    'Qatar': '+974',
    'Romania': '+40',
    'Russian Federation': '+7',
    'Rwanda': '+250',
    'Réunion': '+262',
    'Saint Barthélemy': '+590',
    'Saint Helena, Ascension and Tristan da Cunha': '+290',
    'Saint Kitts and Nevis': '+869',
    'Saint Lucia': '+758',
    'Saint Martin (French part)': '+590',
    'Saint Pierre and Miquelon': '+508',
    'Saint Vincent and the Grenadines': '+784',
    'Samoa': '+685',
    'San Marino': '+378',
    'Sao Tome and Principe': '+239',
    'Saudi Arabia': '+966',
    'Senegal': '+221',
    'Serbia': '+381',
    'Seychelles': '+248',
    'Sierra Leone': '+232',
    'Singapore': '+65',
    'Sint Maarten (Dutch part)': '+599',
    'Slovakia': '+421',
    'Slovenia': '+386',
    'Solomon Islands': '+677',
    'Somalia': '+252',
    'South Africa': '+27',
    'South Georgia and the South Sandwich Islands': '+500',
    'South Sudan': '+211',
    'Spain': '+34',
    'Sri Lanka': '+94',
    'Sudan': '+249',
    'Suriname': '+597',
    'Svalbard and Jan Mayen': '+47',
    'Swaziland': '+268',
    'Sweden': '+46',
    'Switzerland': '+41',
    'Syrian Arab Republic': '+963',
    'Taiwan, Province of China': '+886',
    'Tajikistan': '+992',
    'Tanzania, United Republic of': '+255',
    'Thailand': '+66',
    'Timor-Leste': '+670',
    'Togo': '+228',
    'Tokelau': '+690',
    'Tonga': '+676',
    'Trinidad and Tobago': '+868',
    'Tunisia': '+216',
    'Turkey': '+90',
    'Turkmenistan': '+993',
    'Turks and Caicos Islands': '+649',
    'Tuvalu': '+688',
    'Uganda': '+256',
    'Ukraine': '+380',
    'United Arab Emirates': '+971',
    'United Kingdom': '+44',
    'United States': '+1',
    'United States Minor Outlying Islands': '+1',
    'Uruguay': '+598',
    'Uzbekistan': '+998',
    'Vanuatu': '+678',
    'Venezuela, Bolivarian Republic of': '+58',
    'Viet Nam': '+84',
    'Virgin Islands, British': '+284',
    'Virgin Islands, U.S.': '+340',
    'Wallis and Futuna': '+681',
    'Western Sahara': '+212',
    'Yemen': '+967',
    'Zambia': '+260',
    'Zimbabwe': '+263',
    'Åland Islands': '+358',
  };

  $scope.showAddress = false;
  $scope.changeAddress = function (v) {
    if(v == 'Alamat Kantor'){
      $scope.showAddress = true;
    }else {
      $scope.showAddress = false;
    }
  };
  function validator () {
    var data = $scope.data
    // TODO
    if (data.name) { return true }
    return false
  }
}
