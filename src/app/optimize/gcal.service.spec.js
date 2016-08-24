describe('gcal', function() {
  var GApi, gcal, $q, $rootScope;

  beforeEach(module('wizweekPy'));

  beforeEach(inject(function(_GApi_, _gcal_, _$q_, _$rootScope_) {
    GApi = _GApi_;
    $q = _$q_;
    gcal = _gcal_;
    $rootScope = _$rootScope_;
  }));

  it('retrieves a list of events', function() {
    spyOn(GApi, 'request').and.returnValue(
      $q.resolve({
        result: { items: [{ summary: 'event!' }] }
      })
    );
    var events;
    var start = new Date(2016, 8, 10);
    var end = new Date(2016, 8, 22);
    gcal.events('cal1', start, end).then(function(loadedEvents) {
      events = loadedEvents;
    });

    $rootScope.$digest();

    expect(events).toEqual([{ summary: 'event' }]);
  });
});
