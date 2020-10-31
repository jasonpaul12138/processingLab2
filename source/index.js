const math = require('mathjs')
const { kldivergence, re } = require('mathjs')

let calculator = {
    content: '',
    display_content: '',
    clickNumber: function (digit) {
      var text = document.querySelector("textarea")
      this.content += digit
      text.innerHTML = this.content
    },
    operation: function (opt) {
        // if (opt == "×") {
        //     var text = document.querySelector("textarea")
        //     text.innerHTML += "×"
        //     this.content += "*"
        //     return
        // }
      var text = document.querySelector("textarea")
      this.content += opt
      text.innerHTML = this.content
    },
    equal: function () {
      var text = document.querySelector("textarea")
      if (this.content == "") {
          return
      }
      try {
        var result = math.evaluate(this.content)
        this.content = result.toString(10)
        text.innerHTML = this.content
      } catch (e) {
        console.log(e)
        this.content = ''
        text.innerHTML = 'Illegal Input'
      }
    },
    clear: function () {
      var text = document.querySelector("textarea")
      text.innerHTML = ''
      this.content = ''
    },
    plus_minus_sign: function () {
        var text = document.querySelector("textarea")
        this.content = "-" + this.content
        text.innerHTML = this.content
    },
    backspace: function () {
        var text = document.querySelector("textarea")
        // console.log(this.content)
        // console.log(this.content.type)
        if (this.content == "Infinity") {
            this.content = ""
            text.innerHTML = this.content
            return
        }
        this.content = this.content.substring(0, this.content.length - 1)
        text.innerHTML = this.content
    }
  }
  
//   var btn1 = document.getElementById("number_1");
//   btn1.addEventListener("click", () => {calculator.clickNumber("1")})

// var btns = document.getElementsByClassName("wrapper");
// for (let btn of btns) {
//     console.log(btn)
// }
document.querySelectorAll(".number.button").forEach(
    item => item.addEventListener(
        "click", () => {
            calculator.clickNumber(item.innerHTML)
        }
    )
)

document.getElementById("number_0").addEventListener(
    "click", () => {
        calculator.clickNumber("0")
    }
)

document.querySelectorAll(".calculation.operator").forEach(
    item => item.addEventListener(
        "click", () => {
            calculator.operation(item.innerHTML)
        }
    )
)

document.getElementById("equal").addEventListener(
    "click", () => {
        calculator.equal();
    }
)

document.querySelectorAll(".clear").forEach(
    item => item.addEventListener(
        "click", () => {
            calculator.clear()
        }
    )
)

document.querySelector(".plus_minus_sign").addEventListener(
    "click", () => {
        calculator.plus_minus_sign();
    }
)

document.querySelector(".backspace").addEventListener(
    "click", () => {
        calculator.backspace();
    }
)

document.onkeydown = function(e) {
    console.log(e.key)
    if (e.keyCode >= 48 && e.keyCode <= 57) {
        if (e.which == 56 && !!e.shiftKey) {
            calculator.operation("*")
            return
        }
        calculator.clickNumber((e.keyCode - 48).toString(10))
        return
    }
    switch (e.keyCode) {
        case 8:
            calculator.backspace()
            break
        case 187:
            if (e.shiftKey) {
                calculator.operation("+")
                break;  
            } else {
                calculator.equal()
                break
            }
        case 189:
            calculator.operation("-");
            break;
        case 191:
            calculator.operation("/");
            break;
        case 67:
            calculator.clear()
            break
        case 13:
            calculator.equal()
            break
    }
}