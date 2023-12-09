export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(price)
}

export const dateFormat = (date: string) => {    
    return new Date(date).toLocaleDateString(
        'en-US', 
        { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric'
        }
    );
}