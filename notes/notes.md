## Intro

For the code to work in Section 8 (where we add ui-router), you **must** use ui-router version 0.2.x!  The newer 1.0 releases break the app.  That's why package.json includes "angular-ui-router": "^0.2.18"...

## What Problem is Angular trying to solve?

SPAs aim for improved user experience, but building SPAs with plain javascript is hard.

There are other frameworks: ReactJS Ember ViewJS.  Angular's been around for a while and has a lot of nice features.

**Features we need in a SPA:**

1.  HTTP communication with XHR.  Angular abstracts the complications away.
2.  DOM manipulation.  Angular employs jQLite for this.
3.  Managing State and Routing.  State drives page changes, Angular handles routing based on state and makes it a lot easier than wriing routing in plain JS or jQuery routing.  State also means fwd/back work normally, we can bookmark pages and copy/paste them elsewhere.  

## The Good and the Bad

**Upsides**

1.  Nice features (ex.: 2-way data binding)
2.  Large community
3.  Lots of open source tools and components
4.  Well proven in the real world
5.  Once proficient, you can be a more efficient / productive developer


**Downsides**

1.  Steep learning curve
2.  New terms and concepts
3.  There's often more than 1 way to do things
4.  Bad for SEO (a problem with SPAs in general)
5.  Poor performance in some circumstances

Many of these downsides are solved in Angular 2

## Web Server

Ryan uses http server.  Some lightweight web server.  I'm using Node and express.

**Important** Express serves a static folder which is where all our frontent files need to be located.  In the course, Ryan loads Angular and other JS libraries from the node-modules folder.  In my case, that's outside of /public.  **So, just copy the required libraries from node_modules into /public/js/vendor.

## Dependencies

We can install this stuff with NPM?!  That's fantastic.

Packages we need:

1.  Angular: `npm install angular`
2.  Angular Material (Material Design) and Material Design Icons: `npm install angular-material mdi`


## IIFE

Immediately Invoked Function Expressions.  Scopes all our javascript to the files were creating them in, to avoid polluting the global namespace.

```javascript
(function() {
    
    'use strict';
    
    
})();
```

## Angular Material comes with some services

For example, `$mdSidenav` which lets us control angular material's sidenav component.

`$mdToast` service pops up little confirmation dialog boxes upon user action (clicking a button for example).


## Angular Animate

We just need to write some CSS that taps into some class hooks provided by Angular.

Angular's main CSS hooks:
1.  ng-enter
2.  ng-move
3.  ng-leave

We first add our own class to the elements we want to animate (the `<md-card>` that contains our looped classifieds).  We'll say `class="classified"`.  Then we add a bunch of CSS selectors:

```
.classified.ng-enter, .classified.ng-move {
    transition: 0.4s all;
    opacity: 0;
}

.classified.ng-enter.ng-enter-active, .classified.ng-move.ng-move-active {
    opacity: 1;
}

.classified.ng-leave {
    animation: 0.4s fade_classified;
    
}

@keyframes fade_classified {
    from { opacity: 1; }
    to { opacity: 0; }
}
```

## Routing

Lecture uses **ui-router**.  

SPAs load one single URL.  So traditional bookmarking, linking, etc doesn't work.  Say we wated to send someone a link to a specific classified listing.  Routing solves this.

The ngRoute built-in API is limited.  Omits a lot of features that a good router would need.  Thus Angular community built ui-router.

ui-router provides state-based routing.

Traditional round-trip website, each link = a unique page.  Moving through a site = loading new pages.

State based routing is more like a desktop application.  You might have a contact list state, an add contact state, and edit contact state, a search state, etc.  Everything is based on states of the application - what state are we in now?

ui-router merges the concept of linking (like traditional sites) with the concept of different state within a SPA.

ui-router gives us

1.  `$stateProvider` = lets us set up various states for the app.  Takes a method `.state` which takes two arguments: the 'name of the state', and a object of the state's properties.  Looks like this:
    ```
        $stateProvider
            .state('nameOfState1', {
                url: '/urlOfState1',
                template: (or templateUrl: )
            })
            .state('nameOfState2', {
                url: '/urlOfState2',
                template: (or templateUrl: )
            });
        
    ```

