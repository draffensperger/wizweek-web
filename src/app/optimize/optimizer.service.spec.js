describe('optimizer', function() {
  var optimizer, optimizeApi;

  specHelper.wizweekModBeforeEach();

  beforeEach(inject(function(_optimizer_, _optimizeApi_) {
    optimizer = _optimizer_;
    optimizeApi = _optimizeApi_;
  }));

  it('formats the given parameters to send to the optimizer api', function() {
    var tasks = [
      {
        completed: false, deadline: null, hours: "2", id: 1, minStart: null,
        title: "Work", value: "2"
      },
      {
        completed: false, deadline: "2016-09-08T04:00:00.000Z", hours: "22",
        id: 2, minStart: null, title: "Project", value: "30"
      }
    ];
    var tasksCalInfo =  { summary: "MPDX test", timeZone: "America/New_York" };
    var settings = {
      // 9am-5pm Mon-Fri and then 9am-9am on Sat/Sun
      workStartTimes: Array(7).fill(new Date('Sun Dec 31 1899 09:00:00 GMT-0500 (EST)')),
      workEndTimes: [new Date('Sun Dec 31 1899 09:00:00 GMT-0500 (EST)')]
      .concat(Array(5).fill(new Date('Sun Dec 31 1899 17:00:00 GMT-0500 (EST)')))
      .concat([new Date('Sun Dec 31 1899 09:00:00 GMT-0500 (EST)')])
    };
    var appointments = [{
      summary: "5K Race",
      start: { dateTime: "2016-09-10T14:00:00-04:00" },
      end: { dateTime: "2016-09-10T15:00:00-04:00" }
    }];
    var scheduleStart = new Date('Wed Aug 24 2016 22:00:19 GMT-0400 (EDT)');
    var scheduleEnd = new Date('Tue Nov 22 2016 22:00:19 GMT-0500 (EST)');

    spyOn(optimizeApi, 'optimize');

    optimizer.exec(tasks, tasksCalInfo, settings, appointments, scheduleStart, scheduleEnd);

    var expectedParams = {
      timeZone: "America/New_York",
      weeklyTaskBlocks: [
        [],
        [{ start: "9:0", end: "17:0" }],
        [{ start: "9:0", end: "17:0" }],
        [{ start: "9:0", end: "17:0" }],
        [{ start: "9:0", end: "17:0" }],
        [{ start: "9:0", end: "17:0" }],
        []
      ],
      appointments: [{
        title: "5K Race", start: "2016-09-10T14:00:00-04:00",
        end: "2016-09-10T15:00:00-04:00"
      }],
      tasks: [
        { title: "Work", estimatedHours: 2, reward: 2 },
        {
          title: "Project", estimatedHours: 22,
          reward: 30, deadline: "2016-09-08T04:00:00.000Z"
        }
      ],
      startTaskSchedule: "2016-08-25T02:00:19.000Z",
      endTaskSchedule: "2016-11-23T03:00:19.000Z"
    }

    expect(optimizeApi.optimize).toHaveBeenCalledWith(expectedParams);
  });
});
