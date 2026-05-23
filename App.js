import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const destinations = [
  {
    id: 1,
    name: "Bali",
    location: "Indonesia",
    price: "$250",
    rating: 4.8,
    description:
      "Pulau dewata dengan pantai eksotis, budaya unik, dan sunset yang indah.",
  },
  {
    id: 2,
    name: "Jakarta",
    location: "Indonesia",
    price: "$180",
    rating: 4.0,
    description:
      "Ibu kota Indonesia dengan kehidupan malam dan pusat bisnis modern.",
  },
  {
    id: 3,
    name: "Yogyakarta",
    location: "Indonesia",
    price: "$150",
    rating: 4.7,
    description:
      "Kota budaya dengan sejarah panjang dan wisata candi terkenal.",
  },
  {
    id: 4,
    name: "Bandung",
    location: "Indonesia",
    price: "$170",
    rating: 4.5,
    description:
      "Kota sejuk dengan wisata kuliner dan pemandangan alam yang indah.",
  },
  {
    id: 5,
    name: "Lombok",
    location: "Indonesia",
    price: "$220",
    rating: 4.9,
    description:
      "Pantai tropis dengan air jernih dan suasana yang lebih tenang.",
  },
  {
    id: 6,
    name: "Labuan Bajo",
    location: "Indonesia",
    price: "$350",
    rating: 4.9,
    description:
      "Gerbang menuju Pulau Komodo dengan laut yang sangat indah.",
  },
  {
    id: 7,
    name: "Surabaya",
    location: "Indonesia",
    price: "$160",
    rating: 4.2,
    description:
      "Kota metropolitan dengan wisata sejarah dan kuliner khas.",
  },
  {
    id: 8,
    name: "Medan",
    location: "Indonesia",
    price: "$190",
    rating: 4.4,
    description:
      "Kota multikultural dengan makanan khas yang terkenal lezat.",
  },
  {
    id: 9,
    name: "Makassar",
    location: "Indonesia",
    price: "$210",
    rating: 4.3,
    description:
      "Kota pesisir dengan wisata laut dan kuliner seafood terkenal.",
  },
  {
    id: 10,
    name: "Padang",
    location: "Indonesia",
    price: "$170",
    rating: 4.4,
    description:
      "Kota dengan makanan khas rendang dan pemandangan alam indah.",
  },
  {
    id: 11,
    name: "Aceh",
    location: "Indonesia",
    price: "$200",
    rating: 4.5,
    description:
      "Daerah dengan budaya islami dan wisata alam yang memukau.",
  },
  {
    id: 12,
    name: "Batam",
    location: "Indonesia",
    price: "$180",
    rating: 4.1,
    description:
      "Kota industri dan wisata belanja dekat Singapura.",
  },
];

