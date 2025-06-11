import type { IOtherProps } from '../interfaces'

const Other = ({ exercises, workouts, setData }: IOtherProps) => {
   const getDate = () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
   }

   const exportData = () => {
      const dataToSave = {
         exercises,
         workouts,
      }

      const jsonString = JSON.stringify(dataToSave, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${getDate()}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
   }

   const importData = () => {}

   return (
      <>
         <h2 className="mb-2 w-full border-b-2 border-black/70 pb-4 text-3xl font-bold">
            Інше
         </h2>
         <button
            className="w-full bg-blue-500 p-4 hover:bg-blue-600 active:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-600 disabled:opacity-50"
            onClick={exportData}
            disabled={!exercises.length && !workouts.length}
         >
            експорт даних
         </button>
         <button
            className="w-full bg-blue-500 p-4 hover:bg-blue-600 active:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-600 disabled:opacity-50"
            onClick={importData}
            disabled
         >
            імпорт даних
         </button>
      </>
   )
}

export default Other
