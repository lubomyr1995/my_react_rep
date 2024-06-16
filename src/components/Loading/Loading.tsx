import css from "./Loading.module.css";


const Loading = () => {
    return (
        <div className={css.loadingSpinner}>
            <div className={css.spinner}></div>
        </div>
    );
};

export {Loading};