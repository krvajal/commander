'use strict';

/**
 * @ngdoc function
 * @name sasystemCommanderApp.controller:MachinesettingsCtrl
 * @description
 * # MachinesettingsCtrl
 * Controller of the sasystemCommanderApp
 */
angular.module('sasystemCommanderApp')
  .controller('MachineSettingsCtrl', function ($scope,$firebaseObject,firebaseCheckpointArray,Ref,$routeParams, $mdDialog, $location) {
    $scope.machine  = $firebaseObject(Ref.child('machines').child( $routeParams.id ));
    $scope.selected = 1;
    $scope.text = $routeParams.id;
    $scope.fast_questions = new firebaseCheckpointArray(Ref.child('machines/' + $routeParams.id  + "/fast/questions"));
    $scope.normal_questions = new firebaseCheckpointArray(Ref.child('machines/' + $routeParams.id  + "/normal/questions"));

    $scope.status = '';

    $scope.ShowDeleteMachineDialog = function(ev){

        // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
            .title('Would you like to delete your machine')
            .textContent('This wont have any effect in the real machine, but you will not be able to reorder the questions.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Please do it!')
            .cancel('Never mind');

      $mdDialog.show(confirm).then(function() {

          $scope.machine.$remove();
          $location.path("/machines");



      }, function() {

      });

    };

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

     $scope.ShowAddNormalQuestionDialog = function(ev) {

        var dialog = angular.element("#add-normal-question-modal");
        dialog.modal("show");
    };


    $scope.fast_questions.$loaded().then(function() {
    // add a checkpoint to track sorting changes
      $scope.fast_questions.checkpoint();
    });


    $scope.normal_questions.$loaded().then(function(){
      $scope.normal_questions.checkpoint();

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



    $scope.delete_normal_question = function(index){

        $scope.normal_questions.$remove(index).then(function() {
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
        if($scope.NewQuestion.QuestionType == 0){
            $scope.NewQuestion.TabType = 4; // calendar tab

        }else if($scope.NewQuestion.QuestionType == 1){
          $scope.NewQuestion.TabType = 2; // crew tab


        }else if($scope.NewQuestion.QuestionType == 2){
          $scope.NewQuestion.TabType = 1; //destination tab

        }else if($scope.NewQuestion.QuestionType == 3){
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
            $scope.NewQuestion = {};
          });
    };

    $scope.AddNormalQuestion = function(){


        var index = $scope.types.indexOf($scope.NewQuestion.QuestionType);

        $scope.NewQuestion.Name = $scope.NewQuestion.QuestionType;
        $scope.NewQuestion.QuestionType = index;


          if(!$scope.NewQuestion.hasOwnProperty("MovePlane")){
              $scope.NewQuestion.MovePlane = false;
          }
          SetTabType();
          console.log($scope.NewQuestion);



          $scope.normal_questions.$add($scope.NewQuestion).then(function(ref) {
              console.log("Question added");
            $scope.normal_questions.saveChanges();
            $scope.normal_questions.checkpoint();
            $scope.NewQuestion = {};
          });
    };


  });
