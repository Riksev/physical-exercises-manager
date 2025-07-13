import type { IOtherProps } from '../../interfaces'
import About from './About'
import CalculatorOneRep from './CalculatorOneRep'
import DataManager from './DataManager'
import FAQ from './FAQ'

const Other = ({ exercises, workouts, setData }: IOtherProps) => {
   return (
      <div className="page-container">
         <h2 className="horizontal-line title">Інше</h2>
         <DataManager
            exercises={exercises}
            workouts={workouts}
            setData={setData}
         />
         <CalculatorOneRep />
         <About />
         <FAQ />
      </div>
   )
}

export default Other
