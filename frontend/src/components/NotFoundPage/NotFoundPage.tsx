import { Link } from "react-router-dom";

export const NotFoundPage = () => {
    return (<>
        <h1>Сторінку не знайдено!</h1>

        Перейдіть на за посиланням <Link to={'/'} replace>Головна сторінка</Link>
    </>);
}