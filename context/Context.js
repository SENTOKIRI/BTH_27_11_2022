import { createContext, useState, useContext } from "react";

export const Explore = createContext()

function Context({ children }) {
  const [userId, setUserId] = useState('')
  const [category, setCategory] = useState('general')
  const [country, setCountry] = useState('in')
  const [source, setSource] = useState('in')
  return (
    <Explore.Provider value={{ category, setCategory, country, setCountry, source, setSource, userId, setUserId }}>
      {children}
    </Explore.Provider>
  )
}

export const ExploreState = () => {
  return useContext(Explore);
};

export default Context