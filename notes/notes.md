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