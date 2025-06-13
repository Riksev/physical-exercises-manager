import type { IOtherProps } from '../interfaces'
import About from './About'
import DataManager from './DataManager'

const Other = ({ exercises, workouts, setData }: IOtherProps) => {
   return (
      <>
         <h2 className="horizontal-line">Інше</h2>
         <DataManager
            exercises={exercises}
            workouts={workouts}
            setData={setData}
         />
         <About />
         <div className="mt-8"></div>
      </>
   )
}

export default Other
