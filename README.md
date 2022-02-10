<br />

<div align="center">
  <h1>Lost Pixel</h1>
  <p><h3 align="center">Technologies used ⚙️</h3></p>
  <a href="https://nextjs.org/">Next.js</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.prisma.io/">Prisma</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://chakra-ui.com/">chakra-ui</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://react-query.tanstack.com/">react-query</a>
</div>

<br />

## Running the project locally

The local version of the app can utilise docker managed db. To start the database make sure that you have [docker installed](https://www.docker.com/products/docker-desktop) & running on your machine together with `docker-compose`.

First copy the contents of the `.example.env` into `.env` file to make sure that you have all environment variables specified.

To run the project including the DB execute the following commands

##### Install dependencies

```console
yarn install
```

##### Run database locally

```console
docker-compose up -d
```

##### Migrate the database schema

```console
yarn run prisma:migrate
```

##### Launch the application

```console
yarn run dev
```

🚀🚀🚀 You app shall be listening for code changes at `localhost:3000`
