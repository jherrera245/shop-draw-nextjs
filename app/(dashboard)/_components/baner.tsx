
export const Banner = () => { 
    return (
        <div className="container">
            <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
                La mejor colección <br/> de arte.
            </h1>
            <p>Explora una amplia variedad de obras de artistas talentosos.<br/>
            Encuentra la pieza perfecta para tu colección o regalo especial.</p>
            <div className="mt-12">
                <a href="#" className="bg-primary border border-primary text-black px-8 py-3 font-medium 
                    rounded-md hover:bg-transparent hover:text-primary">Explorar galería</a>
            </div>
        </div>
    ); 
}

export default Banner;