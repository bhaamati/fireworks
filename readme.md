# Notes

## Non-uniform point-on-sphere generation

* See the to-do on `SphereInitializer.prototype.initializePositions`. While the points look okay, we need correct implementation of the random number picker. The challenge is picking from (-1, 1) instead of [-1, 1). Most of the search results point to [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random), which doesn't have what we need. Nonetheless, we should move on as the results look somewhat realistic.
