
# Clutter

### Installation
```bash
npm install clutter
```
Then
```javascript
import c from 'clutter';
```
or 
```javascript
var c = require('clutter');
```
##### Browser
```html
<script src='lib/clutter.js'></script>
```

 exposed as `window.c`


### Usage
Available methods
- [random](#random)
- [replace](#replace)
- [every](#every)
- [after](#after)
- [add](#add)
- [times](#times)
- [shuffle](#shuffle)

#### ``random``

```javascript
c('{1|2|3|4|5}{1|2|3|4|5}{1|2|3|4|5}').random().val;
// => '245'

// Nesting supported
c('{1|2|3{a|b|c}}').random().val;
// => '3d'
```

#### ``replace``

```javascript
let str = c('testing').replace({
   't': '{ƭ|t}', 
   'e': '{è|É|e}',
   's': '{ƨ|§|s}',
   'i': '{ï|Ì|i|1}',
   'n': '{ñ|n}',
   'g': '{ϱ|g}'
}).val
// => '{ƭ|t}{è|É|e}{ƨ|§|s}{ƭ|t}{ï|Ì|i|1}{ñ|n}{ϱ|g}'

c(str).random().val;
// => 'ƭèstïnϱ'
```

#### ``every``
Loop through current value

```javascript
let second = (s, i) => (i % 2 == 0) ? s : s.toUpperCase();

c('hhhhhhhhhh').every(second).val;
// => 'hHhHhHhHhH'
```

#### ``after``

```javascript
c('hhhhhhhhhh').after((s) => s.toUpperCase()).val;
// => 'HHHHHHHHH'
```


#### ``add``
```javascript
c('1').add('2').add('3').val;
// => '123'
```

#### ``times``

```javascript
c('yeah').times(5).val;
// => 'yeahyeahyeahyeahyeah'

c("aaa").add("b").times(3).val
// => 'aaabaaabaaab'

c('1').times(1).add('2').times(2).add('3').times(3).val;
// => '122333'
```

#### ``shuffle``
```javascript
c('Lorem ipsum dolor sit amet').shuffle().val;
// => 'deotempsoo r sLiirt lmm au'

c('Lorem ipsum dolor sit amet').shuffle('words').val;
// => 'amet sit Lorem dolor ipsum'

c('Lorem ipsum dolor sit amet').shuffle('chars').val;
// => 'remLo psmiu olrod tsi tame'
```

### Build
`npm run build`

`npm run dev`

### Test
`npm run test`

`npm run test:watch`

### License
MIT © [Janne Rantamäki](mailto:janne.rantamaki@gmail.com)