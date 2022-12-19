import logo from './logo.svg';
import './App.css';
import react,{ useState } from 'react'
import Button from './components/Button'

const SYMBOLS = [ ['CE','x!','(',')','%','AC'],
['sin','ln','7','8','9','&divide;'],
['cos','log','4','5','6','x'],
['tan','&#8730;','1','2','3','-'],
['EXP','x<sup>y</sup>','0','.','=','+']]
const numbers = new Set(['1','2','3','4','5','6','7','8','9','0','.'])
const notValidStarters = new Set(['!','%','/','x','-','E','+',')'])
const operations = new Set(['/','x','-','+'])
const functions = new Set(['s','c','!','%','ln','lo','t','**',''])
function App() {

  const [open,setOpen] = useState(0)

  function displayString(str){
    console.log(open)
    const display = document.getElementById('display')
    if(str === '='){
      solve()
      return
    }
    if (str === 'reset'){
      setOpen(0)
      display.innerHTML = 0
      return
    }
    if (str === 'AC'){
      console.log("FDSJFD")
      if (display.innerHTML != 0){
        if(display.innerHTML.length == 1){
            display.innerHTML = 0
        }else{
            display.innerHTML = display.innerHTML.slice(0,-1) 
        }
      }
      return 
    }
    console.log(display.innerHTML.slice(-1))
    if(operations.has(str) && (operations.has(display.innerHTML.slice(-1)) || 
    display.innerHTML.slice(-1)) == '('){
        return 
    }
    if(display.innerHTML == 0 || display.innerHTML == 'ERROR' || display.innerHTML == 'undefined'){
        display.innerHTML = str
    }else{
        display.innerHTML += str
    }
  }
  async function solve(){
    const display = document.getElementById('display')
    let str = display.innerHTML
    console.log(str)
      if (notValidStarters.has(str[0]) || operations.has(str.slice(-1)) || str.slice(-1) == '('){
        return 'ERROR'
    }
      for(let i = 0;i<open;i++){
          str += ')'
      }
      str = str.replace('+','%2B')
      console.log(str)
      setOpen(0)
      console.log(str)
      const url = `https://api.mathjs.org/v4/?expr=${str}&precision=6`
      await fetch(url)
      .then(res => res.json())
      .then(data => {console.log(data)
          display.innerHTML = data  })

  }
  return (
    
    <div className="calc">
      <div className='display'>
        <div id="display" class="displayNumber">0</div>
      </div>
      <div class="container">
        {SYMBOLS.map(arr =>{
          return(
            <div className='row'>
              {arr.map( sym => {
                return <Button sym={sym} open={open} setOpen={setOpen} displayString={displayString}/> 
              })}
            </div>
            )
        })}
      </div>
    </div>
  );
}

export default App;
