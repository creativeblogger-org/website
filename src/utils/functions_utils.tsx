import { setPosts } from "../pages/Home";

function getHumanDate(date: string) {
  const parsed_date = new Date(Date.parse(date));

  return `${parsed_date.toLocaleDateString()} à ${parsed_date.toLocaleTimeString()}`;
}

function getToken() {
  let cookies = document.cookie;
  let token = cookies.split("; ").find((e) => e.startsWith("token="));
  if (token == undefined) {
    return "";
  }
  token = token.substring(6);
  if (token != undefined) {
    return token;
  }
  return "";
}

function isConnected() {
  return getToken().length != 0;
}

function getError(error: ServerError) {
  return error.errors[0].message;
}

async function customFetch(
  url: string,
  method: string = "GET",
  body?: BodyInit
) {
  return await fetch(url, {
    method: method,
    body: body,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export { getHumanDate, getToken, isConnected, getError, customFetch };
