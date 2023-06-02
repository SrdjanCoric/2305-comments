/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddCommentForm from "./AddCommentForm";

test("contains h2 heading", () => {
  render(<AddCommentForm />);
  // const heading = screen.getByRole("heading", {
  //   name: "Post a Comment",
  //   level: 2,
  // });
  const heading = screen.getByText("Post a Comment");
  expect(heading).toBeInTheDocument();
});

test("author state changes on input", async () => {
  render(<AddCommentForm />);
  const user = userEvent.setup();
  const inputAuthor = screen.getByRole("textbox", { name: "Your Name" });
  await user.type(inputAuthor, "Srdjan");
  expect(inputAuthor).toHaveValue("Srdjan");
});

test("body state changes on input", async () => {
  render(<AddCommentForm />);
  const user = userEvent.setup();
  const inputBody = screen.getByRole("textbox", { name: "Your Comment" });
  await user.type(inputBody, "My Comment");
  expect(inputBody).toHaveValue("My Comment");
});

test("onSubmit is called when button is clicked", async () => {
  const mockFunction = jest.fn();
  render(<AddCommentForm onSubmit={mockFunction} />);
  const user = userEvent.setup();
  const button = screen.getByRole("button");
  await user.click(button);

  expect(mockFunction.mock.calls.length).toBe(1);
});

// mockFunction.mock.calls = [[{author: "", body: ""}, function], [{author: "", body: ""}, function]]

test("onSubmit is called with the newComment", async () => {
  const mockFunction = jest.fn();
  render(<AddCommentForm onSubmit={mockFunction} />);
  const user = userEvent.setup();
  const inputAuthor = screen.getByRole("textbox", { name: "Your Name" });
  await user.type(inputAuthor, "Srdjan");
  const inputBody = screen.getByRole("textbox", { name: "Your Comment" });
  await user.type(inputBody, "My Comment");
  const newComment = { author: inputAuthor.value, body: inputBody.value };
  const button = screen.getByRole("button");
  await user.click(button);
  expect(mockFunction.mock.calls[0][0]).toEqual(newComment);
});
