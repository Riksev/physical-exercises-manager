import { useTranslation } from 'react-i18next'
import CalculatorOneRep from './CalculatorOneRep'
import CalculatorWeightPercents from './CalculatorWeightPercents'

const Calculators = () => {
   const { t } = useTranslation()

   return (
      <details className="details">
         <summary>{t('other.calculators.title')}</summary>
         <div className="mt-4 flex flex-col">
            <CalculatorOneRep />
            <CalculatorWeightPercents />
         </div>
      </details>
   )
}

export default Calculators
