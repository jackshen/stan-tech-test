# Stan Coding Challenge

Stan tech test

## Setup

Copy `.env.example` into `.env`; sensible default configuration values have been provided for your convenience, but feel free to update these as you wish.

From there, run the following commands to run the application:

```sh
yarn
yarn start
```

Given the default `.env` configuration, this will open up a server at [localhost:3001](http://localhost:3001) where this app is hosted.

## Testing

To run Cypress E2E tests:

```sh
yarn test:cypress
```

Make sure that the app is running in a separate terminal prior to running the tests.

## Technologies used

- **Bundler**: Webpack
- **Framework**: React/TypeScript
- **HTTP client**: Fetch
- **Linting and formatting**: ESLint, Prettier
- **Routing**: React Router
- **Styling**: styled-components
- **E2E testing**: Cypress

## Assumptions and talking points

- I elected to use the optional choice of styled-components as my styling solution. As a consequence of this technical decision, the build process does not generate a `dist/styles.css` file as Styled Components [does not support CSS extraction](https://github.com/styled-components/styled-components/issues/1018#issuecomment-316827497).
- The sample data was retrieved using the `fetch` API. As the requirements did not say the `data.json` file was allowed to be built to `dist`, I wrote a custom local API using `webpack-dev-server`'s `setupMiddlewares` option.
- As the app is limited in scope, state management is handled locally in React state instead of using a solution such as Redux or MobX. The exception is theme variables, which are stored in context.
- The design of this app is is fully responsive, from fullscreen desktop resolution to mobile view, down to a minimum of 320px in width.
- Responsiveness in the carousel component was achieved by providing an optional prop that describes the maximum number of slides that should be shown at a given breakpoint. This was inspired by the `responsive` [prop](https://react-slick.neostack.com/docs/api#responsive) used by the React Slick carousel library for the same purpose. Per specifications, the most number of slides is still only limited to 6 at the largest widths.
- The app is tested with a simple end-to-end Cypress test.

## Questions

- **How did you decide on the technical and architectural choices used as part of your solution?** I made my technical and architectural choices with extensibility, reusability, and maintainability at the forefront of my mind. For example, one of the reasons for my decision to use Styled Components was to leverage its inbuilt global styles and themes context providers in order to define and use commonly used [colours](./src/theme/palette.ts) and [size breakpoints](./src/theme/size.ts). Another example would be the Carousel component's optional `maxSlides` prop: although the requirements specified a maximum of 6 slides, I worked under the assumption that it could be reused in a scenario where more or fewer were required.
- **Are there any improvements you could make to your submission?** Improved accessibility, particularly keyboard within the carousel, would be an improvement I would look to explore.
- **What would you do differently if you were allocated more time?** Given more time, I would have liked to add more testing, in particular more test cases and unit tests. With the suggested time frame in mind, I decided to write a basic end-to-end test using Cypress in order to focus on developing a well-rounded app.
