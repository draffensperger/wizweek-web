(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController(auth) {
    var vm = this;
    vm.auth = auth;

    vm.gridOptions = {};

    vm.gridOptions.columnDefs = [
      { name: 'name', displayName: 'Task' },
      { name: 'hours', displayName: 'Hours' , type: 'number'},
      { name: 'reward', displayName: 'Reward' , type: 'number'},
      { name: 'deadline', displayName: 'Deadline' , type: 'date'},
      { name: 'onOrAfter', displayName: 'On or after' , type: 'date'}
    ];

    vm.saveRow = function() {
      debugger;
    }

    vm.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope
      vm.gridApi = gridApi;
      gridApi.rowEdit.on.saveRow(vm, vm.saveRow);
    };
  }
})();
