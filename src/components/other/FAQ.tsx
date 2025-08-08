const FAQ = () => {
   return (
      <details className="details">
         <summary>Часті запитання</summary>
         <h2 className="horizontal-line"></h2>
         <details className="details">
            <summary>Як додати тренування?</summary>
            <h2 className="horizontal-line"></h2>
            <p>
               Перейдіть у розділ "ТРЕНУВАННЯ" на панелі меню. Натисніть кнопку
               "ДОДАТИ". Відкриється модальне вікно. Заповніть потрібні Вам
               пункти. Додане тренування з'явиться у списку тренувань.
            </p>
         </details>
         <details className="details">
            <summary>Як додати вправу?</summary>
            <h2 className="horizontal-line"></h2>
            <p>
               Перейдіть у розділ "ВПРАВИ" на панелі меню. Натисніть кнопку
               "ДОДАТИ". Відкриється модальне вікно. Введіть назву вправи.
               Виберіть параметри вправи за потреби. Натисніть кнопку "ДОДАТИ".
               Додана вправа з'явиться у списку вправ.
            </p>
         </details>
         <details className="details">
            <summary>Чому неможливо додати вправу?</summary>
            <h2 className="horizontal-line"></h2>
            <p>
               Користувач залишив поле назви вправи порожнім.<br></br>
            </p>
         </details>
      </details>
   )
}

export default FAQ
