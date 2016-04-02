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

Then we use ui-sref to link to different view templates.  Like this
```
    <md-button ui-sref="nameOfState1">Go to state 1.</md-button>
    <md-button ui-sref="nameOfState2">Go to state 2.</md-button>
    <ui-view></ui-view>
```

And ui-router updated the URL in the browser, and inserts the template into the view.

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

So instead we use a dotted object notation with _controller as_.  First we give the controller an **alias**, in this case: '_stateOneCtrl as **stateone**_'.  Then in the controller, instead of using _$state.message_, we bind the message to '_**this**.message_'.  Finally, in the template we prepend our variable with the controller alias '_**stateone**.message_':
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

Taking it one step further, let's add a _capture variable_ in our controller:
```
    .controller('stateOneCtrl', function () {
        var vm = this;
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
    