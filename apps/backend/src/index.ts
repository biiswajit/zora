import app from "./app";
import env from "@environment";

app.listen(env.PORT, () => {
  console.log(`Zora API server is listening on ${env.HOST}/${env.PORT}}`);
})