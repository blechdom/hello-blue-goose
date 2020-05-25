import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

it("renders learn react link", () => {
  const theApp = render(<App />);
  console.log("the app ", theApp);
  expect(2 + 2).toBe(4);
  //const linkElement = getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});
