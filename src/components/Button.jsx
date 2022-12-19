import './button.css'

const functions = new Set(['(',')','!','%','ln','lo','t','**',''])
// export default function Button({sign,setEquation,setOpen}){
export default function Button({sym,open,setOpen,displayString}){

    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }
    function isEqual(value){
        return value === '='
    }
    function placeProperValue(val){
        if (val ==='&divide;'){
            return <span>&divide;</span>
        }
        else if(val === '&#8730;'){
            return <span>&#8730;</span>
        }else if(val === 'x<sup>y</sup>'){
            return <span>x<sup>y</sup></span>
        }
        return <span>{val}</span>
    }

    function display(){
        if(sym === 'CE'){
            displayString('reset')
        }else if(sym === 'x!'){
            displayString('!')
        }else if(sym === '('){
            setOpen(open+1)
            displayString('(')
        }else if (sym === ')'){
            setOpen(open - 1)
            displayString(')')
        }else if (sym === '%'){
            displayString('%')
        }else if (sym === 'AC'){
            displayString('AC')
        }else if (sym === 'sin'){
            setOpen(open+1)
            displayString('sin(')
        }else if (sym === 'ln'){
            setOpen(open+1)
            displayString('ln(')
        }else if(sym==='&divide;'){
            displayString('/')
        }else if(sym === 'cos'){
            setOpen(open+1)
            displayString('cos(')
        }else if(sym === 'log'){
            setOpen(open+1)
            displayString('log(')
        }else if(sym === 'x'){
            displayString('*')
        }else if(sym === 'tan'){
            setOpen(open+1)
            displayString('tan(')
        }else if(sym === '&#8730;'){
            setOpen(open+1)
            displayString('sqrt(')
        }else if(sym === '-'){
            displayString('-')
        }else if(sym === 'EXP'){
            displayString('E')
        }else if(sym === 'x<sup>y</sup>'){
            displayString('^')
        }else{
            displayString(sym)
        }
        console.log(sym)
    }
    return(
        <div onClick={display} className={`col `+ (isNumeric(sym) || sym==='.' ? 'numberButton' : (isEqual(sym) ? 'equalButton' : 'button'))  } >
        {placeProperValue(sym)}
    </div>
    )

}