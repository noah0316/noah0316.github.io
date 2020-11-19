---
title: Temporal Dead Zone, Hoisting에 관하여
date: 2020-11-04 23:38:01
category: JavaScript
thumbnail: { thumbnailSrc }
draft: false
---

이글은 원문을 기반으로 하여 내용을 덧붙여 쓴 글 입니다.

원문 : <https://dmitripavlutin.com/javascript-variables-and-temporal-dead-zone/>

원문 : <https://dmitripavlutin.com/variables-lifecycle-and-why-let-is-not-hoisted/>

Temporal DeadZone, 줄여서 TDZ를 보기전에 Hoisting에 관하여 알아보자.

### Hoisting이란 ?

<hr>

<img src="/assets/2020-11-04/hoisting-papago.png" width="300"/>

<center><출처 : 네이버 파파고></center>
<br>

Hoisting은 ''끌어올리다''라는 뜻을 가지고 있다.

JavaSciprt에서의 Hoisting은 선언되지 않은 함수, 변수(var로 선언된), import구문을 상단으로 끌어올려 사용할 수 있게 하는 방식을 의미한다.

다음 코드를 보자

```javascript
console.log(variable) // ReferenceError: variable is not defined
```

variable이라는 변수를 선언해주지 않았기 때문에 위의 코드는 당연히 참조에러를 발생시킨다.

```javascript
console.log(variable) // undefined
var variable = 10
```

위의 코드는 undefined가 출력된다. 자바스크립트 엔진은 내부적으로 위의 코드를 다음과 같이 해석한다.

```javascript
var variable
console.log(variable) // undefined
variable = 10
```

해석과정에서 variable에 대한 선언은 이루어져있는데 값에 대한 정의가 이루어져있지 않아 undefined가 된다.

이처럼 자바스크립트는 해석과정에서 변수(var로 선언된), 함수, import구문을 실행 context의 최상단으로 끌어올려 undefined를 할당한다.

실행 context에 대한 설명은 아래주소를 참조하세요 :)

