import CalculatorOneRep from './CalculatorOneRep'
import CalculatorWeightPercents from './CalculatorWeightPercents'

const Calculators = () => {
   return (
      <details className="details">
         <summary>Калькулятори</summary>
         <div className="mt-4 flex flex-col">
            <CalculatorOneRep />
            <CalculatorWeightPercents />
         </div>
      </details>
   )
}

export default Calculators
