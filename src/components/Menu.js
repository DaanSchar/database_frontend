import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList, TouchableOpacity, TextInput } from "react-native";
import { getDesserts, getDrinks, getPizzas, order, sendDiscount } from "../rest/Api";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Menu = () => {

  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [data, setData] = useState([]);
  const [isCart, setIsCart] = useState(false);

  const [pizzaCart, setPizzaCart] = useState([]);
  const [drinkCart, setDrinkCart] = useState([]);
  const [dessertCart, setDessertCart] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [discount, setDiscount] = useState('');

  useEffect(() => {
    getPizzas().then(r => {
      setPizzas(r);
      setData(r);
    });
    getDesserts().then(r => setDesserts(r));
    getDrinks().then(r => setDrinks(r));
  }, [])

  const renderItem = ({ item }) => {

    if (data[0]['toppings'])
      return (
        <TouchableOpacity onPress={() => {
          setPizzaCart([...pizzaCart, item['pizza_id']])
        }}>
          <View style={styles.pizzaCard}>
            <View style={styles.pizzaContainer}>
              <Text style={styles.pizzaText}>Pizza {item['name']}</Text>
              <View style={styles.toppingsContainer}>
                <Text style={styles.toppingText}>Base Price</Text>
                <Text style={styles.toppingPriceText}>{item['price']}</Text>
              </View>
              {
                item['toppings'].map(topping => (
                  <View key={topping['topping_id']} style={styles.toppingsContainer}>
                    <Text style={styles.toppingText}>{topping['name']}</Text>
                    <Text style={styles.toppingPriceText}>{topping['price']}</Text>
                  </View>
                ))
              }
              <View style={styles.totalContainer}>
                <Text>Total Price</Text>
                <Text>{item['total_price']}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    else
      return (
        <TouchableOpacity onPress={() => {
          if (item["drink_id"]) {
            setDrinkCart([...drinkCart, item['drink_id']])
          } else {
            setDessertCart([...dessertCart, item['dessert_id']])
          }
        }}>
          <View style={styles.pizzaCard}>
            <View style={styles.pizzaContainer}>
              <Text style={styles.pizzaText}>{item['name']}</Text>
              <View style={styles.toppingsContainer}>
                <Text style={styles.toppingText}>Price</Text>
                <Text style={styles.toppingPriceText}>{item['price']}</Text>
              </View>

              <View style={styles.totalContainer}>
                <Text>Total Price</Text>
                <Text>{item['total_price']}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
  }

  return (
    <View style={styles.container}>
      {
        !isCart ?
          <FlatList
            data={data}
            renderItem={renderItem}
          />
          :
          <View style={styles.cartContainer}>
            <View style={styles.cartCard}>
              <Text>Pizzas</Text>
              <FlatList
                horizontal={true}
                data={pizzaCart}
                renderItem={({ item }) => (
                  <View>
                    <Text>{item}  </Text>
                  </View>
                )}
              />
            </View>
            <View style={styles.cartCard}>
              <Text>Drinks</Text>
              <FlatList
                horizontal={true}
                data={drinkCart}
                renderItem={({ item }) => (
                  <View>
                    <Text>{item}  </Text>
                  </View>
                )}
              />
            </View>
            <View style={styles.cartCard}>
              <Text>Desserts</Text>
              <FlatList
                horizontal={true}
                data={dessertCart}
                renderItem={({ item }) => (
                  <View>
                    <Text>{item}  </Text>
                  </View>
                )}
              />
            </View>

            <TextInput placeholder={'first name'} onChangeText={text => {setFirstName(text)}}></TextInput>
            <TextInput placeholder={'last name'} onChangeText={text => {setLastName(text)}}></TextInput>
            <TextInput placeholder={'address'} onChangeText={text => {setAddress(text)}}></TextInput>
            <TextInput placeholder={'phone number'} onChangeText={text => {setPhone(text)}}></TextInput>
            <TextInput placeholder={'discount code'} onChangeText={text => {setDiscount(text)}}></TextInput>

            <View style={styles.orderButton}>
              <TouchableOpacity onPress={() => {
                sendDiscount(discount).then(r => r['allowed'] === true || discount == '' ?
                  order(firstName, lastName, address, phone, pizzaCart, drinkCart, dessertCart)
                    .then(r => console.log(r))
                  :
                  null
                )
              }}>
                <View>
                  <Text style={{color: 'white', fontSize: 25}}>Order</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
      }

      {/* bottom menu*/}
      <View style={styles.topMenu}>
        <TouchableOpacity style={styles.topMenuButton} onPress={()=> {setData(desserts), setIsCart(false)}}>
          <View style={{alignItems: 'center',}}>
            <MaterialIcons name={'icecream'} color={'white'} size={30}/>
            <Text style={styles.topMenuButtonText}>Desserts</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.topMenuButton} onPress={()=> {setData(pizzas), setIsCart(false)}}>
          <View style={{alignItems: 'center',}}>
            <MaterialIcons name={'local-pizza'} color={'white'} size={30}/>
            <Text style={styles.topMenuButtonText}>Pizza</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.topMenuButton} onPress={()=> {setData(drinks), setIsCart(false)}}>
          <View style={{alignItems: 'center',}}>
            <MaterialIcons name={'local-cafe'} color={'white'} size={30}/>
            <Text style={styles.topMenuButtonText}>Drinks</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.topMenuButton} onPress={()=> {setIsCart(true)}}>
          <View style={{alignItems: 'center',}}>
            <MaterialIcons name={'shopping-cart'} color={'white'} size={30}/>
            <Text style={styles.topMenuButtonText}>Cart</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default Menu;

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
  },
  orderButton: {
    marginTop: 50,
    marginHorizontal: 50,
    alignSelf: 'center',
    backgroundColor: '#242F40',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  cartCard: {
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  cartCardContainer: {
    flexDirection: 'row',
  },
  topMenu: {
    backgroundColor: '#242F40',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  topMenuButton: {
    paddingVertical: 10,
  },
  topMenuButtonText: {
    color: 'white',
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  pizzaCard: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  pizzaContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  pizzaText: {
    color: '#CCA43B',
    fontSize: 20,
  },
  toppingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  toppingText: {
    color: '#242F40',
    fontSize: 15,
  },
  toppingPriceText: {
    color: '#242F40',
    fontSize: 15,
  },
  totalContainer: {
    borderTopWidth: 2,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#242F40',
  },

})

