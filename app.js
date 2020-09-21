class Expense{
  constructor(year, month,day, type, description, value){
    this.year = year
    this.month = month
    this.day = day
    this.type = type
    this.description = description
    this.value = value
  }
  dataValidate(){
    for(let i in this){
      if(this[i] == undefined || this[i] == '' || this[i] == null){
        return false
      }
    }
    return true
  }
}

class Bd{

    constructor(){
      let id = localStorage.getItem('id')
      if(id === null){
        localStorage.setItem('id', 0)
      }
    }

    getNextId(){
      let NextId= localStorage.getItem('id')
      return parseInt(NextId)+1
    }

    load(d){
      let id = this.getNextId()
      localStorage.setItem(id, JSON.stringify(d))
      localStorage.setItem('id', id)
    }

    recoverAllData(){
      //expenses array
      let expenses = Array()

      let id = localStorage.getItem('id')
      //recover all expenses on Local Storage
      for(let i = 1; i <= id;i++){
        let expense = JSON.parse(localStorage.getItem(i))
        //if the id is null
        if(expense === null){
          continue // continue the for instruction :)
        }
        expenses.push(expense)
      }
      return expenses
    }
}

let bd = new Bd


function registerExpense(){
  let year = document.getElementById('year')
  let month = document.getElementById('month')
  let day = document.getElementById('day')
  let description = document.getElementById('description')
  let value = document.getElementById('value')
  let type = document.getElementById('type')

  let expense = new Expense(
    year.value,
    month.value,
    day.value,
    type.value,
    description.value,
    value.value
  )

  if(expense.dataValidate()){
    bd.load(expense)
    document.getElementById('modal_title').innerHTML = 'Data was successfully inserted'
    document.getElementById('modal_title_div').className = 'modal-header text-success'
    document.getElementById('modal_content').innerHTML = 'Expense was successfully inserted'
    document.getElementById('modal_btn').className = 'btn btn-success'
    $('#modalRegisterExpense').modal('show')
  }else{
    document.getElementById('modal_title').innerHTML = 'Error to load'
    document.getElementById('modal_title_div').className = 'modal-header text-danger'
    document.getElementById('modal_content').innerHTML = 'There are fields that have not been filled'
    document.getElementById('modal_btn').className = 'btn btn-danger'
    $('#modalRegisterExpense').modal('show')
  }
}

function loadExpenseList(){
  let expenses =  Array()
  expenses = bd.recoverAllData() //receive the Array with all expenses

  var expensesList = document.getElementById('expensesList')

  expenses.forEach(function(d){
    //creating the line (tr)
    let line = expensesList.insertRow()
    //creating the colums (td)
    line.insertCell(0).innerHTML = `${d.day}/${d.month}/${d.year}`

    switch (d.tipo) {
      case '1': d.tipo = "Food"
        break
      case '2': d.tipo = 'Education'
        break
      case '3': d.tipo = 'Recreation'
        break
      case '4': d.tipo = 'Health'
        break
      case '5': d.tipo = 'Transport'
        break
    }
    console.log(d.type)
    line.insertCell(1).innerHTML = d.type
    line.insertCell(2).innerHTML = d.description
    line.insertCell(3).innerHTML = d.value
  })


}
