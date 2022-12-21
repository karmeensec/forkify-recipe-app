
# Forkify Recipe App

Search for more than 100 recipes and cook.


## Authors

- [@kamilismayilzade](https://www.github.com/kamilismayilzade)


## Documentation

Recipe web application called Forkify for searching for several recipes. Project created with HTML, CSS, JavaScript along with [Parcel JS](https://parceljs.org/).


## Features

- Search and get recipes with ingredients 
- Bookmark a recipe
- Add your own recipe
- Explore pages with recipes

## Forkify API

#### Get all items

```http
  GET https://forkify-api.herokuapp.com/api/v2/recipes/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |




## Run Locally


Go to the project directory

```bash
  cd Forkify-recipe app
```

Install dependencies

```bash
  npm install
```

Install Parcel JS

```bash
  npm install --save-dev parcel
```

Start the server

```bash
  npm run start
```


## Deployment

To deploy this project run

```bash
  npm run deploy
```


## Tech Stack

**Client:** HTML, CSS, JavaScript




## Screenshots
![screencapture-forkify-v2-netlify-app-2022-12-21-22_16_13](https://user-images.githubusercontent.com/84046930/209004424-445260d0-26f6-42a1-a8b4-702d8687615d.png)



