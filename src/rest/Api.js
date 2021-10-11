const url = 'http://10.0.2.2:5000/api/v1';


export const getPizzas = () => {
  return fetch(url + '/menu/pizzas')
    .then( (response) => response.json() )
    .then( (responseData) => { return responseData; })
    .catch( (error) => console.warn(error));
}

export const getDrinks = () => {
  return fetch(url + '/menu/drinks')
    .then( (response) => response.json() )
    .then( (responseData) => { return responseData; })
    .catch( (error) => console.warn(error));
}

export const getDesserts = () => {
  return fetch(url + '/menu/desserts')
    .then( (response) => response.json() )
    .then( (responseData) => { return responseData; })
    .catch( (error) => console.warn(error));
}

export const order = (firstName, lastName, address, phone, pizza, drink, dessert) => {
  let headers = new Headers({
    'Content-Type': 'application/json',
  })
  let body = {
    customer: {
      first_name: firstName,
      last_name: lastName,
      address: address,
      phone: phone,
    },
    pizza: pizza,
    drink: drink,
    dessert: dessert,
  }

  console.log(body)

  return fetch(url + '/order', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  })
    .then( (response) => { return response.json() })
    .catch( (error) => console.warn(error));
}

export const sendDiscount = (code) => {
  let headers = new Headers({
    'Content-Type': 'application/json',
  })

  let body = {
    code: code,
  }

  return fetch(url + '/customer/discount', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  })
    .then( (response) => { return response.json() })
    .catch( (error) => console.warn(error));
}
