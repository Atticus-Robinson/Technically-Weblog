//On event handler run, get form data and route to post-routes to create new post. If response is ok render dashboard
async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_url = document.querySelector('input[name="post-url"]').value;
  const post_content = document.querySelector(
    'input[name="post-content"]'
  ).value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      post_url,
      post_content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
