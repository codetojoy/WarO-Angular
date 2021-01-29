### Setup

* in parent dir: `ng new sandbox`

```
ng generate component players
ng generate component player
ng serve
npm install --save bootstrap@3
    - edit angular.json and add `node_modules/bootstrap/dist/css/bootstrap.css`
```

### TODO

* X canary tests
* audit round/game: closed system of points
    - user hand is not being handled properly 
* error handling
* constants 
* clear player stats on new game
* config area
    * add routing from course
* proper tests
* CSS treatment
    - esp. test for small devices
* revisit architecture / code seams
* revisit loop idioms etc with functional style
* revisit RxJS
* remote api strategy 
