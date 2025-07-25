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
               "ДОДАТИ ТРЕНУВАННЯ". Відкриється модальне вікно. Виберіть
               потрібну дату тренування. Натисніть кнопку "ДОДАТИ". Додане
               тренування з'явиться у списку тренувань.
            </p>
         </details>
         <details className="details">
            <summary>Чому неможливо додати тренування?</summary>
            <h2 className="horizontal-line"></h2>
            <p>
               1. У користувача має бути додана принаймні одна вправа.<br></br>
               2. Користувач не може додавати тренування на дату, на яку вже
               існує інше тренування.<br></br>
               3. Користувач залишив поле дати тренування порожнім.<br></br>
            </p>
         </details>
         <details className="details">
            <summary>Як додати вправу?</summary>
            <h2 className="horizontal-line"></h2>
            <p>
               Перейдіть у розділ "ВПРАВИ" на панелі меню. Натисніть кнопку
               "ДОДАТИ ВПРАВУ". Відкриється модальне вікно. Введіть назву
               вправи. Виберіть параметри вправи за потреби (з вагою, з часом, з
               кількістю повторів). Натисніть кнопку "ДОДАТИ". Додана вправа
               з'явиться у списку вправ.
            </p>
         </details>
         <details className="details">
            <summary>Чому неможливо додати вправу?</summary>
            <h2 className="horizontal-line"></h2>
            <p>
               1. Користувач залишив поле назви вправи порожнім.<br></br>
            </p>
         </details>
      </details>
   )
}

export default FAQ
