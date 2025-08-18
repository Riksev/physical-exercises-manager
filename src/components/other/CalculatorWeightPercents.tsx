import { useEffect, useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'

const CalculatorWeightPercents = () => {
   const [weight, setWeight] = useState<string>('')
   const [errorWeight, setErrorWeight] = useState<string>('')
   const [calculatedRows, setCalculatedRows] = useState<JSX.Element | null>(
      null
   )

   const { t } = useTranslation()

   useEffect(() => {
      if (weight === '') {
         setErrorWeight(t('other.calculators.weightPercents.errorEmptyField'))
      } else {
         setErrorWeight('')
      }
   }, [weight, t])

   const handleCalculate = () => {
      const percents = Array.from({ length: 21 }, (_, i) => i * 5)
      const w = parseFloat(weight)
      if (!isNaN(w)) {
         const rows = percents.map((percent) => (
            <tr key={percent}>
               <td>{percent}%</td>
               <td>{+((w * percent) / 100).toFixed(1)}</td>
            </tr>
         ))
         setCalculatedRows(
            <table className="mt-4">
               <thead>
                  <tr>
                     <th>{t('other.calculators.weightPercents.percent')}</th>
                     <th>{t('other.calculators.weightPercents.weight')}</th>
                  </tr>
               </thead>
               <tbody>{rows}</tbody>
            </table>
         )
      } else {
         setCalculatedRows(null)
      }
   }

   const handleClear = () => {
      setWeight('')
      setCalculatedRows(null)
   }

   useEffect(() => {
      setCalculatedRows(null)
   }, [weight])

   useEffect(() => {
      if (calculatedRows !== null) {
         handleCalculate()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [t])

   return (
      <details className="details">
         <summary>{t('other.calculators.weightPercents.title')}</summary>
         <h2 className="horizontal-line"></h2>
         <div className="input-block">
            <label htmlFor="percentsWeight">
               {t('other.calculators.weightPercents.weight')}:
            </label>
            <input
               type="number"
               step="any"
               id="percentsWeight"
               min="0"
               placeholder={t(
                  'other.calculators.weightPercents.weightPlaceholder'
               )}
               value={weight}
               onChange={(e) => setWeight(e.target.value)}
               onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'e' || e.key === 'Enter') {
                     e.preventDefault()
                  }
               }}
               onPaste={(e) => e.preventDefault()}
            />
            {errorWeight && <p className="error-message">{errorWeight}</p>}
         </div>
         <button
            className="button-action button-full mt-4"
            disabled={errorWeight !== ''}
            onClick={handleCalculate}
         >
            {t('other.calculators.weightPercents.calculate')}
         </button>
         <button
            className="button-action button-full mt-4"
            onClick={handleClear}
         >
            {t('other.calculators.weightPercents.clear')}
         </button>
         {calculatedRows}
      </details>
   )
}

export default CalculatorWeightPercents
