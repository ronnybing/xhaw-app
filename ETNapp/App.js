import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';

// Import local images
const courseImages = {
  course1: require('./assets/firstaid.png'),
  course2: require('./assets/sewing.png'),
  course3: require('./assets/Gardening.png'),
  course4: require('./assets/reading.png'),
  course5: require('./assets/chiildminding.png'),
  course6: require('./assets/cooking.png'),
  course7: require('./assets/gardeninglady.png'),
};

const coursesData = [
  { id: 1, title: 'First Aid (Six Months)', price: 1500, image: courseImages.course1 },
  { id: 2, title: 'Sewing (Six Months)', price: 1500, image: courseImages.course2 },
  { id: 3, title: 'Landscaping (Six Months)', price: 1500, image: courseImages.course3 },
  { id: 4, title: 'Life Skills (Six Months)', price: 1500, image: courseImages.course4 },
  { id: 5, title: 'Child Minding (Six Weeks)', price: 750, image: courseImages.course5 },
  { id: 6, title: 'Cooking (Six Weeks)', price: 750, image: courseImages.course6 },
  { id: 7, title: 'Garden Maintenance (Six Weeks)', price: 750, image: courseImages.course7 },
];

const App = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [cart, setCart] = useState([]);

  const toggleCourse = (course) => {
    setCart((prevCart) => {
      if (prevCart.includes(course)) {
        return prevCart.filter(item => item !== course);
      } else {
        return [...prevCart, course];
      }
    });
  };

  const calculateTotal = () => {
    const total = cart.reduce((acc, course) => acc + course.price, 0);
    return total - calculateDiscount(total);
  };

  const calculateDiscount = (total) => {
    if (cart.length === 2) {
      return total * 0.05; // 5% discount for 2 courses
    } else if (cart.length === 3) {
      return total * 0.10; // 10% discount for 3 courses
    } else if (cart.length > 3) {
      return total * 0.15; // 15% discount for more than 3 courses
    }
    return 0; // No discount
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return (
          <View style={styles.page}>
            <Image 
              source={require('./assets/etn%20black.png')} // Adjust logo path accordingly
              style={styles.logo} 
            />
            <Text style={styles.title}>Welcome to Empowering the Nation!</Text>
            <View style={styles.buttonContainer}>
              <Button title="About Us" onPress={() => setCurrentPage('about')} />
              <Button title="Courses" onPress={() => setCurrentPage('courses')} />
            </View>
          </View>
        );
      case 'about':
        return (
          <View style={styles.page}>
            <Text style={styles.title}>About Us</Text>
            <Text style={styles.text}>
              Empowering the Nation was established in 2018 and offers courses in Pretoria. Hundreds of domestic workers and gardeners have been trained on both the six-month long Learnerships and six-week Short Skills Training Programmes to empower themselves and can provide more marketable skills.
            </Text>
            <Button title="Back to Home" onPress={() => setCurrentPage('welcome')} />
          </View>
        );
      case 'courses':
        return (
          <View style={styles.page}>
            <Text style={styles.title}>Our Courses</Text>
            <ScrollView>
              {coursesData.map(course => (
                <TouchableOpacity key={course.id} style={styles.course} onPress={() => toggleCourse(course)}>
                  <Image 
                    source={course.image} 
                    style={styles.courseImage} 
                  />
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.text}>Price: R{course.price}</Text>
                  <Text style={styles.text}>
                    {cart.includes(course) ? 'Added to Cart' : 'Click to Add to Cart'}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button title="Back to Home" onPress={() => setCurrentPage('welcome')} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderPage()}
      <TouchableOpacity 
        style={styles.cartButton} 
        onPress={() => {
          const total = calculateTotal();
          const discount = calculateDiscount(total + calculateDiscount(0));
          Alert.alert('Cart', `Total: R${total + discount}\nDiscount: R${discount}\nTotal after discount: R${total.toFixed(2)}`);
        }}
      >
        <Text style={styles.cartText}>🛒 Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  course: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  courseImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -75 }],
    alignItems: 'center',
  },
  cartText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default App;

