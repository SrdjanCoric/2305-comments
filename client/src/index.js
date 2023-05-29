import React from "react";
import ReactDOM from "react-dom/client";

const Comment = ({ author, postedAt, body }) => {
  return React.createElement("div", {
    className: "comment",
    children: [
      React.createElement("hr"),
      React.createElement(
        "div",
        { className: "image" },
        React.createElement("img", {
          src: "https://i.postimg.cc/Y0RcrdHp/no-user-image.gif",
          alt: "",
        })
      ),
      React.createElement("div", {
        className: "header",
        children: [
          React.createElement("h3", { className: "author" }, author),
          React.createElement("span", null, postedAt),
        ],
      }),
      React.createElement("p", null, body),
    ],
  });
};

const App = () => {
  return React.createElement("div", {
    className: "comments",
    children: [
      React.createElement(
        Popover,
        null,
        React.createElement("h1", null, "My popover")
      ),
      React.createElement("h2", null, "Comments (2)"),
      React.createElement("div", {
        className: "parent-comment",
        children: [
          React.createElement(Comment, {
            author: "Srdjan",
            postedAt: "3 minutes ago",
            body: "my awesome comment",
          }),
          React.createElement(Comment, {
            author: "Max",
            postedAt: "2 minutes ago",
            body: "Max's awesome comment",
          }),
          React.createElement(Comment, {
            author: "Nick",
            postedAt: "1 minute ago",
            body: "Nick's awesome comment",
          }),
        ],
      }),
      React.createElement(Popover, {
        children: React.createElement("h1", null, "Another Popover"),
      }),
    ],
  });
};

const Popover = ({ children }) => {
  return children;
};

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(App());
