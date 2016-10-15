'use strict';

/**
 * @ngdoc function
 * @name sasystemCommanderApp.controller:MachinesettingsCtrl
 * @description
 * # MachinesettingsCtrl
 * Controller of the sasystemCommanderApp
 */
angular.module('sasystemCommanderApp')
  .controller('MachineSettingsCtrl', function ($scope,$firebaseObject,firebaseCheckpointArray,Ref,$routeParams, $mdDialog) {
    $scope.machine  = $firebaseObject(Ref.child('machines').child( $routeParams.id ));
    $scope.selected = 1;
    $scope.text = $routeParams.id;
    $scope.fast_questions = new firebaseCheckpointArray(Ref.child('machines/' + $routeParams.id  + "/fast/questions"));

    $scope.status = '';


    $scope.types = [
     "CalendarQuestion",
      "CrewQuestion",
      "DestinationQuestion",
      "PolicyQuestion",
      "ExtraCoverQuestion",
     "MedicalConditionsQuestion",
    "DetailsQuestion",
     "ContactQuestion",
    "PaymentQuestion",
    "ThanksQuestion",
    "InfoBubbleQuestion"
   ];

    $scope.addFastQuestion = function(ev) {
        var dialog = angular.element("#add-fast-question-modal");
        dialog.modal("show");
    };

    $scope.fast_questions.$loaded().then(function() {
    // add a checkpoint to track sorting changes
      $scope.fast_questions.checkpoint();
    });
    $scope.FastSortableOptions = {
      stop: function(e, ui) {
      // save changes to firebase
      $scope.fast_questions.saveChanges();
      $scope.fast_questions.checkpoint();
      }
    };


    $scope.delete_question = function(index){

        $scope.fast_questions.$remove(index).then(function() {
          console.log('item removed');
           $scope.fast_questions.saveChanges();
          $scope.fast_questions.checkpoint();

        })
        .catch(function(error) {
          console.log('error', error);
        });
    };



    $scope.NewQuestion = {};

    var SetTabType = function(){
        if($scope.NewQuestion.QuestionType == "1"){
            $scope.NewQuestion.TabType = 4; // calendar tab

        }else if($scope.NewQuestion.QuestionType == "2"){
          $scope.NewQuestion.TabType = 2; // crew tab


        }else if($scope.NewQuestion.QuestionType == "3"){
          $scope.NewQuestion.TabType = 1; //destination tab

        }else if($scope.NewQuestion.QuestionType == "4"){
          $scope.NewQuestion.TabType = 3;//policy tab

        }else {

            $scope.NewQuestion.TabType = 0;// no tab

        }
    }

    $scope.AddFastQuestion = function(){


        var index = $scope.types.indexOf($scope.NewQuestion.QuestionType);

        $scope.NewQuestion.Name = $scope.NewQuestion.QuestionType;
        $scope.NewQuestion.QuestionType = index;


          if(!$scope.NewQuestion.hasOwnProperty("MovePlane")){
              $scope.NewQuestion.MovePlane = false;
          }
          SetTabType();
          console.log($scope.NewQuestion);



          $scope.fast_questions.$add($scope.NewQuestion).then(function(ref) {
              console.log("Question added");
            $scope.fast_questions.saveChanges();
            $scope.fast_questions.checkpoint();
          });
    };
  });
