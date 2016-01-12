/*global angular,window*/
(function() {
  'use strict';

  // Load a dummy environment configuration to be loaded by bbpConfig.
  window.bbpConfig = {
    api: {
      document: {
        v0: 'https://services-dev.humanbrainproject.eu/document/v0/api'
      },
      user: {
        v0: 'https://services-dev.humanbrainproject.eu/oidc/v0/api'
      }
    },
    auth: {
      url: 'https://services-dev.humanbrainproject.eu/oidc',
      clientId: '07a42081-f5cc-463b-a9f4-c1b9b3abadaa',
      scopes: ['openid', 'hbp.documents', 'hbp.provenance', 'hbp.collab']
    }
  };

  var myApp = angular.module('myApp', ['hbpDocumentClient', 'bbpOidcClient']);

  // Ensure user is authenticated
  myApp.config(function(bbpOidcSessionProvider) {
    bbpOidcSessionProvider.ensureToken(true);
  });

  myApp.controller('demoSelectorCtrl', function($scope, $location, hbpEntityStore) {
    $scope.demo = $location.path();
    $scope.$on('$locationChangeSuccess', function() {
      $scope.demo = $location.path();
      hbpEntityStore.get('0ea163cd-2db2-4e9e-89c7-d3b088d25a9c').then(function(res) {
        $scope.folder = res;
      });
    });
  });

  myApp.controller('fileBrowserDemoCtrl', function($scope) {
    $scope.selectedEntity = null;
    $scope.$on('hbpFileBrowser:focusChanged', function(evt, entity) {
      $scope.selectedEntity = entity;
    });
  });

  // A controller that list all projects
  myApp.controller('projectListCtrl', function($scope, $log, hbpProjectStore) {
    $scope.projects = [];
    hbpProjectStore.getAll().then(
      function(projects) {
        $log.log(projects);
        $scope.projects.push.apply($scope.projects, projects.result);
      },
      function(response) {
        $log.error(
          'Cannot get projects',
          response.status,
          response.data.error
        );
      }
    );
  });
}());
