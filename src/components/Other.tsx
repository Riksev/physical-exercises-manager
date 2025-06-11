import type { IOtherProps } from '../interfaces'
import About from './About'
import DataManager from './DataManager'

const Other = ({ exercises, workouts, setData }: IOtherProps) => {
   return (
      <>
         <h2 className="mb-2 w-full border-b-2 border-black/70 pb-4 text-3xl font-bold">
            Інше
         </h2>
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
