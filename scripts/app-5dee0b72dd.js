!function(){"use strict";angular.module("wizweekTemplates",[]),angular.module("wizweekPy",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ui.bootstrap","toastr","angularSpinner","wizweekTemplates"])}(),function(){"use strict";function e(e){var t=this;t.auth=e}e.$inject=["auth"],angular.module("wizweekPy").component("wwWelcome",{controller:e,controllerAs:"welcome",templateUrl:"app/welcome/welcome.html"})}(),function(){"use strict";function e(e,t,n){function i(e){return n.put("settings",e)}function o(t){return t=t||{},s?e.resolve(s):n.get("settings").then(function(e){return s=angular.extend({},t,e.data),a(s.workStartTimes),a(s.workEndTimes),s})}function a(e){for(var t=0;t<e.length;t++)e[t]=new Date(e[t])}var s=null,r={load:o,save:i};return r}e.$inject=["$q","$window","api"],angular.module("wizweekPy").service("settingsStore",e)}(),function(){"use strict";function e(e,t,n,i){function o(){r(),a()}function a(){n.load(d).then(function(e){l.settings=e})}function s(){n.save(l.settings).then(function(){i.success("Settings saved!")})}function r(){e.request({path:"/calendar/v3/users/me/calendarList"}).then(function(e){l.calendars=e.result.items},function(){l.calendars=[],t.debug("Calendar call failed!")})}var l=this;l.calendars=[],l.weekDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var d={appointmentsCalId:null,tasksCalId:null,workStartTimes:Array(7).fill(new Date(0,0,0,9)),workEndTimes:[new Date(0,0,0,9)].concat(Array(5).fill(new Date(0,0,0,17))).concat([new Date(0,0,0,9)])};l.settings={},l.saveSettings=s,o()}e.$inject=["GApi","$log","settingsStore","toastr"],angular.module("wizweekPy").controller("SettingsController",e)}(),function(){"use strict";function e(e,t,n){var i={todos:[],api:e(n+"tasks/:id",null,{query:{headers:{Authorization:"Bearer "+t.token},isArray:!0},"delete":{method:"DELETE",headers:{Authorization:"Bearer "+t.token}},save:{method:"POST",headers:{Authorization:"Bearer "+t.token}},update:{method:"PUT",headers:{Authorization:"Bearer "+t.token}}}),clearCompleted:function(){var e=i.todos.slice(0),t=i.todos.filter(function(e){return!e.completed});return angular.copy(t,i.todos),i.api["delete"](function(){},function(){angular.copy(e,i.todos)})},"delete":function(e){var t=i.todos.slice(0);return i.todos.splice(i.todos.indexOf(e),1),i.api["delete"]({id:e.id},function(){},function(){angular.copy(t,i.todos)})},get:function(){return i.api.query(function(e){angular.copy(e,i.todos)})},insert:function(e){var t=i.todos.slice(0);return i.api.save(e,function(t){e.id=t.id,i.todos.push(e)},function(){angular.copy(t,i.todos)}).$promise},put:function(e){return i.api.update({id:e.id},e).$promise}};return i}e.$inject=["$resource","auth","apiBaseUrl"],angular.module("wizweekPy").factory("todoApi",e)}(),function(){"use strict";function e(e){function t(t){e.localStorage.signedInBefore=t}function n(){e.localStorage.signedInBefore=0}function i(){var t=e.localStorage.signedInBefore?!0:!1;return console.log(t),t}var o={isLikelyActive:i,signedIn:t,signedOut:n};return o}e.$inject=["$window"],angular.module("wizweekPy").service("lastSignIn",e)}(),function(){"use strict";function e(e,t,n,i,o,a){function s(e){c.signingIn=!1,c.signedIn=e.isSignedIn(),c.signedIn?(c.userEmail=e.getBasicProfile().getEmail(),c.userName=e.getBasicProfile().getName(),c.token=e.getAuthResponse().access_token,a.signedIn(e.getAuthResponse().expires_at)):(c.userEmail=null,c.userName=null,c.token=null,a.signedOut()),o.$digest()}function r(){e.checkAuth()}function l(){c.signingIn=!0,e.signIn()}function d(){e.signOut()}e.setConfig({clientId:n,scope:t,currentUserListener:s});var c={checkAuth:r,signIn:l,signOut:d,signedIn:!1,signingIn:!1,userEmail:null,userName:null,token:null};return c}e.$inject=["GAuth","gapiScopes","gapiClientId","$state","$rootScope","lastSignIn"],angular.module("wizweekPy").service("auth",e)}(),function(){"use strict";function e(e,t){function n(){e.get("/"),t.ping()}var i={ping:n};return i}e.$inject=["api","optimizeApi"],angular.module("wizweekPy").service("apiPing",e)}(),function(){"use strict";function e(e,t,n){function i(){o("")}function o(e){return s("GET",e)}function a(e,t){return s("PUT",e,t)}function s(i,o,a){return n({method:i,url:e+o,data:a,headers:{Authorization:"Bearer "+t.token}})}var r={ping:i,put:a,get:o,request:s};return r}e.$inject=["apiBaseUrl","auth","$http"],angular.module("wizweekPy").service("api",e)}(),function(){"use strict";function e(e){function t(t,a,s,r,l,d){var c={timeZone:a.timeZone,weeklyTaskBlocks:o(s),appointments:r.map(n),tasks:t.map(i),startTaskSchedule:l.toISOString(),endTaskSchedule:d.toISOString()};return e.optimize(c)}function n(e){return{title:e.summary,start:e.start.dateTime,end:e.end.dateTime}}function i(e){var t={title:e.title,estimatedHours:parseFloat(e.hours),reward:parseFloat(e.value)};return e.deadline&&(t.deadline=e.deadline),e.minStart&&(t.startOnOrAfter=e.minStart),t}function o(e){for(var t=[],n=0;s>n;n++){var i=e.workStartTimes[n],o=e.workEndTimes[n];i.getTime()==o.getTime()?t.push([]):t.push([{start:a(i),end:a(o)}])}return t}function a(e){return e.getHours()+":"+e.getMinutes()}var s=7;this.exec=t}e.$inject=["optimizeApi"],angular.module("wizweekPy").service("optimizer",e)}(),function(){"use strict";function e(e,t){function n(){return t.get(e)}function i(n){return t.post(e,n).then(function(e){return e.data})}var o={ping:n,optimize:i};return o}e.$inject=["optimizeUrl","$http"],angular.module("wizweekPy").service("optimizeApi",e)}(),function(){"use strict";function e(e,t,n,i,o){function a(a,s,r){function l(){s("Loading settings..."),t.load().then(function(e){g=e,d()})}function d(){c(),w=e.events(g.tasksCalId,y,z)}function c(){s("Loading appointments...");var t=e.events(g.appointmentsCalId,y,z),n=e.calendarInfo(g.tasksCalId);i.all([t,n]).then(function(t){h=e.rejectAllDayEvents(t[0]),m=t[1],u()})}function u(){s("Running optimizer..."),k=n.exec(a,m,g,h,y,z),i.all([w,k]).then(function(e){f=e[0],v=e[1],p()},function(){s("No feasible schedule found. Please check your tasks."),r()})}function p(){s("Syncing events to tasks calendar..."),o.syncEvents(g.tasksCalId,f,v).then(function(){s("Optimized schedule has been synced to your tasks calendar."),r()})}var g,h,m,v,f,w,k,b=new Date,y=new Date(b.getFullYear(),b.getMonth(),b.getDate(),b.getHours()+1),z=new Date(y);z.setDate(y.getDate()+90),l()}var s={exec:a};return s}e.$inject=["gcal","settingsStore","optimizer","$q","eventSync"],angular.module("wizweekPy").service("optimizeAndSync",e)}(),function(){"use strict";function e(e){function t(t,n,i){var a=o(t)+"/events?timeMin="+n.toISOString()+"&timeMax="+i.toISOString();return e.request(a).then(function(e){return e.result.items})}function n(t,n){var i=n.map(function(e){var n=o(t)+"/events";return e.id&&(n+="/"+e.id),{path:n,method:e.method,body:e.data}});return e.batch(i)}function i(t){return e.request(o(t)).then(function(e){return e.result})}function o(e){return"calendar/v3/calendars/"+e}function a(e){return e.filter(s,e)}function s(e){return e.start.dateTime}var r={calendarInfo:i,events:t,eventUpdatesBatch:n,rejectAllDayEvents:a};return r}e.$inject=["GApi"],angular.module("wizweekPy").service("gcal",e)}(),function(){"use strict";function e(e){function t(t,a,r){for(var l=[],d=0,c=r.length;c>d;d++)d<a.length?s(a[d],r[d])||l.push(n(a[d],r[d])):l.push(i(r[d]));for(var u=r.length;u<a.length;u++)l.push(o(a[u]));return e.eventUpdatesBatch(t,l)}function n(e,t){return{method:"PUT",id:e.id,data:a(t)}}function i(e){return{method:"POST",data:a(e)}}function o(e){return{method:"DELETE",id:e.id}}function a(e){return{summary:e.title,start:{dateTime:e.start},end:{dateTime:e.end}}}function s(e,t){return e.summary==t.title&&r(e.start.dateTime,t.start)&&r(e.end.dateTime,t.end)}function r(e,t){return new Date(e).getTime()==new Date(t).getTime()}var l={syncEvents:t};return l}e.$inject=["gcal"],angular.module("wizweekPy").service("eventSync",e)}(),function(){"use strict";function e(e,t,n){function i(e){return n.current.name==e}var o=this;o.auth=e,o.lastSignIn=t,o.isActive=i,o.state=n}e.$inject=["auth","lastSignIn","$state"],angular.module("wizweekPy").component("wwNavbar",{controller:e,controllerAs:"navbar",templateUrl:"app/navbar/navbar.html"})}(),function(){"use strict";function e(){}angular.module("wizweekPy").controller("MainController",e)}(),function(){"use strict";function e(e,t){var n=this;n.auth=e,n.lastSignIn=t}e.$inject=["auth","lastSignIn"],angular.module("wizweekPy").controller("AuthorizedController",e)}(),function(){"use strict";function e(){}angular.module("wizweekPy").component("wwFooter",{controller:e,controllerAs:"footer",templateUrl:"app/footer/footer.html"})}(),angular.module("wizweekPy").directive("todoFocus",["$timeout",function(e){"use strict";return function(t,n,i){t.$watch(i.todoFocus,function(t){t&&e(function(){n[0].focus()},0,!1)})}}]),angular.module("wizweekPy").directive("todoEscape",function(){"use strict";var e=27;return function(t,n,i){n.bind("keydown",function(n){n.keyCode===e&&t.$apply(i.todoEscape)}),t.$on("$destroy",function(){n.unbind("keydown")})}}),function(){"use strict";function e(e,t,n,i,o){var a=this;a.settings={},a.settingsLoading=!0,i.load().then(function(e){a.settings=e,a.settingsLoading=!1}),t.get();var s=a.todos=t.todos,r={title:"",hours:null,value:null,deadline:null,minStart:null};a.optimizing=!1,a.optimizeMessage="",a.optimize=function(){a.optimizing=!0,n.exec(a.todos,function(e){a.optimizeMessage=e},function(){o(function(){a.optimizing=!1},100)})},a.deadlinePopupOpen=!1,a.deadlineFocused=function(){a.deadlinePopupOpen=!0},a.minStartPopupOpen=!1,a.minStartFocused=function(){a.minStartPopupOpen=!0},a.newTodo=angular.extend({},r),a.editedTodo=null,a.addTodo=function(){var e={title:a.newTodo.title.trim(),hours:a.newTodo.hours,value:a.newTodo.value,deadline:a.newTodo.deadline,minStart:a.newTodo.minStart,completed:!1};e.title&&e.hours&&e.value&&(a.saving=!0,t.insert(e).then(function(){a.newTodo=angular.extend({},r)})["finally"](function(){a.saving=!1}))},a.editTodo=function(e){a.editedTodo=e,a.originalTodo=angular.extend({},e)},a.saveEdits=function(e,n){return"blur"===n&&"submit"===a.saveEvent?void(a.saveEvent=null):(a.saveEvent=n,a.reverted?void(a.reverted=null):(e.title=e.title.trim(),void t[e.title?"put":"delete"](e).then(function(){},function(){e.title=a.originalTodo.title})["finally"](function(){a.editedTodo=null})))},a.revertEdits=function(e){s[s.indexOf(e)]=a.originalTodo,a.editedTodo=null,a.originalTodo=null,a.reverted=!0},a.removeTodo=function(e){t["delete"](e)},a.saveTodo=function(e){t.put(e)},a.toggleCompleted=function(e,n){angular.isDefined(n)&&(e.completed=n),t.put(e,s.indexOf(e)).then(function(){},function(){e.completed=!e.completed})},a.clearCompletedTodos=function(){t.clearCompleted()},a.markAll=function(e){s.forEach(function(t){t.completed!==e&&a.toggleCompleted(t,e)})}}e.$inject=["$filter","todoApi","optimizeAndSync","settingsStore","$timeout"],angular.module("wizweekPy").controller("TodoController",e)}(),function(){"use strict";function e(e,t){function n(e){l=e}function i(){s().then(function(e){e.getAuthInstance().signIn()})}function o(){s().then(function(e){e.getAuthInstance().signOut()})}function a(){s()}function s(){return c?r():r().then(function(e){return e.init({client_id:l.clientId,scope:l.scope}),e.getAuthInstance().currentUser.listen(l.currentUserListener),c=!0,e})}function r(){return d?t.resolve(d):e.get().then(function(e){return d=e.auth2,e.auth2})}var l,d=null,c=!1,u={setConfig:n,checkAuth:a,signIn:i,signOut:o};return u}e.$inject=["GApi","$q"],angular.module("wizweekPy").service("GAuth",e)}(),function(){"use strict";function e(e,t,n,i){function o(t){return 0==t.length?e.resolve():s().then(function(e){var n=e.client.newBatch();return t.forEach(function(t){n.add(e.client.request(t))}),n})}function a(e){return s().then(function(t){return t.client.request(e)})}function s(){if(d)return e.when(n.gapi);var t=e.defer();return u.push(t),c||(c=!0,r().then(function(e){d=!0,c=!1,u.forEach(function(t){t.resolve(e)})})),t.promise}function r(){var t=e.defer();return l().then(function(e){e.load("client:auth2",function(){t.resolve(e)})}),t.promise}function l(){var o="https://apis.google.com/js/api.js?onload=_gapiOnLoad",a=e.defer();n._gapiOnLoad=function(){a.resolve(n.gapi)};var s=t[0].createElement("script");return s.onerror=function(e){i(function(){a.reject(e)})},s.src=o,t[0].body.appendChild(s),a.promise}var d=!1,c=!1,u=[];this.get=s,this.request=a,this.batch=o}e.$inject=["$q","$document","$window","$timeout"],angular.module("wizweekPy").service("GApi",e)}(),function(){"use strict";function e(e,t){e.checkAuth(),t.ping()}e.$inject=["auth","apiPing"],angular.module("wizweekPy").run(e)}(),function(){"use strict";function e(e,t){e.state("main",{"abstract":!0,templateUrl:"app/layout/main.html",controller:"MainController",controllerAs:"main"}).state("main.authorized",{"abstract":!0,templateUrl:"app/layout/authorized.html",controller:"AuthorizedController",controllerAs:"authorized"}).state("main.authorized.dashboard",{url:"/",templateUrl:"app/dashboard/dashboard.html",controller:"TodoController",controllerAs:"dash"}).state("main.authorized.settings",{url:"/settings",templateUrl:"app/settings/settings.html",controller:"SettingsController",controllerAs:"$ctrl"}),t.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("wizweekPy").config(e)}(),function(){"use strict";angular.module("wizweekPy").constant("malarkey",malarkey).constant("moment",moment).constant("gapiScopes","https://www.googleapis.com/auth/calendar").constant("gapiClientId","562801966668-qu83ib47l7bqcddpvd7qtkescdohg4e7.apps.googleusercontent.com").constant("apiBaseUrl","https://wizweek-api.herokuapp.com/").constant("optimizeUrl","https://schedule-tasks.herokuapp.com/")}(),function(){"use strict";function e(e,t){e.debugEnabled(!0),t.allowHtml=!0,t.timeOut=1e3,t.positionClass="toast-top-right",t.preventDuplicates=!1,t.progressBar=!1,t.preventOpenDuplicates=!0,t.maxOpened=1}e.$inject=["$logProvider","toastrConfig"],angular.module("wizweekPy").config(e)}(),angular.module("wizweekTemplates").run(["$templateCache",function(e){e.put("app/dashboard/dashboard.html",'<div class=row><div class=col-md-5><h3>Tasks</h3></div></div>Enter and update your tasks below, and then when you\'re ready to have WizWeek create an optimized schedule for you, click the button below. The schedule will automatically synced to your tasks calendar and schedule around your appointments calendar as you configured them in the settings.<br><br><div><button class="btn btn-success btn-lg" ng-click=dash.optimize() ng-disabled="!dash.settings.tasksCalId || !dash.settings.appointmentsCalId || dash.optimizing">Optimize my schedule!</button><div class=optimize-message>{{dash.optimizeMessage}}</div></div><div ng-show="!dash.settingsLoading && (!dash.settings.tasksCalId || !dash.settings.appointmentsCalId)">Before you can have WizWeek create an optimized schedule for these tasks, go to the <a ui-sref=main.authorized.settings>settings</a> to specify your appointments and tasks calendars and optionally customize your schedule.</div><br><br><section id=todoapp><header id=header><div class="row todo-headers"><div class="first-todo-header col-md-5">Task</div><div class="col-md-1 right-align">Duration</div><div class="col-md-1 right-align">Value</div><div class=col-md-2>Deadline</div><div class=col-md-2>Min start</div></div><form id=todo-form ng-submit=dash.addTodo()><div class=row><div class=col-md-5><input id=title class="new-todo first-field" placeholder="Project or task name?" ng-model=dash.newTodo.title ng-disabled=saving autofocus></div><div class=col-md-1><input class="new-todo right-align" placeholder=Hours ng-model=dash.newTodo.hours ng-disabled=saving></div><div class=col-md-1><input class="new-todo right-align" placeholder=Points ng-model=dash.newTodo.value ng-disabled=saving></div><div class=col-md-2><input type=text class=new-todo uib-datepicker-popup=shortDate ng-model=dash.newTodo.deadline close-text=Close is-open=dash.deadlinePopupOpen on-open-focus=false placeholder=(Optional) ng-focus=dash.deadlineFocused()></div><div class=col-md-2><input type=text class=new-todo uib-datepicker-popup=shortDate ng-model=dash.newTodo.minStart close-text=Close is-open=dash.minStartPopupOpen on-open-focus=false placeholder=(Optional) ng-focus=dash.minStartFocused()></div><div class=col-md-1><input class="todo-save-btn btn btn-default" type=submit class="btn btn-success" value=Save></div></div></form></header><section id=main ng-show=dash.todos.length ng-cloak><input id=toggle-all type=checkbox ng-model=dash.allChecked ng-click=dash.markAll(allChecked)><ul id=todo-list><li ng-repeat="todo in dash.todos track by $index" ng-class="{completed: todo.completed, editing: todo == dash.editedTodo}"><div class=view><div class=row><div class=col-md-5><input class=toggle type=checkbox ng-model=todo.completed ng-change=dash.toggleCompleted(todo)><label class=first-label ng-click=dash.editTodo(todo)>{{todo.title}}</label></div><div class=col-md-1><label class=right-align ng-click=dash.editTodo(todo)>{{todo.hours}}h</label></div><div class=col-md-1><label class=right-align ng-click=dash.editTodo(todo)>{{todo.value}}p</label></div><div class=col-md-2><label ng-click=dash.editTodo(todo)>{{todo.deadline | date:\'shortDate\'}}</label></div><div class=col-md-2><label ng-click=dash.editTodo(todo)>{{todo.minStart | date:\'shortDate\'}}</label></div><button class=destroy ng-click=dash.removeTodo(todo)></button></div></div><form ng-submit="dash.saveEdits(todo, \'submit\')"><div class=row><div class=col-md-5><input class="edit first-field" ng-trim=false ng-model=todo.title todo-focus="todo == dash.editedTodo"></div><div class=col-md-1><input class=edit placeholder=Hours ng-model=todo.hours></div><div class=col-md-1><input class=edit placeholder=Points ng-model=todo.value></div><div class=col-md-2><input class=edit uib-datepicker-popup=shortDate ng-model=todo.deadline close-text=Close placeholder=(Optional)></div><div class=col-md-2><input class=edit uib-datepicker-popup=shortDate ng-model=todo.minStart close-text=Close placeholder=(Optional)></div><div class=col-md-1><input class="edit todo-save-btn btn btn-default" type=submit value=Save></div></div></form></li></ul></section></section>'),e.put("app/footer/footer.html","<div class=container><div class=row><div class=col-md-12><p>&copy; 2015 David Raffensperger. <a href=https://github.com/draffensperger/wizweek-web>Source code.</a></p></div></div></div>"),e.put("app/layout/authorized.html",'<div ng-cloak ng-show="!authorized.auth.signedIn && !authorized.lastSignIn.isLikelyActive()"><ww-welcome></ww-welcome></div><div ng-show="!authorized.auth.signedIn && authorized.lastSignIn.isLikelyActive()"><span us-spinner="{radius:30, width:8, length: 16}"></span></div><div class="container main-content" ng-if=authorized.auth.signedIn><div class=row><div class=col-md-12><div ui-view></div></div></div></div>'),e.put("app/layout/main.html","<article><ww-navbar></ww-navbar><div ui-view></div></article><footer class=page-footer><ww-footer></ww-footer></footer>"),e.put("app/navbar/navbar.html",'<nav class="navbar navbar-default navbar-fixed-top"><div class=container><div class=navbar-header><button type=button class="navbar-toggle collapsed" data-toggle=collapse data-target=#navbar aria-expanded=false aria-controls=navbar><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a class="nav navbar-brand" ui-sref=home><div class=wizweek-brand>WizWeek</div></a></div><div id=navbar class="navbar-collapse collapse"><ul class="nav navbar-nav" ng-show=navbar.auth.signedIn><li ng-class="{ active: navbar.isActive(\'main.authorized.dashboard\')}"><a ui-sref=main.authorized.dashboard>Tasks</a></li><li ng-class="{ active: navbar.isActive(\'main.authorized.settings\')}"><a ui-sref=main.authorized.settings>Settings</a></li></ul><form class="navbar-text navbar-form navbar-right"><div ng-show=navbar.auth.signedIn>{{navbar.auth.userEmail}} <a ng-click=navbar.auth.signOut() href="">Log out</a></div><div ng-show="!navbar.auth.signedIn && !navbar.lastSignIn.isLikelyActive()"><a ng-click=navbar.auth.signIn() href="">Login with Google</a></div></form></div><!--/.navbar-collapse --></div></nav>'),e.put("app/settings/settings.html",'<div class=row><div class=col-md-5><h3>Settings</h3></div></div><div class=row><div class=col-md-5><h4 class=settings-sub-header>Calendars</h4></div></div><div class=row><div class=col-md-5><div class=form-group><label for=appointments-cal class=settings-cal-label>Appointments calendar</label><select id=appointments-cal class=form-control ng-options="cal.id as cal.summary for cal in $ctrl.calendars" ng-model=$ctrl.settings.appointmentsCalId ng-change=$ctrl.saveSettings()></select>WizWeek will treat events on this calendar as fixed meetings and will schedule your project tasks around them.<br><br>If you have multiple calendars that contain appointments of yours, we recommend copying appointments from the other calendar to your main.</div></div><div class=col-md-5><div class=form-group><label for=tasks-cal class=settings-cal-label>Tasks calendar (will be overwritten)</label><select id=tasks-cal class=form-control ng-options="cal.id as cal.summary for cal in $ctrl.calendars" ng-model=$ctrl.settings.tasksCalId ng-change=$ctrl.saveSettings()></select>WizWeek will <b>overwrite future events</b> on this calendar and replace them with automatically scheduled project work tasks.<br><br>We recommend you create a new calendar for your scheduled tasks (and then come back and refresh this page to select it).</div></div></div><div class=row><div class=col-md-5><h4 class=settings-sub-header>Work Schedule</h4>WizWeek will schedule your project tasks within your work hours, except when you have an event in your appointments calendar. If you want to exclude a day from your work schedule, just set the start and end time to the same time (weekends are 9am-9am by default).</div></div><div class=row><div class=col-md-1><h5>Day</h5></div><div class=col-md-2><h5>Start</h5></div><div class=col-md-2><h5>End</h5></div></div><div class=row ng-repeat="day in $ctrl.weekDays"><div class=col-md-1>{{day}}</div><div class=col-md-2><div uib-timepicker hour-step=1 minute-step=1 show-spinners=false mousewheel=false pad-hours=false ng-model-options="{ debounce:800 }" ng-change=$ctrl.saveSettings() ng-model=$ctrl.settings.workStartTimes[$index]></div></div><div class=col-md-2><div uib-timepicker hour-step=1 minute-step=1 show-spinners=false mousewheel=false pad-hours=false ng-model-options="{ debounce:800 }" ng-change=$ctrl.saveSettings() ng-model=$ctrl.settings.workEndTimes[$index]></div></div></div>'),e.put("app/welcome/welcome.html",'<!-- Main jumbotron for a primary marketing message or call to action --><div class=jumbotron><div class=container><h1>Want to optimize your week?</h1><p>WizWeek helps you effectively plan your week based on your to-do list and appointments.</p><p>You define tasks with deadlines, estimates and business value - and WizWeek jump starts your schedule.</p><p><a class="btn btn-primary btn-lg" role=button ng-click=welcome.auth.signIn()>Sign in with Google to get started &raquo;</a></p></div></div><div class=container><!-- Example row of columns --><div class=row><div class=col-md-6><h2>Clarify your priorities</h2><blockquote><p>&ldquo;What do you do the last week before you leave on a big trip? You clean up, close up, clarify, and renegotiate all your agreements with yourself and others. I just suggest that you do this weekly instead of yearly.&rdquo;</p><footer>David Allen of <cite title="Getting Things Done">Getting Things Done</cite></footer></blockquote></div><div class=col-md-6><h2>Schedule your work</h2><blockquote><p>&ldquo;Just as there is only so much stuff we can fit into our closets, so also there is only so much stuff we can fit into our days. If we don\'t think in terms of a basic schedule ... we end up in overload.&rdquo;</p><footer>Matt Perman of <cite title="What\'s Best Next">What\'s Best Next</cite></footer></blockquote></div></div></div><!-- /container -->')}]);
//# sourceMappingURL=../maps/scripts/app-5dee0b72dd.js.map
