import Image from 'next/image'

export const Features = () => { 
    return (
        <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
                <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                    <Image src="icons/delivery-van.svg" alt="Delivery" width={400} height={400} className="w-12 h-12 object-contain"/>
                    <div>
                        <h4 className="font-medium capitalize text-lg">Envío gratis</h4>
                        <p className="text-gray-500 text-sm">Por compras arriba de $200</p>
                    </div>
                </div>
                <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                    <Image src="icons/money-back.svg" alt="Delivery" width={400}  height={400} className="w-12 h-12 object-contain"/>
                    <div>
                        <h4 className="font-medium capitalize text-lg">Regreso de dinero</h4>
                        <p className="text-gray-500 text-sm">30 días de expiración</p>
                    </div>
                </div>
                <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                    <Image src="icons/service-hours.svg" alt="Delivery" width={400} height={400} className="w-12 h-12 object-contain"/>
                    <div>
                        <h4 className="font-medium capitalize text-lg">Asistencia 24/7</h4>
                        <p className="text-gray-500 text-sm">Para el cliente</p>
                    </div>
                </div>
            </div>
    ); 
}

export default Features;