# web-app-template

An empty react app created with Vite which contains some dummy endpoints.

## Using the mock API

In order to use the mock API you must use the `makeRequest` function to make requests.
For example,

```js
import { makeRequest } from "./api/makeRequest";

...

makeRequest("/bookings");
```

## Endpoints

### Bookings

Path: `/bookings`

Params:

| Name     | Default                  | Description                                           |
| -------- | ------------------------ | ----------------------------------------------------- |
| `search` | "" (returns all results) | The last name to filter the results by e.g. "Suttill" |
| `offset` | 0                        | The number of results to skip                         |
| `count`  | 10                       | The maximum number of results to return               |

Example response:

```json
{
  "results": [
    {
      "id": "fbb90645-ce7e-40e8-b93e-6945538c7448",
      "clinician": {
        "name": {
          "given": "Lem",
          "family": "Hanscombe"
        }
      },
      "start": "2024-01-15T22:55:10Z",
      "end": "2024-01-16T10:49:48Z",
      "type": "outpatient"
    }
    ...
  ],
  "hasNextPage": true
}
```

> [!NOTE]
> `hasNextPage` returns `false` when no more data can be fetched (this happens when there is nothing after the provided `offset` and `count` params).

Path: `/recent/bookings`

Functions the same as `/bookings` but contains a smaller list of recently accessed bookings.

### People

Path: `/people`

Params:

| Name     | Default                  | Description                                           |
| -------- | ------------------------ | ----------------------------------------------------- |
| `search` | "" (returns all results) | The last name to filter the results by e.g. "Suttill" |
| `offset` | 0                        | The number of results to skip                         |
| `count`  | 10                       | The maximum number of results to return               |

Example response:

```json
{
  "results": [
    {
      "id": "455a3bf0-0376-4221-ad21-6f2d7158f8ad",
      "name": {
        "given": "Hermy",
        "family": "Suttill"
      }
    }
    ...
  ],
  "hasNextPage": true
}
```

> [!NOTE]
> `hasNextPage` returns `false` when no more data can be fetched (this happens when there is nothing after the provided `offset` and `count` params).

Path: `/recent/people`

Functions the same as `/people` but contains a smaller list of recently accessed people.
