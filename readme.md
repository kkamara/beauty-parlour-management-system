<img src="https://github.com/kkamara/useful/blob/main/beauty-parlour-management-system5.png?raw=true" alt="beauty-parlour-management-system5.png" width=""/>

<img src="https://github.com/kkamara/useful/blob/main/beauty-parlour-management-system.png?raw=true" alt="beauty-parlour-management-system.png" width=""/>

<img src="https://github.com/kkamara/useful/blob/main/beauty-parlour-management-system2.png?raw=true" alt="beauty-parlour-management-system2.png" width=""/>

<img src="https://github.com/kkamara/useful/blob/main/beauty-parlour-management-system3.png?raw=true" alt="beauty-parlour-management-system3.png" width=""/>

<img src="https://github.com/kkamara/useful/blob/main/beauty-parlour-management-system4.png?raw=true" alt="beauty-parlour-management-system4.png" width=""/>

# Beauty Parlour Management System [![API](https://github.com/kkamara/beauty-parlour-management-system/actions/workflows/build.yml/badge.svg)](https://github.com/kkamara/beauty-parlour-management-system/actions/workflows/build.yml)

(18-Nov-2024) www.1000projects.org challenge. Made with Laravel 11, ReactJS 18, Filament and Stripe Payments. Made from www.github.com/kkamara/php-reactjs-boilerplate .

* [Using Postman?](#postman)

* [Installation](#installation)

* [Usage](#usage)

* [Stripe Webhook](#stripe-webhook)

* [API Documentation](#api-documentation)

* [Unit Tests](#unit-tests)

* [Misc.](#misc)

* [Contributing](#contributing)

* [License](#license)

<a name="postman"></a>
## Using Postman?

[Get Postman HTTP client](https://www.postman.com).

[Postman API Collection for Beauty Parlour Management System](https://github.com/kkamara/beauty-parlour-management-system/blob/main/database/beauty-parlour-management-system.postman_collection.json).

[Postman API Environment for Beauty Parlour Management System](https://github.com/kkamara/beauty-parlour-management-system/blob/main/database/beauty-parlour-management-system.postman_environment.json).

## Installation

* [Laravel Herd](https://herd.laravel.com)
* [MySQL (recommended) or database engine of SQLite, MariaDB, PostgreSQL, SQL Server](https://laravel.com/docs/11.x/database#introduction)
* [https://laravel.com/docs/11.x/installation](https://laravel.com/docs/11.x/installation)
* [https://laravel.com/docs/11.x/vite#main-content](https://laravel.com/docs/11.x/vite#main-content)

```bash
# Create our environment file.
cp .env.example .env
# Update database values in .env file.
# Install our app dependencies.
composer i
php artisan key:generate
# Before running the next command:
# Update your database details in .env
php artisan migrate --seed
npm install
npm run build
```

## Usage

```bash
herd link parlour
# Website accessible at http://parlour.test
```

### Stripe Webhook

```bash
stripe listen --forward-to parlour.test/api/web/cart/webhook
```

## API Documentation

```bash
php artisan route:list
# output
...
POST       api/user ............................ login › API\UserController@login
GET|HEAD   api/user/authorize .................. API\UserController@authorizeUser
POST       api/user/register ................... API\UserController@register
...
```

View the api collection [here](https://documenter.getpostman.com/view/17125932/TzzAKvVe).

## Unit Tests

```bash
php artisan test --filter=API
```

View the unit test code [here](https://raw.githubusercontent.com/kkamara/php-reactjs-boilerplate/main/tests/Unit/Api/UsersTest.php).

## Misc.

[See PHP ReactJS Boilerplate app](https://github.com/kkamara/php-reactjs-boilerplate)

[See Python ReactJS Boilerplate app](https://github.com/kkamara/python-reactjs-boilerplate)

[See MRVL Desktop](https://github.com/kkamara/mrvl-desktop)

[See MRVL Web](https://github.com/kkamara/mrvl-web)

[See Github to Bitbucket Backup Repo Updater](https://github.com/kkamara/ghbbupdater)

[See PHP Docker Skeleton](https://github.com/kkamara/php-docker-skeleton)

[See Python Docker Skeleton](https://github.com/kkamara/python-docker-skeleton)

[See Laravel 10 API 3](https://github.com/kkamara/laravel-10-api-3)

[See movies app](https://github.com/kkamara/movies)

[See Food Nutrition Facts Search web app](https://github.com/kkamara/food-nutrition-facts-search-web-app)

[See Ecommerce Web](https://github.com/kkamara/ecommerce-web)

[See City Maps Mobile](https://github.com/kkamara/city-maps-mobile)

[See Ecommerce Mobile](https://github.com/kkamara/ecommerce-mobile)

[See CRM](https://github.com/kkamara/crm)

[See Birthday Currency](https://github.com/kkamara/birthday-currency)

[See PHP Scraper](https://github.com/kkamara/php-scraper).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[BSD](https://opensource.org/licenses/BSD-3-Clause)
