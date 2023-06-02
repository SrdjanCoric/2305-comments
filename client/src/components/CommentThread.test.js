/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CommentThread from "./CommentThread";

const comment = {
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
};

test("link to be in the document", () => {
  render(<CommentThread comment={comment} />);
  // getByRole
  // getByText
  const link = screen.getByRole("link", { name: /Show More Replies/ });
  expect(link).toBeInTheDocument();
});
