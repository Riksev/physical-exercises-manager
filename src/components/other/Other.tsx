import About from './About'
import Calculators from './Calculators'
import DataManager from './DataManager'
import FAQ from './FAQ'

const Other = () => {
   return (
      <div className="app-page">
         <h2 className="horizontal-line title">Інше</h2>
         <DataManager />
         <Calculators />
         <About />
         <FAQ />
      </div>
   )
}

export default Other
