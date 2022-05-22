const updateBtn = document.getElementById("update-btn");
const deleteBtn = document.getElementById("delete-btn");

//On event listener run, get form data and send to post-route to update post. Then reload dashboard
const updatePostHandler = async () => {
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const title = document.getElementById("edit-post-title").value.trim();
  const post_text = document.getElementById("edit-post-body").value.trim();

  if (title && post_text) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, post_text }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

//On event listener run, get data from location and send to post-route to delete item by id
const deletePostHandler = async () => {
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    window.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

updateBtn.addEventListener("click", updatePostHandler);
deleteBtn.addEventListener("click", deletePostHandler);
