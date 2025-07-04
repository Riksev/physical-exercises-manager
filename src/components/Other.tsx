import type { IOtherProps } from '../interfaces'
import About from './About'
import DataManager from './DataManager'

const Other = ({ exercises, workouts, setData }: IOtherProps) => {
   return (
      <div className="page-container">
         <h2 className="horizontal-line title">Інше</h2>
         <DataManager
            exercises={exercises}
            workouts={workouts}
            setData={setData}
         />
         <About />
      </div>
   )
}

export default Other
