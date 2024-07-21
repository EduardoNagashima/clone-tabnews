import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const MainContext = createContext();

export const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <MainContext.Provider value={{ loading, setLoading }}>
      {children}
    </MainContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