The add the view placeholder, either as:
```
    <ui-view></ui-view>
```
Or a DIV with the attribute:
```
    <div ui-view></div>
```

*Browsing* to a specific state requires adding a hash and then the url of the route.  Using route 1 in the above example, you would input the URL directly into a browser like this: `www.exampledomain.com/#/urlOfState1`.

Or we can add links to the page useing `ui-sref` to link to different states (and thus view templates).  Like this
```
    <md-button ui-sref="nameOfState1">Go to state 1.</md-button>
    <md-button ui-sref="nameOfState2">Go to state 2.</md-button>
    <ui-view></ui-view>
```

Clicking on one of the above tells ui-router to change states, update the URL in the browser address bar, and insert the template into the view.

Ui-router gives us **nested states**.  Looks like this:

In `app.js`:
```
    $stateProvider
        .state('one', {
            url: '/stateone',
            template: '<h1>State One</h1>'
        })
        .state('two', {
            url: '/statetwo',
            template: '<h1>State Two</h1> <md-button ui-sref="two.more">Go to nested state</md-button><ui-view></ui-view>'
        })
        .state('two.more', {
            url: '/more',
            template: '<p>This is teh deeper state.</p>'
        });
```

Nothing changes in the view!  Because the new button to trigger the nested state is created within the state two template!  Navigating to the nested state results in URL:
```
   http://localhost:3000/#/statetwo/more
```
        
You can see how this can be useful.

Ui-router can attach different controllers to different states.  For example:
```
    $stateProvider
        .state('one', {
            url: '/stateone',
            template: '<h1>{{ message }}</h1>',
            controller: 'stateOneCtrl'
        });
    
    })

    .controller('stateOneCtrl', function ($scope) {
        $scope.message = 'Hey from state one!';
    });
```

## Switching to _Controller as_

Using $scope is fine, but gets confusing once our app gets large and we have multiple controllers in play.  Often, controllers will have similar variables and methods.  You might have confusing-to-look-at view markup like this:
```
    <div ng-controller="ctrlOne">
        {{ message }}
    </div>
    <div ng-controller="ctrlTwo">
        {{ message }}
    </div>
```
That's difficult to reason about.

So instead we use a dotted object notation with **controller as**.  First we give the controller an **alias**, in this case: '_stateOneCtrl as **stateone**_'.  Then in the controller, instead of using _$state.message_, we bind the message to '_**this**.message_'.  Finally, in the template we prepend our variable with the controller alias '_**stateone**.message_':
```
    $stateProvider
        .state('one', {
            url: '/stateone',
            template: '<h1>{{ stateone.message }}</h1>',
            controller: 'stateOneCtrl as stateone'
        });
        
    .controller('stateOneCtrl', function () {
        this.message = 'Hey from state one!';
    });
```
Note that we no longer need to inject $scope into the controller.  This helps us avoid what's known as '$scope soup' in Angular.  Instead, we can be explicit about which controllers are attached to which properties in our templates.

Taking it one step further, let's add a **capture variable** in our controller:
```
    .controller('stateOneCtrl', function () {
        var vm = this;     // <-- CAPTURE VARIABLE
        vm.message = 'Hey from state one!';
    });
```
We use `vm`, a popular capture variable that stands for 'view model'.

## Refactoring our Classifieds App

We'll start with one route:
```
angular
    
    .module('ngClassifieds', ['ngMaterial', 'ui.router'])
    
    .config(function ($mdThemingProvider, $stateProvider) {
    
        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('brown');
    
        $stateProvider
            .state('classifieds', {
                url: '/classifieds',
                templateUrl: 'components/classifieds/classifieds.tpl.html',
                controller: 'classifiedsCtrl as vm'
            });
    
    });
```

We'll butcher our previous index.html file...

