//==== Đặt tên biến=====
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const userEle = $("table tbody");

//====Get API================
function getUserAPI() {
  fetch("/users")
    .then((res) => res.json())
    .then((data) => renderUI(data))
    .catch((error) => console.error("Error:", error));
}

function handleDeleteUserAPI(id) {
  let options = {
    method: "delete",
    headers: { "Content-Type": "application/json" },
  };
  fetch("/users/" + id, options)
    .then((res) => res.json())
    .then(window.location.href = "/")
    .catch((error) => console.error("Error:", error));
}
//===renderUI====
function renderUI(arrs) {
  if (arrs.length === 0) {
    userEle.innerHTML = '<p style = "padding: 30px; color: red">Không có học viên nào cả</p>';
  } else {
    // sort giam dan theo id
    arrs.sort(() => -1);
    //renderUI
    let htmls = "";
    htmls = arrs.map((arr) => {
      return (htmls = `<tr>
                  <td>${arr.name}</td>
                  <td>${arr.birthday}</td>
                  <td>${arr.email}</td>
                  <td>${arr.phone}</td>
                  <td>
                      <a href="/edit.html?id=${arr.id}" class="text-info"><i class="fa fa-edit"></i> Chỉnh sửa</a>
                      |
                      <a class="text-danger" onclick = handleDeleteUserAPI(${arr.id})><i class="fa fa-trash-alt"></i> Xóa</a>
                  </td>
              </tr>`);
    });

    userEle.innerHTML = htmls.join("");
  }
}

window.onload = function () {
  getUserAPI();
};
