## Angular 2

https://angular.io/

Angular 2 is almost 100% different from Angular 1.x.  Why should we continue learning Angular 1.x?  Because Angular 2 is still in development.  And Angular 1.x will still be around for a long time once Angular 2 leaves beta.

#### Common drawbacks with Angular 1.x:

1.  Performance issues with large datasets if not used properly.  This starts to be an issues when Angular needs to re-paint 1000's of page elements.
2.  As apps get larger, it gets difficult to manage state and data.  $emit and $on methods work, but doing this all over the place gets tricky to visualize how data is moving around.
3.  Same issue with 2-way data binding.  Hard to reason about when appget large.
4.  Not built to take advantage of evolving web standards.  For example, web components.

#### Angular 2 Features

1.  It's **component based**.  Everything in an Angular 2 application is a reusable component.  This is a simplified approach to making applications.
2.  HUGE: Angular 2 is written in TypeScript.  TypeScript is basically JavaScript with **type** annotations.  Default Javascript doesn't have any way to enforce types: we can't define what type a variable or argument should be.  Javascript has ways around this (checking typeOf), but TypeScript lets us just define it.
3.  It's far simpler than ANgular 1.x.  There are no longer multiple ways to do things.  In Angular 1.x, there are four ways to create a service (services, factories, constants, providers)!  **In Angular 2, there's just components and directives**.  That's it.  This lets us have a simpler mental model of the framework.

#### Is Angular 2 Ready?

As of this writing (Apr 9 2016) Angular 2 is still in beta (2.0.0-beta 14):

https://github.com/angular/angular/blob/master/CHANGELOG.md

As of the publication of Ryan's course, it was still in beta-2

## What's This Course Section About?

1.  Refactor part of the ngClassifieds app to use Angular 2.  We're only going to convert the classified cards.
2.  The Angular Material library is not ready for Angular 2 yet.  Because of this, we're going to switch to bootstrap.
3.  Quick look at TypeScript.  Angular 2 is written in TypeScript.  We can use TypeScript if we want, but we can still use plain ES5 javascript if we want.

**Internal Debate:** Do I copy my Express server too?  Or just use Bracket's own live preview "server"?  Let's try Brackets first.

## Refactoring

Although we can use javascript, we're going to use TypeScript.  We begin with a preassembled started framework: ng2-play:

https://github.com/pkozlowski-opensource/ng2-play

