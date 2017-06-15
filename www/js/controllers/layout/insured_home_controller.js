function insuredHomeCtrl($scope, $rootScope, $attrs, $timeout, SpajService) {
  var vm = this
  // *********
  // NOTE: ALL DATA MUST BE SET INTO $scope.data, ex: ng-model='data.name', ng-model='data.gender'
  $scope.data = {
    name: '',
    address: '',
    date_of_birth: new Date(),
    gender: '',
    occupation: '',
    identitas: '',
    alamat_kantor: '',
    provinsi: '',
    kabupaten: '',
    taxstatus: {
      other: false,
      usa: false,
      indo: false
    }
  }
  // ********
  $scope.$watchCollection('data', function (newVal) {
    if (newVal.name != '' && newVal.address != '' && newVal.date_of_birth != '' && newVal.gender != ''
      && newVal.occupation != '' && newVal.identitas != '' && newVal.alamat_kantor != ''
      && newVal.provinsi != '' && newVal.kabupaten != '') {
      SpajService.setData('step1_valid', { isValid: true });
    } else {
      SpajService.setData('step1_valid', { isValid: false });
    }
  });
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
      tel: { home: '', office: '', gsm: '' }
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

  $scope.showAddress = false
  $scope.changeAddress = function (v) {
    vm.valiForm();
    if (v == 'Alamat Lain') {
      $scope.showAddress = true
    } else {
      $scope.showAddress = false
    }
  }
  function validator() {
    var data = $scope.data
    // TODO
    if (data.name) { return true }
    return false
  }


  /* auto complete */
  // list of Place of Birth
  vm.birthplaces = [
    { name: 'Denpasar', code: 'DE' },
    { name: 'Bandung', code: 'BA' },
    { name: 'Banjar', code: 'BN' },
    { name: 'Batu', code: 'BT' },
    { name: 'Bekasi', code: 'BE' },
    { name: 'Blitar', code: 'BL' },
    { name: 'Bogor', code: 'BO' },
    { name: 'Cianjur', code: 'CI' },
    { name: 'Cilegon', code: 'CL' },
    { name: 'Cimahi', code: 'CM' },
    { name: 'Cirebon', code: 'CR' },
    { name: 'Depok', code: 'DP' },
    { name: 'Jakarta', code: 'JA' },
    { name: 'Kediri', code: 'KE' },
    { name: 'Madiun', code: 'MA' },
    { name: 'Magelang', code: 'MG' },
    { name: 'Malang', code: 'ML' },
    { name: 'Mojokerto', code: 'MO' },
    { name: 'Pasuruan', code: 'PA' },
    { name: 'Pekalongan', code: 'PE' },
    { name: 'Probolinggo', code: 'PR' },
    { name: 'Salatiga', code: 'SA' },
    { name: 'Semarang', code: 'SE' },
    { name: 'Serang', code: 'SR' },
    { name: 'South Tangerang', code: 'SO' },
    { name: 'Sukabumi', code: 'SU' },
    { name: 'Surabaya', code: 'SB' },
    { name: 'Surakarta', code: 'SK' },
    { name: 'Tasikmalaya', code: 'TA' },
    { name: 'Tangerang', code: 'TN' },
    { name: 'Tegal', code: 'TE' },
    { name: 'Yogyakarta', code: 'YO' },
    { name: 'Balikpapan', code: 'BI' },
    { name: 'Banjarbaru', code: 'BJ' },
    { name: 'Banjarmasin', code: 'BR' },
    { name: 'Bontang', code: 'BG' },
    { name: 'Palangkaraya', code: 'PL' },
    { name: 'Pontianak', code: 'PO' },
    { name: 'Samarinda', code: 'SM' },
    { name: 'Singkawang', code: 'SI' },
    { name: 'Tarakan', code: 'TR' },
    { name: 'Tenggarong', code: 'TG' },
    { name: 'Ambon', code: 'AM' },
    { name: 'Tual', code: 'TU' },
    { name: 'Ternate', code: 'TT' },
    { name: 'Tidore', code: 'TI' },
    { name: 'Bima', code: 'BM' },
    { name: 'Mataram', code: 'MT' },
    { name: 'Kupang', code: 'KU' },
    { name: 'Atambua', code: 'AT' },
    { name: 'Jayapura', code: 'JY' },
    { name: 'Merauke', code: 'ME' },
    { name: 'Kota Sorong', code: 'KO' },
    { name: 'Manokwari', code: 'MN' },
    { name: 'Bau-Bau', code: 'BU' },
    { name: 'Bitung', code: 'den' },
    { name: 'Gorontalo', code: 'GO' },
    { name: 'Kendari', code: 'KN' },
    { name: 'Kotamobagu', code: 'KT' },
    { name: 'Makassar', code: 'MK' },
    { name: 'Manado', code: 'MD' },
    { name: 'Palu', code: 'PU' },
    { name: 'Pare-Pare', code: 'PX' },
    { name: 'Palopo', code: 'PP' },
    { name: 'Palu', code: 'den' },
    { name: 'Tomohon', code: 'TO' },
    { name: 'Banda Aceh', code: 'BD' },
    { name: 'Bandar Lampung', code: 'BP' },
    { name: 'Batam', code: 'den' },
    { name: 'Bengkulu', code: 'BK' },
    { name: 'Bukittinggi', code: 'den' },
    { name: 'Dumai', code: 'DU' },
    { name: 'Padang', code: 'PD' },
    { name: 'Metro', code: 'MR' },
    { name: 'Medan', code: 'den' },
    { name: 'Lubuklinggau', code: 'LU' },
    { name: 'Lhokseumawe', code: 'LH' },
    { name: 'Langsa', code: 'LA' },
    { name: 'Jambi', code: 'JM' },
    { name: 'Gunungsitoli', code: 'GU' },
    { name: 'Padang Panjang', code: 'PN' },
    { name: 'Padang Sidempuan', code: 'PG' },
    { name: 'Pagar Alam', code: 'PM' },
    { name: 'Palembang', code: 'PB' },
    { name: 'Pangkal Pinang', code: 'PK' },
    { name: 'Pariaman', code: 'PI' },
    { name: 'Payakumbuh', code: 'PY' },
    { name: 'Pekanbaru', code: 'den' },
    { name: 'Pematang Siantar', code: 'PT' },
    { name: 'Prabumulih', code: 'PH' },
    { name: 'Sabang', code: 'SN' },
    { name: 'Sawah Lunto', code: 'SW' },
    { name: 'Sibolga', code: 'SL' },
    { name: 'Solok', code: 'den' },
    { name: 'Sungai Penuh', code: 'SG' },
    { name: 'Tanjung Balai', code: 'TJ' },
    { name: 'Tanjung Pinang', code: 'TP' },
    { name: 'Tebing Tinggi', code: 'TB' }
  ]

  /* auto complete */
  // list of countries
  vm.countries = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Axland Islands', code: 'AX' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'AndorrA', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Anguilla', code: 'AI' },
    { name: 'Antarctica', code: 'AQ' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Aruba', code: 'AW' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bermuda', code: 'BM' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Bouvet Island', code: 'BV' },
    { name: 'Brazil', code: 'BR' },
    { name: 'British Indian Ocean Territory', code: 'IO' },
    { name: 'Brunei Darussalam', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Cape Verde', code: 'CV' },
    { name: 'Cayman Islands', code: 'KY' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Christmas Island', code: 'CX' },
    { name: 'Cocos (Keeling) Islands', code: 'CC' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Congo', code: 'CG' },
    { name: 'Congo, The Democratic Republic of the', code: 'CD' },
    { name: 'Cook Islands', code: 'CK' },
    { name: 'Costa Rica', code: 'CR' },
    { name: 'Cote D\'Ivoire', code: 'CI' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Falkland Islands (Malvinas)', code: 'FK' },
    { name: 'Faroe Islands', code: 'FO' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'French Guiana', code: 'GF' },
    { name: 'French Polynesia', code: 'PF' },
    { name: 'French Southern Territories', code: 'TF' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Gibraltar', code: 'GI' },
    { name: 'Greece', code: 'GR' },
    { name: 'Greenland', code: 'GL' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Guadeloupe', code: 'GP' },
    { name: 'Guam', code: 'GU' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guernsey', code: 'GG' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
    { name: 'Holy See (Vatican City State)', code: 'VA' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran, Islamic Republic Of', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Isle of Man', code: 'IM' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jersey', code: 'JE' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kiribati', code: 'KI' },
    { name: 'Korea, Democratic People\'S Republic of', code: 'KP' },
    { name: 'Korea, Republic of', code: 'KR' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: 'Lao People\'S Democratic Republic', code: 'LA' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Lesotho', code: 'LS' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Libyan Arab Jamahiriya', code: 'LY' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Macao', code: 'MO' },
    { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Martinique', code: 'MQ' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Mayotte', code: 'YT' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Micronesia, Federated States of', code: 'FM' },
    { name: 'Moldova, Republic of', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montserrat', code: 'MS' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nauru', code: 'NR' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Netherlands Antilles', code: 'AN' },
    { name: 'New Caledonia', code: 'NC' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Niue', code: 'NU' },
    { name: 'Norfolk Island', code: 'NF' },
    { name: 'Northern Mariana Islands', code: 'MP' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palau', code: 'PW' },
    { name: 'Palestinian Territory, Occupied', code: 'PS' },
    { name: 'Panama', code: 'PA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Pitcairn', code: 'PN' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Puerto Rico', code: 'PR' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Reunion', code: 'RE' },
    { name: 'Romania', code: 'RO' },
    { name: 'Russian Federation', code: 'RU' },
    { name: 'RWANDA', code: 'RW' },
    { name: 'Saint Helena', code: 'SH' },
    { name: 'Saint Kitts and Nevis', code: 'KN' },
    { name: 'Saint Lucia', code: 'LC' },
    { name: 'Saint Pierre and Miquelon', code: 'PM' },
    { name: 'Saint Vincent and the Grenadines', code: 'VC' },
    { name: 'Samoa', code: 'WS' },
    { name: 'San Marino', code: 'SM' },
    { name: 'Sao Tome and Principe', code: 'ST' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Serbia and Montenegro', code: 'CS' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Sierra Leone', code: 'SL' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Somalia', code: 'SO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Suriname', code: 'SR' },
    { name: 'Svalbard and Jan Mayen', code: 'SJ' },
    { name: 'Swaziland', code: 'SZ' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Syrian Arab Republic', code: 'SY' },
    { name: 'Taiwan, Province of China', code: 'TW' },
    { name: 'Tajikistan', code: 'TJ' },
    { name: 'Tanzania, United Republic of', code: 'TZ' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Timor-Leste', code: 'TL' },
    { name: 'Togo', code: 'TG' },
    { name: 'Tokelau', code: 'TK' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Trinidad and Tobago', code: 'TT' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Turkmenistan', code: 'TM' },
    { name: 'Turks and Caicos Islands', code: 'TC' },
    { name: 'Tuvalu', code: 'TV' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
    { name: 'United States Minor Outlying Islands', code: 'UM' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Vanuatu', code: 'VU' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Viet Nam', code: 'VN' },
    { name: 'Virgin Islands, British', code: 'VG' },
    { name: 'Virgin Islands, U.S.', code: 'VI' },
    { name: 'Wallis and Futuna', code: 'WF' },
    { name: 'Western Sahara', code: 'EH' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' }
  ]

  vm.phone_area_code = [
    { name: 'Afghanistan', code: '+93' }, { name: 'Albania', code: '+355' }, { name: 'Algeria', code: '+213' }, { name: 'American Samoa', code: '+684' }, { name: 'Andorra', code: '+376' }, { name: 'Angola', code: '+244' }, { name: 'Anguilla', code: '+1 264' }, { name: 'Antigua &amp; Barbuda', code: '+1 268' }, { name: 'Argentina', code: '+54' }, { name: 'Armenia', code: '+374' }, { name: 'Aruba', code: '+297' }, { name: 'Australia', code: '+61' }, { name: 'Austria', code: '+43' }, { name: 'Azerbaijan', code: '+994' }, { name: 'Bahamas', code: '+1 +242' }, { name: 'Bahrain', code: '+973' }, { name: 'Bangladesh', code: '+880' }, { name: 'Barbados', code: '+1 +246' }, { name: 'Belarus', code: '+375' }, { name: 'Belgium', code: '+32' }, { name: 'Belize', code: '+501' }, { name: 'Benin', code: '+229' }, { name: 'Bermuda', code: '+1 +441' }, { name: 'Bhutan', code: '+975' }, { name: 'Bolivia', code: '+591' }, { name: 'Bosnia &amp; Herzegovina', code: '+387' }, { name: 'Botswana', code: '+267' }, { name: 'Brazil', code: '+55' }, { name: 'Brunei Darussalam', code: '+673' }, { name: 'Bulgaria', code: '+359' }, { name: 'Burkina Faso', code: '+226' }, { name: 'Burundi', code: '+257' }, { name: 'Cambodia', code: '+855' }, { name: 'Cameroon', code: '+237' }, { name: 'Canada', code: '+1' }, { name: 'Cape Verde', code: '+238' }, { name: 'Cayman Islands', code: '+1 345' }, { name: 'Central African Republic', code: '+236' }, { name: 'Chad', code: '+235' }, { name: 'Chagos Archipelago', code: '+246' }, { name: 'Chile', code: '+56' }, { name: 'China', code: '+86' }, { name: 'Colombia', code: '+57' }, { name: 'Comoros', code: '+269' }, { name: 'Congo', code: '+242' }, { name: 'Congo, Dem. Rep. of', code: '+243' }, { name: 'Cook Islands', code: '+682' }, { name: 'Costa Rica', code: '+506' }, { name: 'Côte d’lvoire', code: '+225' }, { name: 'Croatia', code: '+385' }, { name: 'Cuba', code: '+53' }, { name: 'Cyprus', code: '+357' }, { name: 'Czech Republic', code: '+420' }, { name: 'Denmark', code: '+45' }, { name: 'Djibouti', code: '+253' }, { name: 'Dominica', code: '+1 767' }, { name: 'Dominican Republic', code: '+1 809, +1 829, +1 849' }, { name: 'Ecuador', code: '+593' }, { name: 'Egypt (DST', code: '+20' }, { name: 'El Salvador', code: '+503' }, { name: 'Equatorial Guinea', code: '+240' }, { name: 'Estonia', code: '+372' }, { name: 'Ethiopia', code: '+251' }, { name: 'Faeroe Islands', code: '+298' }, { name: 'Falkland Islands', code: '+500' }, { name: 'Fiji', code: '+679' }, { name: 'Finland', code: '+358' }, { name: 'France', code: '+33' }, { name: 'French Antilles', code: '+596' }, { name: 'French Guiana', code: '+594' }, { name: 'French Polynesia††', code: '+689' }, { name: 'Gabon', code: '+241' }, { name: 'Gambia', code: '+220' }, { name: 'Georgia', code: '+995' }, { name: 'Germany (Đức)', code: '+49' }, { name: 'Ghana', code: '+233' }, { name: 'Gibraltar', code: '+350' }, { name: 'Greece (Hy Lạp)', code: '+30' }, { name: 'Greenland', code: '+299' }, { name: 'Grenada', code: '+1 473' }, { name: 'Guadeloupe', code: '+590' }, { name: 'Guam', code: '+1 671' }, { name: 'Guatemala', code: '+502' }, { name: 'Guinea', code: '+224' }, { name: 'Guinea-Bissau', code: '+245' }, { name: 'Guyana', code: '+592' }, { name: 'Haiti', code: '+509' }, { name: 'Honduras', code: '+504' }, { name: 'Hong Kong', code: '+852' }, { name: 'Hungary', code: '+36' }, { name: 'Iceland', code: '+354' }, { name: 'India', code: '+91' }, { name: 'Iran', code: '+98' }, { name: 'Iraq', code: '+964' }, { name: 'Ireland', code: '+353' }, { name: 'Israel', code: '+972' }, { name: 'Italy', code: '+39' }, { name: 'Ivory Coast', code: '+225' }, { name: 'Jamaica', code: '+1 876' }, { name: 'Japan', code: '+81' }, { name: 'Jordan', code: '+962' }, { name: 'Kazakhstan', code: '+7 6, +7 7' }, { name: 'Kenya', code: '+254' }, { name: 'Korea, North', code: '+850' }, { name: 'Korea, South', code: '+82' }, { name: 'Kuwait', code: '+965' }, { name: 'Kyrgyzstan', code: '+996' }, { name: 'Laos (Lào)', code: '+856' }, { name: 'Latvia', code: '+371' }, { name: 'Lebanon', code: '+961' }, { name: 'Lesotho', code: '+266' }, { name: 'Liberia', code: '+231' }, { name: 'Libya', code: '+218' }, { name: 'Liechtenstein', code: '+423' }, { name: 'Lithuania', code: '+370' }, { name: 'Luxembourg', code: '+352' }, { name: 'Macau', code: '+853' }, { name: 'Macedonia', code: '+389' }, { name: 'Madagascar', code: '+261' }, { name: 'Malawi', code: '+265' }, { name: 'Malaysia', code: '+60' }, { name: 'Maldives', code: '+960' }, { name: 'Mali', code: '+223' }, { name: 'Malta', code: '+356' }, { name: 'Marshall Islands', code: '+692' }, { name: 'Martinique', code: '+596' }, { name: 'Mauritania', code: '+222' }, { name: 'Mauritius', code: '+230' }, { name: 'Mexico', code: '+52' }, { name: 'Midway Islands', code: '+808' }, { name: 'Moldova', code: '+373' }, { name: 'Monaco', code: '+377' }, { name: 'Mongolia', code: '+976' }, { name: 'Montenegro &amp; Serbia', code: '+381' }, { name: 'Montserrat', code: '+1 664' }, { name: 'Morocco', code: '+212' }, { name: 'Mozambique', code: '+258' }, { name: 'Myanmar (Burma)', code: '+95' }, { name: 'Namibia', code: '+264' }, { name: 'Nepal', code: '+977' }, { name: 'Netherlands', code: '+31' }, { name: 'Netherlands Antilles', code: '+599' }, { name: 'New Caledonia', code: '+687' }, { name: 'New Zealand', code: '+64' }, { name: 'Nicaragua', code: '+505' }, { name: 'Niger Republic', code: '+227' }, { name: 'Nigeria', code: '+234' }, { name: 'Northern Mariana Isl.', code: '+1 670' }, { name: 'Norway', code: '+47' }, { name: 'Oman', code: '+968' }, { name: 'Pakistan', code: '+92' }, { name: 'Palau', code: '+680' }, { name: 'Panama', code: '+507' }, { name: 'Papua New Guinea', code: '+675' }, { name: 'Paraguay', code: '+595' }, { name: 'Peru', code: '+51' }, { name: 'Philippines', code: '+63' }, { name: 'Poland', code: '+48' }, { name: 'Portugal', code: '+351' }, { name: 'Puerto Rico', code: '+1 787, +1 939' }, { name: 'Qatar', code: '+974' }, { name: 'Reunion Island', code: '+262' }, { name: 'Romania', code: '+40' }, { name: 'Russia', code: '+7' }, { name: 'Rwanda', code: '+250' }, { name: 'San Marino', code: '+378' }, { name: 'Sใo Tom้ &amp; Principe', code: '+239' }, { name: 'Saudi Arabia', code: '+966' }, { name: 'Senegal', code: '+221' }, { name: 'Seychelles', code: '+248' }, { name: 'Sierra Leone', code: '+232' }, { name: 'Singapore', code: '+65' }, { name: 'Slovak Republic', code: '+421' }, { name: 'Slovenia', code: '+386' }, { name: 'Solomon Islands', code: '+677' }, { name: 'Somalia', code: '+252' }, { name: 'South Africa', code: '+27' }, { name: 'Spain', code: '+34' }, { name: 'Sri Lanka', code: '+94' }, { name: 'St. Kitts &amp; Nevis', code: '+1 869' }, { name: 'St. Lucia', code: '+1 758' }, { name: 'St. Vincents &amp; Grenadines', code: '+1 784' }, { name: 'Sudan', code: '+249' }, { name: 'Suriname', code: '+597' }, { name: 'Swaziland', code: '+268' }, { name: 'Sweden', code: '+46' }, { name: 'Switzerland', code: '+41' }, { name: 'Syria', code: '+963' }, { name: 'Taiwan', code: '+886' }, { name: 'Tajikistan', code: '+992' }, { name: 'Tanzania', code: '+255' }, { name: 'Thailand', code: '+66' }, { name: 'Togo', code: '+228' }, { name: 'Tonga', code: '+676' }, { name: 'Trinidad &amp; Tobago', code: '+1 868' }, { name: 'Tunisia', code: '+216' }, { name: 'Turkey', code: '+90' }, { name: 'Turkmenistan', code: '+993' }, { name: 'Turks &amp; Caicos Islands', code: '+1 649' }, { name: 'Tuvalu', code: '+688' }, { name: 'Uganda', code: '+256' }, { name: 'Ukraine', code: '+380' }, { name: 'United Arab Emirates', code: '+971' }, { name: 'United Kingdom', code: '+44' }, { name: 'United States', code: '+1' }, { name: 'Uruguay', code: '+598' }, { name: 'Uzbekistan', code: '+998' }, { name: 'Vanuatu', code: '+678' }, { name: 'Venezuela', code: '+58' }, { name: 'Vietnam', code: '+84' }, { name: 'Virgin Islands, British', code: '+1 284' }, { name: 'Virgin Islands, U.S.', code: '+1 340' }, { name: 'Western Samoa', code: '+685' }, { name: 'Yemen', code: '+967' }, { name: 'Yugoslavia', code: '+381' }, { name: 'Zaire', code: '+243' }, { name: 'Zambia', code: '+260' }, { name: 'Zimbabwe', code: '+263' }
  ];

  vm.valiForm = function () {
    if ($scope.insured.$error && $scope.insured.$invalid) {
      return false;
    }
    else {
      if ($scope.data.taxstatus.other === false && $scope.data.taxstatus.usa === false && $scope.data.taxstatus.indo === false) {
        return false;
      }
      return true;
    }
  }
  /**
   * Search for countries... use $timeout to simulate
   * remote dataservice call.
   */
  $scope.querySearch = function (query) {
    var results = query ? vm.countries.filter(createFilterFor(query)) : vm.countries
    return results
  }

  /**
   * Create filter function for a query string
   */

  // Gender selector function
  $scope.selectGender = function (gender) {
    SpajService.setData('gender',{gender});
    $scope.data.gender = gender
  }

  function createFilterFor(query) {
    return function filterFn(country) {
      return (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0)
    }
  }

}
