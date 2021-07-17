---
title: Swift Insertion Sort(삽입정렬)
date: 2021-07-08 16:07:77
category: Algorithms
thumbnail: { thumbnailSrc }
draft: false
---

안녕하세요 Noah입니다 :)

이번 시간에도 이어서 **Sorting 알고리즘 톺아보기 1부**를 진행하도록 하겠습니다 😄

이번 시간에 살펴볼 Sorting 알고리즘은 **Insertion Sort**입니다.

## Insertion Sort

먼저 **Insertion Sort**가 데이터를 **정렬하는 모습**부터 먼저 살펴보겠습니다.  
<br>

<p align="center">
<img src="assets/2021-07-08/1.gif" width="300"/>
<center>Insertion Sort</center>
</p>

아직 코드와 정렬 순서를 살펴보지 않았기에 자세히는 알지는 못하지만,  
점점 **정렬되는 사이즈가 커짐**을 알 수 있습니다.

위키백과에는 **Insertion Sort**가 다음과 같이 **정의**되어있습니다.

> "**삽입 정렬**(揷入整列, insertion sort)은 자료 배열의 모든 요소를  
> 앞에서부터 차례대로 이미 정렬된 배열 부분과 비교하여, 자신의 위치를 찾아 삽입함으로써  
> 정렬을 완성하는 [알고리즘](https://ko.wikipedia.org/wiki/알고리즘)이다."

**Insertion Sort**는 이미 **정렬이 완료된 배열을 운영**하며 해당 **배열의 크기**를  
**한 칸씩 늘려**가며 정렬을 진행합니다.

다시 말해 **Insertion Sort**는 **정렬이 완료된 배열**에 **element를 삽입**하여  
삽입된 element와 **배열에 있는 element**와 **크기를 비교**하여 **자신의 자리**를 **찾는** 알고리즘입니다.

또한 **마지막 element가 삽입**될 때까지 어떤 element가 삽입될지 알 수 없기에  
element의 위치는 **마지막 element까지** **정렬된 이후**에 **최종 위치**가 **확정**됩니다.

**Insertion Sort**를 **Swift**로 구현해보도록 하겠습니다.

---

```swift
func insertionSort(_ array: inout [Int]) {
    for index in 1..<array.count {
        var currentIndex = index
        while currentIndex > 0 && array[currentIndex] < array[currentIndex - 1] {
            array.swapAt(currentIndex - 1, currentIndex)
            currentIndex -= 1
        }
    }
}

var array = [6, 5, 3, 1, 8, 7, 2, 4]
insertionSort(&array)
// [1, 2, 3, 4, 5, 6, 7, 8]
```

위의 `array`가 정렬되는 모습은 다음과 같습니다.

<p align="center">
<img src="assets/2021-07-08/2.gif" width="300"/>
<center>Simulation</center>
</p>

**Outer loop**를 **순회**할 때마다 **정렬된 array의 size**가 **1씩 커짐**을 알 수 있습니다.

#### Insertion Sort 정렬 순서

1. **Outer Loop**를 통해 **현재 index**를 **부여**받는다.
2. **Inner Loop**의 **조건** **현재 index가 0이 아니고**,  
   **현재 index의 element**와 **현재 index 왼쪽**에 있는 **element**와 **대소 비교 후**  
   왼쪽에 위치한 element가 **더 크다면** 위치를 **swap**하고 **현재 index**를 **index - 1**로 **업데이트**하여  
   **배열의 왼쪽**으로 **이동**한다.
3. 만약 **2번 조건을 충족**하지 **않으면** 이미 **정렬된 상태**라 **판정**하고 Inner Loop를 순회하지 않는다.

#### 순회 범위

**Outer loop**의 순회 범위 : 1 to 배열 길이

**Inner loop**의 순회 범위 : 현재 index > 0 && 배열[현재 index] < array[현재 index - 1]이라면  
**최선의 경우** : 정렬된 array의 마지막 element보다 삽입되는 element가 더 크다면  
정렬이 완료되었다 판정하여 종료.

**최악의 경우** : 정렬된 array의 모든 element보다 삽입되는 element가 더 작다면  
정렬된 배열의 index 0번까지 가며 Swap 진행

다음으로 **Insertion Sort**의 **시간복잡도**를 살펴보도록 하겠습니다.

- Best : O(n)
- Worst : O(n^2)
- Average : O(n^2)

**최선의 경우** O(n), **최악, 평균**은 O(n^2)의 **시간복잡도**가 나옴을 알 수 있습니다.

#### Swap을 하지 않고 구현하는 방법

---

```swift
func insertionSort(_ array: [Int]) -> [Int] {
    var sortedArray = array
    for index in 1..<sortedArray.count {
        var currentIndex = index
        let temp = sortedArray[currentIndex]
        while currentIndex > 0 && temp < sortedArray[currentIndex - 1] {
            sortedArray[currentIndex] = sortedArray[currentIndex - 1]
            currentIndex -= 1
        }
        sortedArray[currentIndex] = temp
    }
    return sortedArray
}

var array = [6, 5, 3, 1, 8, 7, 2, 4]
array = insertionSort(array)
// [1, 2, 3, 4, 5, 6, 7, 8]

```

**Swap**을 **하지 않는다면** 다음과 같이 구현할 수 있습니다.

1. **Outer Loop**를 통해 **현재 index**를 **부여**받는다.

2. **temp**라는 **임시 변수**에 **현재 index**의 **element**를 임시 변수에 **저장**한다.

3. **Inner Loop**의 **조건을 만족**한다면 **현재 index**의 **element**를 **왼쪽에 있는** **element**로 **덮어씌운**다.

   **만족하지 않는다면 5번**으로 간다.

4. **현재 index**를 index - 1로 **업데이트**하여 배열의 왼쪽으로 이동한다.

5. **Inner Loop**의 조건을 만족할 때까지 **3, 4번 반복**

6. **Inner Loop**를 빠져나온다면 **temp에 임시로 저장**해두었던 변수를 **현재 index에 저장**합니다.

<br>

여기까지 **Sorting 알고리즘 톺아보기 1부 Insertion Sort**였습니다 😄

혹시 제가 잘못 알고 있는 부분이 있거나, 오타 혹은 궁금한 점 있으시면 댓글로 알려주시면 감사하겠습니다!!😎  
<br>

> 참고
>
> - [Raywenderlich Swift Algorithm Club](https://github.com/raywenderlich/swift-algorithm-club/tree/master/Insertion%20Sort)
> - [위키 백과 삽입 정렬](https://ko.wikipedia.org/wiki/%EC%82%BD%EC%9E%85_%EC%A0%95%EB%A0%AC)

> 이미지 출처
>
> - [삽입 정렬 애니메이션](https://commons.wikimedia.org/wiki/File:Insertion_sort_animation.gif)
> - [삽입 정렬 시뮬레이션](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif)
