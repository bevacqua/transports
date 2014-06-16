# Transports

> Passport-enabled conventional OAuth handling simplification

# Install

```shell
npm i -S transports
```

# `.passports(data, providerHandler)`

Configures `passport` with the authentication providers passed to `data.providers`. It will invoke `passport.use` passing your strategy and then call `providerHandler` in a normalized way, for each of those providers.

### `providerHandler(query, profile, done)`

The `providerHandler` method should be used to lookup the user, and maybe create a new one if the user isn't found.

- The `query` will be something like `{ googleId: '...' }`, `{ facebookId: '...' }`, etc.
- The `profile` argument is the data returned by the authentication provider
- The `done` callback is the one described [in the `passport` documentation][1]

# `.routing(data, app, providerHandler)`

Sets up routing for the selected providers.

# `.serialization(User, field?)`

Sets up serialization and deserialization for the `User` object, assuming these have an `_id` field. The `_id` field is the default, but you can provide another one.

```js
transports.serialization(User, 'id');
```

# Configuring `data`

Here's a real-world `data` object example.

```js
{
  authority: env('AUTHORITY'),
  success: '/',
  login: '/authentication/login',
  logout: '/authentication/logout',
  local: '/authentication/login/local',
  providers: {
    facebook: {
      get enabled () { return this.id && this.secret; },
      strategy: require('passport-facebook').Strategy,
      protocol: 'oauth2',
      id: env('FACEBOOK_APP_ID'),
      secret: env('FACEBOOK_APP_SECRET'),
      link: '/authentication/login/facebook',
      callback: '/authentication/login/facebook/callback',
      options: { scope: 'email' }
    },
    google: {
      get enabled () { return this.id && this.secret; },
      strategy: require('passport-google-oauth').Strategy,
      id: env('GOOGLE_CLIENT_ID'),
      protocol: 'oauth2',
      secret: env('GOOGLE_CLIENT_SECRET'),
      link: '/authentication/login/google',
      callback: '/authentication/login/google/callback'
    },
    linkedin: {
      get enabled () { return this.id && this.secret; },
      strategy: require('passport-linkedin').Strategy,
      protocol: 'oauth1',
      id: env('LINKEDIN_API_KEY'),
      secret: env('LINKEDIN_API_SECRET'),
      link: '/authentication/login/linkedin',
      callback: '/authentication/login/linkedin/callback',
      fields: ['id', 'first-name', 'last-name', 'email-address'],
      options: { scope: ['r_basicprofile', 'r_emailaddress'] }
    }
  }
}
```

# License

MIT

[1]: http://passportjs.org/guide/configure/
