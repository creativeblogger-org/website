import { createSignal } from "solid-js";

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

function getbuymeacoffeeCookie() {
  let cookies = document.cookie;
  let token = cookies.split("; ").find((e) => e.startsWith("buymeacoffee"));
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

function isNotConnected() {
  return getToken().length === 0;
}

function wantToShowBuyMeACoffee() {
  return getbuymeacoffeeCookie().length != 0;
}

function getCookie(name: any) {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith(name + "=");
  });
}

function getError(error: ServerError) {
  return error.errors[0].message;
}

async function customFetch(
  url: string,
  method: string = "GET",
  body?: BodyInit,
  json: boolean = true
) {
  let headers = {};
  if (json) {
    headers = {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      Authorization: `Bearer ${getToken()}`,
    };
  }

  return await fetch(url, {
    method: method,
    body: body,
    headers: headers,
  });
}

const [error, setError] = createSignal("");
const [success, setSuccess] = createSignal("");
const [warning, setWarning] = createSignal("");
const [errorTimer, setErrorTimer] = createSignal<number>();
const [successTimer, setSuccessTimer] = createSignal<number>();
const [warningTimer, setWarningTimer] = createSignal<number>();

function displayError(error: string) {
  setSuccess("");
  setError(error);
  setWarning("");
  clearTimeout(successTimer());
  setSuccessTimer(
    setTimeout(() => {
      setSuccess("");
    }, 2000)
  );
}

function displaySuccess(success: string) {
  setSuccess(success);
  setError("");
  setWarning("");
  clearTimeout(successTimer());
  setSuccessTimer(
    setTimeout(() => {
      setSuccess("");
    }, 2000)
  );
}

function displayWarning(warning: string) {
  setSuccess("");
  setError("");
  setWarning("");
}

function findPermissions(permission: number) {
  if (permission === 0) {
    return "membre";
  } else if (permission === 1) {
    return "rédacteur";
  } else if (permission === 2) {
    return "modérateur";
  } else {
    return "admin";
  }
}

export {
  getHumanDate,
  getToken,
  isConnected,
  isNotConnected,
  getError,
  customFetch,
  displayError,
  displaySuccess,
  displayWarning,
  warning,
  error,
  success,
  getCookie,
  findPermissions,
  getbuymeacoffeeCookie,
  wantToShowBuyMeACoffee,
};
