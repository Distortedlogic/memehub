import Router from "next/router";
import { CombinedError, Exchange } from "urql";
import { pipe, tap } from "wonka";

export const errorHandler = (error: CombinedError | undefined) => {
  if (typeof window === "undefined") return;
  switch (true) {
    case error?.message.includes("Forbidden resource"):
      Router.replace("/auth/login");
      break;
    case error?.message.includes("Unauthorized"):
      Router.replace("/auth/login");
      break;
    case Boolean(error?.message):
      console.error(error?.message);
      break;
  }
};

export const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) =>
    pipe(
      forward(ops$),
      tap(({ error }) => errorHandler(error))
    );
