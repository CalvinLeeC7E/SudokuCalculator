'use strict'
//TODO 对输入的数据进行一次校验，看输入的是否合理，如果输入的数据本身就是错误的，那么不处理
//TODO 优化每个位置的可用值，根据空格位置的行、列、块的情况，可以推算出可用的数据，减少尝试次数，避免无用尝试

class Sudoku {
  constructor () {
    this.sudokuArr = new Array(9)
    this.emptyList = []
    this.emptyListCanUseNum = []
    this.sudokuResult = []
  }

  // 生成代填空格的可用数字组合
  genCanUseNum () {
    const _useNum = (rowI, colI) => {
      const canNotUseNum = new Set([].concat(this.sudokuArr[rowI]).concat(this.sudokuArr[rowI][colI]))
      canNotUseNum.delete('#')
      const canUseNum = []
      for (let i = 1; i < 10; i++) {
        if (!canNotUseNum.has('' + i)) canUseNum.push(i)
      }
      return canUseNum
    }

    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        const char = this.sudokuArr[rowIndex][colIndex]
        if (char == '#') {
          this.emptyListCanUseNum.push(_useNum(rowIndex, colIndex))
        }
      }
    }
  }

  //输入数独字符串
  input (inputStr) {
    let inputStrs = inputStr.split(',')
    inputStrs.forEach((item, index) => {
      if (item.length > 0) {
        this.sudokuArr[index] = []
        for (let i = 0; i < 9; i++) {
          let char = item.charAt(i)
          if (char == '#') this.emptyList.push([index, i])
          this.sudokuArr[index].push(char)
        }
      }
    })
  }

  //输出数独字符串
  output () {
    let result = []
    this.sudokuArr.forEach(item => {
      item.forEach(i_item => {
        result.push(i_item)
      })
    })
    return result.join('')
  }

  //打印数独，便于调试
  print (data) {
    console.log('#######################')
    data.forEach(item => {
      console.log(item)
      console.log('\n')
    })
    console.log('#######################')
  }

  //获取当前空格所在行、列、块的数据
  getData (emptyItem) {
    //行数据
    let rowP = emptyItem[0]
    let columnP = emptyItem[1]
    let row = [].concat(this.sudokuArr[rowP])
    //列数据
    let column = []
    for (let i = 0; i < 9; i++) {
      column.push(this.sudokuArr[i][columnP])
    }
    //块数据
    let block = []
    let rowStartIndex = parseInt((rowP + 0) / 3) * 3
    let columnStartIndex = parseInt((columnP + 0) / 3) * 3
    for (let row = rowStartIndex; row < rowStartIndex + 3; row++) {
      for (let cloumn = columnStartIndex; cloumn < columnStartIndex + 3; cloumn++) {
        block.push(this.sudokuArr[row][cloumn])
      }
    }
    return [row, column, block]
  }

  check (emptyItem, value) {
    this.sudokuArr[emptyItem[0]][emptyItem[1]] = '#'
    let result = true
    let datas = this.getData(emptyItem)
    datas.forEach(item => {
      item.forEach(itemData => {
        if (itemData == value) {
          result = false
        }
      })
    })
    if (result) {
      this.sudokuArr[emptyItem[0]][emptyItem[1]] = value
    }
    return result
  }

  cleanError (from) {
    let length = this.emptyList.length
    for (let i = from; i < length; i++) {
      let emptyItem = this.emptyList[i]
      this.sudokuArr[emptyItem[0]][emptyItem[1]] = '#'
    }
  }

  findEmpty (count) {
    if (this.emptyList.length == count) {
      this.sudokuResult.push(this.output())
      return
    } else {
      for (let item of this.emptyListCanUseNum[count]) {
        //清空后面已尝试的填写
        this.cleanError(count)
        if (this.check(this.emptyList[count], '' + item)) {
          this.findEmpty(count + 1)
        }
      }
    }
  }
}

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
