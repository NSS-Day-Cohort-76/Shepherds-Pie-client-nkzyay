export const createOrder = (order) => {
    return fetch(`http://localhost:8088/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    }).then(res => res.json()) 
}

export const createCustomer = (customer) => {
    return fetch(`http://localhost:8088/customers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    }).then(res => res.json()) 
}