1.  We don't need `ng-controller="classifiedsCtrl"` anymore because we specify controllers in our routes.
2.  We'll cut/paste everything in between the `<body>` tags except for the `<script>` calls, inserting it into our new template: `js/components/classifieds/classifieds.tpl.html` (this is an odd location, but whatever)
3.  Then add `<ui-view></ui-view>` elements to index.html.
4.  Then we hack our controller apart to employ capture variable:
    ```
        var vm = this;
    ```
5.  Best practice for controllers is to declare all of object (vm) members up top pointing to functions and properties down below.  For example, instead of attaching methods to $scope like this:
    ```
        $scope.closeSidebar = function () {
            $mdSidenav('left').close();
        };
    ```
    We will now do this:
    ```
        // up top...
        vm.closeSidebar = closeSidebar;
        
        // then down below...
        function closeSidebar () {
            $mdSidenav('left').close();
        };
    ```
    This makes it very easy to see what our controllers are doing.  Right up top is a list!
    ```
        .controller('classifiedsCtrl', function ($http,
        classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
        
        var vm = this;
        
        // attach the member functions
        vm.openSidebar    = openSidebar;
        vm.closeSidebar   = closeSidebar;
        vm.saveClassified = saveClassified;
        vm.editClassified = editClassified;
        vm.saveEdit       = saveEdit;
        
        // write the functions
        function openSidebar = function () {
            $mdSidenav('left').open();
        };

        // etc, etc.
    ```

## Refactoring New and Edit features

We're going to add routes to states for adding new classifieds and editing existing classifieds.  We'll move the markup into separate templates and add controllers.

With nested states, Angular knows when a state name is a substate through dot notation:
```
    $stateProvider
        .state('classifieds', {
            url: '/classifieds',
            templateUrl: 'js/components/classifieds/classifieds.tpl.html',
            controller: 'classifiedsCtrl as vm'
        })

        .state('classifieds.new', {   // ** the '.new' substate tells Angular to append
            url: '/new',              // '/new' to the above 'classifieds' state.
            templateUrl: 'blah/blah/classifieds.new.tpl.html',
            controller: 'newClassifiedsCtrl as vm'
    });
```

Because there's new controllers, don't forget to include them when pulling in scripts in index.html.
```
    <script src="js/components/classifieds/new/classifieds.new.ctr.js"></script>
```

Then, we have to inject a new ui-router service into our main controller: $state.  The $state service is responsible for representing states as well as transitioning between them.  Since we need to transition between classifieds and classifieds.new, we need to use $state.  

We use it where we define the `openSidebar()` function.  Instead of having the button open the sidenav directly:
```
    function openSidebar() {
        $mdSidenav('left').open();
    }
```
... we tell it to navigate to a new state (_classifieds.new_) when the button is clicked:
```
    function openSidebar() {
        $state.go('classifieds.new');    
    }
```

And of course we have to write the new controller _newClassifiedsCtrl_:

```
    (function () {

        'use strict';

        angular
            .module('ngClassifieds')
            .controller('newClassifiedsCtrl', function ($mdSidenav,
                $timeout, $mdDialog, classifiedsFactory) {

            var vm = this;

            $mdSidenav('left').open();
            
        })

    })();
```
But this doesn't work.  We have to encapsulate `$mdSidenav.open` inside Angular's $timeout service.  The browsers event loop requires us to code this way.  Ryan does not go into detail why.  But this is what we do to fix it:
```
    (function () {

        'use strict';

        angular
            .module('ngClassifieds')
            .controller('newClassifiedsCtrl', function ($mdSidenav,
                $timeout, $mdDialog, classifiedsFactory) {

            var vm = this;

            $timeout(function () {
                $mdSidenav('left').open();
            });

    })();
```

## Setting up Watchers

The .watch() method is a $scope feature that keeps a look out for changes to something and responds in ways we define.  We'll use $scope.watch to close the new sidebar route.

Why are we using $scope again now that we're binding properties and methods directly to controllers (controll as)?  Because there are certain properties of the $scope object that are only available to us via the actual $scope object.  Because we're binding everything to the 'this' keyword, we really only use $scope for specific special features only it provides.

