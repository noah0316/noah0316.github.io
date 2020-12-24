---
title: 'Swift에서의 Functions'
date: 2020-12-19 15:12:37
category: 'Swift'
thumbnail: { thumbnailSrc }
draft: false
---
이 글은 애플의 [스위프트 공식문서](https://docs.swift.org/swift-book/LanguageGuide/Functions.html) 를 스터디하며 중간중간 저의 개인적인 생각을 덧 붙여 쓴 글 입니다.

"함수란 특정 기능(작업)을 수행하는 코드의 집합이다." 

함수를 선언할때는 `func` 키워드를 이용하여 선언하며 사용할때는 함수의 이름을 호출하여 사용해야한다.

당연히 함수의 이름은 함수가 어떠한 기능을 수행하는지 다른 사람이 보아도 알 수 있게 직관적으로 표현 해주어야한다.

> 함수의 이름을 직관적으로 표현하고, 전반적인 코드의 가독성을 높이기 위해서는 (혹은 이름을 쉽게 짓기 위해서는 (창작의 고통...)) 함수가 될 수 있으면 한가지의 일만하도록 구성하게 하여 재사용성을 높이고, 유지보수가 용이하게 만드는 것이 좋다고 배웠으며, 또한 그렇게 생각한다.  
>이를 지켜가며 코드를 작성하면 무엇보다 나의 코드를 보게 될 나와, 미래의 팀원이 행복해질 것 같다.👨‍💻
>
> 따라서 함수가 너무 많은 수의 인수를 필요로 하지는 않는지, 함수가 최대한 순수하게 한가지 일만 하도록 하게 하는 것을 지속적으로 고민해보는 연습이 필요할 것 같다.

Swift에서의 모든 함수는 타입을 가지며 타입은 함수의 매개변수 타입, 반환타입으로 구성되어있다.

이에 대해서는 조금 뒤에 더 자세히 알아보자.

( Tip: Xcode에서 option key를 누르고 변수를 클릭하면 해당 변수의 타입을 확인 할 수 있다. )

---

## Defining and Calling Functions - 함수 정의와 호출

함수를 선언할 때는 가장 앞에 `func` 키워드를 붙이고 매개변수와 type을 다음과 같은 형태로  
`(person: String)` 표현하고 함수의 반환 값이 있다면(String을 반환한다고 가정)  `-> String` 형태로  
반환형을 정의한다.  
이렇게 선언한 형태가 함수의 type이 된다. (매개변수의 type, 반환형의 type)

```swift
func greet(person: String) -> String {
    let greeting = "Hello, " + person + "!"
    return greeting
}
```

정의한 함수에 인자 값을 넣어 호출하면 다음과 같다.

```swift
print(greet(person: "Anna"))
// Prints "Hello, Anna!"
print(greet(person: "Brian"))
// Prints "Hello, Brian!"
```

greet함수를 더 축약해 만든다면 

```swift
func greetAgain(person: String) -> String {
    return "Hello again, " + person + "!"
}
```

이와 같다. 

> 이처럼 코드의 가독성을 해치지 않는 선에서 함수안의 코드를 간결하게 만드는 연습은   
>불필요한 변수할당과, logic을 줄이는데 많은 도움이 될 것 같다.  
>하지만 코드를 너무 과도하게 줄여 다른이가 코드를 보았을때  
>
>해당 코드의 저의를 알아내기 위해 시간을 보다 많이 들여야한다면  
>협업의 관점으로 보았을때 좋은 코드라고 할 수 없을 것 같다.

```swift
print(greetAgain(person: "Anna"))
// Prints "Hello again, Anna!"
```

함수 호출부분은 이전과 달라지지 않았다.

---

## Function Parameters and Return Values - 함수 파라미터와 반환 값



### Functions Without Parameters (매개변수가 없는 함수)

함수는 꼭 input parameter가 필요하지는 않다.

지금 소개하는 함수는 input parameter가 없는 함수이며,  
호출하면 언제나 똑같은 String 메시지를 반환하는 함수이다.

```swift
func sayHelloWorld() -> String {
    return "hello, world"
}
print(sayHelloWorld())
// Prints "hello, world"
```

### Functions With Multiple Parameters(여러개의 매개변수를 가진 함수)

또한 함수는 여러개의 input parameter를 가질 수 있다. 여러개의 매개변수는 (,) 콤마를 이용해 구분한다.

```swift
func greet(person: String, alreadyGreeted: Bool) -> String {
    if alreadyGreeted {
        return greetAgain(person: person) // 위에서 선언한 함수 호출
    } else {
        return greet(person: person) // 위에서 선언한 함수 호출
    }
}
print(greet(person: "Tim", alreadyGreeted: true))
// Prints "Hello again, Tim!"
```

### Functions Without Return Values(반환값이 없는 함수)

다음 처럼 함수에서 반환값을 선언하지 않았다면  반환타입을 적어주지 않아도 된다. 

```swift
func greet(person: String) {
    print("Hello, \(person)!")
}
greet(person: "Dave")
// Prints "Hello, Dave!"

```

> 엄밀히 말하면 방금 선언한 greet함수는 반환 값이 있다. 반환 값을 선언하지 않았는데도??  
> - 반환 타입이 정의 되지 않은 함수는 Void라는 특별한 type을 반환한다. 이는 ()와 같은 비어있는 튜플이다.

함수의 반환 값은 다음과 같이 호출될때 무시될 수 있다.

```swift
func printAndCount(string: String) -> Int {
    print(string)
    return string.count
}
func printWithoutCounting(string: String) {
    let _ = printAndCount(string: string)
}
printAndCount(string: "hello, world")
// prints "hello, world" and returns a value of 12
printWithoutCounting(string: "hello, world")
// prints "hello, world" but does not return a value
```

첫번째 함수는 string을 출력하고 문자의 갯수를 반환한다.  
두번째 함수는 첫번째 함수를 호출해 string을 출력하지만 첫번째 함수에서 받은 반환 값은 사용하지 않았다.

> 함수의 반환 값은 무시될 수 있다.  
>하지만 값을 반환하는 함수는 항상 값을 반환하며 반환 타입이 명시된 함수에서 값을 반환하지 않는다면 compile-time에 error가 발생한다.

### Functions with Multiple Return Values(여러개의 값을 반환하는 함수)

반환 타입을 정의할때 튜플을 함수의 반환 타입으로 사용할 수 있다.  
이 말인 즉슨 함수의 반환값으로 튜플을 반환할 수 있다는 뜻이다.

다음 함수는 배열을 받은다음 배열에서 최소값과, 최대값을 튜플로 반환하는 함수이다.

```swift
func minMax(array: [Int]) -> (min: Int, max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}

```

반환된 두개의 Int를 가진 튜플은 다음처럼 접근자(.)를  이용해 값에 접근할 수 있다.

```swift
let bounds = minMax(array: [8, -6, 2, 109, 3, 71])
print("min is \(bounds.min) and max is \(bounds.max)")
// Prints "min is -6 and max is 109"
```

튜플의 멤버이름은 함수의 반환 타입을 지정할 때 다음과 같이 이미 지정되어  
`-> (min: Int, max: Int)`   
함수에서 튜플이 반환되는 지점에서 이름을 지정할 필요가 없다.

### Optional Tuple Return Types(옵셔널 튜플 반환형)

함수에서 반환할 튜플 유형이 값이 없을 가능성이 있을때  
Optional Tuple Return Type을 사용할 수 있다.

Optional Tuple Return Type은 다음과 같이 사용할 수 있다.  
 `(Int, Int)?` or `(String, Int, Bool)?` 이는

`(Int?, Int?)` `(String?, Int?, Bool?)` 과는 다른 표현 방식이므로 유의해야한다.

```swift
func minMax(array: [Int]) -> (min: Int, max: Int)? {
    if array.isEmpty { return nil }
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

위 함수는 두개의 Int값을 포함하는 튜플을 반환한다.  
하지만 매개변수로 전달되는 배열에 대해 검사를 하지 않기 때문에 안전하지 않다.  
비어있는 배열이 온다고 가정했을 때 minMax함수에서는 배열의 0번째 원소에 접근하고,  
이때 런 타임에 에러가 발생할 것 이다.

빈 배열이 오는 경우를 안전하게 처리하려면  
Optional Tuple Return Type으로 minMax함수를 작성하고,  
매개변수로 전달되는 배열이 비어있을 경우 nil값을 반환하면 된다. 

```swift
func minMax(array: [Int]) -> (min: Int, max: Int)? {
    if array.isEmpty { return nil }
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

위 함수의 반환값을 확인하기 위해서는 다음처럼 if let과 같은 optional binding을 이용하면 된다.

```swift
if let bounds = minMax(array: [8, -6, 2, 109, 3, 71]) {
    print("min is \(bounds.min) and max is \(bounds.max)")
}
// Prints "min is -6 and max is 109"
```



### Functions With an Implicit Return(묵시적 반환이 있는 함수)

함수의 전체 body가 하나의 표현식으로 되어있는 경우 함수는 묵시적으로 해당 표현식을 반환 값으로 사용한다.

```swift
func greeting(for person: String) -> String {
    "Hello, " + person + "!"
}
print(greeting(for: "Dave"))
// Prints "Hello, Dave!"

func anotherGreeting(for person: String) -> String {
    return "Hello, " + person + "!"
}
print(anotherGreeting(for: "Dave"))
// Prints "Hello, Dave!"

```

다음처럼 하나의 표현식으로 작성되는 함수는 return 키워드를 생략할 수 있다. 

> 반환 타입을 생략하는 것은 아니니, 반환타입 마저 같이 생략하는 실수를 하지 않도록 주의!!

---

## Function Argument Labels and Parameter Names - 함수 인자 라벨과 파라미터 이름



함수 parameter에는 argument label과 parameter name이 있다.   
argument label은 함수를 호출할 때 사용된다.

parameter name은 함수를 구현할 때 즉, 함수 body에서 사용된다.  
기본적으로 parameter는 parameter name을 argument label로 사용한다.

코드로 이해해보자.

```swift
func someFunction(firstParameterName: Int, secondParameterName: Int) {
    // In the function body, firstParameterName and secondParameterName
    // refer to the argument values for the first and second parameters.
}
someFunction(firstParameterName: 1, secondParameterName: 2)
```

위 함수는 parameter name을 개발자가 직접 지정해주지 않은 경우이다.  
이 경우에는 parameter name을 argument label로 사용하기 때문에  
함수를 호출할때, 함수 내부에서 사용할때 같은 이름으로 사용한다.

모든 파라미터에는 고유(unique)한 이름이 있어야한다.  
여러 파라미터가 동일한 argument label을 가질 수 있지만 고유(unique)한 argument label은  
코드의 가독성을 높인다.

### Specifying Argument Labels(인자 라벨 지정)

```swift
func someFunction(argumentLabel parameterName: Int) {
    // In the function body, parameterName refers to the argument value
    // for that parameter.
}
```

위처럼 paramter name 한칸의 공백(space) 앞에 argument label을 작성할 수 있다.

```swift
func greet(person: String, from hometown: String) -> String {
    return "Hello \(person)!  Glad you could visit from \(hometown)."
}
print(greet(person: "Bill", from: "Cupertino"))
// Prints "Hello Bill!  Glad you could visit from Cupertino."
```

앞서 살펴보았던 greet함수에 argument label을 작성하면 위 처럼 사용할 수 있다.

argument label을 사용하면 마치 문장을 사용하듯 함수를 호출 할 수 있고,  
의도적으로 명확한 함수 본문을 제공할 수 있어 코드의 가독성을 높일 수 있다.

### Omitting Argument Labels(인자 생략)

argument label에 _(under score)를 사용하면 다음과 같이 함수를 호출 할 때  
argument label을 사용하지 않고 호출 할 수 있다.

```swift
func someFunction(_ firstParameterName: Int, secondParameterName: Int) {
    // In the function body, firstParameterName and secondParameterName
    // refer to the argument values for the first and second parameters.
}
someFunction(1, secondParameterName: 2)
```



### Default Parameter Values(기본 파라미터 값)

함수의 parameter type 뒤에 값을 할당하여 parameter의 default value를 정의할 수 있다.  
parameter의 default value가 정의되어 있다면 함수를 호출 할 때 해당 매개변수를 생략하고 호출 할 수 있다.

```swift
func someFunction(parameterWithoutDefault: Int, parameterWithDefault: Int = 12) {
    // If you omit the second argument when calling this function, then
    // the value of parameterWithDefault is 12 inside the function body.
}
someFunction(parameterWithoutDefault: 3, parameterWithDefault: 6) // parameterWithDefault is 6
someFunction(parameterWithoutDefault: 4) // parameterWithDefault is 12
```

default value가 없는 parameter들은 default value가 있는 parameter 앞에 배치해야 한다.

> default value를 가지지 않는 parameter가 일반적으로 함수의 의미상 더 중요하기 때문에 default value를 가지는 parameter 생략여부에 상관 없이, 같은 함수가 호출되는 것을 쉽게 알 수 있도록 default value를 가지지않는 parameter를 먼저 작성한다.



### Variadic Parameters(가변 파라미터)

Variadic Parameter는 지정된 타입의 0개 이상의 값을 허용한다.

Variadic Parameter를 사용하면 함수를 호출할때 매개 변수에 다양한 수의 인자를(가변) 전달 할 수 있다.

parameter의 타입 뒤에 마침표 3개(...)을 삽입하면 Varadic Parameter(가변 파라미터)를 작성 할 수 있다.

Varadic Parameter에 전달 된 값은 함수 body안에서 해당 type에 맞는 배열로 사용할 수 있다. 

예를들어 Double... 타입의 Varadic Parameter는  
[Double] type의 상수 배열로 함수 body내에서 사용되어진다.

아래의 예는 Varadic Parameter로 받아온 숫자 목록의 길이에 상관없이 숫자 목록의 산술평균을 계산하는 예제이다.

```swift
func arithmeticMean(_ numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}
arithmeticMean(1, 2, 3, 4, 5)
// returns 3.0, which is the arithmetic mean of these five numbers
arithmeticMean(3, 8.25, 18.75)
// returns 10.0, which is the arithmetic mean of these three numbers
```

> 함수는 최대 하나의 Varadic Parameter를 가질 수 있다.

### In-Out Parameters

함수의 parameter는 기본적으로 상수이다.  
해당 함수의 본문 내에서 함수 parameter값을 변경하려고 하면 Compile-error가 발생한다.

이는 실수로 parameter값을 변경하는 것을 미연에 방지하기 위한 일종의 안전장치이다.

함수의 parameter값을 변경하고, 함수 호출이 끝난 뒤에도 유지되도록 하려면  
해당 parameter를 in-out parameter로 정의하면 된다.

parameter의 타입앞에 inout 키워드를 배치하여 in-out parameter를 작성할 수 있다.

in-out parameter는 함수에 안쪽(in)으로 전달되는 값을 가지고 있고,  
이는 함수에서 수정되고, original value를 교체하여 함수의 바깥(out)으로 전달된다.

in-out parameter에 대한 인자는 변수로만 전달할 수 있다.  
상수나, 리터럴은 수정할 수 없기 때문에 변수로만 전달 할 수 있다.

함수에서 수정 될 수 있음을 나타내기 위해 in-out parameter에 인자를 전달할때 변수의 이름 앞에 `&` 를 붙인다.

> in-out parameter는 default value를 가질 수 없고 vardic parameter(가변 매개변수)에는 inout 키워드를 사용할 수 없다.

다음 예제는 a 와 b 두개의 Interger in-out parameter를 가지는 `swapTwoInts(_:_:)` 함수이다.

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

위 함수는 b의 값을  a로, a의 값을 b로 바꾼다.

Int type의 두 변수를 사용해 `swapTwoInts(_:_:)` 함수를 호출하면 두 변수의 값을 서로 바꿀 수 있다.

>  함수를 호출할때 해당 변수의 참조주소(&)를 사용하여 호출하기 때문에  
>함수가 종료되어도 값이 다음과 같이 유지됨을 확인할 수 있다.

```swift
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
// Prints "someInt is now 107, and anotherInt is now 3"
```

> in-out parameter를 사용한 위 예제는 함수의 반환 값을 사용하지 않고,  
> 함수의 scope 바깥에 영향을 주었다.

---

## Function Types(함수 타입)

함수는 항상 특정 type을 가지고 함수의 type은 parameter type과 반환 type으로 구성되어 있다.

```swift
func addTwoInts(_ a: Int, _ b: Int) -> Int {
    return a + b
}
func multiplyTwoInts(_ a: Int, _ b: Int) -> Int {
    return a * b
}
```

위 예제에서 사용된 두개의 함수는 두개의 Int type변수를 가지고 각각의 연산을 수행해 Int값을 반환한다.

두 함수의 타입은 (Int, Int) -> Int 이다. 이는 다음과 같은 의미와 같다.

"Int 타입의 두개의 parameter를 가지고, Int 타입의 값을 반환한다."

다음 예제는 parameter와 반환 값이 없는 예제이다.

```swift
func printHelloWorld() {
    print("hello, world")
}
```

위 함수의 타입은 `() -> Void` 이다. 이는 다음과 같은 의미와 같다.

"parameter를 가지지 않으며, 반환 값을 가지지 않는다."

> 위에서 얘기했듯, 반환 타입이 정의 되지 않은 함수는 Void라는 특별한 type을 반환한다.  
> 이는 ()와 같은 비어있는 튜플이다.



### Using Function Types (함수 타입 사용법)

Swift에서는 다른 모든 타입처럼 함수의 타입을 사용한다.  
예를들어, 함수 타입으로 상수, 변수를 정의할 수 있고 변수에 적절한 함수를 할당할 수 있다.

```swift
var mathFunction: (Int, Int) -> Int = addTwoInts
```

위 표현식의 의미는 다음과 같다.

"두개의 Int parameter를 가지고, Int를 반환하는 함수 타입을 가진 mathFunction 변수를 선언하고 addTwoInts라는 함수를 참조하라!"

addTwoInts 함수는 mathFunction과 같은 타입을 가지고 있기 때문에  
Swift의 type-checker에 의해 할당이 허용되었다.

위처럼 할당한 이후에는 mathFunction이라는 이름으로 다음과 같이 함수를 호출 할 수 있다.

```swift
print("Result: \(mathFunction(2, 3))")
// Prints "Result: 5"
```

동일한 타입을 가진 다른 함수를 같은 변수에 다음과 같이 할당 할 수 있다.

```swift
mathFunction = multiplyTwoInts
print("Result: \(mathFunction(2, 3))")
// Prints "Result: 6"
```

다른 타입과 마찬가지로 함수를 상수 또는 변수에 할당 할때  
 함수 타입을 선언하지 않아도 Swift가 함수의 타입을 추론하여 함수 할당 여부를 결정해 할당한다.

```swift
let anotherMathFunction = addTwoInts
// anotherMathFunction is inferred to be of type (Int, Int) -> Int
```

### Function Types as Parameter Types(파라미터 타입으로써의 함수 타입)

parameter에 `(Int, Int) -> Int` 와 같은 함수 type을 사용할 수 있다.

```swift
func printMathResult(_ mathFunction: (Int, Int) -> Int, _ a: Int, _ b: Int) {
    print("Result: \(mathFunction(a, b))")
}
printMathResult(addTwoInts, 3, 5)
// Prints "Result: 8"
```

다음과 같이 parameter에 함수 type을  사용함으로써  
함수를 호출할때 Argument로써 함수를 전달할 수 있다.

### Function Types as Return Types(반환 타입으로써의 함수 타입)

함수의 반환타입으로 함수 타입을 사용할 수 있다.

이는 함수에서 함수를 반환 할 수 있음을 의미한다.



다음 두개의 함수는 입력한 step에 하나를 더하거나 빼는 함수이다.  
(두 함수 모두 `(Int) -> Int`타입이다.)

```swift
func stepForward(_ input: Int) -> Int {
    return input + 1
}
func stepBackward(_ input: Int) -> Int {
    return input - 1
}
```

다음 함수는 삼항 연산자를 이용하여 True, False를 Argument로 전달받아,  
위에서 선언한 적절한 함수를 반환한다.

```swift
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    return backward ? stepBackward : stepForward
}
```

이제  `chooseStepFunction(backword:)`함수를 사용한 예를 보자

```swift
var currentValue = 3
let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)
// moveNearerToZero now refers to the stepBackward() function
```

 `currentValue`가 0보다 크기 때문에 Argument로 true를 전달해  
`moveNearerToZero` 상수에는`chooseStepFunction(backword:)` 에서 반환된  `stepBackward(_:)` 함수에 대한 참조값이 할당 된다.

```swift
print("Counting to zero:")
// Counting to zero:
while currentValue != 0 {
    print("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
print("zero!")
// 3...
// 2...
// 1...
// zero!
```

위 처럼 코드를 작성하면 `moveNearerToZero`가 적절한 함수를 참조하여 `currentValue`가 0이 될때 까지 작동한다.

---

## Nested Functions - 중첩 함수

지금 까지 살펴보았던 함수들은  global(전역)으로 정의된 global(전역)함수이다.

함수의 body안에 함수를 정의할 수 있는데 이를 중첩 함수(Nested Function)이라고 한다.

중첩 함수는 함수의 scope에 의해서 외부에서는 접근할 수 없지만  
이를 감싸고 있는 함수  body내에서는 접근, 호출이 가능하다.

위에서 살펴보았던 `chooseStepFunction(backword:)`을 중첩함수를 이용해 다시 작성하면 다음과 같다.

```swift
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    func stepForward(input: Int) -> Int { return input + 1 }
    func stepBackward(input: Int) -> Int { return input - 1 }
    return backward ? stepBackward : stepForward
}
var currentValue = -4
let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)
// moveNearerToZero now refers to the nested stepForward() function
while currentValue != 0 {
    print("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
print("zero!")
// -4...
// -3...
// -2...
// -1...

```



---

지금까지 살펴본 바에 의하면 Swift에서는  
함수를 변수, 상수에 할당, 함수에 함수를 파라미터로 전달하는 행위가 가능했다.

이러한 행위가 가능한 이유는 Swift와같은 현대프로그래밍 언어들에서는 함수가 일급객체로써 취급되기 때문이다. 

(Swift - 일급 객체로서의 함수에 대한 자세한 내용에 대해서는 다음번 포스트에서 다루도록 하겠습니다.👨‍💻 )



> 참조 : [애플 스위프트 공식문서](https://docs.swift.org/swift-book/LanguageGuide/Functions.html)
>,
> 
><https://jusung.gitbook.io/the-swift-language-guide/language-guide/06-functions>

