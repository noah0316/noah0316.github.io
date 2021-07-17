---
title: Swift Selection Sort(선택정렬)
date: 2021-07-05 18:07:74
category: Algorithms
thumbnail: { thumbnailSrc }
draft: false
---

안녕하세요 Noah입니다 :)  
본격적으로 장마가 시작되나 봅니다~ 다들 우산 챙겨 다니세요!!☂️

오늘은 **정렬 알고리즘**에 대해 알아보려 합니다.

**Computer Science**에서의 정렬 알고리즘은 item을 번호순이나 사전 순으로 일정한 순서대로  
열거하는 알고리즘입니다.

**Swift**에서는 간단하게 **sort()** 메소드 혹은 **sorted()** 메소드를 이용해 데이터를 정렬하곤 했었습니다.  
이 메소드들도 내부적으로는 정렬 알고리즘을 이용해 데이터를 정렬합니다.

**어떠한 정렬 알고리즘**을 쓰느냐에 따라 데이터를 처리하는 데 드는 시간이 좌우됩니다.
따라서 **주어진 데이터의 특성**에 맞는 정렬 알고리즘을 사용하는 게 중요해 보입니다.

여러 정렬 알고리즘이 있지만, **Sorting 알고리즘 톺아보기 1부**에서는  
선택 정렬, 삽입 정렬, 거품 정렬에 대해 알아보고,

**Sorting 알고리즘 톺아보기 2부**에서는 조금 더 **난이도가 있는 Sorting 알고리즘**에 대해 살펴보겠습니다😄

이번 포스트는 가장 작은 숫자부터 높은 숫자까지 정렬되는 **오름차순**으로 설명을 진행하도록 하겠습니다.

## Selection Sort

먼저 Selection Sort가 데이터를 정렬하는 모습부터 먼저 살펴보겠습니다.

<p align="center">
<img src="assets/2021-07-05/1.gif" width="300"/>
<center>Selection Sort</center>
</p>

애니메이션만 봐도 뭔가 순차적으로 정렬되는 듯한 모습이 보입니다.

**Selection Sort**는 데이터를 하나하나 보면서 가장 작은 숫자를 찾고,  
만약 **가장 작은 숫자**를 찾았다면 해당 숫자를 아직 위치가 확정되지 않은 아이템 중 가장 앞에 위치한  
아이템과 바꿉니다.(Swap)

#### 선택정렬 순서

1. 주어진 데이터 중 최소 값을 찾는다.
2. 그 값을 맨 앞에 위치한 값과 바꾼다.
3. 맨 처음 위치를 뺀 나머지 데이터를 같은 방법으로 교체한다.

따라서 가장 작은 숫자를 찾기 때문에 **가장 작은 숫자**부터 **차례대로** **최종 위치**가 **확정**됩니다.

**Swift**에서 배열의 특정 위치 값을 swap 할 때 사용하는 **swapAt()** 메소드를 이용해  
**Selection sort**를 구현해보도록 하겠습니다.

```swift
import Foundation

func selectionSort(_ array: inout [Int]) {
    var min: Int = 0

    for i in 0..<array.count {
        min = i
        for j in i + 1..<array.count {
            if(array[j] < array[min]) {
                min = j
            }
        }
        array.swapAt(min, i)
    }
}

var array = [8, 5, 2, 6, 9, 3, 1, 4, 0, 7]
selectionSort(&array)
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

위의 `array`가 정렬되는 모습은 다음과 같습니다.  
inner loop를 순회하면서 **가장 작은 값의 인덱스**를 `min`이라는 변수가 저장하고 있다가,

반복문의 순회가 끝나면 **swapAt()메소드**를 이용해  
outer loop의 현재 index의 item과 **swap**을 진행합니다.

<br>

<p align="center">
<img src="assets/2021-07-05/2.gif" width="100" height="371"/>
<center>Simulation</center>
</p>

> 빨간색으로 표시된 부분이 현재 가장 작은 값이며,  
> 노란색으로 표시된 부분은 위치가 확정된 아이템입니다.  
> 파란색으로 표시된 부분은 현재 아이템입니다.

**Outer loop**의 첫 번째 item을 가장 작은 숫자로 가정하고 순회를 합니다.  
**Outer loop 순회 범위** : 0 to 배열 길이 - 1

Outer loop를 한번 순회할 때 마다 **Inner loop**를 한 번씩 순회합니다.  
**Inner loop 순회 범위** : outer loop의 현재 index + 1 to 배열 길이 - 1

따라서 **Selection Sort**의 **시간 복잡도**는 다음과 같습니다.

- Best : O(n^2)
- Worst : O(n^2)
- Average : O(n^2)

네, 여기까지 Sorting 알고리즘 톺아보기 1부 Selection Sort였습니다 😄

혹시 제가 잘못 알고 있는 부분이 있거나, 오타 혹은 궁금한 점 있으시면 댓글로 알려주시면 감사하겠습니다!!😎

> 참고
>
> - [위키 백과 선택 정렬](https://ko.wikipedia.org/wiki/%EC%84%A0%ED%83%9D_%EC%A0%95%EB%A0%AC)

> 이미지 출처
>
> - [선택 정렬 애니메이션](https://ko.wikipedia.org/wiki/%EC%84%A0%ED%83%9D_%EC%A0%95%EB%A0%AC)
> - [선택 정렬 시뮬레이션](https://en.wikipedia.org/wiki/Selection_sort)
