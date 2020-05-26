import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

describe("load app", () => {
  it("renders home page by default", () => {
    const history = createMemoryHistory();
    const { container, getByRole, getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(getByRole("heading")).toHaveTextContent("How to play");

    fireEvent.click(getByText("Make"));

    // expect(getByRole("heading")).toHaveTextContent(/Make/i);
  });

  /* it("bad route shows 404", () => {
    const history = createMemoryHistory();
    history.push("/bad/path");
    const { getByRole } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(getByRole("heading")).toHaveTextContent("404 Not Found");
  });*/
});
