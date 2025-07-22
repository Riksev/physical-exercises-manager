import { useEffect, useState, type JSX } from 'react'

const CalculatorWeightPercents = () => {
   const [weight, setWeight] = useState<string>('')
   const [errorWeight, setErrorWeight] = useState<string>('')
   const [calculatedRows, setCalculatedRows] = useState<JSX.Element | null>(
      null
   )

   useEffect(() => {
      if (weight === '') {
         setErrorWeight('Поле не може бути порожнім.')
      } else {
         setErrorWeight('')
      }
   }, [weight])

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
                     <th>Відсоток</th>
                     <th>Вага</th>
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

   return (
      <details className="details">
         <summary>Калькулятор відсотків ваги</summary>
         <h2 className="horizontal-line"></h2>
         <div className="input-block">
            <label htmlFor="percentsWeight">Вага:</label>
            <input
               type="number"
               step="any"
               id="percentsWeight"
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
         <button
            className="button-action button-full mt-4"
            disabled={errorWeight !== ''}
            onClick={handleCalculate}
         >
            порахувати
         </button>
         <button
            className="button-action button-full mt-4"
            onClick={handleClear}
         >
            очистити
         </button>
         {calculatedRows}
      </details>
   )
}

export default CalculatorWeightPercents
