import { createContext } from "react";


const GlobalContext = createContext({
	user: {
		name: "Jurij"
	}
});

export default GlobalContext;