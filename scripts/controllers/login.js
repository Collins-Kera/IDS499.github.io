'use strict';

/**
 * @ngdoc function
 * @name angbaseApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Methods for logging a user into the system.
 */
angular.module('angbaseApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    
    //in the scope so we can call it from teh view...attached to the Login button
    $scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      Auth.passwordLogin({email: email, password: pass}, {rememberMe: true}).then(
        redirect, showError
      );
    };

    //attached to the Register button
    $scope.createAccount = function(email, pass, confirm) {
      $scope.err = null;
      if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        Auth.createAccount(email, pass, {rememberMe: true})
          .then(redirect, showError);
      }
    };

    //Send reset email...needs to be implemented in Auth
    $scope.resetPassword = function(email){
       Auth.resetPassword(email);  
          
      $scope.reset = false;

    };

    //reset form in view if they change their minds
    $scope.cancelReset = function(){
        $scope.reset = false;
    }; 

    //send them to the home screen if login successful  
    function redirect() {
      $location.path('/');
    }
    function redirectRegister() {
      $location.path('/register');
    }

    function showError(err) {
      $scope.err = err;
    }
  });