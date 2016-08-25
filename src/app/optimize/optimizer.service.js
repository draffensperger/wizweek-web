(function() {
  'use strict';

  angular
    .module('wizweekPy')
    .service('optimizer', optimizer);

  /** @ngInject */
  function optimizer(optimizeApi) {
    var DAYS_IN_WEEK = 7;

    this.exec = exec;

    function exec(tasks, tasksCalInfo, settings, appointments, start, end) {
      var request = {
        timeZone: tasksCalInfo.timeZone,
        weeklyTaskBlocks: settingsTaskBlocks(settings),
        appointments: appointments.map(formatAppointment),
        tasks: tasks.map(formatTask),
        startTaskSchedule: start.toISOString(),
        endTaskSchedule: end.toISOString()
      };
      return optimizeApi.optimize(request);
    }

    function formatAppointment(appointment) {
      return {
        title: appointment.summary,
        start: appointment.start.dateTime,
        end: appointment.end.dateTime
      };
    }

    function formatTask(task) {
      var formatted = {
        title: task.title,
        estimatedHours: parseFloat(task.hours),
        reward: parseFloat(task.value)
      };
      if (task.deadline) {
        formatted.deadline = task.deadline;
      }
      if (task.minStart) {
        formatted.startOnOrAfter = task.minStart;
      }
      return formatted;
    }

    function settingsTaskBlocks(settings) {
      var taskBlocks = [];
      for (var i = 0; i < DAYS_IN_WEEK; i++) {
        var start = settings.workStartTimes[i];
        var end = settings.workEndTimes[i];
        if (start.getTime() == end.getTime()) {
          taskBlocks.push([]);
        } else {
          taskBlocks.push([{
            start: hoursAndMinutes(start), end: hoursAndMinutes(end)
          }]);
        }
      }
      return taskBlocks;
    }

    function hoursAndMinutes(date) {
      return date.getHours() + ':' + date.getMinutes();
    }
  }
})();
