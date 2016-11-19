# pure-css-loader

how do I appease to ~~that guy on tor~~ users who have disabled javascript while
minimizing the effects of FOUC?

show the CSS page loader regardless of ```no-js``` and hide the loader after
```n``` seconds with ```<noscript>```.

_hey! i said "minimize", not "prevent"!_

the source code should be fairly simple to go through. run down;

 - [index.html](/index.html) : main page
 - [spinner.css](/spinner.css) : loader animation
 - [loader-keyframes.css](/loader-keyframes.css) : keyframes for hiding loader
 - [keyframegen.js](/keyframegen.js) : 5-minute script written to generate keyframes

note: serve keyframes,etc css using gzip, because those tend to get big.

add one of the following to the ending keyframe (@ 100%).
```
overflow: hidden;
visibility: hidden;
display: none;
```

as to when to use what, use your own discretion.

references
----------

[this answer on SO](http://stackoverflow.com/a/21994053)
