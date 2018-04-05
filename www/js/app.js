angular.module('starter', ['ionic'])

  .run(function ($ionicPlatform, $rootScope) {

    $rootScope.adultCustomerOut = 0;
    $rootScope.childCustomerOut = 0;
    $rootScope.arrivalOut = 0;
    $rootScope.departmentOut = 0;
    $rootScope.totalCostOut = 0;
    $rootScope.totalDaysOut = 0;
    $rootScope.totalDatesJoin="";

    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/tab/rooms");

    $stateProvider
      .state("tabs", {
        url: "/tab",
        templateUrl: "templates/tabs.html",
        abstract: true//Abstrakt är bara en container för barnen. Visar inget eget innehåll.
      })

      .state("tabs.about", {//tab.about = abut är undersida/child till tab
        url: "/about",//adress-sida man använder som länk i href
        views: { //Vad som ska hända i ion-nav-view name="home-tab" i html-filen.
          "about-tab": {
            templateUrl: "templates/about.html",//hitta filen i mappen.
            controller: "aboutCtrl"//hänvisar till en controller. Istället för controller i HTML-dokumentet
          }
        }
      })

      .state("tabs.rooms", {
        url: "/rooms",
        views: {
          "rooms-tab": {
            templateUrl: "templates/rooms.html",
            controller: "roomsCtrl"
          }
        }
      })//rooms 

      .state("tabs.room", {
        url: "/rooms/:ID",
        views: {
          "rooms-tab": {
            templateUrl: "templates/room.html",
            controller: "roomsCtrl"
          }
        }
      })//rooms 

  })//END: Config

  .controller("aboutCtrl", function ($scope, $http, $rootScope) {
    $scope.data = {};
    $("#response").hide();
    //submit är en metod som tar emot formulärdata genom submitknappen och ng-submit i index.html
    $scope.mySubmitAbout = function () {

      //Hit kommer data att skickas 
      var url = "http://steffo.info/api/reservation.php";

      //Data skickas via POST
      $http.post(url, $scope.data)
        .then(function (myResponse) { //Responser från servern sparas i en variabel. I detta fall myResponse
           $scope.myAbout = myResponse.data;

           if($scope.myAbout==""){$("#response").show();}//Om det inte hittas några poster i databasen

        })
    }

  })

  .controller("roomsCtrl", function ($scope, $http, $stateParams, $rootScope) {

    $http({
      method: "GET",
      url: "http://steffo.info/api/rooms.php",
      params: {}

    }).then(function mySuccess(response) {
      // a string, or an object, carrying the response from the server.
      $scope.allRooms = response.data;
      $scope.statuscode = response.status;

      $scope.oneRoom = $scope.allRooms.find(function (item) {
        $scope.roomToShow = $stateParams.ID;
        return item.room_ID == $stateParams.ID;
      })

    }, function myError(response) {
      $scope.allRooms = response.statusText;
    });
  })

  //Konverterar \n till <BR>
  .filter('nl2br', function ($sce) {
    return function (text) {
        return text ? $sce.trustAsHtml(text.replace(/\n/g, '<br/>')) : '';
    };
})

  .controller("AppCtrl", function ($scope, $http, $rootScope) {
    $scope.data = {};
    //submit är en metod som tar emot formulärdata genom submitknappen och ng-submit i index.html
    $scope.mySubmit = function () {

      //Hit kommer data att skickas 
      var url = "http://steffo.info/api/";

      //Data skickas via POST
      $http.post(url, $scope.data)
        .then(function (myResponse) { //Responser från servern sparas i en variabel. I detta fall myResponse
         $rootScope.customerOut = $scope.data;

          //Döljer övre delen av sidan i room.html och tar fram bekräftelsen.
          $("#respons").show();
          $("#allform").hide();
          $("#roomContent").addClass( "sthlmBNB-light-blue-bg" );
        })
    }
  })

  //Ändrar bilder på rumssidorna
  .controller("changeImg", function ($scope, $rootScope) {
    firstTime = true;
    $scope.setSelectedImage = function (image) {
      $scope.selectedImage = image;
      firstTime = false;
    };
    $scope.firstSelectedImage = function (image) {
      if (firstTime) { $scope.selectedImage = image; }
    };
  })

  .controller("manageCustomers", function ($scope, $rootScope) {
    var totalCustomers = 0;
    $scope.totalCost = 0;
    $scope.responseDays = "";
    $scope.adultCustomer = 0;
    $scope.childCustomer = 0;

    $scope.manageCustomer = function (maxCustomer, inputChange, costPerCustomer) {
      $scope.customerResoponse = "";
      switch (inputChange) {
        case 1: case 3: AddCustomer(inputChange); break;
        case 2: case 4: SubCustomer(inputChange); break;
      }

      function AddCustomer(inputChange) {
        $("#errorMSG").hide();
        if (totalCustomers != maxCustomer) {
          inputChange == 1 ? $scope.adultCustomer++ : $scope.childCustomer++;
          $rootScope.adultCustomerOut = $scope.adultCustomer;
          $rootScope.childCustomerOut = $scope.childCustomer;

        } else {
            $("#errorMSG").show();
            $scope.customerResoponse = "Du kan inte lägga till fler gäster \ntill detta rum. Boka gärna ett rum till.";
        }
        if($scope.childCustomer>0&&$scope.adultCustomer==0)
        {
          $("#errorMSG").show();
          $scope.customerResoponse = "Barn får endast vistas på hotellet \ni sällskap av en vuxen.";
        }
      }

      function SubCustomer(inputChange) {
        $("#errorMSG").hide();
        if (totalCustomers > 0) {
          inputChange == 2 ? $scope.adultCustomer-- : $scope.childCustomer--;

          if ($scope.adultCustomer <= 0) { $scope.adultCustomer = 0; }
          if ($scope.childCustomer <= 0) { $scope.childCustomer = 0; }

          $rootScope.adultCustomerOut = $scope.adultCustomer;
          $rootScope.childCustomerOut = $scope.childCustomer;
        } else {
          $("#errorMSG").show();
          $scope.customerResoponse = "Du behöver boka minst en gäst till rummet.";
        }
        if($scope.childCustomer>0&&$scope.adultCustomer==0)
        {
          $("#errorMSG").show();
          $scope.customerResoponse = "Barn får endast vistas på hotellet \ni sällskap av en vuxen.";
        }
      }

      totalCustomers = $scope.childCustomer + $scope.adultCustomer;
    }//END: Manage customers

    //Date Picker
    $scope.allDates = [];
    $scope.week1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    $scope.week2 = [{ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }];
    $scope.week3 = [{ id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }];
    $scope.week4 = [{ id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }];
    $scope.week5 = [{ id: 27 }, { id: 28 }, { id: 29 }, { id: 30 }, { id: 31 }];

    $scope.manageDatePicker = function (day, costRoom) {
      day.booleanVal = !day.booleanVal;

      if (day.booleanVal) {
        $scope.allDates.push(day.id)

        //Fler än 2 rum bokade
        if ($scope.allDates.length >= 2) {
          $scope.allDates = $scope.allDates.sort((a, b) => a - b);
          $scope.firstDay = $scope.allDates[0];
          $scope.lastDay = $scope.allDates[$scope.allDates.length - 1];
          $scope.allDates = [];//Zero array

          for (dayX = $scope.firstDay; dayX <= $scope.lastDay; dayX++) {
            $scope.allDates.push(dayX)

            $("#day" + dayX).css("background-color", '#ff8d00');

          }
        }

        if ($scope.allDates.length == 1) {
          $scope.responseDays = "Bokad dag: " + $scope.allDates[0];
          $rootScope.arrivalOut = $scope.allDates[0];
          $rootScope.departmentOut = $scope.allDates[0];
        } else if ($scope.allDates.length > 1) {
          $scope.responseDays = "Bokade dagar: " + $scope.firstDay + " - " + $scope.lastDay;
          $rootScope.arrivalOut = $scope.firstDay;
          $rootScope.departmentOut = $scope.lastDay;
        } else {
          $scope.responseDays = "";
        }

        $scope.allDates.forEach(function (valuePicked) {
          $scope.week1.forEach(function (valueOneWeek, indexOneWeek) {
            if (valuePicked == valueOneWeek.id) { $scope.week1[indexOneWeek].booleanVal = true; }
          })
          $scope.week2.forEach(function (valueOneWeek, indexOneWeek) {
            if (valuePicked == valueOneWeek.id) { $scope.week2[indexOneWeek].booleanVal = true; }
          })
          $scope.week3.forEach(function (valueOneWeek, indexOneWeek) {
            if (valuePicked == valueOneWeek.id) { $scope.week3[indexOneWeek].booleanVal = true; }
          })
          $scope.week4.forEach(function (valueOneWeek, indexOneWeek) {
            if (valuePicked == valueOneWeek.id) { $scope.week4[indexOneWeek].booleanVal = true; }
          })
          $scope.week5.forEach(function (valueOneWeek, indexOneWeek) {
            if (valuePicked == valueOneWeek.id) { $scope.week5[indexOneWeek].booleanVal = true; }
          })
        })

        $scope.totalCost = $scope.allDates.length * costRoom;
        $rootScope.totalCostOut = $scope.allDates.length * costRoom;
        $rootScope.totalDaysOut = $scope.allDates.length;

        return { 'background-color': '#ff8d00' }
      } else {
        //Removes dates
        var indexOfDay = $scope.allDates.indexOf(day.id);//Get index of the selected button

        //Uneselect all the buttons after the selected button
        for (turnOff = indexOfDay; turnOff < $scope.allDates.length; turnOff++) {
          $scope.week1.forEach(function (valueOneWeek, indexOneWeek) {
            $("#day" + valueOneWeek.id).css("background-color", '#005da8');
            if (valueOneWeek.id == $scope.allDates[turnOff]) { $scope.week1[indexOneWeek].booleanVal = false; }
          })
          $scope.week2.forEach(function (valueOneWeek, indexOneWeek) {
            $("#day" + valueOneWeek.id).css("background-color", '#005da8');
            if (valueOneWeek.id == $scope.allDates[turnOff]) { $scope.week2[indexOneWeek].booleanVal = false; }
          })
          $scope.week3.forEach(function (valueOneWeek, indexOneWeek) {
            $("#day" + valueOneWeek.id).css("background-color", '#005da8');
            if (valueOneWeek.id == $scope.allDates[turnOff]) { $scope.week3[indexOneWeek].booleanVal = false; }
          })
          $scope.week4.forEach(function (valueOneWeek, indexOneWeek) {
            $("#day" + valueOneWeek.id).css("background-color", '#005da8');
            if (valueOneWeek.id == $scope.allDates[turnOff]) { $scope.week4[indexOneWeek].booleanVal = false; }
          })
          $scope.week5.forEach(function (valueOneWeek, indexOneWeek) {
            $("#day" + valueOneWeek.id).css("background-color", '#005da8');
            if (valueOneWeek.id == $scope.allDates[turnOff]) { $scope.week5[indexOneWeek].booleanVal = false; }
          })
        }

        $scope.allDates.splice(indexOfDay, $scope.allDates.length);//Removes all elements after the selected button.
        //Get back background to selected buttons
        for (getBack = 0; getBack < $scope.allDates.length; getBack++) {
          $("#day" + $scope.allDates[getBack]).css("background-color", '#ff8d00');
        }

        $scope.allDates = $scope.allDates.sort((a, b) => a - b);
        $scope.firstDay = $scope.allDates[0];
        $scope.lastDay = $scope.allDates[$scope.allDates.length - 1];

        if ($scope.allDates.length == 1) {
          $scope.responseDays = "Bokad dag: " + $scope.allDates[0];
          $rootScope.arrivalOut = $scope.allDates[0];
          $rootScope.departmentOut = $scope.allDates[0];
        } else if ($scope.allDates.length > 1) {
          $scope.responseDays = "Bokade dagar: " + $scope.firstDay + " - " + $scope.lastDay;
          $rootScope.arrivalOut = $scope.firstDay;
          $rootScope.departmentOut = $scope.lastDay;
        } else {
          $scope.responseDays = "";
        }

        $rootScope.totalDatesJoin = $scope.allDates.join();
        $scope.totalCost = $scope.allDates.length * costRoom;
        $rootScope.totalCostOut = $scope.allDates.length * costRoom;
        $rootScope.totalDaysOut = $scope.allDates.length;

        return { 'background-color': '#005da8' };

      }
    }//END: Manage Date Picker
  })//END: manageCustomers