function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Detail", {
          destination: item,
        })
      }
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>

        <Text style={styles.cardLocation}>📍 {item.location}</Text>

        <Text style={styles.cardPrice}>💰 {item.price}</Text>

        <Text style={styles.cardRating}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 16 }}>
        <Text style={styles.screenTitle}>Popular Destinations</Text>

        <FlatList
          data={destinations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

function DetailScreen({ route, favorites, setFavorites }) {
  const { destination } = route.params;

  const isFavorite = favorites.some(
    (item) => item.id === destination.id
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(
        favorites.filter((item) => item.id !== destination.id)
      );
    } else {
      setFavorites([...favorites, destination]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <Text style={styles.detailTitle}>{destination.name}</Text>

          <Text style={styles.detailLocation}>
            📍 {destination.location}
          </Text>

          <Text style={styles.detailPrice}>
            💰 Price: {destination.price}
          </Text>

          <Text style={styles.detailRating}>
            ⭐ Rating: {destination.rating}
          </Text>

          <Text style={styles.descriptionTitle}>Description</Text>

          <Text style={styles.descriptionText}>
            {destination.description}
          </Text>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavorite
                ? "💔 Remove from Favorites"
                : "❤️ Add to Favorites"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeStackNavigator({ favorites, setFavorites }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00b894",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "🏠 Home",
        }}
      />

      <Stack.Screen
        name="Detail"
        options={{
          title: "Destination Detail",
        }}
      >
        {(props) => (
          <DetailScreen
            {...props}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function SearchScreen({ navigation, favorites, setFavorites }) {
  const [search, setSearch] = useState("");

  const filteredDestinations = destinations.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 16 }}>
        <Text style={styles.screenTitle}>Search Destinations</Text>

        <TextInput
          placeholder="Search destination..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />

        {filteredDestinations.length === 0 ? (
          <Text style={styles.notFoundText}>
            Tidak dapat menemukan kota...
          </Text>
        ) : (
          <FlatList
            data={filteredDestinations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.searchCard}
                onPress={() =>
                  navigation.navigate("SearchDetail", {
                    destination: item,
                  })
                }
              >
                <Text style={styles.searchTitle}>{item.name}</Text>

                <Text style={styles.searchLocation}>
                  📍 {item.location}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

function SearchStackNavigator({ favorites, setFavorites }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00b894",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Search"
        options={{
          title: "Search",
        }}
      >
        {(props) => (
          <SearchScreen
            {...props}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="SearchDetail"
        options={{
          title: "Search Detail",
        }}
      >
        {(props) => (
          <DetailScreen
            {...props}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function FavoritesScreen({ favorites }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 16 }}>
        <Text style={styles.screenTitle}>My Favorites ❤️</Text>

        {favorites.length === 0 ? (
          <Text style={styles.notFoundText}>
            Belum ada favorite destination
          </Text>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.favoriteCard}>
                <Text style={styles.favoriteTitle}>
                  {item.name}
                </Text>

                <Text style={styles.favoriteLocation}>
                  📍 {item.location}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

function TabNavigator() {
  const [favorites, setFavorites] = useState([
    destinations[1],
    destinations[7],
  ]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = "home";
          } else if (route.name === "SearchTab") {
            iconName = "search";
          } else if (route.name === "FavoritesTab") {
            iconName = "heart";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: "#00b894",
        tabBarInactiveTintColor: "#999",

        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        options={{
          title: "Home",
        }}
      >
        {() => (
          <HomeStackNavigator
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="SearchTab"
        options={{
          title: "Search",
        }}
      >
        {() => (
          <SearchStackNavigator
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="FavoritesTab"
        options={{
          title: "Favorites",
          tabBarBadge:
            favorites.length > 0 ? favorites.length : null,
        }}
      >
        {() => (
          <FavoritesScreen favorites={favorites} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },

  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },

  cardContent: {
    padding: 16,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  cardLocation: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  cardPrice: {
    fontSize: 14,
    color: "#00b894",
    marginTop: 4,
    fontWeight: "bold",
  },

  cardRating: {
    marginTop: 4,
    color: "#f39c12",
    fontWeight: "bold",
  },

  detailTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00b894",
    marginBottom: 10,
  },

  detailLocation: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
  },

  detailPrice: {
    fontSize: 16,
    color: "#00b894",
    marginBottom: 6,
    fontWeight: "bold",
  },

  detailRating: {
    fontSize: 16,
    color: "#f39c12",
    marginBottom: 16,
    fontWeight: "bold",
  },

  descriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },

  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#555",
  },

  favoriteButton: {
    backgroundColor: "#00b894",
    marginTop: 24,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  favoriteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  searchCard: {
    backgroundColor: "#f5f5f5",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  searchTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  searchLocation: {
    color: "#666",
    marginTop: 4,
  },

  favoriteCard: {
    backgroundColor: "#ffe8e8",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },

  favoriteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d63031",
  },

  favoriteLocation: {
    color: "#555",
    marginTop: 4,
  },

  notFoundText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#999",
  },
});