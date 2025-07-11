export const createOrder = (order) => {
    return fetch(`http://https://shepherds-pie-backend-9.onrender.com/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    }).then(res => res.json()) 
}

export const createCustomer = (customer) => {
    return fetch(`http://https://shepherds-pie-backend-9.onrender.com/customers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    }).then(res => res.json()) 
}