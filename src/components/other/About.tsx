import { useTranslation } from 'react-i18next'

const About = () => {
   const { t } = useTranslation()

   return (
      <details className="details">
         <summary>{t('other.about.title')}</summary>
         <div className="mt-4 flex flex-col text-left">
            <p>{t('other.about.gymanote')}</p>
            <p>{t('other.about.version')}: v3.2.</p>
            <p>
               {t('other.about.developer')}:{' '}
               <a
                  href="https://github.com/Riksev"
                  className="animate-pulse text-blue-500 underline hover:text-blue-700"
               >
                  {t('other.about.developerFullName')} (log1x)
               </a>
               .
            </p>

            <p>{t('other.about.contacts')}: teraria1128@gmail.com.</p>
            <p className="mt-4 text-center">{new Date().getFullYear()}</p>
         </div>
      </details>
   )
}

export default About
