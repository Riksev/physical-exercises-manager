import { useEffect, useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'

const CalculatorOneRep = () => {
   const [reps, setReps] = useState<string>('')
   const [weight, setWeight] = useState<string>('')

   const [errorReps, setErrorReps] = useState('')
   const [errorWeight, setErrorWeight] = useState('')

   const [results, setResults] = useState<JSX.Element | null>(null)

   const { t } = useTranslation()

   useEffect(() => {
      if (reps === '') {
         setErrorReps(t('other.calculators.oneRep.errorEmptyField'))
      } else {
         setErrorReps('')
      }
   }, [reps, t])

   useEffect(() => {
      if (weight === '') {
         setErrorWeight(t('other.calculators.oneRep.errorEmptyField'))
      } else {
         setErrorWeight('')
      }
   }, [weight, t])

   const handleCalculate = () => {
      const EpleysFormula = parseFloat(weight) * (1.0 + parseFloat(reps) / 30.0)
      const LandersFormula =
         (100.0 * parseFloat(weight)) / (101.3 - 2.67123 * parseFloat(reps))
      const MayhewsFormula =
         (100.0 * parseFloat(weight)) /
         (52.2 + 41.9 * Math.exp(-0.055 * parseFloat(reps)))
      const WatansFormula =
         (100.0 * parseFloat(weight)) /
         (48.8 + 53.8 * Math.exp(-0.075 * parseFloat(reps)))
      const BrzyckisFormula =
         parseFloat(weight) / (1.0278 - 0.0278 * parseFloat(reps))
      const LomardisFormula =
         parseFloat(weight) * Math.pow(parseFloat(reps), 0.1)
      const OConnorsFormula =
         parseFloat(weight) * (1.0 + 0.025 * parseFloat(reps))

      const values = new Array<number>()
      if (EpleysFormula > 0 && !isNaN(EpleysFormula)) {
         if (parseFloat(reps) >= 2.0 || EpleysFormula < parseFloat(weight)) {
            values.push(EpleysFormula)
         }
      }
      if (LandersFormula > 0 && !isNaN(LandersFormula)) {
         if (parseFloat(reps) > 1.0 || LandersFormula < parseFloat(weight)) {
            values.push(LandersFormula)
         }
      }
      if (MayhewsFormula > 0 && !isNaN(MayhewsFormula)) {
         if (parseFloat(reps) > 1.0 || MayhewsFormula < parseFloat(weight)) {
            values.push(MayhewsFormula)
         }
      }
      if (WatansFormula > 0 && !isNaN(WatansFormula)) {
         if (parseFloat(reps) > 1.0 || WatansFormula < parseFloat(weight)) {
            values.push(WatansFormula)
         }
      }
      if (BrzyckisFormula > 0 && !isNaN(BrzyckisFormula)) {
         if (parseFloat(reps) > 1.0 || BrzyckisFormula < parseFloat(weight)) {
            values.push(BrzyckisFormula)
         }
      }
      if (LomardisFormula > 0 && !isNaN(LomardisFormula)) {
         if (parseFloat(reps) > 1.0 || LomardisFormula < parseFloat(weight)) {
            values.push(LomardisFormula)
         }
      }
      if (OConnorsFormula > 0 && !isNaN(OConnorsFormula)) {
         if (parseFloat(reps) > 1.0 || OConnorsFormula < parseFloat(weight)) {
            values.push(OConnorsFormula)
         }
      }
      if (parseFloat(reps) <= 1.0 || parseFloat(weight) == 0.0) {
         values.push(parseFloat(weight))
      }

      if (parseFloat(reps) == 0.0) {
         values.push(0.0)
      }

      const minPossibleWeight = Math.min(...values)
      const maxPossibleWeight = Math.max(...values)

      setResults(
         <p className="mt-2 pl-1 text-xl">
            {t('other.calculators.oneRep.infoMaxWeight')}:<br></br>
            {`${minPossibleWeight.toFixed(1)} - ${maxPossibleWeight.toFixed(1)}`}
         </p>
      )
   }

   const handleClear = () => {
      setReps('')
      setWeight('')
      setResults(null)
   }

   useEffect(() => {
      setResults(null)
   }, [weight, reps])

   useEffect(() => {
      if (results !== null) {
         handleCalculate()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [t])

   return (
      <details className="details">
         <summary>{t('other.calculators.oneRep.title')}</summary>
         <h2 className="horizontal-line"></h2>
         <div className="input-block">
            <label htmlFor="oneRepWeight">
               {t('other.calculators.oneRep.weight')}:
            </label>
            <input
               type="number"
               step="any"
               id="oneRepWeight"
               min="0"
               placeholder={t('other.calculators.oneRep.weightPlaceholder')}
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
         <div className="input-block mt-4">
            <label htmlFor="oneRepReps">
               {t('other.calculators.oneRep.reps')}:
            </label>
            <input
               type="number"
               step="any"
               id="oneRepReps"
               min="0"
               placeholder={t('other.calculators.oneRep.repsPlaceholder')}
               value={reps}
               onChange={(e) => {
                  setReps(e.target.value)
               }}
               onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'e' || e.key === 'Enter') {
                     e.preventDefault()
                  }
               }}
               onPaste={(e) => e.preventDefault()}
            />
            {errorReps && <p className="error-message">{errorReps}</p>}
         </div>
         <button
            className="button-action button-full mt-4"
            disabled={errorReps !== '' || errorWeight !== ''}
            onClick={() => {
               handleCalculate()
            }}
         >
            {t('other.calculators.oneRep.calculate')}
         </button>
         <button
            className="button-action button-full mt-4"
            onClick={() => {
               handleClear()
            }}
         >
            {t('other.calculators.oneRep.clear')}
         </button>
         {results}
      </details>
   )
}

export default CalculatorOneRep
