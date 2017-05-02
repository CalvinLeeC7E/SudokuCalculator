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
    this.sudokuResult = [];
  }

  //输入数独字符串


  _createClass(Sudoku, [{
    key: 'input',
    value: function input(inputStr) {
      var _this = this;

      var inputStrs = inputStr.split(',');
      inputStrs.forEach(function (item, index) {
        if (item.length > 0) {
          _this.sudokuArr[index] = [];
          for (var i = 0; i < 9; i++) {
            var char = item.charAt(i);
            if (char == '#') _this.emptyList.push([index, i]);
            _this.sudokuArr[index].push(char);
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
    value: function print() {
      console.log('#######################');
      this.sudokuArr.forEach(function (item) {
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
        for (var i = 1; i <= 9; i++) {
          //清空后面已尝试的填写
          this.cleanError(count);
          if (this.check(this.emptyList[count], '' + i)) {
            this.findEmpty(count + 1);
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