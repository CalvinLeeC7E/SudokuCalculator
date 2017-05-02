# SudokuCalculator
![VERSION](https://img.shields.io/badge/VERSION-1.0.1-brightgreen.svg)
![LANGUAGE](https://img.shields.io/badge/LANGUAGE-JavaScript-orange.svg)
[![weibo](https://img.shields.io/badge/weibo-DeveloperLee-blue.svg)](http://weibo.com/DeveloperLee)

JavaScript实现数独计算器

采用字符串的形式输入数独到计算器，#代表空位，行与行之间采用英文逗号分隔

格式示例：
```javascript
  '#625###4#,59##8#7#1,##3#4##5#,#####85#6,426935#17,87#621###,35#16#284,#48392175,2#7###3#9'
```

可计算有20个以上线索的数独，但性能需要优化，有些特殊情况需要计算很久或者是不可等待的情况

更新日志
---------
V1.0.1 支持Web交互

V1.0.0 实现数独基本算法

注意
---------
代码采用ES6规范编写，运行需Babel转换下，或执行

```node
$npm run build
```

当前运行情况
--------
当前代码运行在Node环境，百度搜索到的数独（入门、初级、中级、高级）测试下来大部分时间可等待，存在不可等待情况。

目标
--------
使用浏览器完成计算，可能由于浏览器内核导致性能差异，或不可等待

TODO（V1.0.2）
---------
1. 完成性能优化（优化解的尝试空间）
2. 对输入的数据进行初步校验，避免输入数据就是错误的

欢迎关注微博
----------
[点击关注]((http://weibo.com/DeveloperLee))