We're going to set this up inside `newClassifiedsCtrl`.  Here's a demo example where we setup a watcher to log a message to the console if some value becomes equal to 2:
```
    (function () {

        'use strict';

        angular
            .module('ngClassifieds')
            .controller('newClassifiedsCtrl', function ($scope,
                $mdSidenav, $timeout, $mdDialog,
                classifiedsFactory) {

            var vm = this;

            $timeout(function () {
                $mdSidenav('left').open();
            });
            
            $scope.$watch('vm.valueToChange', function (value) {
                if(value === 2) {
                    console.log('value changed to 2');
                }
            });
            
            vm.valueToChange = 1;
            
            $timeout(function() {
                vm.valueToChange = 2;
            }, 2000);

        });

    })();
```
## Emitting Data

How can we communicate date between separate controllers?  Again we will use some Angular $scope features.

**$scope.$on** - This is basically a listener.  Invocations look like this:
```
    $scope.$on('myMessage', function(event, message) {
        console.log(message);
    })
```
That says, "on receipt of myMessage, trigger callback with _event_ and _message_".

The .$on method is used in conjunction with either broadcasters or emitters, which are used to send messages between scopes:

1.  **$scope.$broadcast** - Broadcasters are used to send data down to child scopes.
2.  **$scope.$emit** - Emitters are used to send data up to parent scopes from a child scope.

Our newClassifieds controller is a child of our main classidies controller, so we'll use emit there.  And we'll create a $scope.$on(); listener in the main classifieds controller to listen for the emitter.


## Editing Data with Route Params

Our editClassifieds controller is also a child of main classifieds controller, but instead of using $scope.$broadcast (what I expected Ryan would suggest) we're going to use a feature of ui-router that lets us pass data from one route to another.  ui-router gives us the ability to send data through URL paramters.

We provide these parameters as an object, the 2nd argument in the $state.go function:
```
    function editClassified(classified) {
        $state.go('classifieds.edit', {
            id: classified.id,
            classified: classified
        });
    }
```
Then we tweak the route slightly.  Since we want the URL to include the /id of the classified we want to edit, we append the variable `/:id` to the utl peroperty:
```
    .state('classifieds.edit', {
        url: '/edit/:id',
        templateUrl: 'js/components/classifieds/edit/classifieds.edit.tpl.html',
        controller : 'editClassifiedsCtrl as vm',
        params: {
            classified: null     // initialize this parameter as null
        }
    });
```
Then we have to tweak the editClassifieds template - we need to append 'vm.' to our bound variables wherever we're using ng-model:
```
<!-- INPUTS -->
    <div layout="column">
        <md-input-container>
            <label for="title">Title</label>
            <input type="text" id="title"
                   ng-model="vm.classified.title"
                   md-autofocus>
        </md-input-container>
        <md-input-container>
            <label for="price">Price</label>
            <input type="text" id="price"
                   ng-model="vm.classified.price">
        </md-input-container>
        <md-input-container>
            <label for="description">Description</label>
            <input type="text" id="description"
                   ng-model="vm.classified.description">
        </md-input-container>
        <md-input-container>
            <label for="image">Image Link</label>
            <input type="text" id="image"
                   ng-model="vm.classified.image">
        </md-input-container>
    </div>
```
Then we need to grab the classified object from our ui-router state params and include it in the editClassifieds controller:
```
    .controller('editClassifiedsCtrl', function ($scope, $state,
        $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {

        var vm = this;
        vm.closeSidebar = closeSidebar;
        vm.saveClassified = saveClassified;
        vm.classified = $state.params.classified;   // <- new!
```

## Working with a real database

First a bit about the $http service.  It's used to interact with other endpoints.  We can use common verbs like _get_ and _post_ in the way they're expected to work:
```
    $http.get('https://api.github.com/users').then(function(response) {
        // get data
        console.log(response);
    });

    $http.post('endpoint_url').then(function(argument) {
        // save data
    });
    
    $http.put('endpoint_url').then(function(argument) {
        // update data
    });
    
    $http.delete('endpoint_url').then(function(argument) {
        // delete data
    });
```
The methods return a promise, so they're always followed by one or more .then().

This relies on a server