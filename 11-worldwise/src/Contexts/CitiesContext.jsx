/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useReducer } from "react";
import Jsoncities from "../data/cities.json";

const CitiesContext = createContext();

const initialState = {
  cities: Jsoncities.cities,
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id != action.payload),
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // useEffect(function () {
  //   async function fetchCities() {
  //     dispatch({ type: "loading" });
  //     try {
  //       const res = await fetch(`${BASE_URL}/cities`);
  //       const data = await res.json();
  //       dispatch({ type: "cities/loaded", payload: data });
  //     } catch {
  //       dispatch({
  //         type: "rejected",
  //         payload: "There was an error loading data ... ",
  //       });
  //     }
  //   }
  //   fetchCities();
  // }, []);
  const getCity = useCallback(
    function getCity() {
      dispatch({ type: "loading" });
      try {
        //   const data = cities?.filter((city) => city?.id === id);
        const data = cities;
        console.log("cities", cities);
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error fetching  cities ... ",
        });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const data = { ...newCity, id: Date.now().toString() };
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating  city ... ",
      });
    }
  }
  function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting  city ... ",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("");
  return context;
}
export { CitiesProvider, useCities };