[JS 문법의 문맥, 실행 context](https://jong-hui.github.io/devlog/2019/11/13/execution-context/)

함수도 마찬가지이다. (정확히 말하자면 함수 선언식)

```javascript
sayHi('noah')

function sayHi(name) {
  console.log(`${name} Says hi~`)
}
```

위의 코드도 자바스크립트 엔진이 다음과 같이 hoisting하여 해석한다.

```javascript
function sayHi(name) {
  console.log(`${name} Says hi~`)
}
sayHi('noah')
```

import구문 또한 마찬가지이다.

```javascript
sayHi('noah')
import { sayHi } from './myModule'
```

hoisting은 되지만 TDZ가 생성되어 접근할 수 없어 Reference Error(참조에러)를 던지는 친구들이 있다.

### Temporal Dead Zone(TDZ) 이란?

<hr>

TDZ에 영향을 받는 구문은 크게

- const 변수
- let 변수
- class 구문
- constructor() 내부의 super()
- 기본 함수 매개변수

가 있다.

const변수 선언부터 먼저 보게 되면 다음과 같은 코드는 에러를 발생시키지 않는다.

```javascript
const number = 123
console.log(number) // 123
```

하지만 var로 선언된 변수와 달리 const로 선언한 변수는 다음과 같은 코드에서 Undefined를 출력하는 것이 아닌 Reference Error를 발생시킨다.

```javascript
console.log(number)
const number = 123 // ReferenceError: Cannot access 'number' before initialization
```

### var로 선언된 변수는

<hr>

변수는 크게 3단계의 라이프사이클을 가진다.

선언 -> 초기화 -> 할당

<img src="/assets/2020-11-04/var.png" width="300"/>
<center><출처 : https://dmitripavlutin.com/variables-lifecycle-and-why-let-is-not-hoisted/></center>
<br>
var로 선언된 변수는 선언과 초기화를 동시에 진행합니다. 위에서 보았던 것처럼 var로 선언된 변수는 선언과 동시에 undefined로 호이스 팅되어 선언과 초기화가 동시에 진행된다.

### let, const으로 선언된 변수는

---

<img src="/assets/2020-11-04/let.png" width="600"/>
<center><출처 : https://dmitripavlutin.com/variables-lifecycle-and-why-let-is-not-hoisted/></center>
<br>
let은 선언과 초기화가 분리되어 그 사이에 TDZ가 생성되고,

const는 선언과 초기화가 동시에 진행되어지지만 선언이전에 TDZ가 생성되어 접근하면 Reference Error가 발생한다.

### 함수 선언식은

<hr>

<img src="/assets/2020-11-04/func.png" width="600"/>
<center><출처 : https://dmitripavlutin.com/variables-lifecycle-and-why-let-is-not-hoisted/></center>
<br>
선언, 초기화, 할당을 동시에 진행한다.

Temporal Dead Zone에 접근하면 참조에러를 발생하는데 Temporal Dead Zone은 다음과 같다.

<img src="/assets/2020-11-04/tdz.jpeg" width="600"/>
<br>
TDZ에 영향을 받는 구문들은 생성되는 과정에서 TDZ가 생성되는데 TDZ에 접근하게 되면 ReferenceError가 발생한다.

따라서 TDZ에 있는 number변수에 접근하면 ReferenceError가 발생한다.

let으로 선언된 변수도 마찬가지이다.

```javascript
console.log(number)
let number = 123 // ReferenceError
```

class구문도 선언 전에는 class를 사용할 수 없다.

```javascript
// Does not work!
const myNissan = new Car('red') // throws `ReferenceError`

class Car {
  constructor(color) {
    this.color = color
  }
}
```

위의 코드에서는 TDZ에 접근했기 때문에 Reference Error가 발생했는데 TDZ에 접근하지 않게 하기 위해서는 코드를 다음과 같이 바꿔야한다.

```javascript
class Car {
  constructor(color) {
    this.color = color
  }
}

// Works!
const myNissan = new Car('red')
myNissan.color // => 'red'
```

다음으로 constructor() 내부의 super() 메소드를 살펴보자.

부모 클래스를 상속받은 경우,

```javascript
class MuscleCar extends Car {
  constructor(color, power) {
    this.power = power; // Access to TDZ
    super(color);
  }
}

// Does not work!
const myCar = new MuscleCar(‘blue’, ‘300HP’); // `ReferenceError`
```

constructor() 즉 생성자 안에서 super()가 호출되기 전까지는 `this`바인딩은 TDZ에 있다.

TDZ는 인스턴스를 초기화하기 위해서는 부모클래스의 생성자를 호출한뒤 this값을 사용하도록 유도한다.

따라서 부모 클래스의 생성자를 호출한 뒤에 자식 클래스에서 this 값을 변경할 수 있다.

```javascript
class MuscleCar extends Car {
  constructor(color, power) {
    super(color)
    this.power = power
  }
}

// Works!
const myCar = new MuscleCar('blue', '300HP')
myCar.power // => '300HP'
```

다음으로 Default Function Parameter 기본 함수를 살펴보자

기본 매개변수는 전역(global)과 함수 스코프 사이의 중간 스코프(intermidiate scope)에 위치한다. 기본 매개변수도 TDZ 제한이 있다.

```javascript
const a = 2
function square(a = a) {
  // function square(a = a) -> Access to TDZ

  return a * a
}
// Does not work!
square() // throws `ReferenceError`
```

기본 매개변수 `a`는 선언 전에 `a = a` 표현식의 오른쪽에서 사용되었다. `a` 가 초기화되어 있지 않아 TDZ에 있는데

참조하려 해서에서 참조 에러가 발생한다.

기본 매개변수는 선언 및 초기화 다음에 사용되어야 한다. 이 경우 `init`과 같은 다른 변수로 선언하여 사용한다.

```javascript
const init = 2
function square(a = init) {
  return a * a
}
// Works!
square() // => 4
```

마지막으로 스코프 안에서의 TDZ의 동작을 살펴보자.

```javascript
function doSomething(someVal) {
  // Function scope
  typeof variable; // => undefined
  if (someVal) {
    // Inner block scope
    typeof variable; // throws `ReferenceError`
    let variable;
  }

doSomething(true);
```

이 코드에는 2개의 스코프가 존재한다.

1. 함수 스코프
2. `let` 변수가 선언된 내부 블록 스코프

함수 스코프에서 `typeof variable`는 `undefined`로 할당된다. 여기서는 `let variable` 구문의 TDZ에 영향을 주지 않는다.

`typeof variable` 구문의 내부 스코프에서는 선언 전에 변수를 사용하면 `ReferenceError: Cannot access 'variable' before initialization` 에러가 발생한다.

따라서 TDZ는 현재 if문 내부의 블록 스코프에만 존재한다.

### TDZ

는 선언전에 변수를 사용하여 발생하게 되는 위험을 줄일 수 있어 안전한 코딩을 할 수 있게 해준다는 것을 알 수 있었고,

### Hoisting

을 이용해 나타 날 수 있는 이해하기 어려운 코드, 의도치 않은 결과를 피하기 위해 변수 선언시 var 대신 let, const를 사용해야 함을 알 수 있었다 :)
