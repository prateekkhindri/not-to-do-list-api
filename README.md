# Not to do api server

This is a api server for the react not to do list.
The repo for the react not to do list can be found here ...

## How to use

- clone the repo `git clone ...`
- run `cd not-to-do-list-api`
- run `npm install`
- run `npm start`
  Note: you need to have nodemon installed globally. If you do not have it installed,
  run `npm install -g nodemon`

All the sample API's have been written in the rest.http file

## API's

All the API's will follow the following URL: `{rootUrl}/api/v1/`

### Task API

All the task API's will follow the following URL: `{rootUrl}/api/v1/tasks/`

| #   | API | METHOD   | DESCRIPTION                                                   |
| --- | --- | -------- | ------------------------------------------------------------- | --- | --- |
| 1.  | `/` | `GET`    | fetch all the tasks from the database                         |
| 2.  | `/` | `POST`   | send new task to add in the database                          |
| 3.  | `/` | `PATCH`  | update task, ie switch the task item to not to do list        |     |     |
| 4.  | `/` | `DELETE` | send single or multiple task id's to delete from the database |

### User API

All the task API's will follow the following URL: `{rootUrl}/api/v1/tasks/users/`
