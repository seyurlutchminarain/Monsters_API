//Router middleware
const { Router } = require("express");
const pool = require("../db"); // so we can use the queries within this file

const router = Router();

router.get("/", (request, response, next) => {
  //! Params for callback is error object and the response object
  pool.query("SELECT * FROM monsters ORDER BY id ASC", (err, res) => {
    if (err) return next(err); // TODO next function will pass around the err object to the next piece of middleware

    response.json(res.rows);
  });
});

router.get("/:id", (request, response, next) => {
  const { id } = request.params;

  //!This is how we use variables as params in our queries. We pass an extra param to the query fn.
  //! which represents an array of the variables we want access to [it is indexed from 1 hence $1]
  pool.query("SELECT * FROM monsters WHERE id = $1", [id], (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

router.post("/", (request, response, next) => {
  const { name, personality } = request.body;

  pool.query(
    "INSERT INTO monsters(name, personality) VALUES($1, $2)",
    [name, personality],
    (err, res) => {
      if (err) return next(err);

      response.redirect("/monsters"); // redirect to a different route
    }
  );
});

router.put("/:id", (request, response, next) => {
  const { id } = request.params;
  const keys = ["name", "personality"];
  const fields = [];

  keys.forEach((key) => {
    if (request.body[key]) fields.push(key);
  });

  //TODO This will handle null values/attributes not passed into the request
  fields.forEach((field, index) => {
    pool.query(
      `UPDATE monsters SET ${field}=($1) WHERE id = $2`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err);

        if (index === fields.length - 1) {
          response.redirect("/monsters");
        }
      }
    );
  });
});

router.delete("/:id", (request, response, next) => {
  const { id } = request.params;

  pool.query("DELETE FROM monsters WHERE id=$1", [id], (err, res) => {
    if (err) return next(err);
    response.redirect("/monsters");
  });
});

module.exports = router;
