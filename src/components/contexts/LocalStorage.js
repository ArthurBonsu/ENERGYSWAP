const React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } =require ('react');
// THIS IS CONTEXT
// AND THE OTHER IS HOOKS?

// WHAT IS THE DIFFERENCE BETWEEN THE HOOKS AND THE CONTEXT

const UNISWAP = 'UNISWAP'

const VERSION = 'VERSION'
const CURRENT_VERSION = 0
const LAST_SAVED = 'LAST_SAVED'

const BETA_MESSAGE_DISMISSED = 'BETA_MESSAGE_DISMISSED'
const GENERAL_DAI__MESSAGE_DISMISSED = 'GENERAL_DAI__MESSAGE_DISMISSED'
const SAI_HOLDER__MESSAGE_DISMISSED = 'SAI_HOLDER__MESSAGE_DISMISSED'
const DARK_MODE = 'DARK_MODE'

const UPDATABLE_KEYS = [
  GENERAL_DAI__MESSAGE_DISMISSED,
  SAI_HOLDER__MESSAGE_DISMISSED,
  BETA_MESSAGE_DISMISSED,
  DARK_MODE
]

const UPDATE_KEY = 'UPDATE_KEY'

// WE ARE USING CONTEXT HERE CREATED
const LocalStorageContext = createContext()
// FIRST CONTEXT TO BE SENT -THIS FUNCTION IS TO ENSURE A WAY TO USE LOCAL CONTEXT HERE 
function useLocalStorageContext() {

  //USECONTEXT ENSURE THE ABILITY TO USE CONTEXT 
  return useContext(LocalStorageContext)
}


// THE REDUCER ,
function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE_KEY: {
      const { key, value } = payload
      if (!UPDATABLE_KEYS.some(k => k === key)) {
        throw Error(`Unexpected key in LocalStorageContext reducer: '${key}'.`)
      } else {
        return {
          ...state,
          [key]: value
        }
      }
    }
    default: {
      throw Error(`Unexpected action type in LocalStorageContext reducer: '${type}'.`)
    }
  }
}

// THIS IS AN ARRAY INITIATION OF ITEMS AND CONSTANTS
function init() {
  const defaultLocalStorage = {
    [VERSION]: CURRENT_VERSION,
    [BETA_MESSAGE_DISMISSED]: false,
    [GENERAL_DAI__MESSAGE_DISMISSED]: false,
    [SAI_HOLDER__MESSAGE_DISMISSED]: false,
    [DARK_MODE]: true
  }

   // WE PASS THE KEY VALUE PAIR INTO THE BROWSER FOR USAGE
  try {
     // AN object of parsed is created
    const parsed = JSON.parse(window.localStorage.getItem(UNISWAP))
       //we parse the version into the Uniswap Parse created
    if (parsed[VERSION] !== CURRENT_VERSION) {
      // this is where we could run migration logic
      // we get the defaultStorageValue
      return defaultLocalStorage
    } else {
      return { ...defaultLocalStorage, ...parsed }
    }
  } catch {
    return defaultLocalStorage
  }
}

// PROVIDERS ARE BEING USED WITH REDUCERS
//CONTEXT ARE BEING USED WITH REDUCERS
//THINGS TO STUDY , PROVIDERS, CONTEXT, REDUCERS, CALLBACKS, HOOKS, REDUX,STYLES, MEMOS, UI COMPONENTS, TYPESCRIPTS 

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init)

  const updateKey = useCallback((key, value) => {
    dispatch({ type: UPDATE_KEY, payload: { key, value } })
  }, [])

  return (
    <LocalStorageContext.Provider value={useMemo(() => [state, { updateKey }], [state, updateKey])}>
      {children}
    </LocalStorageContext.Provider>
  )
}

export function Updater() {
  const [state] = useLocalStorageContext()

  useEffect(() => {
    window.localStorage.setItem(UNISWAP, JSON.stringify({ ...state, [LAST_SAVED]: Math.floor(Date.now() / 1000) }))
  })

  return null
}

export function useSaiHolderMessageManager() {
  const [state, { updateKey }] = useLocalStorageContext()

  const dismissSaiHolderMessage = useCallback(() => {
    updateKey(SAI_HOLDER__MESSAGE_DISMISSED, true)
  }, [updateKey])

  return [!state[SAI_HOLDER__MESSAGE_DISMISSED], dismissSaiHolderMessage]
}

export function useGeneralDaiMessageManager() {
  const [state, { updateKey }] = useLocalStorageContext()

  const dismissGeneralDaiMessage = useCallback(() => {
    updateKey(GENERAL_DAI__MESSAGE_DISMISSED, true)
  }, [updateKey])

  return [!state[GENERAL_DAI__MESSAGE_DISMISSED], dismissGeneralDaiMessage]
}

export function useBetaMessageManager() {
  const [state, { updateKey }] = useLocalStorageContext()

  const dismissBetaMessage = useCallback(() => {
    updateKey(BETA_MESSAGE_DISMISSED, true)
  }, [updateKey])

  return [!state[BETA_MESSAGE_DISMISSED], dismissBetaMessage]
}

export function useDarkModeManager() {
  const [state, { updateKey }] = useLocalStorageContext()

  let isDarkMode = state[DARK_MODE]

  const toggleDarkMode = useCallback(
    value => {
      updateKey(DARK_MODE, value === false || value === true ? value : !isDarkMode)
    },
    [updateKey, isDarkMode]
  )

  return [state[DARK_MODE], toggleDarkMode]
}
