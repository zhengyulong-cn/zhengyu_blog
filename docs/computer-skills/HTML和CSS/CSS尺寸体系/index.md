<script setup>
import DisplayElementPanel from './DisplayElementPanel.vue'
import WidthDimensionPanel from './WidthDimensionPanel.vue'
</script>

# CSS 尺寸体系

## 块级元素和行内元素

### 区别

|            | block                                  | inline                                                                                           | inline-block                                    |
| ---------- | -------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| 标签       | div、h1、p                             | span、a、i                                                                             | button、input、img                              |
| 独占一行   | 每个块级元素独占一行                   | 不独占一行                                                                                       | 不独占一行                                      |
| 尺寸属性   | `width`、`height`、`line-height`、`margin`、`padding` 都生效 | `width`、`height` 无效；`margin`、`padding` 水平方向有效，垂直方向无效；`line-height` 有效 | `width`、`height`、`line-height`、`margin`、`padding` 都生效 |
| 宽度       | 默认为 `auto`，填充满父容器宽度，可设置 `width`。 | `width` 无效，由内容决定。                                                                       | 默认由内容收缩包裹，但可设置 `width`。           |
| 高度 | 由内容撑开，但可以设置 `height`。 | 由内容撑开，`height` 无效。 | 由内容撑开，但可以设置 `height`。 |
| 排列 | 多个块级元素上下排列 | 水平排列，直到行末换行。多个 `span` 换行编写有间隙。 | 水平排列，放不下就折行。 |

### 元素排列

<DisplayElementPanel />

1.多个 block

垂直排列：

- 每个 `block` 独占一行，和宽度无关。
- 上下相邻的 `block` 会发生 `margin` 合并：
  - 两个正或两个负 `margin` 取绝对值的最大值
  - 一正一负则相加

折行：块级元素不会折行，因为每个块本身就是一行

2.多个 inline

水平排列：从左往右依次排列。

折行：一行放不下时，整个 inline 元素折到下一行。

高度：所有 inline 元素共同撑起行盒，行盒高度由最高元素决定。没有 `margin` 重叠。

3.多个 inline-block

水平排列：从左往右依次排列。对外表现像 inline，对内表现像 block。

折行：一行放不下时，整个 inline-block 元素折到下一行。

### 一些问题

#### 问题：inline 及 inline-block 的换行符间隙

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
<style>
    .container {
        /* 去除间隙 */
        font-size: 0;
    }
    .item {
        display: inline-block;
        width: 100px;
        height: 100px;
        background: lightcoral;
        font-size: 16px;
    }
</style>
```

#### 问题：多个 inline-block 水平居中

`inline-block` 有行内元素特性，所以可以使用 `text-align: center;` 进行水平居中。

```css
.parent { text-align: center; }
.child { display: inline-block; }
```

### BFC

#### 创建 BFC

BFC：块级格式化上下文。是一共独立的渲染区域，使其内部布局不受外部元素印象，用于解决清除浮动、边距重叠等常见布局问题。

创建 BFC 的方法：

- `float` 为 `left` 或 `right`
- `position` 为 `absolute` 或 `fixed`
- `display` 为 `inline-block`、`flow-root`。内部生成一个 BFC。
  - `display: flow-root`：最干净无副作用的 BFC。

- `overflow` 不为 `visible`
- `flex` 或 `grid` 布局

#### BFC 清除浮动

问题：子元素浮动后，父容器高度为 0，背景不显示。

解决方案：让父容器形成 BFC。

```html
<div class="parent">
  <div class="float">浮动</div>
</div>
<style>
.parent {
    background: yellow;
    /* 触发BFC */
    overflow: hidden;
}
.float {
    float: left;
    width: 100px;
    height: 100px;
    background: blue;
}
</style>
```

#### BFC 防止垂直方向 margin 重合

问题：两个相邻块级上下 margin 会取最大值，而不是相加。

```html
<div class="box">A</div>
<div class="box">B</div>
<style>
.box { margin: 20px; }
</style>
```

解决方案：将一个元素包在 BFC 中。

```html
<div class="box">A</div>
<div class="bfc">
  <div class="box">B</div>
</div>
<style>
.box { margin: 20px; }
.bfc { overflow: hidden; }
</style>
```

## 尺寸计算模式

1.内部尺寸

场景：

- `display: inline` / `inline-block`（默认宽度为 `shrink-to-fit`）
- `float: left/right`
- `position: absolute` / `fixed`
- `width: max-content` / `min-content` / `fit-content` 基于内容计算宽度尺寸

特点：

- 元素可能溢出父容器。设置 `white-space: nowrap`，则会溢出父容器。

2.外部尺寸

场景：

- `width: auto` 默认填满父容器内容宽度
- `width: 50%` 相对于父容器内容宽度
- `width: stretch` 在父容器内充分利用可用空间

特点：

- 尺寸由外部决定，内容可能被压缩或溢出
- 元素不会主动溢出父容器

3.混合情况，外部容器和内容内容共同影响尺寸。

## width 属性

<WidthDimensionPanel />

| 属性               | 行为说明                                                     |
| ------------------ | ------------------------------------------------------------ |
| **auto**           | 块级元素默认，填满父容器可用空间                             |
| **50%**            | 占父容器宽度的百分比                               |
| **stretch** | 撑满容器可用空间，比 `width: 100%` 更智能处理 margin/padding |
| **max-content**    | 连续特别长的英文数字，连续特别长的英文数字，或者内联元素设置了 `white-space:nowrap;`，则会超出容器。 |
| **min-content**    | 收缩到最窄不可断元素宽度，中文逐字断行                       |
| **fit-content**    | 收缩到内容合适宽度，等价于 `min(max-content, stretch)` |
| **inherit**        | 继承父元素显式设置的 width 值                                |

