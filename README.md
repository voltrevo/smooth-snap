# smooth-snap
> Snap with continuity and elegance.

At the moment this is merely a proof-of-concept demonstrating what I have in mind with a blue dot that tries to rest on the nearest orange dot but with a 1-to-1 association between cursor position and blue dot position.

One application I have in mind is a spotlight that moves a series of links in this way, but it's intended to be quite general and I'm really interested in other use-cases that others might come up with.

The motion was originally based on `x + sin(x)` behaviour, but I was able to make the 'stopping zone' larger by using integrals of `sin(x)^2n`. I settled on `n=3` for this demo and used wolfram alpha like [this](http://www.wolframalpha.com/input/?i=integrate+sin%28x%29%5E6).

## Online demo

https://andrewmorris.io/smooth-snap/

## Set-up

``` sh
# You must have node and npm installed: https://nodejs.org/

npm install -g nakedjs
git clone git@github.com:voltrevo/smooth-snap
nakedjs index.js
```
