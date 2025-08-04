const About = () => {
   return (
      <details className="details">
         <summary>Про вебзастосунок</summary>
         <div className="mt-4 flex flex-col text-left">
            <p>Gymanote - менеджер з фізичних вправ.</p>
            <p>Версія: v2.3.</p>
            <p>
               Розробник:{' '}
               <a
                  href="https://github.com/Riksev"
                  className="animate-pulse text-blue-500 underline hover:text-blue-700"
               >
                  Голубович Євгеній (log1x)
               </a>
               .
            </p>

            <p>Контакти: teraria1128@gmail.com.</p>
            <p className="mt-4 text-center">{new Date().getFullYear()}</p>
         </div>
      </details>
   )
}

export default About
