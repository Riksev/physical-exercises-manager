import type { Dispatch, SetStateAction } from 'react'
import About from './About'
import Calculators from './Calculators'
import DataManager from './DataManager'
import type { IModal } from '../../interfaces'

interface IOtherProps {
   setModal: Dispatch<SetStateAction<IModal | null>>
}

const Other = ({ setModal }: IOtherProps) => {
   return (
      <div className="app-page">
         <h2 className="horizontal-line title">Інше</h2>
         <DataManager setModal={setModal} />
         <Calculators />
         <About />
         {/* <FAQ /> */}
      </div>
   )
}

export default Other
