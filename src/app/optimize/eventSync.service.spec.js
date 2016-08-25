describe('eventSync', function() {
  var eventSync, gcal;

  specHelper.wizweekModBeforeEach();

  beforeEach(inject(function(_eventSync_, _gcal_) {
    eventSync = _eventSync_;
    gcal = _gcal_;

    spyOn(gcal, 'eventUpdatesBatch');
  }));


  var calId = 'cal1';

  it('creates new event if needed', function() {
    var currentEvents = [];
    var optimizedEvents = [{
      title: "Task1", start: "2016-08-25T18:00:00Z", end: "2016-08-25T21:00:00Z"
    }];

    eventSync.syncEvents(calId, currentEvents, optimizedEvents);

    expectRequests([{
      method: 'POST',
      data: {
        summary: 'Task1', start: { dateTime: '2016-08-25T18:00:00Z' },
        end: { dateTime: '2016-08-25T21:00:00Z' }
      }
    }]);
  });

  it('updates a differing event', function() {
    var currentEvents = [{
      id: "1", summary: "Old event",
      start: { dateTime: "2016-08-26T10:30:00-04:00" },
      end: { dateTime: "2016-08-26T13:00:00-04:00" }
    }];
    var optimizedEvents = [{
      title: "Task1", start: "2016-08-25T18:00:00Z", end: "2016-08-25T21:00:00Z"
    }];

    eventSync.syncEvents(calId, currentEvents, optimizedEvents);

    expectRequests([{
      method: 'PUT', id: "1",
      data: {
        summary: 'Task1', start: { dateTime: '2016-08-25T18:00:00Z' },
        end: { dateTime: '2016-08-25T21:00:00Z' }
      }
    }]);
  });

  it('leaves a matching event alone', function() {
    var currentEvents = [{
      id: "1", summary: "Task1",
      start: { dateTime: "2016-08-25T14:00:00-04:00" },
      end: { dateTime: "2016-08-25T17:00:00-04:00" }
    }];
    var optimizedEvents = [{
      title: "Task1", start: "2016-08-25T18:00:00Z", end: "2016-08-25T21:00:00Z"
    }];

    eventSync.syncEvents(calId, currentEvents, optimizedEvents);

    expectRequests([]);
  });

  it('deletes an extra event', function() {
    var currentEvents = [{
      id: "1", summary: "Old event",
      start: { dateTime: "2016-08-26T10:30:00-04:00" },
      end: { dateTime: "2016-08-26T13:00:00-04:00" }
    }];
    var optimizedEvents = [];

    eventSync.syncEvents(calId, currentEvents, optimizedEvents);

    expectRequests([{ method: 'DELETE', id: "1" }]);
  });

  function expectRequests(requests) {
    expect(gcal.eventUpdatesBatch).toHaveBeenCalledWith(calId, requests);
  }
});
