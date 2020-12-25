# auth_utils

> MongoDB realm auth utils   

[![NPM](https://img.shields.io/npm/v/@shaddyshad/auth_utils.svg)](https://www.npmjs.com/package/@shaddyshad/auth_utils)
 [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @shaddyshad/auth_utils

yarn add @shaddyshad/auth_utils
```

## Usage

```jsx
import React, { Component } from 'react'

import {AuthContextProvider} from 'auth_utils'

// declare the app id from mongo db realm
const appId = "YOUR_REALM_APP_ID"

class Example extends Component {
  render() {
    return (
      <AuthContextProvider appId={appId} >
          <OtherComponents />
      </AuthContextProvider>
    )
  }
}
```

### In the login page 

```jsx 
import React, {useState} from 'react'
import {useAuth} from 'auth_utils'

const Signin = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const auth = useAuth()

  const onSignin = () => {
    auth.login(email, password)
      .then(() => {
        // succesfully signed in
      }).catch(err => {
        // handle the error 
        // {error: str, error_code: str...}
      })
  }


  return (
    <SigninUi onSigin={onSigin} />
  )
}
```

## License

MIT © [shaddyshad](https://github.com/shaddyshad)
