describe('gcal', function() {
  var GApi, gcal, $q, $rootScope;

  specHelper.wizweekModBeforeEach();

  beforeEach(inject(function(_api_, _GApi_, _gcal_, _$q_, _$rootScope_) {
    spyOn(_api_, 'ping');
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
      expect(events).toEqual([{ summary: 'event!' }]);
    });
    $rootScope.$digest();
    var expectedUrl = 'calendar/v3/calendars/cal1/events?' +
      'timeMin=2016-09-10T04:00:00.000Z&timeMax=2016-09-22T04:00:00.000Z';
    expect(GApi.request).toHaveBeenCalledWith(expectedUrl);
  });

  it('can reject all day events', function() {
    var partDayEvent = {
      summary: 'e1',
      start: { dateTime: '2016-09-22T02:00:00.000Z' },
      end: { dateTime: '2016-09-22T04:00:00.000Z' }
    };
    var allDayEvent = {
      summary: 'e1',
      start: { date: '2016-09-22' },
      end: { date: '2016-09-22' }
    };

    var events = [partDayEvent, allDayEvent];

    expect(gcal.rejectAllDayEvents(events)).toEqual([partDayEvent]);
  });
});
