import { Pages, type IMenuProps } from '../interfaces'

const Menu = ({
   activePage,
   setActivePage,
   setActiveExercise,
   setActiveWorkout,
}: IMenuProps) => {
   return (
      <nav className="fixed bottom-0 z-99 flex w-full items-center bg-gradient-to-br from-fuchsia-900 to-blue-600 p-2 shadow-md md:w-3/4 lg:w-1/2">
         <div
            className="flex w-1/3 cursor-pointer items-center justify-center hover:brightness-70 active:brightness-70"
            onClick={(): void => {
               setActivePage((prev) => {
                  if (prev === Pages.EXERCISES) {
                     setActiveExercise(null)
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  return Pages.EXERCISES
               })
            }}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 640 512"
               className={`h-12 w-12 stroke-white stroke-[24] ${activePage === Pages.EXERCISES ? 'fill-white' : 'fill-transparent'}`}
            >
               <path d="M96 64c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32l0 160 0 64 0 160c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-64-32 0c-17.7 0-32-14.3-32-32l0-64c-17.7 0-32-14.3-32-32s14.3-32 32-32l0-64c0-17.7 14.3-32 32-32l32 0 0-64zm448 0l0 64 32 0c17.7 0 32 14.3 32 32l0 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 64c0 17.7-14.3 32-32 32l-32 0 0 64c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-160 0-64 0-160c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32zM416 224l0 64-192 0 0-64 192 0z" />
            </svg>
         </div>
         <div
            className="flex w-1/3 cursor-pointer items-center justify-center hover:brightness-70 active:brightness-70"
            onClick={(): void => {
               setActivePage((prev) => {
                  if (prev === Pages.WORKOUTS) {
                     setActiveWorkout(null)
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  return Pages.WORKOUTS
               })
            }}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 448 512"
               className={`h-10 w-10 stroke-white stroke-[24] ${activePage === Pages.WORKOUTS ? 'fill-white' : 'fill-transparent'}`}
            >
               <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z" />
            </svg>
         </div>
         <div
            className="flex h-full w-1/3 cursor-pointer items-center justify-center hover:brightness-70 active:brightness-70"
            onClick={(): void => {
               setActivePage(Pages.STATISTICS)
               window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 576 512"
               className={`h-10 w-10 stroke-white stroke-[24] ${activePage === Pages.STATISTICS ? 'fill-white' : 'fill-transparent'}`}
            >
               <path d="M304 240l0-223.4c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16L304 240zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4L256 288 412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288l238.4 0z" />
            </svg>
         </div>
      </nav>
   )
}

export default Menu
