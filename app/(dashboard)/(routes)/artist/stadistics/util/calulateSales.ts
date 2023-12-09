import { tbl_compras, tbl_dibujos } from "@prisma/client";

interface CalculateSaleProps {
    products: tbl_dibujos[],
    sales: tbl_compras[]
};

const calculateSales = ({products, sales} : CalculateSaleProps) => {

    let total = 0;

    sales.forEach(sale => {
        products.forEach(product => {
            if (sale.dibujo_uuid === product.uuid) {
                let price = product.precio ? product.precio : 0;
                total += price;
            }
        })
    });

    return total;
}

export default calculateSales;