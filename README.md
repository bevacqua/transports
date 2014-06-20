# Transports

> Passport-enabled conventional authentication provider handling simplification

# Install

```shell
npm i -S transports
```

# `.configure(data)`

See [Configuring `data`](#configuring-data) below for an example `data` object. This is used across `transports` to access the different authentication providers you want to set up, your `passport` instance, and other configuration options.

# `.passports(handler)`

Configures `passport` with the authentication providers passed to `data.providers`. It will invoke `passport.use` passing your strategy and then telling it to call `handler` for each of those providers, normalizing authentication across providers.

### `handler(query, profile, done)`

The `handler` method should be used to lookup the user, and maybe create a new one if the user isn't found.

- The `query` will be something like `{ googleId: '...' }`, `{ facebookId: '...' }`, etc.
- The `profile` argument is the data returned by the authentication provider
- The `done` callback is the one described [in the `passport` documentation][1]

# `.routing(app, handler)`

Sets up routing for the selected providers. The `handler` is only used when the user needs a new account.

# `.serialization(User, field?)`

Sets up serialization and deserialization for the `User` object, assuming these have an `_id` field. The `_id` field is the default, but you can provide another one.

```js
transports.serialization(User, 'id');
```

# Configuring `data`

Here's a real-world `data` object example. Note that you need to pass in your own `passport` instance, because that way you'll stay in control.

```js
{
  passport: require('passport'),
  authority: process.env.AUTHORITY,
  success: '/',
  login: '/authentication/login',
  logout: '/authentication/logout',
  local: '/authentication/login/local',
  providers: {
    facebook: {
      get enabled () { return this.id && this.secret; },
      strategy: require('passport-facebook').Strategy,
      protocol: 'oauth2',
      id: process.env.FACEBOOK_APP_ID,
      secret: process.env.FACEBOOK_APP_SECRET,
      link: '/authentication/login/facebook',
      callback: '/authentication/login/facebook/callback',
      options: { scope: 'email' }
    },
    google: {
      get enabled () { return this.id && this.secret; },
      strategy: require('passport-google-oauth').OAuth2Strategy,
      protocol: 'oauth2',
      id: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
      link: '/authentication/login/google',
      callback: '/authentication/login/google/callback',
      options: { scope: 'openid email' }
    },
    linkedin: {
      get enabled () { return this.id && this.secret; },
      strategy: require('passport-linkedin').Strategy,
      protocol: 'oauth1',
      id: process.env.LINKEDIN_API_KEY,
      secret: process.env.LINKEDIN_API_SECRET,
      link: '/authentication/login/linkedin',
      callback: '/authentication/login/linkedin/callback',
      options: { scope: ['r_basicprofile', 'r_emailaddress'] },
      fields: ['id', 'first-name', 'last-name', 'email-address']
    }
  }
}
```

# License

MIT

[1]: http://passportjs.org/guide/configure/
