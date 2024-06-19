export const Poster = ({ url } : { url: string }) => {
    return (<div className="main__poster-wrapper">
        <div className="main__poster-container">
            <img src={url} alt="Poster image" className="main__poster-img" />
        </div>
    </div>);
}