/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { getComments, createComment, getReplies } from "../services/comment";
import userEvent from "@testing-library/user-event";
// import * as commentApi from "../services/comment";
import App from "./App";

jest.mock("../services/comment.js");

const comments = [
  {
    id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
    author: "Reed Fisher",
    body: "Sint in in sunt amet.",
    postedAt: 1550488214207,
    replies_count: 3,
    replies: [
      {
        id: "116dbd01-d5f3-4dfb-afeb-f822a9264a5e",
        comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
        author: "Kathleen Nikolaus",
        body: "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
        postedAt: 1550419941546,
      },
    ],
  },
];

afterEach(() => {
  jest.clearAllMocks();
});

test("get comments is called when the component renders", async () => {
  getComments.mockResolvedValueOnce(comments);
  // commentApi.getComments.mockImplementationOnce(() =>
  //   Promise.resolve(comments)
  // );
  render(<App />);
  await waitFor(() => expect(getComments).toHaveBeenCalledTimes(1));
});

test("it shows h1 when the data is fetched", async () => {
  getComments.mockResolvedValueOnce(comments);
  // jest.spyOn(commentApi, "getComments").mockResolvedValueOnce(comments);
  render(<App />);
  const heading = await screen.findByRole("heading", { level: 1 });
  await waitFor(() => expect(getComments).toHaveBeenCalledTimes(1));
  expect(heading).toBeInTheDocument();
});

test("comment is added when form is submitted", async () => {
  const newComment = {
    id: "4b2d74e4-7d1a-4ba3-9e95-0f52ee8ebc6e",
    author: "Srdjan",
    body: "My Comment",
    postedAt: 1550488214207,
    replies_count: 0,
    replies: [],
  };
  getComments.mockResolvedValueOnce(comments);
  createComment.mockResolvedValueOnce(newComment);
  render(<App />);
  const button = screen.getByRole("button");
  const user = userEvent.setup();
  await user.click(button);
  await waitFor(() => expect(getComments).toHaveBeenCalledTimes(1));
  const comms = await screen.findAllByTestId("comment");
  expect(comms.length).toEqual(2);
});

test("link dissapears when it's clicked", async () => {
  const newReplies = [
    {
      id: "116dbd02-d5f3-4dfb-afeb-f822a9264a5e",
      comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
      author: "Kathleen Nikolaus",
      body: "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
      postedAt: 1550419941546,
    },
    {
      id: "116dbd03-d5f3-4dfb-afeb-f822a9264a5e",
      comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
      author: "Kathleen Nikolaus",
      body: "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
      postedAt: 1550419941546,
    },
  ];
  getComments.mockResolvedValueOnce(comments);
  getReplies.mockResolvedValueOnce(newReplies);
  render(<App />);
  const user = userEvent.setup();
  // findByRole === getByRole + waitFor
  const link = await screen.findByRole("link", { name: /Show More Replies/ });
  await user.click(link);
  expect(link).not.toBeInTheDocument();
});
