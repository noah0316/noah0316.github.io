---
title: Bubble Sort(거품정렬)
date: 2021-07-07 15:07:76
category: Algorithms
thumbnail: { thumbnailSrc }
draft: false
---

안녕하세요 Noah입니다 :)

지난 시간에 이어 **Sorting 알고리즘 톺아보기 1부**를 진행하도록 하겠습니다 😄

이번 시간에 살펴볼 **내용은 Bubble Sort(거품 정렬)**입니다.

**Bubble Sort**는 이해하기 쉬워 교육용으로 가장 많이 쓰이는 정렬 알고리즘입니다.  
그만큼 **직관적이며, 이해하기 쉽습니다.**

## Bubble Sort

먼저 Bubble Sort가 데이터를 정렬하는 모습부터 먼저 살펴보겠습니다.

<p align="center">
<img src="assets/2021-07-07/1.gif" width="300"/>
<center>Bubble Sort</center>
</p>

마치 탄산음료를 마실 때 **거품이 올라오는 모습**과 비슷하네요 :)

예시를 보면 **가장 왼쪽**부터 **큰 값의 자리**가 **확정**되며 **정렬**이 되는 모습을 확인할 수 있습니다.

**Bubble Sort**는 현재 element를 인접 인덱스(현재 인덱스 + 1)와 대소를 비교하며  
**큰 숫자**를 **배열의 뒤쪽**으로 swap 하며 정렬을 진행합니다.

따라서 **Outer loop**를 **한번 순회**할 때마다 **가장 큰 숫자**가 배열의 맨 뒤 쪽으로 가며  
element 하나의 **자리가 확정**됩니다.

**Bubble Sort**를 지난 시간과 마찬가지로 **swapAt()메소드**를 이용해 Swift로 구현해보도록 하겠습니다.

```swift
import Foundation

func bubbleSort(_ array: inout [Int]) {
    for i in 0..<array.count {
        for j in 0..<array.count - (i + 1) {
            if(array[j] > array[j + 1]) {
                array.swapAt(j, j + 1)
            }
        }
    }
}

var array = [5, 3, 1, 6, 7, 2, 4, 8]
bubbleSort(&array)
// [1, 2, 3, 4, 5, 6, 7, 8]
```

위의 `array`가 정렬되는 모습은 다음과 같습니다.

<p align="center">
<img src="assets/2021-07-07/2.gif"/>
<center>Simulation</center>
</p>

**Bubble Sort 정렬 순서**

1. **현재 element**와 **다음 element**(현재 index + 1) 비교 후  
   **현재 element** 숫자가 **더 크다면** **다음 element와 swap** 한다.
2. **Outer loop**를 한번 순회할 때마다 **element 하나의 최종위치가 확정**된다.
3. 1, 2를 **Outer loop**의 **배열 길이 -1**까지 **반복**한다.

**순회 범위**

**Outer loop의 순회 범위** : 0 to 배열 길이 - 1

**Inner loop의 순회 범위** : 0 to 확정된 자리 제외 + 1

다음으로 **Bubble Sort**의 **시간복잡도**를 살펴보도록 하겠습니다.

- Best : O(n)

- Worst : O(n^2)

- Average : O(n^2)

**Best의 경우** 이미 정렬되어있는 데이터가 주어졌을 때는 **Swap이 일어나지 않기 때문에**  
**O(n)**의 **시간복잡도**가 나오게 됩니다.

여기까지 **Sorting 알고리즘 톺아보기 1부** **Bubble Sort**였습니다 😄

혹시 제가 잘못 알고 있는 부분이 있거나, 오타 혹은 궁금한 점 있으시면 댓글로 알려주시면 감사하겠습니다!!😎

> 참고
>
> - [위키 백과 거품 정렬](https://en.wikipedia.org/wiki/Bubble_sort)

> 이미지 출처
>
> - [거품 정렬 애니메이션](https://en.wikipedia.org/wiki/File:Bubble_sort_animation.gif)
> - [거품 정렬 시뮬레이션](https://en.wikipedia.org/wiki/File:Bubble-sort-example-300px.gif)
