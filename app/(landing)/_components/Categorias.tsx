import Image from 'next/image'

export const Categorias = () => {
    return (
        <>
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">Explora categorias</h2>

            <div className="grid grid-cols-3 gap-3">
                <div className="relative rounded-sm overflow-hidden group">
                    <Image src="/categorias/pintura.png" alt="category 1" width={400} height={400} className="w-full" />
                    <a href="#"
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Pintura</a>
                </div>
                <div className="relative rounded-sm overflow-hidden group">
                    <Image src="/categorias/digital.png" alt="category 1" width={400} height={400} className="w-full" />
                    <a href="#"
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Digital</a>
                </div>
                <div className="relative rounded-sm overflow-hidden group">
                    <Image src="/categorias/paisaje.png" alt="category 1" width={400} height={400} className="w-full" />
                    <a href="#"
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Paisajes
                    </a>
                </div>
                <div className="relative rounded-sm overflow-hidden group">
                    <Image src="/categorias/retrato.png" alt="category 1" width={400} height={400} className="w-full" />
                    <a href="#"
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Retratos</a>
                </div>
                <div className="relative rounded-sm overflow-hidden group">
                    <Image src="/categorias/surrealismo.jpg" alt="category 1" width={400} height={400} className="w-full" />
                    <a href="#"
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Surrealismo
                    </a>
                </div>
                <div className="relative rounded-sm overflow-hidden group">
                    <Image src="/categorias/realismo.png" alt="category 1" width={400} height={400} className="w-full" />
                    <a href="#"
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Realismo</a>
                </div>
            </div>
        </>
    );
}

export default Categorias;