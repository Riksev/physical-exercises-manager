import { useEffect, useState, type JSX } from 'react'

const CalculatorOneRep = () => {
   const [reps, setReps] = useState<string>('')
   const [weight, setWeight] = useState<string>('')

   const [errorReps, setErrorReps] = useState('')
   const [errorWeight, setErrorWeight] = useState('')

   const [results, setResults] = useState<JSX.Element | null>(null)

   useEffect(() => {
      if (reps === '') {
         setErrorReps('Поле не може бути порожнім.')
      } else {
         setErrorReps('')
      }
   }, [reps])

   useEffect(() => {
      if (weight === '') {
         setErrorWeight('Поле не може бути порожнім.')
      } else {
         setErrorWeight('')
      }
   }, [weight])

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
            Ваш максимум у діапазоні:<br></br>
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

   return (
      <details className="details">
         <summary>Калькулятор одноповторного максимума</summary>
         <h2 className="horizontal-line"></h2>
         <div className="input-block">
            <label htmlFor="weight">Вага:</label>
            <input
               type="number"
               step="any"
               id="weight"
               min="0"
               placeholder="Введіть вагу"
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
            <label htmlFor="reps">Повторення:</label>
            <input
               type="number"
               step="any"
               id="reps"
               min="0"
               placeholder="Введіть кількість повторень"
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
            порахувати
         </button>
         <button
            className="button-action button-full mt-4"
            onClick={() => {
               handleClear()
            }}
         >
            очистити
         </button>
         {results}
      </details>
   )
}

export default CalculatorOneRep
