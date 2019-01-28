'use strict';
//TODO 对输入的数据进行一次校验，看输入的是否合理，如果输入的数据本身就是错误的，那么不处理
//TODO 优化每个位置的可用值，根据空格位置的行、列、块的情况，可以推算出可用的数据，减少尝试次数，避免无用尝试

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sudoku = function () {
  function Sudoku() {
    _classCallCheck(this, Sudoku);

    this.sudokuArr = new Array(9);
    this.emptyList = [];
    this.emptyListCanUseNum = [];
    this.sudokuResult = [];
  }

  // 生成代填空格的可用数字组合


  _createClass(Sudoku, [{
    key: 'genCanUseNum',
    value: function genCanUseNum() {
      var _this = this;

      var _useNum = function _useNum(rowI, colI) {
        var canNotUseNum = new Set([].concat(_this.sudokuArr[rowI]).concat(_this.sudokuArr[rowI][colI]));
        canNotUseNum.delete('#');
        var canUseNum = [];
        for (var i = 1; i < 10; i++) {
          if (!canNotUseNum.has('' + i)) canUseNum.push(i);
        }
        return canUseNum;
      };

      for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
        for (var colIndex = 0; colIndex < 9; colIndex++) {
          var char = this.sudokuArr[rowIndex][colIndex];
          if (char == '#') {
            this.emptyListCanUseNum.push(_useNum(rowIndex, colIndex));
          }
        }
      }
    }

    //输入数独字符串

  }, {
    key: 'input',
    value: function input(inputStr) {
      var _this2 = this;

      var inputStrs = inputStr.split(',');
      inputStrs.forEach(function (item, index) {
        if (item.length > 0) {
          _this2.sudokuArr[index] = [];
          for (var i = 0; i < 9; i++) {
            var char = item.charAt(i);
            if (char == '#') _this2.emptyList.push([index, i]);
            _this2.sudokuArr[index].push(char);
          }
        }
      });
    }

    //输出数独字符串

  }, {
    key: 'output',
    value: function output() {
      var result = [];
      this.sudokuArr.forEach(function (item) {
        item.forEach(function (i_item) {
          result.push(i_item);
        });
      });
      return result.join('');
    }

    //打印数独，便于调试

  }, {
    key: 'print',
    value: function print(data) {
      console.log('#######################');
      data.forEach(function (item) {
        console.log(item);
        console.log('\n');
      });
      console.log('#######################');
    }

    //获取当前空格所在行、列、块的数据

  }, {
    key: 'getData',
    value: function getData(emptyItem) {
      //行数据
      var rowP = emptyItem[0];
      var columnP = emptyItem[1];
      var row = [].concat(this.sudokuArr[rowP]);
      //列数据
      var column = [];
      for (var i = 0; i < 9; i++) {
        column.push(this.sudokuArr[i][columnP]);
      }
      //块数据
      var block = [];
      var rowStartIndex = parseInt((rowP + 0) / 3) * 3;
      var columnStartIndex = parseInt((columnP + 0) / 3) * 3;
      for (var _row = rowStartIndex; _row < rowStartIndex + 3; _row++) {
        for (var cloumn = columnStartIndex; cloumn < columnStartIndex + 3; cloumn++) {
          block.push(this.sudokuArr[_row][cloumn]);
        }
      }
      return [row, column, block];
    }
  }, {
    key: 'check',
    value: function check(emptyItem, value) {
      this.sudokuArr[emptyItem[0]][emptyItem[1]] = '#';
      var result = true;
      var datas = this.getData(emptyItem);
      datas.forEach(function (item) {
        item.forEach(function (itemData) {
          if (itemData == value) {
            result = false;
          }
        });
      });
      if (result) {
        this.sudokuArr[emptyItem[0]][emptyItem[1]] = value;
      }
      return result;
    }
  }, {
    key: 'cleanError',
    value: function cleanError(from) {
      var length = this.emptyList.length;
      for (var i = from; i < length; i++) {
        var emptyItem = this.emptyList[i];
        this.sudokuArr[emptyItem[0]][emptyItem[1]] = '#';
      }
    }
  }, {
    key: 'findEmpty',
    value: function findEmpty(count) {
      if (this.emptyList.length == count) {
        this.sudokuResult.push(this.output());
        return;
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.emptyListCanUseNum[count][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            //清空后面已尝试的填写
            this.cleanError(count);
            if (this.check(this.emptyList[count], '' + item)) {
              this.findEmpty(count + 1);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }]);

  return Sudoku;
}();

//入门
// input('#625###4#,59##8#7#1,##3#4##5#,#####85#6,426935#17,87#621###,35#16#284,#48392175,2#7###3#9')
// input('#6#5###4#,#9##8#7#1,##3#4##5#,#####85#6,426935#17,87#621###,35#16#2#4,#4#3#2#75,2#######9')
//初级
// input('##3###25#,8####1###,########7,####7####,61#####4#,4########,###6#4###,##2######,##7#5###3')
//高级
// input('#614#7#5#,2######7#,##9#6####,###67##14,59#13####,#########,###7##2##,#5##2874#,#4######8')
//中级
// input('##1#82###,######3#6,#######7#,####2#18#,#6#######,5########,##8###7##,###3#6##4,#####5###')
// input('#172498##,######2#7,#####59##,##5##6###,86##3##91,###9##3##,##87#####,7#6######,##962375#')
// console.log(emptyList.length)
// print()
// findEmpty(0)
// ************
// 测试代码
// function strChunk (str, size) {
//   const strArr = str.split('')
//   const result = []
//   for (let i = 0; i < size; i++) {
//     result.push(strArr.splice(0, size))
//   }
//   return result
// }
//
// let sudoku = new Sudoku()
// sudoku.input('#625###4#,59##8#7#1,##3#4##5#,#####85#6,426935#17,87#621###,35#16#284,#48392175,2#7###3#9')
// sudoku.genCanUseNum()
// sudoku.print(sudoku.sudokuArr)
// sudoku.findEmpty(0)
// sudoku.print(strChunk(sudoku.sudokuResult[0], 9))