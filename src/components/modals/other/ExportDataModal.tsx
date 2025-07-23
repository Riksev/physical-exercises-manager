import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { createPortal } from 'react-dom'

interface IExportDataModalProps {
   setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const ExportDataModal = ({ setIsModalOpen }: IExportDataModalProps) => {
   const exercises = useAppSelector((state) => state.data.exercises)
   const workouts = useAppSelector((state) => state.data.workouts)

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
      link.download = `${name}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
   }

   const [name, setName] = useState<string>(getDate())

   const [errorName, setErrorName] = useState<string>('')

   useEffect(() => {
      if (name === '') {
         setErrorName('Назва файлу не може бути порожньою.')
      } else {
         setErrorName('')
      }
   }, [name])

   const handleClick = () => {
      exportData()
      setIsModalOpen(false)
   }

   return createPortal(
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Експорт даних</h2>
               <button
                  type="button"
                  aria-label="Закрити"
                  onClick={() => {
                     setIsModalOpen(false)
                  }}
                  className="button-close"
               >
                  <span>&times;</span>
               </button>
            </div>
            <div className="content-overflow-y">
               <div className="modal-main">
                  <div className="input-block">
                     <label htmlFor="name">Назва файлу</label>
                     <input
                        type="text"
                        id="name"
                        placeholder="Введіть назву файлу"
                        autoComplete="off"
                        value={name}
                        onChange={(e) => {
                           setName(
                              e.target.value.trim() === '' ? '' : e.target.value
                           )
                        }}
                        onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                              e.preventDefault()
                           }
                        }}
                     />
                     {errorName && <p className="error-message">{errorName}</p>}
                  </div>
               </div>
            </div>
            <h2 className="horizontal-line"></h2>
            <button
               type="button"
               className="button-add button-modal"
               onClick={handleClick}
               disabled={errorName !== ''}
            >
               експортувати
            </button>
         </div>
      </div>,
      document.body
   )
}

export default ExportDataModal
