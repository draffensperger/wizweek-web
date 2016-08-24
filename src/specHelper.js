var specHelper = {
  wizweekModBeforeEach: function() {
    beforeEach(module('wizweekPy', function($provide) {
      $provide.value('apiPing', jasmine.createSpyObj('apiPing', ['ping']));
    }));
  }
};
