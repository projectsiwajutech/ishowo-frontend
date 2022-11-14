// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:52696/api/",
  // apiUrl: "http://localhost:5300/api/",
  apiPort: "5000", //45233
  webPort: "3000",
  licenceUrl: "http://localhost:52696/licence/",
  // licenceUrl: "http://localhost:8000/api/itlicence/",
  ipAdress: "http://localhost",
};

  // ng build --prod --aot --vc --cc --dop --buildOptimizer
// ng build --prod --aot --build-optimizer
// ng  build --aot --prod --build-optimizer --output-hashing all

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
