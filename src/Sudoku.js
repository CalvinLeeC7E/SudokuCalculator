'use strict'
//TODO 对输入的数据进行一次校验，看输入的是否合理，如果输入的数据本身就是错误的，那么不处理
//TODO 优化每个位置的可用值，根据空格位置的行、列、块的情况，可以推算出可用的数据，减少尝试次数，避免无用尝试


let sudokuArr = new Array(9)
let emptyList = []
let finalResults = []
function input (inputStr) {
  let inputStrs = inputStr.split(',')
  inputStrs.forEach((item, index) => {
    sudokuArr[index] = []
    for (let i = 0; i < 9; i++) {
      let char = item.charAt(i)
      if (char == '#') emptyList.push([index, i])
      sudokuArr[index].push(char)
    }
  })
}

function print () {
  console.log('#######################')
  sudokuArr.forEach(item => {
    console.log(item)
    console.log('\n')
  })
  console.log('#######################')
}

function getData (emptyItem) {
  //行数据
  let row = [].concat(sudokuArr[emptyItem[0]])
  //列数据
  let column = []
  for (let i = 0; i < 9; i++) {
    column.push(sudokuArr[i][emptyItem[1]])
  }
  //块数据
  let block = []
  let rowStartIndex = parseInt((emptyItem[0] + 0) / 3) * 3
  let columnStartIndex = parseInt((emptyItem[1] + 0) / 3) * 3
  for (let row = rowStartIndex; row < rowStartIndex + 3; row++) {
    for (let cloumn = columnStartIndex; cloumn < columnStartIndex + 3; cloumn++) {
      block.push(sudokuArr[row][cloumn])
    }
  }
  return [row, column, block]
}

//[ '#', '6', '2', '5', '#', '#', '#', '4', '#' ]
//[ 0, 0 ]
function check (emptyItem, value) {
  sudokuArr[emptyItem[0]][emptyItem[1]] = '#'
  let result = true
  let datas = getData(emptyItem)
  datas.forEach(item => {
    item.forEach(itemData => {
      if (itemData == value) {
        result = false
      }
    })
  })
  if (result) {
    sudokuArr[emptyItem[0]][emptyItem[1]] = value
  }
  return result
}

function cleanError (from) {
  let length = emptyList.length
  for (let i = from; i < length; i++) {
    let emptyItem = emptyList[i]
    sudokuArr[emptyItem[0]][emptyItem[1]] = '#'
  }
}

function findEmpty (count) {
  if (emptyList.length == count) {
    print()
    return
  } else {
    for (let i = 1; i <= 9; i++) {
      //清空后面尝试的填写
      cleanError(count)
      if (check(emptyList[count], '' + i)) {
        findEmpty(count + 1)
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
print()
findEmpty(0)
console.log(emptyList.length)
