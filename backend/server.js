const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(function (req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  const page = parsedUrl.pathname;

  const energy = parsedUrl.searchParams.get("energy");
  const time = parsedUrl.searchParams.get("time");
  const place = parsedUrl.searchParams.get("place");
  const reputation = parsedUrl.searchParams.get("reputation");
  const word = parsedUrl.searchParams.get("word");

  console.log(page);

  if (page === "/") {
    fs.readFile(path.join(__dirname, "../index.html"), function (err, data) {
      if (err) {
        console.log(err);

        res.writeHead(500, {
          "Content-Type": "text/plain",
        });

        res.end("Something went wrong.");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/html",
      });

      res.end(data);
    });
  } else if (page === "/api") {
    if (energy && time && place && reputation && word) {
      const firstNames = {
        calm: ["Silent", "Velvet", "Quiet", "Smooth"],

        loud: ["Wild", "Heavy", "Major", "Raw"],

        mysterious: ["Shadow", "Unknown", "Ghost", "Midnight"],

        funny: ["Odd", "Crooked", "Lucky", "Lo-Fi"],
      };

      const middleNames = {
        morning: ["Golden", "Early", "Solar", "Bright"],

        afternoon: ["Metro", "Prime", "Downtown", "Daylight"],

        night: ["Midnight", "Neon", "Moon", "Afterdark"],

        late: ["Nocturnal", "Sleepless", "Afterhours", "Nightshift"],
      };

      const lastNames = {
        clever: ["Scholar", "Cipher", "Sage", "Professor"],

        unpredictable: ["Ruckus", "Chaos", "Menace", "Wildcard"],

        smooth: ["Supreme", "Silk", "Cool", "Groove"],

        legendary: ["Legend", "Prophet", "Mounment", "Icon"],
      };

      const specialWords = {
        velvet: ["Velvet", "Silk", "Plush"],

        static: ["Static", "Voltage", "Signal"],

        golden: ["Golden", "Royal", "Crown"],

        shadow: ["Shadow", "Dark", "Phantom"],
      };

      const locationTitles = {
        rooftop: ["Skyline", "Highrise", "Rooftop"],

        records: ["Vinyl", "Needle", "Groove"],

        corner: ["Corner", "Block", "Avenue"],

        subway: ["Metro", "Transit", "Underground"],
      };

      function randomItem(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
      }

      const first = randomItem(firstNames[energy]);

      const middle = randomItem(
        Math.random() < 0.5 ? middleNames[time] : specialWords[word],
      );

      const last = randomItem(
        Math.random() < 0.5 ? lastNames[reputation] : locationTitles[place],
      );

      const generatedName = `${first} ${middle} ${last}`;

      const responseObject = {
        name: generatedName,
      };

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(responseObject));
    } else {
      const responseObject = {
        error: "Please answer all five questions.",
      };

      res.writeHead(400, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(responseObject));
    }
  } else if (page === "/main.css") {
    fs.readFile(path.join(__dirname, "../main.css"), function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/css",
      });
      res.end(data);
    });
  } else if (page === "/js/main.js") {
    fs.readFile(path.join(__dirname, "../js/main.js"), function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.writeHead(200, {
        "Content-Type": "text/javascript",
      });
      res.end(data);
    });
  } else if (page === "/images/1099.jpg") {
    fs.readFile(
      path.join(__dirname, "../images/1099.jpg"),
      function (err, data) {
        if (err) {
          console.log("Image Error:", err);

          res.writeHead(404);
          res.end();
          return;
        }
        res.writeHead(200, {
          "Content-Type": "image/jpeg",
        });
        res.end(data);
      },
    );
  } else if (page === "/favicon.ico") {
    res.writeHead(204);
    res.end();
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.end("404 - Page Not Found");
  }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
