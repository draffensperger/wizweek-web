# WizWeek AngularJS front end

This contains the AngularJS front code for the [wizweek.com](https://wizweek.com)
website. It's a site that will generate an optimized personal schedule given a
list of tasks and then sync that schedule to a Google calendar.

For a discussion of product itself, check out my blog post ["Optimize
your schedule"](https://davidraff.com/optimize-your-schedule/).

Wizweek.com also involves two other components:
[wizweek-scheduler](github.com/draffensperger/wizweek-scheduler) is a Go web
service that uses a linear program to do the schedule optimization, and 
[wizweek-api](github.com/draffensperger/wizweek-api) is a Python Flask API that
interfaces with Google Cloud Datastore to store settings and task data.

## Product overview

You identify your larger tasks, give each a time estimate and a business value 
estimate, plus optimally a deadline and earliest start date.

You also choose one of your Google calendars to be your "tasks" calendar and one 
to be your "appointments" calendar.

![](/screenshots/wizweek_site_screenshot.png | width=500)

When you click "Optimize my schedule!" WizWeek will form your optimal schedule
(or inform you that you are overcommitted!) It will then sync it to your tasks
calendar.

![](/screenshots/wizweek_gcal_calendar.png | width=500)

WizWeek allows you to set up a weekly work schedule, e.g. 9am-5pm Monday to Friday.
It will only schedule your tasks within those hours, and only when you don't have 
a meeting on your appointments calendar.

Within those remaining free work hours, it will first prioritize a schedule where 
you will meet your deadlines. For remaining flexibility in your work schedule, it will put the highest impact tasks first as measured by business value per hour. It will also make sure not to schedule a task until it's minimum start date if specified.

WizWeek currently only allows time estimates for tasks to be one hour or more. The thinking is that you would use a separate list for all your shorter tasks. Then you could create a single larger task like "Small tasks" and add it to your list to schedule some time in your week.

## Deployment 

The wizweek.com site runs via CloudFlare pointed at GitHub pages (with
    wizweek.com configured as custom domain name).

The site is also currently set up to build and deploy automatically via Travis 
for new commits to `master` that pass the JavaScript tests.

## Ideas and possible improvements

Here's a list of ideas for how the product and code could be improved:

- Provide a smoother onboarding experience for users that would make their
appointments calendar default to their primary Google calendar and prompt them
to create a tasks calendar (and allow that to work automatically).
- Refactor and clean up the code that was adapted from the TodoMVC
- Improve test coverage, write end-to-end tests
- Make the tasks editor more user friendly in various ways and make it easier to
navigate with the keyboard
- Remove the need to sign in with Google: allow login via email and password.
Allow Google login later if the user wants to sync a calendar. Provide a way for
their tasks calendar to be served via WizWeek.com itself (via a normal calendar
    sharing protocol).
- Make the website mobile friendly and potentially even built it as a
progressive web application
- Build out Android and iOS apps for this possibly using the Ionic framework to
utilize the existing AngularJS code.
- Upgrade to Angular 2 once it comes out and use TypeScript instead of regular
JS.

## Acknowledgements

The Google API interaction code in the `angular-gapi` contains code that has
been adapted from the [maximepvrt/angular-google-gapi](https://github.com/maximepvrt/angular-google-gapi) repo.

The tasks editing feature is based on the code from the
[TodoMVC](https://github.com/tastejs/todomvc) sample application.

The script that automatically deploys changes to GitHub pages in a clean way is
from
[X1011/git-directory-deploy](https://github.com/X1011/git-directory-deploy),
and I based my TravisCI deployment script on 
[this gist by @domenic](https://gist.github.com/domenic/ec8b0fc8ab45f39403dd).

This idea of optimizing your tasks is based on an Excel spreadsheet my dad, John
Raffensperger users to manging his tasks. For his explanation of it and a link
to his spreadsheet, see [john.raffensperger.org/](http://john.raffensperger.org/).

## License

Code in this repo is MIT License unless otherwise specified.

Copyright (c) David Raffensperger for new code contained here and modifications 
of included code.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
