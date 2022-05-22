const updateBtn = document.getElementById("update-btn");
const deleteBtn = document.getElementById("delete-btn");

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
