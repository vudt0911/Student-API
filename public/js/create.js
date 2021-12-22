//createUser
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const createBtn = $(".btn-success");
let inputEle = $$(".col-sm-10 input");
const nameEle = $("#name");
const birthdayEle = $("#birthday");
const emailEle = $("#email");
const phoneEle = $("#phone");
const saveEle = $(".btn-success");
const backBtn = $(".btn-secondary");

function createUserAPI(data) {
  let options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  fetch("/users", options)
    .then((res) => res.json())
    .then((window.location.href = "/"))
    .catch((error) => console.error("Error:", error));
}

// ===Create User================

// event click button save

saveEle.addEventListener("click", () => {
  Array.from(inputEle).map((ele) => {
    ele.classList.remove("error", "success");
    ele.parentNode.querySelector("small").innerText = "";
  });

  let isValid = checkValidate();
  if (isValid) {
    alert("Đăng ký thành công");
    const user = {
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
      birthday: birthdayValue,
    };
    createUserAPI(user);
  }
});

// check validation
function checkValidate() {
  nameValue = nameEle.value;
  birthdayValue = birthdayEle.value;
  emailValue = emailEle.value;
  phoneValue = phoneEle.value;
  isCheck = true;

  // check validity name
  if (nameValue == "") {
    setError(nameEle, "Tên không được để trống");
    isCheck = false;
  } else {
    setSuccess(nameEle);
  }

  // check validity email
  if (emailValue == "") {
    setError(emailEle, "Email không được để trống");
    isCheck = false;
  } else if (!isEmail(emailValue)) {
    setError(emailEle, "Email có định dạng không đúng");
    isCheck = false;
  } else {
    setSuccess(emailEle);
  }

  // check validity phone
  if (phoneValue == "") {
    setError(phoneEle, "Số điện thoại không được để trống");
    isCheck = false;
  } else if (!isPhone(phoneValue)) {
    setError(phoneEle, "Số điện thoại không đúng định dạng");
    isCheck = false;
  } else {
    setSuccess(phoneEle);
  }
  return isCheck;
}

//set Error message
function setError(ele, message) {
  ele.classList.add("error");
  ele.parentNode.querySelector("small").innerText = message;
}

// set success message
function setSuccess(ele) {
  ele.classList.add("success");
}

// function check email follow Regex
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

// function check phone follow Regex
function isPhone(number) {
  return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
}

// event click button back
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "/";
  });
}

// export default checkValidate;
